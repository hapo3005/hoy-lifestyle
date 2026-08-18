import test from 'node:test';
import assert from 'node:assert/strict';
import {evaluateRequirement,evaluateRequirements,MATCH_STATES} from '../../src/requirements.js';

const confirmed=value=>({value,verification:'business_confirmed',isCurrent:true});

test('confirmed MUST yes is a match',()=>{
  assert.equal(evaluateRequirement(confirmed('yes'),{key:'step_free',level:'MUST',value:'yes'}).state,MATCH_STATES.MATCH);
});

test('confirmed MUST no is a hard no-match',()=>{
  assert.equal(evaluateRequirement(confirmed('no'),{key:'step_free',level:'MUST',value:'yes'}).state,MATCH_STATES.NO_MATCH);
});

test('external and unknown evidence fail closed to confirmation needed',()=>{
  assert.equal(evaluateRequirement({value:'yes',verification:'external_unverified'},{key:'step_free',level:'MUST',value:'yes'}).state,MATCH_STATES.NEEDS_CONFIRMATION);
  assert.equal(evaluateRequirement(confirmed('unknown'),{key:'step_free',level:'MUST',value:'yes'}).state,MATCH_STATES.NEEDS_CONFIRMATION);
});

test('stale or disputed facts cannot satisfy a MUST',()=>{
  assert.equal(evaluateRequirement({...confirmed('yes'),stale:true},{key:'step_free',level:'MUST',value:'yes'}).state,MATCH_STATES.NEEDS_CONFIRMATION);
  assert.equal(evaluateRequirement({...confirmed('yes'),reviewState:'disputed'},{key:'step_free',level:'MUST',value:'yes'}).state,MATCH_STATES.NEEDS_CONFIRMATION);
});

test('numeric comparators are supported',()=>{
  const fact={value:'yes',measurement:91,verification:'hoy_verified',isCurrent:true};
  assert.equal(evaluateRequirement(fact,{key:'door_width_cm',level:'MUST',operator:'gte',value:85}).state,MATCH_STATES.MATCH);
  assert.equal(evaluateRequirement({...fact,measurement:79},{key:'door_width_cm',level:'MUST',operator:'gte',value:85}).state,MATCH_STATES.NO_MATCH);
});

test('PREFER changes preference score but never rescues a failed MUST',()=>{
  const result=evaluateRequirements({facts:{must_feature:confirmed('no'),nice_feature:confirmed('yes')}},[
    {key:'must_feature',level:'MUST',value:'yes'},
    {key:'nice_feature',level:'PREFER',value:'yes'}
  ]);
  assert.equal(result.state,MATCH_STATES.NO_MATCH);
  assert.equal(result.preferScore,1);
});

test('unknown MUST yields possible match / confirmation needed',()=>{
  const result=evaluateRequirements({facts:{}},[{key:'step_free',level:'MUST',value:'yes'}]);
  assert.equal(result.state,MATCH_STATES.NEEDS_CONFIRMATION);
});
