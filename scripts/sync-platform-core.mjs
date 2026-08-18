import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root=process.cwd();
const lock=JSON.parse(fs.readFileSync(path.join(root,'platform-core.lock.json'),'utf8'));
const vendorPath=path.join(root,lock.vendorPath);

function gitBlobSha(content){
  const body=Buffer.from(content,'utf8');
  const header=Buffer.from(`blob ${body.length}\0`,'utf8');
  return crypto.createHash('sha1').update(Buffer.concat([header,body])).digest('hex');
}

function assertVendor(content){
  const sha=gitBlobSha(content);
  if(sha!==lock.gitBlobSha)throw new Error(`Platform Core vendor drift: expected ${lock.gitBlobSha}, got ${sha}`);
  if(!content.includes(`CORE_VERSION='${lock.coreVersion}'`))throw new Error('Platform Core version mismatch');
  if(!content.includes(`CONTRACT_VERSION='${lock.contractVersion}'`))throw new Error('Platform Core contract mismatch');
  return sha;
}

if(process.argv.includes('--check')){
  if(!fs.existsSync(vendorPath))throw new Error(`Missing vendored Platform Core: ${lock.vendorPath}`);
  const content=fs.readFileSync(vendorPath,'utf8');
  const sha=assertVendor(content);
  console.log(JSON.stringify({ok:true,coreVersion:lock.coreVersion,contractVersion:lock.contractVersion,gitBlobSha:sha},null,2));
  process.exit(0);
}

const url=`https://api.github.com/repos/${lock.sourceRepo}/contents/${lock.sourcePath}?ref=${lock.sourceCommit}`;
const response=await fetch(url,{headers:{'Accept':'application/vnd.github+json','User-Agent':'HOY-Platform-Core-Sync'}});
if(!response.ok)throw new Error(`Platform Core fetch failed: ${response.status}`);
const data=await response.json();
if(data.sha!==lock.gitBlobSha)throw new Error(`Pinned source blob mismatch: expected ${lock.gitBlobSha}, got ${data.sha}`);
const content=Buffer.from(String(data.content||'').replace(/\n/g,''),'base64').toString('utf8');
assertVendor(content);
fs.mkdirSync(path.dirname(vendorPath),{recursive:true});
fs.writeFileSync(vendorPath,content,'utf8');
console.log(`Synced HOY Platform Core ${lock.coreVersion} -> ${lock.vendorPath}`);
