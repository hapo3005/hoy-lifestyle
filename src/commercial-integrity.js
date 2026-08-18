const parse=v=>{const d=new Date(v);return Number.isFinite(d.getTime())?d:null};
const clean=v=>String(v??'').trim().toLowerCase();

export function sponsorshipState(item,now=new Date()){
  const placement=item?.commercial?.placement;
  if(!placement)return{eligible:false,label:null,reason:'none'};
  if(item?.suppressed)return{eligible:false,label:null,reason:'suppressed'};
  if(clean(placement.status)!=='active')return{eligible:false,label:null,reason:'inactive'};
  if(placement.disclosureRequired!==true)return{eligible:false,label:null,reason:'disclosure_missing'};
  if(clean(placement.reviewState)!=='approved')return{eligible:false,label:null,reason:'not_approved'};
  const start=parse(placement.startsAt),end=parse(placement.endsAt);
  if(start&&now<start)return{eligible:false,label:null,reason:'not_started'};
  if(end&&now>end)return{eligible:false,label:null,reason:'expired'};
  return{eligible:true,label:'Anzeige',reason:'active'};
}

export function decorateOrganicRows(rows,now=new Date()){
  return(rows||[]).map((row,index)=>({
    ...row,
    organicRank:index+1,
    sponsorship:sponsorshipState(row.item,now)
  }));
}

export function sponsoredCandidates(rows,now=new Date()){
  return decorateOrganicRows(rows,now).filter(row=>row.sponsorship.eligible);
}

export function assertNoCommercialScoreInfluence(before,after){
  if((before||[]).length!==(after||[]).length)return false;
  return(before||[]).every((row,index)=>{
    const other=after[index];
    return row?.item?.id===other?.item?.id&&Number(row?.score)===Number(other?.score);
  });
}
