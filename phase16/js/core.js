(function(){
'use strict';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const LS={get(k,d){try{const v=localStorage.getItem('amal_'+k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem('amal_'+k,JSON.stringify(v))}catch(e){}}};
const AR=n=>String(n).replace(/\d/g,d=>'٠١٢٣٤٥٦٧٨٩'[d]);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const norm=s=>s.replace(/[\u0617-\u061A\u064B-\u065F\u0670\u06D6-\u06ED\u0640]/g,'').replace(/[ٱأإآ]/g,'ا').replace(/ى/g,'ي').replace(/ة/g,'ه').replace(/\s+/g,' ').trim();
const IC={book:'<path d="M4 5c3-1 6-1 8 1 2-2 5-2 8-1v13c-3-1-6-1-8 1-2-2-5-2-8-1z"/><path d="M12 6v13"/>',scroll:'<path d="M7 4h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7"/><path d="M7 4a2 2 0 0 0-2 2v1h4V6a2 2 0 0 0-2-2z"/><path d="M9 10h6M9 14h6"/>',beads:'<circle cx="12" cy="5" r="1.6"/><circle cx="7" cy="8" r="1.6"/><circle cx="17" cy="8" r="1.6"/><circle cx="5.5" cy="13" r="1.6"/><circle cx="18.5" cy="13" r="1.6"/><circle cx="8" cy="18" r="1.6"/><circle cx="16" cy="18" r="1.6"/>',hands:'<path d="M12 21c-5-3-8-6-8-10 0-2 1-4 3-4 2 0 3 1 5 3 2-2 3-3 5-3 2 0 3 2 3 4 0 4-3 7-8 10z"/>',quiz:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.7"/><circle cx="12" cy="17" r=".6"/>',tafsir:'<path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z"/><path d="M8 8h7M8 12h7"/>',star:'<path d="M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.5 6.6 19.5l1.2-6L3.3 9.3l6.1-.7z"/>',image:'<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="10" r="1.6"/><path d="M4 18l5-5 4 4 3-3 4 4"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',compass:'<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',spark:'<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>',mosque:'<path d="M4 20v-7h16v7"/><path d="M7 13c0-3 2-5 5-7 3 2 5 4 5 7"/><path d="M12 3v3"/>',lib:'<path d="M5 4v16M10 4v16M15 5l4 15"/>',headset:'<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="3" y="14" width="4" height="6" rx="1"/><rect x="17" y="14" width="4" height="6" rx="1"/>'};
const icon=n=>`<svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${IC[n]||''}</svg>`;
const loaded={};
function loadScript(src,g){return new Promise((res,rej)=>{if(window[g])return res(window[g]);if(loaded[src])return loaded[src].then(()=>res(window[g]),rej);const p=loaded[src]=new Promise((a,b)=>{const s=document.createElement('script');s.src=src;s.onload=a;s.onerror=()=>{delete loaded[src];b(new Error('load '+src))};document.head.appendChild(s)});p.then(()=>res(window[g]),rej)})}
const needQ=()=>loadScript('data/quran.js','QURAN'), needR=()=>loadScript('data/reciters.js','RECITERS'), needT=()=>loadScript('data/tafsir-muyassar.js','TAFSIR_MUYASSAR');
function toast(m){const t=$('#toast');t.textContent=m;t.style.display='block';clearTimeout(toast.t);toast.t=setTimeout(()=>t.style.display='none',3200)}
async function copy(text){try{await navigator.clipboard.writeText(text)}catch(e){const a=document.createElement('textarea');a.value=text;document.body.appendChild(a);a.select();document.execCommand('copy');a.remove()}toast('تم النسخ ✓')}
async function share(text,url){if(navigator.share){try{await navigator.share({text,url});return}catch(e){if(e.name==='AbortError')return}}copy(text+(url?'\n'+url:''))}

/* ---------- share menu (WhatsApp / Facebook / system share / copy) ---------- */
const SITE_URL=()=>new URL('./',location.href).href;
function shareMenu(o){const url=o.url||SITE_URL();const t=String(o.text||'').trim();const txt=(t.length>900?t.slice(0,900).replace(/\s+\S*$/,'')+'…':t);const full=(txt?txt+'\n\n':'')+'اعمل لآخرتك: '+url;
 document.querySelectorAll('.shm').forEach(n=>n.remove());
 const d=document.createElement('div');d.className='shm';d.setAttribute('role','dialog');d.style.cssText='position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.6);display:flex;align-items:flex-end;justify-content:center';
 d.innerHTML='<div style="background:#1b1245;border:1px solid var(--gold,#e2c779);border-radius:14px 14px 0 0;padding:14px;width:min(520px,100%);max-height:85vh;overflow:auto;direction:rtl"><h3 style="margin:0 0 8px;color:var(--gold,#e2c779)">مشاركة</h3><div class="muted" style="white-space:pre-wrap;font-size:.85rem;max-height:20vh;overflow:auto;border:1px dashed rgba(226,199,121,.4);border-radius:8px;padding:6px"></div><div class="toolbar" style="flex-wrap:wrap;margin-top:10px"><button class="btn gold" data-m="n">مشاركة عبر الهاتف (اختر واتساب أو فيسبوك…)</button><button class="btn" data-m="w">واتساب (رسالة)</button><button class="btn" data-m="f">فيسبوك</button><button class="btn" data-m="c">نسخ النص والرابط</button><button class="btn sm" data-m="x">إغلاق</button></div><div class="muted" style="font-size:.78rem;margin-top:8px;line-height:1.7">حدود صريحة: الموقع لا يستطيع النشر وحده على حالة واتساب أو صفحة فيسبوك، أنت تختار المكان من قائمة المشاركة وتضغط نشر. رابط الموقع مكتوب في النص. فيسبوك يأخذ الرابط فقط، لذلك يُنسخ النص أولًا فألصقه في المنشور. إرفاق الصورة أو الفيديو يعتمد على هاتفك ومتصفحك.</div></div>';
 d.querySelector('.muted').textContent=full;document.body.appendChild(d);
 const close=()=>d.remove();d.onclick=async e=>{if(e.target===d){close();return}const b=e.target.closest('[data-m]');if(!b)return;const m=b.dataset.m;
  if(m==='x')close();
  else if(m==='c'){await copy(full)}
  else if(m==='w'){window.open('https://wa.me/?text='+encodeURIComponent(full),'_blank','noopener')}
  else if(m==='f'){await copy(full);toast('نُسخ النص. ألصقه في منشور فيسبوك');window.open('https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(url),'_blank','noopener')}
  else if(m==='n'){try{if(o.file){const f=await o.file();if(f&&navigator.canShare&&navigator.canShare({files:[f]})){await navigator.share({files:[f],text:full,title:o.title||'اعمل لآخرتك'});return}toast('هاتفك لا يدعم مشاركة هذا الملف مباشرة، سيُشارك النص والرابط فقط. نزّل الملف وأرفقه يدويًا.')}
    if(navigator.share){await navigator.share({title:o.title||'اعمل لآخرتك',text:full})}else toast('متصفحك لا يدعم مشاركة الهاتف المباشرة. استخدم واتساب أو فيسبوك أو النسخ.')}catch(err){if(err&&err.name!=='AbortError')toast('تعذرت المشاركة')}}};
 return d}
const shareBtn=(title,text,cls)=>`<button class="btn ${cls||'gold'}" type="button" data-shm-t="${esc(title)}" data-shm-x="${esc(text)}">مشاركة (واتساب / فيسبوك)</button>`;
window.shareMenu=shareMenu;window.shareBtn=shareBtn;
document.addEventListener('click',e=>{const b=e.target.closest('[data-shm-t]');if(b)shareMenu({title:b.dataset.shmT,text:b.dataset.shmX,url:location.href})});
/* ---------- shell ---------- */
const NAV=[['index.html','الرئيسية','home'],['allsections.html','جميع الأقسام','allsections']];
const SOON=[];
const SOON_PHASE={tafsir:4,prophets:4,seerah:4,companions:4,images:5,fiqh:5,'names-of-allah':5,library:5,salah:5,qibla:5};
document.body.insertAdjacentHTML('afterbegin',`
<header class="top"><div class="bar"><a class="logo" href="index.html">اعمل لآخرتك<small>طريقك للعلم والذكر والعمل الصالح</small></a>
<button class="btn" id="menuToggle" aria-label="القائمة">☰</button>
<nav class="menu" id="menu">${NAV.map(n=>`<a href="${n[0]}" data-p="${n[2]}">${n[1]}</a>`).join('')}</nav>
<div class="tools"><div class="searchbox"><input id="q" type="search" placeholder="🔍 ابحث في القرآن والسور" autocomplete="off"><div id="sres"></div></div>
<button class="btn" id="theme" title="الوضع الليلي/النهاري">🌙</button></div></div></header>
<main id="app"></main>
<footer id="foot"><div style="font-family:Amiri,serif;font-size:1.15rem;color:var(--gold2);margin:10px 0">هذا العمل صنع لوجه الله وابتغاء مرضاته ولا تنسونا من صالح دعائكم</div><div>إعداد: يوسف راضي</div><div class="muted" style="margin-top:8px">© اعمل لآخرتك — النص القرآني: مصحف المدينة (رواية حفص) عبر Al Quran Cloud، التفسير: التفسير الميسر (مجمع الملك فهد). التلاوات تُبثّ مباشرة من mp3quran.net. الأحاديث: Hadith API (sunnah.com). الأذكار: حصن المسلم.</div></footer>
<div id="toast"></div><div id="queue"></div>
<div id="player"><div class="in"><div class="art">🕌</div><div class="meta"><b id="pTitle">اختر سورة للاستماع</b><span id="pSub">—</span></div>
<div class="ctl"><button class="btn" id="pPrev" title="السورة السابقة">⏮</button><button class="btn gold" id="pPlay" title="تشغيل/إيقاف">▶</button><button class="btn" id="pNext" title="السورة التالية">⏭</button><button class="btn" id="pRestart" title="من البداية">↺</button><button class="btn" id="pDl" title="تنزيل هذه السورة بصوت القارئ إلى جهازك">⬇ تنزيل</button><button class="btn" id="pRep" title="وضع التشغيل: متتابع، تكرار السورة، تكرار الكل">🔁</button></div>
<div class="prog"><span id="pCur">0:00</span><input type="range" id="pSeek" min="0" max="1000" value="0"><span id="pDur">0:00</span></div>
<div class="ctl"><span>🔊</span><input class="vol" type="range" id="pVol" min="0" max="1" step=".05" value="1"><select class="field" id="pRate" style="min-width:0;padding:4px 6px"><option>0.75</option><option selected>1</option><option>1.25</option><option>1.5</option><option>2</option></select><button class="btn" id="pList">☰ القائمة</button></div></div></div>`);
const app=$('#app');
function applyTheme(){document.body.classList.toggle('light',LS.get('theme','dark')==='light');$('#theme').textContent=LS.get('theme','dark')==='light'?'🌙':'☀️'}
$('#theme').onclick=()=>{LS.set('theme',LS.get('theme','dark')==='light'?'dark':'light');applyTheme()};applyTheme();

/* ---------- user preferences (Settings) ---------- */
const RFONTS={amiri:"'Amiri',serif",sch:"'Scheherazade New',serif",naskh:"'Noto Naskh Arabic',serif"};
function applyPrefs(){const h=document.documentElement,ts=+LS.get('tsz',1)||1;h.style.fontSize=(ts*100)+'%';h.style.setProperty('--ts',ts);
 const rf=LS.get('rfont','');if(rf&&RFONTS[rf]){h.dataset.rf=rf;h.style.setProperty('--rf',RFONTS[rf])}else{delete h.dataset.rf;h.style.removeProperty('--rf')}
 const lh=LS.get('rlh','');if(lh){h.dataset.lh='1';h.style.setProperty('--lh',lh)}else{delete h.dataset.lh;h.style.removeProperty('--lh')}
 const rm=LS.get('rmot',null),on=rm===null?matchMedia('(prefers-reduced-motion: reduce)').matches:rm;if(on)h.dataset.rm='1';else delete h.dataset.rm}
window.applyPrefs=applyPrefs;applyPrefs();
let _wl=null;async function kaSync(){try{const want=LS.get('kawake',false)&&document.visibilityState==='visible'&&((typeof au!=='undefined'&&!au.paused)||document.querySelector('#rd'));
 if(want&&!_wl&&navigator.wakeLock){_wl=await navigator.wakeLock.request('screen');_wl.addEventListener('release',()=>{_wl=null})}else if(!want&&_wl){await _wl.release();_wl=null}}catch(e){_wl=null}}
window.kaSync=kaSync;document.addEventListener('visibilitychange',kaSync);
$('#menuToggle').onclick=()=>$('#menu').classList.toggle('open');
/* ---------- router (pages swap without reloading, so audio keeps playing) ---------- */
function parse(href){const u=new URL(href,location.href);const f=u.pathname.split('/').pop()||'index.html';const pg=f.replace('.html','')||'index';return{page:pg==='index'?'home':(Pages[pg]?pg:'home'),params:u.searchParams,hash:u.hash}}
const Pages={};
async function route(href,push){
 const r=parse(href); if(push)history.pushState(null,'',href);
 $$('#menu a').forEach(a=>a.classList.toggle('on',a.dataset.p===(r.page==='surah'?'quran':r.page)));$('#menu').classList.remove('open');
 app.innerHTML='<div class="notice">جارٍ التحميل…</div>';
 try{await Pages[r.page](r.params,r.hash)}catch(e){console.error(e);app.innerHTML=`<div class="notice">تعذر تحميل الصفحة: ${esc(e.message)}. تأكد من الاتصال بالإنترنت أو شغّل المشروع عبر Live Server.</div>`}
 if(!r.hash)scrollTo(0,0);
}
document.addEventListener('click',e=>{const a=e.target.closest('a[href]');if(!a||a.target||e.ctrlKey||e.metaKey||e.shiftKey)return;const h=a.getAttribute('href');if(/^(https?:|mailto:|#)/.test(h))return;if(!/\.html/.test(h))return;e.preventDefault();route(h,true)});
addEventListener('popstate',()=>route(location.href,false));
const crumbs=a=>`<div class="crumbs"><a href="index.html">الرئيسية</a>${a.map(x=>' › '+(x[1]?`<a href="${x[1]}">${x[0]}</a>`:x[0])).join('')}</div>`;

/* ---------- download surah audio straight from the official source (not hosted by us) ---------- */
let dlBusy=false;
async function dlAudio(u,name){if(dlBusy){toast('تنزيل آخر جارٍ، انتظر انتهاءه');return}dlBusy=true;
 const safe=name.replace(/[\\/:*?"<>|]+/g,' ').trim()+'.mp3';
 try{toast('بدأ التنزيل من المصدر… قد يستغرق وقتًا حسب حجم السورة');
  const r=await fetch(u);if(!r.ok)throw new Error('http '+r.status);
  const len=+r.headers.get('content-length')||0;let blob;
  if(r.body&&r.body.getReader&&len){const rd=r.body.getReader(),ch=[];let got=0,last=0;for(;;){const{done,value}=await rd.read();if(done)break;ch.push(value);got+=value.length;const pc=Math.floor(got/len*100);if(pc>=last+25){last=pc;toast('تم تنزيل '+AR(pc)+'٪')}}blob=new Blob(ch,{type:'audio/mpeg'})}
  else blob=await r.blob();
  const a=document.createElement('a'),bu=URL.createObjectURL(new Blob([blob],{type:'audio/mpeg'}));a.href=bu;a.download=safe;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(bu),60000);toast('تم التنزيل: '+safe+' ✓')}
 catch(e){toast('تعذر التنزيل المباشر داخل الموقع، سيُفتح رابط الملف من المصدر. اضغط مطولًا أو من قائمة المتصفح اختر حفظ.');window.open(u,'_blank','noopener')}
 finally{dlBusy=false}}
window.dlAudio=dlAudio;
/* ---------- audio ---------- */
const au=new Audio();au.preload='none';
const P={rec:LS.get('reciter','yasser-dosari'),s:LS.get('lastSurah',1),rep:LS.get('rep',0),q:null,R:null};
const fmt=t=>{if(!isFinite(t))return'0:00';t=Math.floor(t);const h=Math.floor(t/3600),m=Math.floor(t%3600/60),s=t%60;return(h?h+':'+String(m).padStart(2,'0'):m)+':'+String(s).padStart(2,'0')};
const recOf=k=>P.R.find(r=>r.key===k);
const url=(r,s)=>r.server+String(s).padStart(3,'0')+'.mp3';
/* verse timing: Quran.com chapter_recitations with segments (only reciters that the API has timing for) */
const RQC={'yasser-dosari':97,'mahmoud-husary':6,'abdulbasit-abdulsamad':2,'mishary-alafasy':7};const TMC={};
async function getTiming(key,s){const id=RQC[key];if(!id)return null;const k=id+'_'+s;if(TMC[k]!==undefined)return TMC[k];
 try{const r=await fetch(`https://api.quran.com/api/v4/chapter_recitations/${id}/${s}?segments=true`);if(!r.ok)throw 0;const j=(await r.json()).audio_file;if(!j||!j.timestamps||!j.timestamps.length||!j.audio_url)throw 0;return TMC[k]={url:j.audio_url.replace(/([^:])\/\//g,'$1/'),ts:j.timestamps.map(t=>({n:+t.verse_key.split(':')[1],f:t.timestamp_from,t:t.timestamp_to}))}}catch(e){return TMC[k]=null}}
P.tm=null;let curHl=0;
function hlClear(){document.querySelectorAll('.ay.hl').forEach(x=>x.classList.remove('hl'));curHl=0}
function hlUpdate(){if(!P.tm){return}const ms=au.currentTime*1000;const v=P.tm.ts.find(x=>ms>=x.f&&ms<x.t);const n=v?v.n:0;if(n===curHl)return;hlClear();curHl=n;if(!n)return;const rd=document.getElementById('rd');if(!rd||rd.dataset.s!=String(P.s))return;const el=document.getElementById('a'+n);if(el){el.classList.add('hl');const r=el.getBoundingClientRect();if(r.top<80||r.bottom>innerHeight-120)el.scrollIntoView({block:'center',behavior:'smooth'})}}
async function playSurah(s,key,start){if(au._rs){au.removeEventListener('loadedmetadata',au._rs);au._rs=null}
 [P.q,P.R]=await Promise.all([needQ(),needR()]);
 const r=recOf(key||P.rec);if(!r||!r.available.length){toast('هذا القارئ غير متاح حاليًا');return}
 if(!r.available.includes(s)){toast(`سورة ${P.q[s-1].name} غير متوفرة بصوت ${r.name} في المصدر. اختر قارئًا آخر.`);return}
 P.rec=r.key;P.s=s;LS.set('reciter',P.rec);LS.set('lastSurah',s);
 hlClear();P.tm=null;const tmg=await getTiming(r.key,s);
 if(P.s!==s||P.rec!==r.key)return;
 if(tmg){P.tm=tmg;au.src=tmg.url}else{au.src=url(r,s);if(RQC[r.key])toast('تعذر تحميل بيانات توقيت الآيات، سيعمل الصوت دون تمييز.')}
 au.playbackRate=+$('#pRate').value;
 if(start)au.addEventListener('loadedmetadata',function f(){au.currentTime=start;au.removeEventListener('loadedmetadata',f)});
 try{await au.play()}catch(e){if(e.name!=='AbortError')toast('تعذر تشغيل الملف الصوتي. تحقق من الاتصال.')}
 const h=LS.get('hist',[]);h.unshift({t:'listen',s,r:r.key,at:Date.now()});LS.set('hist',h.slice(0,50));
 meta();drawQueue();document.dispatchEvent(new CustomEvent('amal-play'));
}
function meta(){if(!P.q||!P.R)return;const r=recOf(P.rec);$('#pTitle').textContent='سورة '+P.q[P.s-1].name;$('#pSub').textContent=r?r.name:'';$('#pRep').textContent='التشغيل: '+['متتابع','تكرار سورة','تكرار الكل'][P.rep]}
function step(d){if(!P.R)return;const r=recOf(P.rec),av=r.available,i=av.indexOf(P.s),n=av[i+d];if(n)playSurah(n,P.rec);else if(P.rep===2||(d>0&&P.rep===2))playSurah(av[d>0?0:av.length-1],P.rec);else toast(d>0?'هذه آخر سورة متاحة':'هذه أول سورة متاحة')}
function drawQueue(){if(!P.R||!P.q)return;const r=recOf(P.rec);$('#queue').innerHTML=r.available.map(s=>`<div data-s="${s}" class="${s===P.s?'now':''}">${AR(s)}. ${P.q[s-1].name}</div>`).join('')}
$('#queue').onclick=e=>{const d=e.target.closest('[data-s]');if(d)playSurah(+d.dataset.s,P.rec)};
$('#pList').onclick=async()=>{await Promise.all([needQ(),needR()]).then(([q,r])=>{P.q=q;P.R=r});drawQueue();const q=$('#queue');q.style.display=q.style.display==='block'?'none':'block'};
$('#pPlay').onclick=()=>{if(au.src&&!P.tm&&RQC[P.rec]&&au.currentTime<1&&au.paused){playSurah(P.s,P.rec);return}if(!au.src){playSurah(P.s,P.rec);return}au.paused?au.play().catch(()=>toast('تعذر التشغيل')):au.pause()};
$('#pNext').onclick=async()=>{await Promise.all([needQ(),needR()]).then(([q,r])=>{P.q=q;P.R=r});step(1)};$('#pPrev').onclick=async()=>{await Promise.all([needQ(),needR()]).then(([q,r])=>{P.q=q;P.R=r});step(-1)};
$('#pDl').onclick=()=>{const r=recOf(P.rec);if(!r||!P.q){toast('اختر قارئًا وسورة أولًا');return}if(!r.available.includes(P.s)){toast('هذه السورة غير متوفرة لهذا القارئ');return}dlAudio(url(r,P.s),r.name+' - سورة '+P.q[P.s-1].name)};
$('#pRestart').onclick=()=>{if(au.src){au.currentTime=0;au.play()}else playSurah(P.s,P.rec)};
$('#pRep').onclick=()=>{P.rep=(P.rep+1)%3;LS.set('rep',P.rep);meta();$('#pRep').textContent='التشغيل: '+['متتابع','تكرار سورة','تكرار الكل'][P.rep]};
$('#pSeek').oninput=e=>{if(isFinite(au.duration))au.currentTime=au.duration*e.target.value/1000};
$('#pVol').value=LS.get('vol',1);au.volume=+$('#pVol').value;$('#pVol').oninput=e=>{au.volume=+e.target.value;LS.set('vol',au.volume)};
$('#pRate').onchange=e=>au.playbackRate=+e.target.value;
au.onplay=()=>$('#pPlay').textContent='⏸';au.onpause=()=>$('#pPlay').textContent='▶';
au.ontimeupdate=()=>{hlUpdate();$('#pCur').textContent=fmt(au.currentTime);$('#pDur').textContent=fmt(au.duration);if(isFinite(au.duration))$('#pSeek').value=au.currentTime/au.duration*1000;if(Math.floor(au.currentTime)%5===0)LS.set('lastTime',{s:P.s,r:P.rec,t:au.currentTime})};
au.onended=()=>{hlClear();if(P.rep===1){au.currentTime=0;au.play();return}const av=recOf(P.rec).available,nx=av.find(v=>v>P.s);if(nx&&LS.get('anext',true)){toast('الانتقال تلقائيًا إلى سورة '+P.q[nx-1].name);playSurah(nx,P.rec)}else if(!nx&&P.rep===2&&av.length)playSurah(av[0],P.rec)};
au.addEventListener('play',kaSync);au.addEventListener('pause',kaSync);au.addEventListener('ended',kaSync);{const pr=LS.get('prate',1),sel=$('#pRate');if(sel&&[...sel.options].some(o=>+o.value===+pr)){sel.value=pr;au.playbackRate=+pr}}
au.onerror=()=>{if(au.src)toast('تعذر تحميل الملف الصوتي لهذه السورة. جرّب قارئًا آخر أو أعد المحاولة.')};
Promise.all([needQ(),needR()]).then(([q,r])=>{P.q=q;P.R=r;const lt=LS.get('lastTime',null);if(!recOf(P.rec))P.rec='yasser-dosari';const rr=recOf(P.rec);if(rr&&rr.available.includes(P.s)){au.src=url(rr,P.s);if(lt&&lt.s===P.s&&lt.r===P.rec)au._rs=()=>{au.currentTime=lt.t};au.addEventListener('loadedmetadata',au._rs,{once:true})}meta();document.dispatchEvent(new CustomEvent('amal-ready'))}).catch(()=>{});
/* ---------- search ---------- */
let st;$('#q').oninput=e=>{clearTimeout(st);st=setTimeout(()=>doSearch(e.target.value),250)};
document.addEventListener('click',e=>{if(!e.target.closest('.searchbox'))$('#sres').style.display='none'});
async function doSearch(v){const box=$('#sres');v=norm(v);if(v.length<2){box.style.display='none';return}
 const Q=await needQ();let h='';let c=0;
 Q.forEach(s=>{if(norm(s.name).includes(v)||String(s.n)===v){h+=`<a href="surah.html?s=${s.n}">📖 سورة ${s.name} <span class="muted">(${AR(s.n)})</span></a>`}});
 for(const s of Q){for(let i=0;i<s.ayahs.length&&c<25;i++){if(norm(s.ayahs[i]).includes(v)){c++;h+=`<a href="surah.html?s=${s.n}&a=${i+1}#a${i+1}">${esc(s.ayahs[i].slice(0,80))}… <span class="muted">${s.name} ${AR(i+1)}</span></a>`}}if(c>=25)break}
 box.innerHTML=h||'<a>لا نتائج</a>';box.style.display='block'}
/* ---------- pages ---------- */
Pages.home=async()=>{const Q=await needQ();
 const day=Math.floor(Date.now()/864e5);
 const feat=[[2,255],[59,22],[112,1],[3,185],[94,5],[13,28],[65,3],[39,53],[19,64],[5,35]];const [fs,fa]=feat[day%feat.length];
 let N=null;try{N=await loadScript('data/hadith/nawawi-1.js','H_nawawi_1')}catch(e){}
 const hd=N&&N[day%N.length];const hs=hd?(hd[1].length>230?hd[1].slice(0,230)+'…':hd[1]):'';
 const sc=`<svg class="scene" viewBox="0 0 800 200" preserveAspectRatio="xMidYMax slice"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8c97a" stop-opacity=".9"/><stop offset="1" stop-color="#5b2a9e" stop-opacity=".9"/></linearGradient></defs><g fill="url(#g)"><path d="M120 200v-70q0-40 40-55 40 15 40 55v70z"/><path d="M135 75q25-45 50 0z"/><rect x="95" y="60" width="8" height="140"/><path d="M92 60l7-25 7 25z"/><rect x="215" y="70" width="8" height="130"/><path d="M212 70l7-25 7 25z"/><path d="M560 200v-80q0-45 50-60 50 15 50 60v80z"/><path d="M580 70q30-50 60 0z"/><rect x="520" y="55" width="9" height="145"/><path d="M517 55l8-28 8 28z"/><rect x="690" y="65" width="9" height="135"/><path d="M687 65l8-28 8 28z"/><path d="M330 200v-45q0-30 70-30t70 30v45z"/><path d="M370 125q30-40 60 0z"/></g><circle cx="690" cy="30" r="16" fill="#f6f1e6" opacity=".92"/><circle cx="698" cy="26" r="14" fill="#3b1f7a"/></svg>`;
 const tiles=[['quran.html','book','القرآن الكريم'],['hadith.html','scroll','الأحاديث النبوية'],['azkar.html','beads','الأذكار'],['duas.html','hands','الأدعية'],['quiz.html','quiz','الأسئلة الدينية'],['tafsir.html','tafsir','التفسير'],['prophets.html','star','الأنبياء'],['images.html','image','معرض الصور'],['wallpapers.html','image','مركز الخلفيات'],['scholars.html','scroll','سير العلماء'],['seerah.html','book','السيرة النبوية'],['companions.html','star','الصحابة'],['fiqh.html','mosque','الفقه والعبادات'],['radio.html','mosque','إذاعة القرآن الكريم (بث مباشر)']];
 const side=`<div class="sidec"><h4>التذكير اليومي</h4><div class="qt">﴿${esc(Q[fs-1].ayahs[fa-1])}﴾</div><div class="muted">${Q[fs-1].name}: ${AR(fa)}</div><div class="toolbar" style="justify-content:center"><a class="btn sm" href="surah.html?s=${fs}&a=${fa}#a${fa}">في السياق</a><button class="btn sm" id="cp">نسخ</button></div></div>
 <div class="sidec"><h4>حديث اليوم</h4>${hd?`<div class="qt" style="font-family:Amiri;font-size:1.05rem">${esc(hs)}</div><div class="muted">الأربعون النووية — حديث رقم ${AR(hd[0])}</div><a class="btn sm" href="hadith.html?c=nawawi">اقرأ المزيد</a>`:'<div class="muted">—</div>'}</div>
 <div class="sidec"><h4>الوصول السريع</h4><div class="qgrid"><a href="salah.html"><span>${icon('clock')}</span>مواقيت الصلاة</a><a href="qibla.html"><span>${icon('compass')}</span>اتجاه القبلة</a><a href="names-of-allah.html"><span>${icon('spark')}</span>الأسماء الحسنى</a><a href="library.html"><span>${icon('lib')}</span>المكتبة</a><a href="fiqh.html"><span>${icon('mosque')}</span>الفقه</a><a href="reciters.html"><span>${icon('headset')}</span>القرّاء</a></div></div>
 <div class="sidec"><h4>المفضلة</h4><div id="favs" class="muted"></div></div>`;
 app.innerHTML=`<section class="herob"><div class="stars"></div>${sc}<h1>اعمل لآخرتك</h1><p>طريقك للعلم والذكر والعمل الصالح</p><div class="verse">﴿${esc(Q[4].ayahs[0].length>0?Q[4].ayahs[34]:'')}﴾ <span class="muted" style="color:#e2c779">${Q[4].name}: ${AR(35)}</span></div><div class="toolbar" style="position:relative;justify-content:center"><a class="btn gold big" href="#sections" onclick="document.getElementById('sections').scrollIntoView({behavior:'smooth'});return false">ابدأ رحلتك الآن</a><a class="btn" href="quran.html">ابدأ القراءة</a><a class="btn primary" href="reciters.html">استمع للقرّاء</a><span id="cont"></span></div></section><div class="dash"><div class="mainc">
 
 ${window.AmalCats?AmalCats.home():`<div class="tiles" id="sections">${tiles.map(t=>`<a class="tile ${t[3]?'soon':''}" href="${t[0]}"><span class="ic">${icon(t[1])}</span>${t[2]}${t[3]?'<span class="tag">قريبًا</span>':''}</a>`).join('')}</div>`}
 <div class="panels">
  <div class="panel wide"><h3><a href="quran.html" class="btn sm">عرض الكل ›</a><span>القرآن الكريم</span></h3><div class="mini"><div class="sl">${Q.slice(0,6).map(s=>`<a href="surah.html?s=${s.n}"><span class="num" style="width:28px;height:28px"><span>${AR(s.n)}</span></span>${s.name}</a>`).join('')}</div><div class="page"><div style="color:#8a4fc0;font-weight:700">سورة ${Q[0].name}</div>${Q[0].ayahs.slice(0,7).map((t,i)=>esc(t)+' ﴿'+AR(i+1)+'﴾').join(' ')}<div class="toolbar" style="justify-content:center"><button class="btn gold sm" id="hp">استمع</button><a class="btn sm" href="surah.html?s=1">فتح السورة</a></div></div></div></div>
  <div class="panel"><h3><a href="hadith.html" class="btn sm">عرض الكل ›</a><span>الأحاديث النبوية</span></h3><div class="muted">${hd?esc(hs):''}</div><div class="toolbar"><a class="btn gold sm" href="hadith.html">تصفح الأحاديث</a></div></div>
  <div class="panel"><h3><a href="quiz.html" class="btn sm">عرض الكل ›</a><span>الأسئلة الدينية</span></h3><div>كم عدد سور القرآن الكريم؟</div><div class="qopt" id="hq">${['١١٢','١١٣','١١٤','١١٥'].map(o=>`<button class="btn" data-o="${o}">${o}</button>`).join('')}</div><div id="hqr" class="muted"></div><a class="btn primary sm" href="quiz.html">ابدأ اختبارًا</a></div>
  <div class="panel"><h3><span>معرض الصور الإسلامية</span></h3><div class="gal"><div>${icon('mosque')}</div><div>${icon('book')}</div><div>${icon('star')}</div><div>${icon('spark')}</div></div><div class="muted" style="margin-top:6px">يُبنى في المرحلة ٥ بصور مرخصة فقط.</div></div>
  <div class="panel"><h3><span>السيرة والصحابة والمكتبة</span></h3><div class="muted">السيرة والصحابة من أحاديث الصحيحين، والمكتبة فهرس بمصادر الموقع.</div><div class="toolbar"><a class="btn sm" href="prophets.html">الأنبياء</a><a class="btn sm" href="seerah.html">السيرة</a><a class="btn sm" href="companions.html">الصحابة</a><a class="btn sm" href="library.html">المكتبة</a></div></div>
 </div></div><div class="side">${side}</div></div>`;
 $('#cp').onclick=()=>copy(`﴿${Q[fs-1].ayahs[fa-1]}﴾ [سورة ${Q[fs-1].name}: ${AR(fa)}]`);
 $('#hp').onclick=()=>playSurah(1);
 $('#hq').onclick=e=>{const b=e.target.closest('[data-o]');if(!b)return;const ok=b.dataset.o==='١١٤';$('#hqr').textContent=ok?'✓ صحيح: ١١٤ سورة':'✗ الصحيح: ١١٤ سورة';b.style.background=ok?'rgba(110,193,228,.35)':'rgba(200,80,80,.35)'};
 const last=LS.get('last',null);if(last)$('#cont').innerHTML=`<a class="btn" href="surah.html?s=${last.s}&a=${last.a}#a${last.a}">تابع: ${Q[last.s-1].name} ${AR(last.a)}</a>`;
 const bm=LS.get('bm',[]);$('#favs').innerHTML=bm.length?bm.slice(0,4).map(k=>{const[s,a]=k.split(':').map(Number);return`<a href="surah.html?s=${s}&a=${a}#a${a}" style="display:block">${Q[s-1].name} ${AR(a)}</a>`}).join(''):'لا توجد عناصر بعد';};
Pages.soon=async(p)=>{const k=p.get('s');const x=SOON.find(z=>z[0]===k)||['','هذا القسم','🕌'];
 app.innerHTML=crumbs([[x[1]]])+`<div class="card" style="text-align:center;padding:40px"><div style="font-size:3rem">${x[2]}</div><h2 class="sec" style="justify-content:center">${x[1]}</h2><p class="muted">هذا القسم سيُبنى في المرحلة ${AR(SOON_PHASE[k]||'')} من خطة التنفيذ، بمحتوى موثّق من مصادر معتمدة فقط. لم نضع فيه محتوى تجريبيًا.</p><a class="btn gold" href="index.html">العودة للرئيسية</a></div>`};
Pages.quran=async()=>{const Q=await needQ();
 app.innerHTML=crumbs([['القرآن الكريم']])+`<h2 class="sec">القرآن الكريم — السور الـ١١٤</h2><div class="toolbar"><input class="field" id="sf" placeholder="ابحث عن سورة بالاسم أو الرقم"><select class="field" id="tf"><option value="">الكل</option><option>مكية</option><option>مدنية</option></select><span class="muted" id="cnt"></span><a class="btn sm gold" href="record.html">🎙️ سجّل تلاوتك بمؤثرات</a></div><div class="sgrid" id="sl"></div>`;
 const draw=()=>{const v=norm($('#sf').value),t=$('#tf').value;const L=Q.filter(s=>(!v||norm(s.name).includes(v)||String(s.n)===v)&&(!t||s.type===t));$('#cnt').textContent=AR(L.length)+' سورة';
  $('#sl').innerHTML=L.map(s=>`<div class="card"><span class="num"><span>${AR(s.n)}</span></span><div style="flex:1"><h3>${s.name}</h3><div class="muted">${s.type} · ${AR(s.count)} آية</div><div class="toolbar" style="margin:4px 0 0"><a class="btn sm" href="surah.html?s=${s.n}">فتح</a><button class="btn sm" data-listen="${s.n}">🎧 استماع</button></div></div></div>`).join('')||'<div class="notice">لا نتائج</div>'};
 $('#sf').oninput=draw;$('#tf').onchange=draw;draw();$('#sl').onclick=e=>{const b=e.target.closest('[data-listen]');if(b)playSurah(+b.dataset.listen)}};
Pages.surah=async(p,hash)=>{const[Q,R]=await Promise.all([needQ(),needR()]);P.q=Q;P.R=R;
 const n=Math.min(114,Math.max(1,+p.get('s')||1)),S=Q[n-1];let ta=null;
 let fs=LS.get('fs',2);const bm=new Set(LS.get('bm',[]));
 app.innerHTML=crumbs([['القرآن الكريم','quran.html'],['سورة '+S.name]])+`
 <div class="card" style="text-align:center"><h2 class="sec" style="justify-content:center;margin:0">سورة ${S.name}</h2><div class="muted">رقم ${AR(S.n)} · ${S.type} · ${AR(S.count)} آية · ${S.en}</div>
 <div class="toolbar" style="justify-content:center"><select class="field" id="rs">${R.map(r=>`<option value="${r.key}" ${r.key===P.rec?'selected':''} ${r.available.includes(n)?'':'disabled'}>${r.name}${r.available.includes(n)?'':' (غير متاح لهذه السورة)'}</option>`).join('')}</select>
 <button class="btn gold" id="lp">🎧 استمع للسورة</button><button class="btn" id="tt">التفسير الميسر</button><a class="btn" href="tafsir.html?s=${n}">تفاسير أخرى (السعدي، ابن كثير، الطبري)</a></div></div>
 <div class="toolbar"><a class="btn" href="${n>1?'surah.html?s='+(n-1):'#'}" ${n>1?'':'style="visibility:hidden"'}>→ السابقة</a><button class="btn" id="fm">أ−</button><button class="btn" id="fp">أ+</button>
 <input class="field" id="in" placeholder="بحث داخل السورة"><input class="field" id="go" type="number" min="1" max="${S.count}" placeholder="اذهب لآية" style="min-width:110px;width:110px"><span class="muted" id="hits"></span><span style="flex:1"></span><a class="btn" href="${n<114?'surah.html?s='+(n+1):'#'}" ${n<114?'':'style="visibility:hidden"'}>التالية ←</a></div>
 <div class="notice" id="syncn">تمييز الآية أثناء التلاوة يعمل مع: ياسر الدوسري، محمود الحصري، عبدالباسط عبدالصمد، مشاري العفاسي (بيانات التوقيت من Quran.com، وملف الصوت من مصدرهم). مع بقية القرّاء يعمل الصوت دون تمييز لأنه لا توجد بيانات توقيت موثقة لهم.</div>
 <div class="card reader" id="rd" data-s="${n}" style="--fs:${fs}rem">${n!==1&&n!==9?'<span class="bism">بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</span>':''}${S.ayahs.map((t,i)=>`<span class="ay" id="a${i+1}" data-a="${i+1}">${esc(t)} <span class="en">﴿${AR(i+1)}﴾</span></span>`).join(' ')}</div>`;
 const rd=$('#rd');
 const acts=a=>`<div class="ayactions open" id="act${a}"><button class="btn sm" data-c="copy">نسخ</button><button class="btn sm" data-c="share">مشاركة</button><button class="btn sm" data-c="bm">${bm.has(n+':'+a)?'إزالة العلامة ★':'علامة ☆'}</button><button class="btn sm" data-c="tf">تفسير</button><button class="btn sm" data-c="wbw">كلمة بكلمة</button><button class="btn sm" data-c="en">English</button><a class="btn sm" href="wallpapers.html?t=ayah&s=${n}&a=${a}">صورة للمشاركة</a><a class="btn sm" href="report.html?t=ayah&s=${n}&a=${a}">إبلاغ عن خطأ</a></div>`;
 rd.onclick=async e=>{const b=e.target.closest('[data-c]');const ay=e.target.closest('.ay');
  if(b){const a=+b.closest('.ayactions').dataset.a;const txt=`﴿${S.ayahs[a-1]}﴾ [سورة ${S.name}: ${AR(a)}]`;
   if(b.dataset.c==='copy')copy(txt);else if(b.dataset.c==='share'){share(txt,new URL(`surah.html?s=${n}&a=${a}#a${a}`,location.href).href)}
   else if(b.dataset.c==='bm'){const k=n+':'+a;bm.has(k)?bm.delete(k):bm.add(k);LS.set('bm',[...bm]);b.textContent=bm.has(k)?'إزالة العلامة ★':'علامة ☆'}
   else if(b.dataset.c==='tf'){await showTafsir(a)}else if(b.dataset.c==='wbw'){await showWbw(a)}else if(b.dataset.c==='en'){await showEn(a)}return}
  if(ay){const a=+ay.dataset.a;const ex=$('#act'+a);$$('.ayactions').forEach(x=>x.remove());$$('.ay').forEach(x=>x.classList.remove('cur'));if(ex)return;ay.classList.add('cur');ay.insertAdjacentHTML('afterend',acts(a));$('#act'+a).dataset.a=a;LS.set('last',{s:n,a})}};
 async function showTafsir(a){try{ta=ta||await needT()}catch(e){toast('تعذر تحميل التفسير');return}
  $$('.tafsir').forEach(x=>x.remove());const anchor=$('#act'+a)||$('#a'+a);anchor.insertAdjacentHTML('afterend',`<div class="tafsir"><small>التفسير الميسر — مجمع الملك فهد لطباعة المصحف الشريف (نص منقول، وليس شرحًا من المنصة)</small>${esc(ta[n-1][a-1])}</div>`)}
 const EN={};
 async function showEn(a){try{if(!EN.t){const r=await fetch(`https://api.alquran.cloud/v1/surah/${n}/en.sahih`);if(!r.ok)throw 0;EN.t=(await r.json()).data.ayahs.map(x=>x.text)}}catch(e){toast('تعذر تحميل الترجمة الإنجليزية، تحقق من الاتصال');return}
  $$('.tafsir').forEach(x=>x.remove());($('#act'+a)||$('#a'+a)).insertAdjacentHTML('afterend',`<div class="tafsir" dir="ltr" style="text-align:left"><small>Saheeh International translation (via api.alquran.cloud), shown as in the source. A translation, not the Quran itself.</small><br>${esc(EN.t[a-1])}</div>`)}
 async function showWbw(a){let j;try{const r=await fetch(`https://api.quran.com/api/v4/verses/by_key/${n}:${a}?words=true&word_fields=text_uthmani&language=en`);if(!r.ok)throw 0;j=(await r.json()).verse}catch(e){toast('تعذر تحميل معاني الكلمات، تحقق من الاتصال');return}
  $$('.tafsir').forEach(x=>x.remove());const ws=j.words.filter(w=>w.char_type_name==='word');($('#act'+a)||$('#a'+a)).insertAdjacentHTML('afterend',`<div class="tafsir" dir="ltr"><small>Word-by-word meanings (English) and transliteration from the Quran.com API, shown as in the source. Not available in Arabic.</small><div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:8px;flex-direction:row-reverse">${ws.map(w=>`<div class="card" style="padding:8px;text-align:center;min-width:90px"><div style="font-family:Amiri;font-size:1.5rem" dir="rtl">${esc(w.text_uthmani)}</div><div style="font-size:.8rem">${esc(w.translation.text)}</div><div class="muted" style="font-size:.75rem">${esc((w.transliteration&&w.transliteration.text)||'')}</div></div>`).join('')}</div></div>`)}
 $('#tt').onclick=async()=>{const a=(LS.get('last',{}).s===n?LS.get('last').a:1);await showTafsir(a);toast('اضغط على أي آية ثم «تفسير» لعرض تفسيرها')};
 $('#fm').onclick=()=>{fs=Math.max(1.2,fs-.2);LS.set('fs',fs);rd.style.setProperty('--fs',fs+'rem')};$('#fp').onclick=()=>{fs=Math.min(4,fs+.2);LS.set('fs',fs);rd.style.setProperty('--fs',fs+'rem')};
 $('#in').oninput=e=>{const v=norm(e.target.value);let c=0,first=null;$$('.ay',rd).forEach((el,i)=>{const h=v.length>1&&norm(S.ayahs[i]).includes(v);el.classList.toggle('hit',h);if(h){c++;first=first||el}});$('#hits').textContent=v.length>1?AR(c)+' نتيجة':'';if(first)first.scrollIntoView({block:'center'})};
 $('#go').onchange=e=>{const a=Math.min(S.count,Math.max(1,+e.target.value));const el=$('#a'+a);if(el){el.scrollIntoView({block:'center'});el.classList.add('hit');setTimeout(()=>el.classList.remove('hit'),2500)}};
 $('#rs').onchange=e=>{P.rec=e.target.value;LS.set('reciter',P.rec);toast('تم اختيار القارئ: '+recOf(P.rec).name);meta()};
 $('#lp').onclick=()=>playSurah(n,$('#rs').value);
 const h=hash&&hash.match(/^#a(\d+)/);const target=h?+h[1]:+p.get('a');if(target&&$('#a'+target)){const el=$('#a'+target);setTimeout(()=>{el.scrollIntoView({block:'center'});el.classList.add('hit');setTimeout(()=>el.classList.remove('hit'),3000)},50)}
 else{const l=LS.get('last',null);if(l&&l.s===n&&l.a>1&&$('#a'+l.a))$('#syncn').insertAdjacentHTML('beforebegin',`<div class="notice">آخر موضع قراءة محفوظ: الآية ${AR(l.a)} <a href="surah.html?s=${n}&a=${l.a}#a${l.a}">انتقل إليها</a></div>`)}
 const hs=LS.get('hist',[]);hs.unshift({t:'read',s:n,at:Date.now()});LS.set('hist',hs.slice(0,50))};
Pages.reciters=async()=>{const[Q,R,PH]=await Promise.all([needQ(),needR(),loadScript('data/photos.js','RPHOTO')]);P.q=Q;P.R=R;const fav=()=>LS.get('favrec',null);let cat='all',qs='';
 const cats=[['all','الكل'],['مرتل','مرتل'],['المصحف المجود','المصحف المجود'],['full','المصحف كاملًا (١١٤ سورة)'],['part','تسجيلات غير مكتملة'],['imam','أئمة الحرمين'],['vid','الشيخ محمد أحمد حسن (فيديو)'],['old','مدرسة التلاوة المصرية القديمة']];
 app.innerHTML=crumbs([['قرّاء القرآن الكريم']])+`<h2 class="sec">قرّاء القرآن الكريم</h2><div class="notice">التلاوات تُبثّ مباشرة من خوادم mp3quran.net، ومن way2quran.com لقارئين (الشحات محمد أنور ومحمد عبادة)، ولا نعيد استضافتها. فُحص كل رابط صوتي فعليًا قبل إدراجه، ولا يظهر قارئ إلا بسوره المتاحة فقط. التصنيف حسب نوع التسجيل كما تذكره المصادر (مرتل أو المصحف المجود). لم نضع نبذًا تعريفية غير موثقة. الصور من ويكيميديا كومنز بترخيص مفتوح أو ملكية عامة، ومكتوب تحت كل صورة صاحبها وترخيصها ورابط مصدرها. القرّاء الذين لم نجد لهم صورة بترخيص واضح تظهر لهم أول حرف من الاسم.</div>
 <div class="toolbar"><input class="field" id="rq" type="search" placeholder="ابحث باسم القارئ..." style="flex:1;min-width:200px"></div><div class="toolbar" id="rc">${cats.map(([k,t])=>`<button class="btn sm ${k==='all'?'gold':''}" data-c="${k}">${t}</button>`).join('')}</div><div class="muted" id="rn"></div><div class="grid" id="rg"></div><div id="rv"></div>`;
 const ini=n=>n.replace(/^(ال|عبد ال|عبد |أبو )/,m=>m==='عبد ال'?'ع':'').trim().charAt(0);
 const draw=()=>{const L=R.filter(r=>cat!=='vid'&&(cat==='all'||r.style===cat||(cat==='imam'&&r.grp==='imam')||(cat==='full'&&r.available.length===114)||(cat==='part'&&r.available.length<114))&&(!qs||norm(r.name).includes(norm(qs))));
  $('#rn').textContent=cat==='vid'?'':AR(L.length)+' من '+AR(R.length)+' قارئ';
  const HC=(cat==='all'||cat==='vid')&&(!qs||norm('الشيخ محمد أحمد حسن').includes(norm(qs)))?'<div class="card"><div style="display:flex;gap:10px;align-items:center"><div class="art" style="flex:none;width:48px;height:48px;border-radius:50%;display:grid;place-items:center;background:linear-gradient(135deg,var(--purple),var(--gold));color:#fff;font-family:Amiri;font-size:1.5rem" aria-hidden="true">م</div><h3 style="margin:0">الشيخ محمد أحمد حسن</h3></div><div class="muted">٥ تلاوات مرئية من قناة الأزهر الشريف الرسمية على يوتيوب، وتُشغَّل من مشغّل يوتيوب الرسمي (ليست ملفات صوت).</div><a class="btn sm gold" href="#rv" onclick="document.getElementById(\'rv\').scrollIntoView();return false">اذهب إلى تلاواته</a></div>':'';
  const HC2=(cat==='all'||cat==='vid')&&(!qs||norm('الشيخ محمد أيوب عاصف').includes(norm(qs)))?'<div class="card"><div style="display:flex;gap:10px;align-items:center"><div class="art" style="flex:none;width:48px;height:48px;border-radius:50%;display:grid;place-items:center;background:linear-gradient(135deg,var(--purple),var(--gold));color:#fff;font-family:Amiri;font-size:1.5rem" aria-hidden="true">م</div><h3 style="margin:0">الشيخ محمد أيوب عاصف</h3></div><div class="muted">١٠ تلاوات مرئية من قناته على يوتيوب، وتُشغَّل من مشغّل يوتيوب الرسمي (ليست ملفات صوت).</div><a class="btn sm gold" href="#rv" onclick="document.getElementById(\'rv\').scrollIntoView();return false">اذهب إلى تلاواته</a></div>':'';
  $('#rg').innerHTML=(HC?HC:'')+(HC2?HC2:'')+(L.length?L.map(r=>{const ok=r.available.length>0;return`<div class="card"><div style="display:flex;gap:10px;align-items:center">${PH[r.key]?`<img src="${PH[r.key].f}" alt="صورة ${esc(r.name)}" loading="lazy" width="56" height="56" style="flex:none;width:56px;height:56px;border-radius:50%;object-fit:cover;object-position:center top">`:`<div class="art" style="flex:none;width:48px;height:48px;border-radius:50%;display:grid;place-items:center;background:linear-gradient(135deg,var(--purple),var(--gold));color:#fff;font-family:Amiri;font-size:1.5rem" aria-hidden="true">${esc(r.name.charAt(0)==='ا'||r.name.charAt(0)==='أ'||r.name.charAt(0)==='إ'?r.name.charAt(0):r.name.charAt(0))}</div>`}<h3 style="margin:0">${esc(r.name)} ${fav()===r.key?'<span class="tag">المفضل</span>':''}</h3></div><div class="muted">${esc(r.riwaya)}<br>${AR(r.available.length)} من ١١٤ سورة متاحة${r.available.length<114?' (غير مكتملة)':''} · المصدر: ${esc(r.src||'mp3quran.net')}</div>${PH[r.key]?`<div class="muted" style="font-size:.75rem">صورة: ${esc(PH[r.key].by)} · ${esc(PH[r.key].lic)} · <a href="${PH[r.key].src}" target="_blank" rel="noopener">المصدر</a></div>`:''}<div class="toolbar"><select class="field" data-s="${r.key}" style="min-width:0;flex:1" aria-label="اختر السورة">${r.available.map(s=>`<option value="${s}" ${s===P.s?'selected':''}>${AR(s)}. ${Q[s-1].name}</option>`).join('')}</select></div><div class="toolbar"><button class="btn gold sm" data-l="${r.key}">🎧 استماع</button><button class="btn sm" data-f="${r.key}">${fav()===r.key?'★ المفضل':'☆ اجعله المفضل'}</button></div></div>`}).join(''):'<div class="notice">'+(cat==='vid'||HC?'':'لا يوجد قارئ بهذا الاسم.')+'</div>');};draw();
 loadScript('data/sheikhs.js','SHVID').then(V=>{const C=V.filter(x=>x.r);if(!C.length)return;const dv=()=>{const L=C.filter(x=>!qs||norm(x.a+' '+x.t).includes(norm(qs)));$('#rv').innerHTML=L.length&&(cat==='all'||cat==='vid')?`<h3 class="sec">تلاوات مرئية لقرّاء شباب <small class="muted">${AR(L.length)}</small></h3>`+[...new Set(L.map(x=>x.a))].map(au=>(au==='الشيخ محمد أيوب عاصف'?`<div class="notice">تلاوات الشيخ محمد أيوب عاصف منشورة على قناته على يوتيوب وتُعرض من مشغّل يوتيوب الرسمي. هي مقاطع فيديو كاملة لا ملفات صوت لكل سورة، لذلك لا تظهر في قائمة سور القرّاء.</div>`:`<div class="notice">تلاوات الشيخ محمد أحمد حسن (طالب أزهري، إمام التراويح بالجامع الأزهر) منشورة على قناة الأزهر الشريف الرسمية على يوتيوب وتُعرض من مشغّل يوتيوب الرسمي. هي مقاطع فيديو كاملة لا ملفات صوت لكل سورة، لذلك لا تظهر في قائمة سور القرّاء.</div>`)+L.filter(x=>x.a===au).map(x=>`<a class="card" style="display:block;margin:6px 0" href="sheikh.html?v=${x.v}"><b style="font-family:Amiri;font-size:1.05rem">${esc(x.t)}</b><div class="muted">${esc(x.a)} · المصدر: ${esc(x.c)} على يوتيوب</div></a>`).join('')).join(''):''};dv();const o=draw;$('#rq').addEventListener('input',dv);$('#rc').addEventListener('click',()=>setTimeout(dv,0))});
 $('#rq').oninput=e=>{qs=e.target.value.trim();draw()};
 $('#rc').onclick=e=>{const b=e.target.closest('[data-c]');if(!b)return;if(b.dataset.c==='old'){location.href='oldschool.html';return}cat=b.dataset.c;$$('#rc .btn').forEach(x=>x.classList.toggle('gold',x===b));draw()};
 $('#rg').onclick=e=>{const l=e.target.closest('[data-l]'),f=e.target.closest('[data-f]');
  if(l){const r=recOf(l.dataset.l);const sel=$('#rg select[data-s="'+r.key+'"]');playSurah(+sel.value,r.key)}
  if(f){LS.set('favrec',f.dataset.f);P.rec=f.dataset.f;LS.set('reciter',P.rec);draw();toast('تم حفظ القارئ المفضل')}}};
window.__amal={P,playSurah,au};window.AmalAPI={Pages,app,$,$$,LS,AR,esc,norm,loadScript,needQ,toast,copy,share,crumbs,route,icon};document.dispatchEvent(new Event('amal-api'));
if(window.AmalExtra)window.AmalExtra(window.AmalAPI);
if(LS.get('resume',false)&&parse(location.href).page==='home'&&!sessionStorage.getItem('amal_resumed')){sessionStorage.setItem('amal_resumed','1');const l=LS.get('last',null);if(l&&l.s&&l.a){const h=`surah.html?s=${l.s}&a=${l.a}#a${l.a}`;history.replaceState(null,'',h);route(location.href,false)}else route(location.href,false)}else{sessionStorage.setItem('amal_resumed','1');route(location.href,false)}
setTimeout(kaSync,1500);
})();
