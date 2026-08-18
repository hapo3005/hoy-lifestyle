import fs from "node:fs";
import path from "node:path";
const root=process.cwd();
const required=["index.html","operator.html","app.js","operator.js","styles.css","service-worker.js","manifest.webmanifest","platform-core.lock.json","vendor/hoy-platform-core-v1.js","scripts/sync-platform-core.mjs","src/catalog.js","src/decision-engine.js","src/trust.js","src/requirements.js","src/commercial-integrity.js","data/lifestyle-catalog-index.json","data/contracts/lifestyle-catalog-index-v1.schema.json","supabase/migrations/20260818_lifestyle_quality_foundation.sql","docs/QUALITY_STANDARD.md","docs/VERTICAL_PARITY.md"];
const missing=required.filter(file=>!fs.existsSync(path.join(root,file)));if(missing.length)throw new Error(`Missing runtime contract files: ${missing.join(", ")}`);
const lock=JSON.parse(fs.readFileSync(path.join(root,"platform-core.lock.json"),"utf8"));
if(lock.coreVersion!=="1.0.0"||lock.contractVersion!=="HOY-PC-1.0")throw new Error("Unexpected Platform Core lock version");
const platform=fs.readFileSync(path.join(root,"vendor/hoy-platform-core-v1.js"),"utf8");
for(const token of ["CORE_VERSION='1.0.0'","CONTRACT_VERSION='HOY-PC-1.0'","researchMaxAgeDays:180","business_confirmed","community_confirmed","sponsorshipState","safetyGate"]){if(!platform.includes(token))throw new Error(`Vendored Platform Core missing: ${token}`)}
const requirements=fs.readFileSync(path.join(root,"src/requirements.js"),"utf8");
for(const token of ["core.factIsConfirmed","core.evaluateRequirement","core.evaluateRequirements","PLATFORM_CORE=core"]){if(!requirements.includes(token))throw new Error(`Lifestyle requirements adapter is not delegating: ${token}`)}
for(const forbidden of ["function compareValue(","const numeric=","CONFIRMED_VERIFICATION=new Set(['hoy_verified'"]){if(requirements.includes(forbidden))throw new Error(`Lifestyle adapter re-implements Platform Core truth semantics: ${forbidden}`)}
const commercial=fs.readFileSync(path.join(root,"src/commercial-integrity.js"),"utf8");
if(!commercial.includes("core.sponsorshipState"))throw new Error("Lifestyle commercial adapter is not delegating to Platform Core");
const index=JSON.parse(fs.readFileSync(path.join(root,"data/lifestyle-catalog-index.json"),"utf8"));
const records=index.chunks.flatMap(chunk=>JSON.parse(fs.readFileSync(path.join(root,chunk.replace(/^\.\//,"")),"utf8")));
if(index.contractVersion!=="1.0.0")throw new Error("Unexpected catalog contract version");
if(records.length!==101||index.recordCount!==101)throw new Error(`Expected 101 records, found ${records.length}`);
if(new Set(records.map(r=>r.id)).size!==records.length)throw new Error("Duplicate catalog IDs");
if(new Set(records.map(r=>r.slug)).size!==records.length)throw new Error("Duplicate catalog slugs");
const bad=[];for(const row of records){const urls=[row.contact?.bookingUrl,row.geo?.mapUrl,...(row.trust?.sourceUrls||[])].filter(Boolean);urls.forEach(url=>{if(!String(url).startsWith("https://"))bad.push([row.id,url]);});}if(bad.length)throw new Error(`Non-HTTPS public URLs found: ${JSON.stringify(bad.slice(0,5))}`);
const sw=fs.readFileSync(path.join(root,"service-worker.js"),"utf8");if(!sw.includes('url.origin !== self.location.origin'))throw new Error("Service worker must enforce same-origin cache boundary");if(!sw.includes('/auth/')||!sw.includes('/rest/')||!sw.includes('/functions/'))throw new Error("Service worker API/auth exclusions missing");
const html=fs.readFileSync(path.join(root,"index.html"),"utf8");if(html.includes("navigator.geolocation.getCurrentPosition"))throw new Error("Geolocation must not be requested inline during initial HTML bootstrap");
const engine=fs.readFileSync(path.join(root,"src/decision-engine.js"),"utf8");if(!engine.includes('evaluateRequirements')||!engine.includes('MATCH_STATES.NO_MATCH'))throw new Error("Canonical MUST/PREFER requirement gate is not wired into ranking");
const parity=fs.readFileSync(path.join(root,"docs/VERTICAL_PARITY.md"),"utf8");for(const token of ["MUST / PREFER / IGNORE","Commercial integrity","HOY Platform Core","PARITY_CODE_COMPLETE"]){if(!parity.includes(token))throw new Error(`Parity contract missing: ${token}`)}
console.log(JSON.stringify({ok:true,records:records.length,p1:records.filter(r=>r.priority==="P1").length,suppressed:records.filter(r=>r.suppressed).length,chunks:index.chunks.length,checks:required.length,platformCore:lock.coreVersion,parity:"PARITY_CODE_COMPLETE"},null,2));
