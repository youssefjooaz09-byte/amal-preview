/* Amal v39 preview: Cairo Quran Radio (official live stream of the Egyptian National Media Authority) */
window.AmalExtra13=function(API){
const {Pages,app,$,AR,crumbs}=API;
const STREAM='https://service.webvideocore.net/CL1olYogIrDWvwqiIKK7eCxOS4PStqG9DuEjAr2ZjZQtvS3d4y9r0cvRhvS17SGN/a_7a4vuubc6mo8.m3u8';
const OFFICIAL='https://misrquran.gov.eg/home';
const css=`<style>.rd{max-width:640px;margin:0 auto;text-align:center}.rd .card{padding:22px 16px}.rd h2{margin:.2em 0}.rd .big{width:92px;height:92px;border-radius:50%;border:2px solid var(--gold);background:linear-gradient(160deg,#7a45c4,#3c1c6e);color:#fff;font-size:2.2rem;cursor:pointer;margin:14px auto;display:grid;place-items:center}.rd .big:hover{box-shadow:0 0 22px rgba(226,199,121,.5)}.rd .st{min-height:1.6em;color:var(--muted)}.rd .live{display:inline-block;padding:2px 12px;border-radius:999px;background:#b3261e;color:#fff;font-size:.8rem;margin-inline-start:6px}.rd .src{font-size:.88rem;color:var(--muted);margin-top:14px;line-height:1.9}.rd .vol{display:flex;align-items:center;gap:10px;justify-content:center;margin:8px 0}.rd .vol input{width:min(240px,60vw)}</style>`;
Pages.radio=async()=>{
 app.innerHTML=crumbs([['إذاعة القرآن الكريم من القاهرة']])+css+`<div class="rd"><div class="panel card"><div class="muted">بث مباشر</div><h2>إذاعة القرآن الكريم من القاهرة <span class="live" id="rlive" hidden>مباشر</span></h2>
 <button class="big" id="rbtn" type="button" aria-label="تشغيل">▶</button><div class="st" id="rst" role="status" aria-live="polite">اضغط للاستماع</div>
 <div class="vol"><span>🔈</span><input type="range" id="rvol" min="0" max="1" step="0.05" value="1" aria-label="مستوى الصوت"><span>🔊</span></div>
 <audio id="ra" preload="none" playsinline></audio>
 <div class="src">البث من الموقع الرسمي للإذاعة (الهيئة الوطنية للإعلام، ماسبيرو). لا يُنسخ الصوت ولا يُعاد استضافته في الموقع، بل يُشغَّل مباشرة من خادم الإذاعة.<br><a class="btn sm" href="${OFFICIAL}" target="_blank" rel="noopener">الموقع الرسمي للإذاعة</a></div></div></div>`;
 const a=$('#ra'),b=$('#rbtn'),st=$('#rst'),lv=$('#rlive');let hls=null,started=false;
 const ui=(txt,playing)=>{st.textContent=txt;b.textContent=playing?'❚❚':'▶';b.setAttribute('aria-label',playing?'إيقاف':'تشغيل');lv.hidden=!playing};
 const fail=()=>{ui('تعذّر تشغيل البث الآن. جرّب مرة أخرى أو استمع من الموقع الرسمي للإذاعة.',false);try{hls&&hls.destroy()}catch(_){}hls=null;started=false};
 const loadHls=()=>new Promise((res,rej)=>{if(window.Hls)return res();const s=document.createElement('script');s.src='vendor/hls.min.js';s.onload=res;s.onerror=rej;document.head.appendChild(s)});
 const start=async()=>{ui('جارٍ الاتصال بالبث…',false);
  try{
   if(a.canPlayType('application/vnd.apple.mpegurl')&&!(window.MediaSource&&/Chrome|Android/.test(navigator.userAgent))){a.src=STREAM}
   else{await loadHls();if(!window.Hls||!Hls.isSupported())throw 0;hls=new Hls({lowLatencyMode:false,liveSyncDurationCount:3});hls.on(Hls.Events.ERROR,(e,d)=>{if(d.fatal){if(d.type===Hls.ErrorTypes.NETWORK_ERROR&&started&&hls){hls.startLoad()}else fail()}});hls.loadSource(STREAM);hls.attachMedia(a)}
   started=true;await a.play();
  }catch(e){fail()}};
 b.onclick=()=>{if(!started)return start();if(a.paused){if(hls)hls.startLoad();a.play().catch(fail)}else{a.pause()}};
 a.addEventListener('playing',()=>ui('يعمل الآن',true));
 a.addEventListener('pause',()=>{if(started)ui('متوقف مؤقتًا',false);if(hls)hls.stopLoad()});
 a.addEventListener('waiting',()=>{if(!a.paused)st.textContent='جارٍ التحميل…'});
 a.addEventListener('error',()=>{if(started&&!hls)fail()});
 $('#rvol').oninput=e=>{a.volume=+e.target.value};
 try{if('mediaSession' in navigator)navigator.mediaSession.metadata=new MediaMetadata({title:'إذاعة القرآن الكريم من القاهرة',artist:'بث مباشر'})}catch(_){}
};
};
