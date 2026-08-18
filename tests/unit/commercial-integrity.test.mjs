import test from 'node:test';
import assert from 'node:assert/strict';
import {decorateOrganicRows,sponsorshipState,assertNoCommercialScoreInfluence} from '../../src/commercial-integrity.js';

test('active sponsorship requires explicit approved disclosure',()=>{
  const item={commercial:{placement:{status:'active',reviewState:'approved',disclosureRequired:true,startsAt:'2026-08-01',endsAt:'2026-08-31'}}};
  assert.deepEqual(sponsorshipState(item,new Date('2026-08-18T12:00:00Z')),{eligible:true,label:'Anzeige',reason:'active'});
  assert.equal(sponsorshipState({commercial:{placement:{status:'active',reviewState:'approved'}}},new Date('2026-08-18T12:00:00Z')).eligible,false);
});

test('sponsored state decorates but does not reorder organic results',()=>{
  const rows=[
    {item:{id:'a'},score:88},
    {item:{id:'b',commercial:{placement:{status:'active',reviewState:'approved',disclosureRequired:true}}},score:77}
  ];
  const decorated=decorateOrganicRows(rows,new Date('2026-08-18T12:00:00Z'));
  assert.deepEqual(decorated.map(x=>x.item.id),['a','b']);
  assert.deepEqual(decorated.map(x=>x.organicRank),[1,2]);
  assert.equal(decorated[1].sponsorship.label,'Anzeige');
  assert.equal(assertNoCommercialScoreInfluence(rows,decorated),true);
});

test('suppressed items can never become sponsored candidates',()=>{
  const item={suppressed:true,commercial:{placement:{status:'active',reviewState:'approved',disclosureRequired:true}}};
  assert.equal(sponsorshipState(item).eligible,false);
});
