export const REQUIREMENT_LEVELS=Object.freeze({MUST:'MUST',PREFER:'PREFER',IGNORE:'IGNORE'});
export const MATCH_STATES=Object.freeze({MATCH:'MATCH',NO_MATCH:'NO_MATCH',NEEDS_CONFIRMATION:'NEEDS_CONFIRMATION'});
export const FACT_VALUES=Object.freeze({YES:'yes',NO:'no',PARTIAL:'partial',UNKNOWN:'unknown',NOT_APPLICABLE:'not_applicable',TEMPORARILY_UNAVAILABLE:'temporarily_unavailable'});
export const CONFIRMED_VERIFICATION=new Set(['hoy_verified','business_confirmed','community_confirmed']);

const clean=v=>String(v??'').trim().toLowerCase();
const numeric=v=>{const n=Number(v);return Number.isFinite(n)?n:null};

export function isConfirmedFact(fact){
  if(!fact||fact.isCurrent===false||fact.stale===true||clean(fact.reviewState)==='disputed')return false;
  return CONFIRMED_VERIFICATION.has(clean(fact.verification));
}

function compareValue(fact,requirement){
  const operator=clean(requirement.operator||'equals');
  if(operator==='gte'||operator==='lte'){
    const actual=numeric(fact.measurement??fact.value);
    const expected=numeric(requirement.value);
    if(actual===null||expected===null)return null;
    return operator==='gte'?actual>=expected:actual<=expected;
  }
  const actual=clean(fact.value);
  const expected=clean(requirement.value??FACT_VALUES.YES);
  if(!actual)return null;
  return actual===expected;
}

export function evaluateRequirement(fact,requirement={}){
  const level=String(requirement.level||REQUIREMENT_LEVELS.MUST).toUpperCase();
  if(level===REQUIREMENT_LEVELS.IGNORE)return{state:MATCH_STATES.MATCH,level,ignored:true,confirmed:false};
  if(!fact)return{state:MATCH_STATES.NEEDS_CONFIRMATION,level,confirmed:false,reason:'Merkmal nicht belegt'};
  const value=clean(fact.value);
  if([FACT_VALUES.UNKNOWN,FACT_VALUES.PARTIAL,FACT_VALUES.TEMPORARILY_UNAVAILABLE,''].includes(value)){
    return{state:MATCH_STATES.NEEDS_CONFIRMATION,level,confirmed:false,reason:'Merkmal nicht eindeutig bestätigt'};
  }
  if(!isConfirmedFact(fact))return{state:MATCH_STATES.NEEDS_CONFIRMATION,level,confirmed:false,reason:'Quelle nicht als bestätigt eingestuft'};
  const comparison=compareValue(fact,requirement);
  if(comparison===null)return{state:MATCH_STATES.NEEDS_CONFIRMATION,level,confirmed:true,reason:'Vergleichswert fehlt'};
  return{state:comparison?MATCH_STATES.MATCH:MATCH_STATES.NO_MATCH,level,confirmed:true,reason:comparison?'Bestätigt erfüllt':'Bestätigt nicht erfüllt'};
}

export function evaluateRequirements(item,requirements=[]){
  const facts=item?.facts||{};
  const evaluations=(requirements||[]).map(requirement=>({
    requirement,
    ...evaluateRequirement(facts[requirement.key],requirement)
  }));
  const must=evaluations.filter(x=>x.level===REQUIREMENT_LEVELS.MUST&&!x.ignored);
  const prefer=evaluations.filter(x=>x.level===REQUIREMENT_LEVELS.PREFER&&!x.ignored);
  let state=MATCH_STATES.MATCH;
  if(must.some(x=>x.state===MATCH_STATES.NO_MATCH))state=MATCH_STATES.NO_MATCH;
  else if(must.some(x=>x.state===MATCH_STATES.NEEDS_CONFIRMATION))state=MATCH_STATES.NEEDS_CONFIRMATION;
  const preferMatched=prefer.filter(x=>x.state===MATCH_STATES.MATCH).length;
  return{
    state,
    evaluations,
    mustCount:must.length,
    preferCount:prefer.length,
    preferScore:prefer.length?preferMatched/prefer.length:1
  };
}
