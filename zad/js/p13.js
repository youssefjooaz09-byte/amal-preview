/* Amal v39 preview: Cairo Quran Radio (official live stream of the Egyptian National Media Authority) */
window.AmalExtra13=function(API){
const {Pages,app,$,$$,crumbs,toast,copy}=API;
const STREAM='https://service.webvideocore.net/CL1olYogIrDWvwqiIKK7eCxOS4PStqG9DuEjAr2ZjZQtvS3d4y9r0cvRhvS17SGN/a_7a4vuubc6mo8.m3u8';
const OFFICIAL='https://misrquran.gov.eg/home',MASPERO='https://www.maspero.eg/stream/7@';
const NAME='إذاعة القرآن الكريم من القاهرة';
const css=`<style>
.rd{max-width:720px;margin:0 auto}
.rd .hero{position:relative;overflow:hidden;border:1px solid var(--gold);border-radius:28px;padding:26px 18px 22px;text-align:center;background:radial-gradient(120% 90% at 50% 0%,rgba(47,133,102,.55),rgba(12,35,28,.92) 70%);box-shadow:var(--shadow)}
.rd .hero:before{content:"";position:absolute;inset:0;opacity:.14;background:repeating-conic-gradient(from 0deg at 50% 38%,rgba(226,199,121,.9) 0 6deg,transparent 6deg 30deg);-webkit-mask:radial-gradient(circle at 50% 38%,#000 0,transparent 62%);mask:radial-gradient(circle at 50% 38%,#000 0,transparent 62%);pointer-events:none}
.rd .hero>*{position:relative}
.rd .tag{display:inline-flex;align-items:center;gap:8px;font-size:.85rem;color:#f6f1e6;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);border-radius:999px;padding:3px 14px}
.rd .dot{width:9px;height:9px;border-radius:50%;background:#8a8a99}.rd.on .dot{background:#ff4d4d;box-shadow:0 0 0 0 rgba(255,77,77,.7);animation:rdp 1.6s infinite}
@keyframes rdp{70%{box-shadow:0 0 0 10px rgba(255,77,77,0)}100%{box-shadow:0 0 0 0 rgba(255,77,77,0)}}
.rd h2{font-family:'Amiri',serif;font-size:clamp(1.7rem,5.5vw,2.5rem);margin:.5rem 0 .1rem;color:#f2dc9a;line-height:1.4}
.rd .sub{color:var(--muted);margin:0 0 6px}
.rd .stage{position:relative;width:170px;height:170px;margin:12px auto}
.rd .ring{position:absolute;inset:0;border-radius:50%;border:2px solid rgba(226,199,121,.45)}
.rd.on .ring{animation:rdr 2.4s ease-out infinite}.rd.on .ring.r2{animation-delay:1.2s}
@keyframes rdr{0%{transform:scale(.62);opacity:.9}100%{transform:scale(1.12);opacity:0}}
.rd .big{position:absolute;inset:26px;border-radius:50%;border:2px solid var(--gold);background:linear-gradient(160deg,#4aa383,#3c1c6e);color:#fff;font-size:2.4rem;cursor:pointer;display:grid;place-items:center;box-shadow:0 8px 28px rgba(0,0,0,.45),inset 0 0 18px rgba(255,255,255,.12);transition:transform .15s}
.rd .big:hover{transform:scale(1.05)}.rd .big:active{transform:scale(.97)}
.rd .eq{display:flex;gap:4px;align-items:flex-end;justify-content:center;height:34px;margin:2px 0 4px}
.rd .eq i{width:5px;height:6px;border-radius:3px;background:linear-gradient(#f2dc9a,#c9a54b);transition:height .3s}
.rd.on .eq i{animation:rde 1s ease-in-out infinite}
.rd .eq i:nth-child(2n){animation-duration:.8s}.rd .eq i:nth-child(3n){animation-duration:1.2s}.rd .eq i:nth-child(4n){animation-delay:.2s}.rd .eq i:nth-child(5n){animation-delay:.4s}
@keyframes rde{0%,100%{height:6px}50%{height:30px}}
.rd .st{min-height:1.7em;color:#f6f1e6;font-weight:700}
.rd .tm{color:var(--muted);font-size:.85rem;min-height:1.3em}
.rd .vol{display:flex;align-items:center;gap:10px;justify-content:center;margin:12px auto 4px;max-width:340px}
.rd .vol input{flex:1}
.rd .box{margin-top:14px;border:1px solid var(--cardb);border-radius:20px;padding:14px;background:var(--card)}
.rd .box h3{margin:0 0 8px;font-size:1.02rem;color:var(--gold)}
.rd .chips{display:flex;flex-wrap:wrap;gap:8px;justify-content:center}
.rd .chip{border:1px solid var(--gold);background:transparent;color:inherit;border-radius:999px;padding:5px 14px;font:inherit;font-size:.9rem;cursor:pointer}
.rd .chip.act{background:linear-gradient(135deg,#c9a54b,#e2c779);color:#241a44;font-weight:700}
.rd .acts{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:14px}
.rd .src{font-size:.86rem;color:var(--muted);line-height:1.9;text-align:center}
.rd .err{color:#ffb4ab}
@media(prefers-reduced-motion:reduce){.rd *{animation:none!important}}
</style>`;
const KEY='amal_radio_vol';
Pages.radio=async()=>{
 app.innerHTML=crumbs([['إذاعة القرآن الكريم من القاهرة']])+css+`<div class="rd" id="rd">
 <div class="hero"><span class="tag"><span class="dot"></span><span id="rtag">بث مباشر</span></span>
  <h2>${NAME}</h2><p class="sub">من الهيئة الوطنية للإعلام</p>
  <div class="stage"><span class="ring"></span><span class="ring r2"></span><button class="big" id="rbtn" type="button" aria-label="تشغيل">▶</button></div>
  <div class="eq" aria-hidden="true">${'<i></i>'.repeat(15)}</div>
  <div class="st" id="rst" role="status" aria-live="polite">اضغط للاستماع</div><div class="tm" id="rtm"></div>
  <div class="vol"><span aria-hidden="true">🔈</span><input type="range" id="rvol" min="0" max="1" step="0.05" aria-label="مستوى الصوت"><span aria-hidden="true">🔊</span></div>
  <audio id="ra" preload="none" playsinline></audio></div>
 <div class="box"><h3>مؤقّت النوم</h3><div class="chips" id="rsl"></div><div class="tm" id="rslt" style="text-align:center;margin-top:6px"></div></div>
 <div class="acts"><button class="btn" id="rshare" type="button">مشاركة الصفحة</button><a class="btn" href="${OFFICIAL}" target="_blank" rel="noopener">الموقع الرسمي للإذاعة</a><a class="btn" href="${MASPERO}" target="_blank" rel="noopener">صفحة الإذاعة في ماسبيرو</a></div>
 <p class="src">البث يُشغَّل مباشرة من خادم الإذاعة الرسمية (الهيئة الوطنية للإعلام، ماسبيرو). لا يُنسخ الصوت ولا يُعاد استضافته في هذا الموقع.</p></div>`;
 const R=$('#rd'),a=$('#ra'),b=$('#rbtn'),st=$('#rst'),tm=$('#rtm'),tag=$('#rtag'),vol=$('#rvol');
 let hls=null,started=false,t0=0,tick=null,sleepEnd=0,sleepT=null,sleepTick=null,retry=0;
 const site=()=>window.__amal&&window.__amal.au;
 const savedVol=parseFloat(localStorage.getItem(KEY));vol.value=a.volume=isNaN(savedVol)?1:savedVol;
 const fmt=s=>{s=Math.floor(s);const m=Math.floor(s/60),h=Math.floor(m/60);const p=n=>String(n).padStart(2,'0');return (h?p(h)+':':'')+p(m%60)+':'+p(s%60)};
 const ui=(txt,playing,isErr)=>{st.textContent=txt;st.classList.toggle('err',!!isErr);b.textContent=playing?'❚❚':'▶';b.setAttribute('aria-label',playing?'إيقاف':'تشغيل');R.classList.toggle('on',playing);tag.textContent=playing?'مباشر الآن':'بث مباشر';
  clearInterval(tick);if(playing){t0=t0||Date.now();tick=setInterval(()=>tm.textContent='مدة الاستماع '+fmt((Date.now()-t0)/1000),1000)}else if(!started)tm.textContent=''};
 const fail=(m)=>{ui(m||'تعذّر تشغيل البث الآن. جرّب مرة أخرى أو استمع من الموقع الرسمي للإذاعة.',false,true);try{hls&&hls.destroy()}catch(_){}hls=null;started=false;t0=0};
 const loadHls=()=>new Promise((res,rej)=>{if(window.Hls)return res();const s=document.createElement('script');s.src='vendor/hls.min.js';s.onload=res;s.onerror=rej;document.head.appendChild(s)});
 const pauseSite=()=>{try{const s=site();if(s&&!s.paused)s.pause()}catch(_){}};
 const start=async()=>{ui('جارٍ الاتصال بالبث…',false);pauseSite();
  try{
   if(a.canPlayType('application/vnd.apple.mpegurl')&&!(window.MediaSource&&/Chrome|Android/.test(navigator.userAgent))){a.src=STREAM}
   else{await loadHls();if(!window.Hls||!Hls.isSupported())throw 0;hls=new Hls({lowLatencyMode:false,liveSyncDurationCount:3});
    hls.on(Hls.Events.ERROR,(e,d)=>{if(!d.fatal)return;if(d.type===Hls.ErrorTypes.NETWORK_ERROR&&retry<4){retry++;st.textContent='انقطع الاتصال، جارٍ إعادة المحاولة…';setTimeout(()=>hls&&hls.startLoad(),1500*retry)}else if(d.type===Hls.ErrorTypes.MEDIA_ERROR&&retry<4){retry++;hls.recoverMediaError()}else fail()});
    hls.loadSource(STREAM);hls.attachMedia(a)}
   started=true;await a.play();
  }catch(e){fail()}};
 const toggle=()=>{if(!started)return start();if(a.paused){pauseSite();if(hls){hls.startLoad(-1)}a.play().catch(()=>fail())}else a.pause()};
 b.onclick=toggle;
 a.addEventListener('playing',()=>{retry=0;ui('يعمل الآن',true)});
 a.addEventListener('pause',()=>{if(started){ui('متوقف مؤقتًا',false);tm.textContent=''}if(hls)hls.stopLoad()});
 a.addEventListener('waiting',()=>{if(!a.paused)st.textContent='جارٍ التحميل…'});
 a.addEventListener('error',()=>{if(started&&!hls)fail()});
 vol.oninput=e=>{a.volume=+e.target.value;localStorage.setItem(KEY,e.target.value)};
 // pause the radio if the site's own player starts
 const s=site();if(s)s.addEventListener('play',()=>{if(!a.paused)a.pause()});
 // sleep timer
 const SL=[[0,'بدون'],[15,'١٥ دقيقة'],[30,'٣٠ دقيقة'],[45,'٤٥ دقيقة'],[60,'ساعة'],[90,'ساعة ونصف']];
 const sl=$('#rsl'),slt=$('#rslt');
 sl.innerHTML=SL.map(x=>`<button class="chip${x[0]?'':' act'}" type="button" data-m="${x[0]}">${x[1]}</button>`).join('');
 const setSleep=m=>{clearTimeout(sleepT);clearInterval(sleepTick);sleepEnd=0;slt.textContent='';
  $$('#rsl .chip').forEach(c=>c.classList.toggle('act',+c.dataset.m===m));
  if(!m)return;sleepEnd=Date.now()+m*60000;
  const upd=()=>{const left=Math.max(0,sleepEnd-Date.now());slt.textContent='سيتوقف البث بعد '+fmt(left/1000)};upd();sleepTick=setInterval(upd,1000);
  sleepT=setTimeout(()=>{a.pause();clearInterval(sleepTick);slt.textContent='توقف البث بمؤقّت النوم';$$('#rsl .chip').forEach(c=>c.classList.toggle('act',c.dataset.m==='0'))},m*60000);
  toast('تم ضبط مؤقّت النوم')};
 sl.onclick=e=>{const c=e.target.closest('.chip');if(c)setSleep(+c.dataset.m)};
 // share
 $('#rshare').onclick=async()=>{const u=location.href.split('#')[0];try{if(navigator.share)await navigator.share({title:NAME,url:u});else{await copy(u);toast('تم نسخ الرابط')}}catch(_){}};
 // media session (lock screen / headset keys)
 try{if('mediaSession' in navigator){navigator.mediaSession.metadata=new MediaMetadata({title:NAME,artist:'بث مباشر'});navigator.mediaSession.setActionHandler('play',()=>{if(a.paused)toggle()});navigator.mediaSession.setActionHandler('pause',()=>a.pause())}}catch(_){}
 // space key toggles when not typing
 document.addEventListener('keydown',e=>{if(e.code==='Space'&&!/INPUT|TEXTAREA|BUTTON|A|SELECT/.test((e.target.tagName||''))&&$('#rbtn')){e.preventDefault();toggle()}});
};
};
