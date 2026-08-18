import '../vendor/hoy-platform-core-v1.js';

const core=globalThis.HOYPlatformCore;
if(!core||core.CORE_VERSION!=='1.0.0'||core.CONTRACT_VERSION!=='HOY-PC-1.0')throw new Error('HOY Platform Core v1 is missing or incompatible');

export const REQUIREMENT_LEVELS=core.REQUIREMENT_LEVELS;
export const MATCH_STATES=core.MATCH_STATES;
export const FACT_VALUES=core.FACT_VALUES;
export const CONFIRMED_VERIFICATION=new Set([
  core.VERIFICATION.HOY_VERIFIED,
  core.VERIFICATION.BUSINESS_CONFIRMED,
  core.VERIFICATION.COMMUNITY_CONFIRMED
]);

export function isConfirmedFact(fact,now=new Date()){
  return core.factIsConfirmed(fact,now);
}

export function evaluateRequirement(fact,requirement={},now=new Date()){
  return core.evaluateRequirement(fact,requirement,now);
}

export function evaluateRequirements(item,requirements=[],now=new Date()){
  return core.evaluateRequirements(item,requirements,now);
}

export const PLATFORM_CORE=core;
