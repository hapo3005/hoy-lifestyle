import '../vendor/hoy-platform-core-v1.js';

const core=globalThis.HOYPlatformCore;
if(!core||core.CORE_VERSION!=='1.0.0')throw new Error('HOY Platform Core v1 unavailable');

export function sponsorshipState(item,now=new Date()){
  return core.sponsorshipState(item,now);
}

export function decorateOrganicRows(rows,now=new Date()){
  return(rows||[]).map((row,index)=>({
    ...row,
    organicRank:index+1,
    sponsorship:core.sponsorshipState(row.item,now)
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
