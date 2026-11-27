/* Amal v53 preview: khatm plan, tasbeeh (inside Adhkar), verse + hadith of the day, home shortcuts. */
window.AmalExtra22=function(API){
const {Pages,app,$,LS,AR}=API;
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const css=document.createElement('style');css.textContent=`
.x22{border:1px solid var(--gold);border-radius:16px;background:var(--card);padding:14px 16px;margin:12px 0}
.x22 h3,.x22 h4{margin:0 0 8px;color:var(--gold2,#e2c779);font-family:Amiri,serif}
.x22 .chips{display:flex;gap:8px;flex-wrap:wrap;margin:8px 0}
.x22 .chip{border:1px solid var(--gold);background:transparent;color:inherit;border-radius:999px;padding:6px 14px;cursor:pointer;font:inherit}
.x22 .chip.on{background:var(--gold);color:#2d1a5a}
.x22 .bar{height:10px;border-radius:6px;background:rgba(255,255,255,.12);overflow:hidden;margin:8px 0}.x22 .bar i{display:block;height:100%;background:var(--gold)}
.x22 input[type=number]{width:90px;background:transparent;color:inherit;border:1px solid var(--gold);border-radius:10px;padding:6px;font:inherit}
.x22 .big{font-size:1.15rem;line-height:2}
.x22 table{width:100%;border-collapse:collapse;font-size:.9rem}.x22 td{padding:4px 6px;border-bottom:1px solid rgba(255,255,255,.1)}
.x22 tr.dn td{opacity:.55}
.tsbtn{display:block;margin:12px auto;width:200px;height:200px;border-radius:50%;border:4px solid var(--gold);background:radial-gradient(circle,rgba(226,199,121,.18),transparent 70%);color:inherit;font:700 3.4rem Cairo,sans-serif;cursor:pointer;-webkit-tap-highlight-color:transparent;user-select:none;touch-action:manipulation}
.tsbtn:active{transform:scale(.96)}.tsbtn.hit{background:var(--gold);color:#2d1a5a}
.tsd{font-family:Amiri,serif;font-size:1.5rem;text-align:center;margin:6px 0}
.qs22{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:12px 0}@media(min-width:720px){.qs22{grid-template-columns:repeat(4,1fr)}}
.qs22 a{border:1px solid var(--gold);border-radius:14px;padding:12px;text-align:center;background:var(--card);color:inherit;text-decoration:none;font-weight:700}
`;document.head.appendChild(css);
const today=()=>{const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')};
const dayNum=s=>{const a=s.split('-').map(Number),b=new Date(),x=new Date(a[0],a[1]-1,a[2]),y=new Date(b.getFullYear(),b.getMonth(),b.getDate());return Math.round((y-x)/864e5)+1};
const keepInPage=(fn)=>{const mo=new MutationObserver(()=>{if(!fn.present())fn.insert()});mo.observe(app,{childList:true});};

/* ---------- 1. khatm plan ---------- */
const _k=Pages.khatm;
Pages.khatm=async function(...a){const r=await _k.apply(this,a);try{
 const Q=await API.needQ();const N=Q.reduce((s,x)=>s+x.count,0);
 const loc=i=>{let r=i;for(const s of Q){if(r<s.count)return [s.n,r+1,s.name];r-=s.count}const l=Q[Q.length-1];return [l.n,l.count,l.name]};
 const rng=(d,D)=>{const f=Math.floor((d-1)*N/D),t=Math.floor(d*N/D)-1;return {f:loc(f),t:loc(t),n:t-f+1}};
 const get=()=>LS.get('khp',null);
 const card=document.createElement('div');card.id='kp22';card.className='x22';
 const render=()=>{const P=get();let h='';
  if(!P){h=`<h3>خطة الختم</h3><div class="muted">اختر عدد الأيام وسنقسّم القرآن عليها بالتساوي (حسب عدد الآيات ${AR(N)}). تُحفظ الخطة على جهازك فقط.</div><div class="chips">${[30,60,90,180].map(n=>`<button class="chip" data-d="${n}">${AR(n)} يوم</button>`).join('')}</div><div class="row" style="display:flex;gap:8px;align-items:center;flex-wrap:wrap"><span>أو عدد أيام آخر:</span><input type="number" id="kpd" min="1" max="365" value="45"><button class="btn gold sm" id="kpgo">ابدأ الخطة</button></div>`}
  else{const D=P.days,dn=dayNum(P.start),cur=Math.min(Math.max(dn,1),D),done=new Set(P.done||[]);const R=rng(cur,D);const pages=Math.round(604/D*10)/10;
   const missed=[];for(let d=1;d<cur;d++)if(!done.has(d))missed.push(d);
   h=`<h3>خطة الختم (${AR(D)} يوم)</h3>`+(dn>D?`<div class="muted">انتهت مدة الخطة (اليوم ${AR(dn)}).</div>`:'')+`<div class="big">اليوم ${AR(cur)} من ${AR(D)}: من سورة ${esc(R.f[2])} آية ${AR(R.f[1])} إلى سورة ${esc(R.t[2])} آية ${AR(R.t[1])}</div><div class="muted">حوالي ${AR(R.n)} آية، نحو ${AR(pages)} صفحة من المصحف (٦٠٤ صفحة)</div><div class="bar"><i style="width:${Math.round(done.size/D*100)}%"></i></div><div class="muted">أنجزت ${AR(done.size)} من ${AR(D)} يوم${missed.length?` · فاتك ${AR(missed.length)} يوم`:''}</div><div class="chips"><a class="btn gold sm" href="surah.html?s=${R.f[0]}&a=${R.f[1]}#a${R.f[1]}">ابدأ القراءة من هنا</a><button class="chip ${done.has(cur)?'on':''}" id="kpdone">${done.has(cur)?'✓ أنهيت ورد اليوم':'أنهيت ورد اليوم'}</button><button class="chip" id="kpnew">خطة جديدة</button></div>`+
   `<details><summary class="muted" style="cursor:pointer">جدول الأيام</summary><table>${Array.from({length:D},(_,i)=>{const q=rng(i+1,D);return `<tr class="${done.has(i+1)?'dn':''}"><td>${AR(i+1)}</td><td>${esc(q.f[2])} ${AR(q.f[1])} ← ${esc(q.t[2])} ${AR(q.t[1])}</td></tr>`}).join('')}</table></details>`}
  card.innerHTML=h;
  card.querySelectorAll('.chip[data-d]').forEach(b=>b.onclick=()=>start(+b.dataset.d));
  const go=card.querySelector('#kpgo');if(go)go.onclick=()=>{const v=Math.round(+card.querySelector('#kpd').value);if(v>=1&&v<=365)start(v)};
  const dd=card.querySelector('#kpdone');if(dd)dd.onclick=()=>{const P=get(),cur=Math.min(Math.max(dayNum(P.start),1),P.days);const s=new Set(P.done||[]);s.has(cur)?s.delete(cur):s.add(cur);P.done=[...s];LS.set('khp',P);render()};
  const nw=card.querySelector('#kpnew');if(nw)nw.onclick=()=>{if(confirm('حذف الخطة الحالية وبدء خطة جديدة؟')){LS.set('khp',null);render()}};
 };
 const start=D=>{LS.set('khp',{days:D,start:today(),done:[]});render()};
 const ins=()=>{const n=app.querySelector('.notice');if(n)n.insertAdjacentElement('afterend',card);else app.prepend(card)};
 render();ins();keepInPage({present:()=>app.contains(card),insert:ins});
}catch(e){console.error(e)}return r};

/* ---------- 2. tasbeeh inside Adhkar ---------- */
const TS=['سُبْحَانَ اللَّهِ','الْحَمْدُ لِلَّهِ','اللَّهُ أَكْبَرُ','لَا إِلَهَ إِلَّا اللَّهُ','أَسْتَغْفِرُ اللَّهَ','لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ','سُبْحَانَ اللَّهِ وَبِحَمْدِهِ','اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ','عدّاد حر'];
const _z=Pages.azkar;
Pages.azkar=async function(...a){const r=await _z.apply(this,a);try{
 const card=document.createElement('details');card.id='ts22';card.className='x22';if(location.hash==='#tasbeeh')card.open=true;
 const S=()=>{const s=LS.get('tsb',null)||{};s.c=s.c||{};s.sel=s.sel||TS[0];s.tg=s.tg===undefined?33:s.tg;return s};
 const ent=(s,k)=>{const e=s.c[k]||(s.c[k]={r:0,t:0,d:'',n:0});if(e.d!==today()){e.d=today();e.n=0}return e};
 const render=()=>{const s=S(),e=ent(s,s.sel),tg=s.tg;
  card.innerHTML=`<summary style="cursor:pointer"><h3 style="display:inline;margin:0">المسبحة الإلكترونية</h3> <span class="muted">· عدّاد محفوظ على جهازك</span></summary>
  <div class="chips">${TS.map((t,i)=>`<button class="chip ${t===s.sel?'on':''}" data-i="${i}">${esc(t)}</button>`).join('')}</div>
  <div class="tsd">${esc(s.sel)}</div>
  <button class="tsbtn ${tg&&e.r>=tg?'hit':''}" id="tsgo" aria-label="عدّ">${AR(e.r)}</button>
  <div class="muted" style="text-align:center">${tg?`الهدف: ${AR(tg)}${e.r>=tg?' · اكتمل':''} · `:''}اليوم: ${AR(e.n)} · الإجمالي: ${AR(e.t)}</div>
  <div class="chips" style="justify-content:center"><span class="muted">الهدف:</span>${[33,100,1000,0].map(g=>`<button class="chip ${g===tg?'on':''}" data-g="${g}">${g?AR(g):'بلا هدف'}</button>`).join('')}<button class="chip" id="tsrs">تصفير العدّاد</button></div>`;
  card.querySelectorAll('[data-i]').forEach(b=>b.onclick=()=>{const s=S();s.sel=TS[+b.dataset.i];LS.set('tsb',s);render()});
  card.querySelectorAll('[data-g]').forEach(b=>b.onclick=()=>{const s=S();s.tg=+b.dataset.g;LS.set('tsb',s);render()});
  card.querySelector('#tsrs').onclick=()=>{const s=S(),e=ent(s,s.sel);e.r=0;LS.set('tsb',s);render()};
  card.querySelector('#tsgo').onclick=()=>{const s=S(),e=ent(s,s.sel);e.r++;e.t++;e.n++;LS.set('tsb',s);try{if(navigator.vibrate)navigator.vibrate(s.tg&&e.r===s.tg?[80,50,80]:15)}catch(_){}
   const b=card.querySelector('#tsgo');b.textContent=AR(e.r);b.classList.toggle('hit',!!(s.tg&&e.r>=s.tg));
   const m=card.querySelectorAll('.muted')[1];if(m)m.textContent=`${s.tg?`الهدف: ${AR(s.tg)}${e.r>=s.tg?' · اكتمل':''} · `:''}اليوم: ${AR(e.n)} · الإجمالي: ${AR(e.t)}`}};
 render();
 const ins=()=>{const h=app.querySelector('h2');if(h)h.insertAdjacentElement('afterend',card);else app.prepend(card)};
 ins();keepInPage({present:()=>app.contains(card),insert:ins});
}catch(e){console.error(e)}return r};

/* ---------- 3. verse + hadith of the day, home shortcuts ---------- */
const VR=[[2,152],[2,153],[2,186],[2,255],[2,286],[3,139],[3,173],[3,185],[9,51],[13,28],[14,7],[16,97],[20,14],[29,69],[33,41],[39,10],[39,53],[40,60],[49,13],[51,56],[65,3],[93,5],[94,5],[94,6],[103,3],[8,46],[2,45],[7,56],[4,103],[57,4]];
const dayIdx=()=>{const d=new Date();return Math.floor(new Date(d.getFullYear(),d.getMonth(),d.getDate()).getTime()/864e5)};
const _h=Pages.home;
Pages.home=async function(...a){const r=await _h.apply(this,a);try{
 const Q=await API.needQ();const di=dayIdx();const [s,ay]=VR[di%VR.length];
 let hh='';try{const H=await (API.loadScript||window.loadScript)('data/hadith/nawawi-1.js','H_nawawi_1');const pool=H.filter(x=>x[1]&&x[1].length<=620);const h=pool[di%pool.length];
  hh=`<div class="x22" style="margin:0"><h4>حديث اليوم</h4><div style="font-family:Amiri,serif;font-size:1.2rem;line-height:2.1">${esc(h[1])}</div><a class="muted" href="hadith.html?c=nawawi">الأربعون النووية · حديث رقم ${AR(h[0])}</a></div>`}catch(e){console.error(e)}
 const box=document.createElement('div');box.id='dly22';box.className='hc'+(hh?' two':'');
 box.innerHTML=`<div class="x22" style="margin:0"><h4>آية اليوم</h4><div style="font-family:'Amiri Quran',Amiri,serif;font-size:1.4rem;line-height:2.2">﴿${esc(Q[s-1].ayahs[ay-1])}﴾</div><a class="muted" href="surah.html?s=${s}&a=${ay}#a${ay}">سورة ${esc(Q[s-1].name)} · آية ${AR(ay)}</a></div>`+hh;
 const qs=document.createElement('div');qs.className='qs22';qs.innerHTML=`<a href="azkar.html#tasbeeh">المسبحة</a><a href="khatm.html">خطة الختم</a><a href="qibla.html">اتجاه القبلة</a><a href="favorites.html">المفضلة</a>`;
 const rem=app.querySelector('#hcRem'),rc=rem&&rem.closest('.hc'),an=rc||app.querySelector('#sections');
 if(an){an.insertAdjacentElement('beforebegin',qs);qs.insertAdjacentElement('beforebegin',box)}else{app.appendChild(box);app.appendChild(qs)}
}catch(e){console.error(e)}return r};
};
