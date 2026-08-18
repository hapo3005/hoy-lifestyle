import { accessibilityMatch, trustState } from "./trust.js";
import { evaluateRequirements, MATCH_STATES } from "./requirements.js";

export const SCORE_WEIGHTS=Object.freeze({intent:25,availability:20,timeWindow:15,distance:10,weather:10,preference:5,trust:10,variety:5});
const text=v=>String(v||"").toLowerCase(),clamp01=v=>Math.max(0,Math.min(1,Number(v)||0));

export function isActive(item){
  const status=text(item?.status);
  if(!item||item.suppressed)return false;
  if(["closed","inactive","temporarily closed"].includes(status))return false;
  if(status.includes("verify")||status.includes("duplicate candidate")||status.includes("identity conflict"))return false;
  return true;
}

export function familyMatch(item){return String(item?.familyData||"").trim().toLowerCase()==="yes"}
export function indoorMatch(item){const env=text(item?.environment),category=text(item?.category);return env.includes("indoor")||category.includes("indoor")||category.includes("culture")||category.includes("wellness")}
export function sunsetMatch(item){const haystack=text([item?.name,item?.offer,item?.category,item?.notes].filter(Boolean).join(" "));return["sunset","boat","sailing","viewpoint","lighthouse","faro","beach","playa","cala","harbour","puerto"].some(k=>haystack.includes(k))}

export function hardGate(item,context={}){
  if(!isActive(item))return{eligible:false,reasons:["Nicht als aktiver Treffer freigegeben"]};
  if(context.preset==="family"&&!familyMatch(item))return{eligible:false,reasons:["Familien-Eignung nicht bestätigt"]};
  if(context.preset==="indoor"&&!indoorMatch(item))return{eligible:false,reasons:["Nicht als Indoor-Option geführt"]};
  if(context.preset==="accessible"&&!accessibilityMatch(item,true).passes)return{eligible:false,reasons:["Gewünschte Accessibility-Merkmale nicht bestätigt"]};
  if(context.weatherSafety==="blocked")return{eligible:false,reasons:["Aktuelle Wetter-/Sicherheitslage blockiert diese Aktivität"]};
  const requirements=evaluateRequirements(item,context.requirements||[]);
  if(requirements.state===MATCH_STATES.NO_MATCH)return{eligible:false,reasons:["Mindestens eine bestätigte Muss-Anforderung wird nicht erfüllt"],requirements};
  return{eligible:true,reasons:[],requirements};
}

export function intentScore(item,context={}){
  const q=text(context.query),cat=text(context.category);
  if(!q&&!cat)return item.nowFit==="High"?.82:item.nowFit==="Medium"?.62:.48;
  const haystack=text([item.name,item.category,item.offer,item.audience,item.locality].filter(Boolean).join(" "));
  let score=0;
  if(cat&&text(item.category)===cat)score=1;else if(cat&&text(item.category).includes(cat))score=.88;
  if(q){const tokens=q.split(/\s+/).filter(t=>t.length>=2),hitRate=tokens.length?tokens.filter(t=>haystack.includes(t)).length/tokens.length:0;score=Math.max(score,hitRate)}
  return clamp01(score||.18);
}

export function availabilityScore(item){if(item.trust?.liveToday)return 1;const hasSchedule=Boolean(String(item.seasonality||item.hoursText||"").trim()),grade=String(item.trust?.evidenceGrade||"C").toUpperCase();if(hasSchedule&&item.trust?.ownerConfirmed)return .82;if(hasSchedule&&grade==="A")return .68;if(hasSchedule&&grade==="B")return .55;return .36}
export function timeWindowScore(item,context={}){const fit=String(item.nowFit||"").toLowerCase();if(context.preset==="today")return fit==="high"?.88:fit==="medium"?.70:.52;if(context.preset==="now")return fit==="high"?.94:fit==="medium"?.62:.38;return fit==="high"?.82:fit==="medium"?.68:.52}
export function distanceScore(item,context={}){if(!context.userLocation||item.geo?.lat==null||item.geo?.lng==null)return .55;const toRad=d=>d*Math.PI/180,a=context.userLocation,b=item.geo,R=6371,dLat=toRad(b.lat-a.lat),dLon=toRad(b.lng-a.lng),h=Math.sin(dLat/2)**2+Math.cos(toRad(a.lat))*Math.cos(toRad(b.lat))*Math.sin(dLon/2)**2,km=2*R*Math.asin(Math.sqrt(h)),radius=Math.max(1,Number(context.radiusKm)||20);return clamp01(1-km/radius)}
export function weatherScore(item,context={}){if(!context.weather)return .55;const env=text(item.environment);if(context.weather.rain&&env.includes("indoor"))return .95;if(context.weather.extremeHeat&&env.includes("indoor"))return .88;if(context.weather.windStrong&&["jet ski","kayak","sailing","water sports"].some(k=>text(item.category).includes(k)))return .22;return .62}

export function preferenceScore(item,context={}){
  let base=.55;
  if(context.preset==="family")base=familyMatch(item)?1:0;
  else if(context.preset==="accessible")base=accessibilityMatch(item,true).positive?1:0;
  else if(context.preset==="indoor")base=indoorMatch(item)?1:0;
  else if(context.preset==="sunset")base=sunsetMatch(item)?1:.2;
  const requirements=evaluateRequirements(item,context.requirements||[]);
  return requirements.preferCount?clamp01((base+requirements.preferScore)/2):base;
}

export function varietyScore(item,context={}){return new Set(context.seenCategories||[]).has(item.category)?.2:.72}

export function scoreItem(item,context={},now=new Date()){
  const gate=hardGate(item,context);
  if(!gate.eligible)return{eligible:false,score:-1,reasons:gate.reasons,breakdown:{},requirements:gate.requirements||evaluateRequirements(item,context.requirements||[])};
  const trust=trustState(item,now),requirements=gate.requirements||evaluateRequirements(item,context.requirements||[]),signals={intent:intentScore(item,context),availability:availabilityScore(item),timeWindow:timeWindowScore(item,context),distance:distanceScore(item,context),weather:weatherScore(item,context),preference:preferenceScore(item,context),trust:trust.score,variety:varietyScore(item,context)},breakdown=Object.fromEntries(Object.entries(signals).map(([key,value])=>[key,+(SCORE_WEIGHTS[key]*clamp01(value)).toFixed(2)])),score=+Object.values(breakdown).reduce((a,b)=>a+b,0).toFixed(2);
  return{eligible:true,score,reasons:reasonsFor(item,context,trust,requirements),breakdown,trust,requirements};
}

export function reasonsFor(item,context,trust=trustState(item),requirements=evaluateRequirements(item,context.requirements||[])){
  const reasons=[];
  if(requirements.state===MATCH_STATES.NEEDS_CONFIRMATION)reasons.push({tone:"warn",label:"Muss-Merkmal: Bestätigung nötig"});
  else if(requirements.mustCount>0)reasons.push({tone:"good",label:"Muss-Merkmale bestätigt"});
  if(item.trust?.liveToday)reasons.push({tone:"good",label:"Heute aktualisiert"});else if(item.hoursText||item.seasonality)reasons.push({tone:"neutral",label:"Zeiten/Saison hinterlegt"});
  if(context.preset==="family"&&familyMatch(item))reasons.push({tone:"good",label:"Family-Daten bestätigt"});
  if(context.preset==="accessible"&&accessibilityMatch(item,true).positive)reasons.push({tone:"good",label:"Accessibility konkret belegt"});
  if(context.preset==="indoor"&&indoorMatch(item))reasons.push({tone:"good",label:"Indoor-Option"});
  if(context.preset==="sunset"&&sunsetMatch(item))reasons.push({tone:"good",label:"Passt zum Sunset-Modus"});
  if(item.commercial?.priceText)reasons.push({tone:"neutral",label:"Preisinfo vorhanden"});
  if(item.contact?.bookingUrl||item.contact?.whatsapp||item.contact?.phone)reasons.push({tone:"neutral",label:"Direkter Kontakt"});
  reasons.push({tone:trust.key==="STALE"||trust.key==="RESEARCH_C"?"warn":"muted",label:trust.label});
  return reasons.slice(0,3);
}

export function rankItems(items,context={},now=new Date()){
  const rows=[],seen=new Set();
  for(const item of items||[]){
    const result=scoreItem(item,{...context,seenCategories:seen},now);
    if(!result.eligible)continue;
    rows.push({item,...result});
    if(result.score>=60)seen.add(item.category);
  }
  if(context.preset==="surprise")return rows.sort((a,b)=>{const band=Math.floor(b.score/10)-Math.floor(a.score/10);return band||String(a.item.slug).localeCompare(String(b.item.slug))});
  return rows.sort((a,b)=>b.score-a.score||String(a.item.name).localeCompare(String(b.item.name),"de"));
}
