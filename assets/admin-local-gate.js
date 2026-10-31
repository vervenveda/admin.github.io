(()=>{'use strict';
const KEY='VNV_ADMIN_GATE_RECORD_V2',SESSION='VNV_ADMIN_GATE_SESSION_V2',ITERATIONS=120000,$=id=>document.getElementById(id);
const enc=new TextEncoder(),clean=s=>String(s||'').replace(/\D/g,'').slice(0,10),valid=s=>/^[0-9]{10}$/.test(s);
const b64=a=>btoa(String.fromCharCode(...a)),unb64=s=>Uint8Array.from(atob(s),c=>c.charCodeAt(0));
async function derive(code,salt){const k=await crypto.subtle.importKey('raw',enc.encode(code),'PBKDF2',false,['deriveBits']);return new Uint8Array(await crypto.subtle.deriveBits({name:'PBKDF2',salt,iterations:ITERATIONS,hash:'SHA-256'},k,256))}
function record(){try{return JSON.parse(localStorage.getItem(KEY)||'null')}catch{return null}}
async function verify(code){const r=record();if(!valid(code)||!r?.salt||!r?.hash)return false;try{const a=await derive(code,unb64(r.salt)),b=unb64(r.hash);if(a.length!==b.length)return false;let diff=0;for(let i=0;i<a.length;i++)diff|=a[i]^b[i];return diff===0}catch{return false}}
async function save(code){const salt=crypto.getRandomValues(new Uint8Array(16));localStorage.setItem(KEY,JSON.stringify({version:2,algorithm:'PBKDF2-SHA256',iterations:ITERATIONS,salt:b64(salt),hash:b64(await derive(code,salt)),changedAt:new Date().toISOString()}))}
function unlock(yes){if(yes)sessionStorage.setItem(SESSION,JSON.stringify({unlocked:true,at:new Date().toISOString()}));else sessionStorage.removeItem(SESSION);render()}
function isOpen(){try{return JSON.parse(sessionStorage.getItem(SESSION)||'null')?.unlocked===true}catch{return false}}
function render(){const open=isOpen();$('workspace').hidden=!open;$('gate').hidden=open;$('lock').hidden=!open;$('change').hidden=!open;if(!open){$('code').value='';$('status').textContent='';$('code').focus()}}
for(const id of ['code','current','next','confirm'])$(id).addEventListener('input',e=>e.target.value=clean(e.target.value));
$('show').addEventListener('click',()=>{const el=$('code'),visible=el.type==='password';el.type=visible?'text':'password';$('show').textContent=visible?'Hide':'Show';$('show').setAttribute('aria-pressed',String(visible))});
$('gateForm').addEventListener('submit',async e=>{e.preventDefault();const code=clean($('code').value),status=$('status');if(!valid(code)){status.textContent='Enter exactly 10 digits.';return}try{if(!record()){status.textContent='Creating this browser’s local gate…';await save(code);unlock(true);return}status.textContent='Verifying local gate…';if(await verify(code))unlock(true);else{status.textContent='That code was not accepted.';$('code').select()}}catch{status.textContent='Local storage or cryptography unavailable. The gate cannot open.'}});
$('lock').addEventListener('click',()=>unlock(false));
$('change').addEventListener('click',()=>{$('changePanel').hidden=false;$('current').focus()});
$('cancelChange').addEventListener('click',()=>{$('changePanel').hidden=true;$('changeStatus').textContent=''});
$('changeForm').addEventListener('submit',async e=>{e.preventDefault();const cur=clean($('current').value),next=clean($('next').value),confirm=clean($('confirm').value),s=$('changeStatus');if(!valid(cur)||!valid(next)||next!==confirm){s.textContent='Check that all codes are 10 digits and new codes match.';return}if(!(await verify(cur))){s.textContent='Current code not accepted.';return}try{await save(next);s.textContent='New local code saved.';$('changeForm').reset();$('changePanel').hidden=true}catch{s.textContent='Could not save local code.'}});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!$('changePanel').hidden)$('cancelChange').click()});
render();
})();