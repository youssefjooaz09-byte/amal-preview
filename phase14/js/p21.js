/* Amal v51 preview: (1) audio player hidden until something plays, (2) "continue where you left off" card on home, (3) one-tap prayer reminder card on home. */
window.AmalExtra21=function(API){
const {Pages,app,$,LS,AR}=API;
const css=document.createElement('style');css.textContent=`body:not(.pl-on) #player{display:none!important}body:not(.pl-on){padding-bottom:24px}@media(max-width:800px){body:not(.pl-on){padding-bottom:80px!important}}
#player .pclose{background:rgba(255,255,255,.1);color:#fff;border:0;border-radius:10px;padding:3px 9px;cursor:pointer;font:inherit}
.hc{display:grid;gap:10px;grid-template-columns:1fr;margin:14px 0}@media(min-width:720px){.hc.two{grid-template-columns:1fr 1fr}}
.hc .c{border:1px solid var(--gold);border-radius:16px;background:var(--card);padding:14px 16px;display:flex;flex-direction:column;gap:8px}
.hc .c h4{margin:0;color:var(--gold2,#e2c779);font-family:Amiri,serif;font-size:1.15rem}.hc .c .muted{font-size:.9rem}.hc .c .row{display:flex;gap:8px;flex-wrap:wrap}`;document.head.appendChild(css);
const A=window.__amal;
if(A&&A.au){A.au.addEventListener('play',()=>document.body.classList.add('pl-on'));
 const ctl=document.querySelector('#player .ctl');if(ctl&&!ctl.querySelector('.pclose')){const b=document.createElement('button');b.className='pclose';b.textContent='✕';b.title='إغلاق المشغّل';b.setAttribute('aria-label','إغلاق المشغّل');b.onclick=()=>{A.au.pause();document.body.classList.remove('pl-on')};ctl.appendChild(b)}}
const NAMES={Fajr:'الفجر',Dhuhr:'الظهر',Asr:'العصر',Maghrib:'المغرب',Isha:'العشاء'};
const h12=t=>{let [h,m]=t.split(':').map(Number);const ap=h>=12?'م':'ص';h=h%12||12;return AR(h+':'+String(m).padStart(2,'0'))+' '+ap};
const nextPrayer=()=>{try{const c=LS.get('remT',null);if(!c||c.k!==new Date().toDateString()||!c.T)return null;const now=new Date();for(const e of ['Fajr','Dhuhr','Asr','Maghrib','Isha']){const [h,m]=c.T[e].split(':').map(Number),t=new Date();t.setHours(h,m,0,0);if(t>now)return NAMES[e]+' '+h12(c.T[e])}return null}catch(e){return null}};
const _h=Pages.home;
Pages.home=async function(...a){const r=await _h.apply(this,a);try{
 const Q=await API.needQ();const last=LS.get('last',null),lt=LS.get('lastTime',null),rem=LS.get('rem',{});
 const cards=[];
 if(last&&last.s&&Q[last.s-1]){cards.push(`<div class="c"><h4>كمّل من حيث وقفت</h4><div>قراءة: سورة ${Q[last.s-1].name}، الآية ${AR(last.a||1)}</div><div class="row"><a class="btn gold sm" href="surah.html?s=${last.s}&a=${last.a||1}#a${last.a||1}">تابع القراءة</a></div></div>`)}
 if(lt&&lt.s&&Q[lt.s-1]){const m=Math.floor((lt.t||0)/60),s=Math.floor((lt.t||0)%60);cards.push(`<div class="c"><h4>كمّل الاستماع</h4><div>سورة ${Q[lt.s-1].name} · عند ${AR(m+':'+String(s).padStart(2,'0'))}</div><div class="row"><button class="btn gold sm" id="hcPlay">▶ تابع الاستماع</button></div></div>`)}
 const on=rem&&rem.on&&rem.prayer;const np=on?nextPrayer():null;
 cards.push(`<div class="c"><h4>تذكير الصلاة</h4><div class="muted" id="hcRst">${on?('التذكير مفعّل'+(np?' · التالية: '+np:'')+'. يعمل والتطبيق أو الموقع مفتوح في الخلفية.'):'نبّهك عند دخول وقت كل صلاة على موبايلك. يعمل والتطبيق أو الموقع مفتوح في الخلفية.'}</div><div class="row">${on?'<a class="btn sm" href="remind.html">الإعدادات</a>':'<button class="btn gold sm" id="hcRem">فعّل التذكير</button><a class="btn sm" href="remind.html">إعدادات أكثر</a>'}</div></div>`);
 const mk=h=>{const d=document.createElement('div');d.className='hc'+(h.length>1?' two':'');d.innerHTML=h.join('');return d};
 const top=cards.slice(0,-1),rc=cards.slice(-1);
 const hero=app.querySelector('.herob');
 if(top.length){const t=mk(top);if(hero)hero.insertAdjacentElement('beforebegin',t);else app.prepend(t)}
 const rbx=mk(rc),anchor=app.querySelector('#sections');if(anchor)anchor.insertAdjacentElement('beforebegin',rbx);else app.appendChild(rbx);
 const p=$('#hcPlay');if(p)p.onclick=()=>{if(A&&A.playSurah)A.playSurah(lt.s,lt.r)};
 const rb=$('#hcRem');if(rb)rb.onclick=async()=>{LS.set('rem',{...rem,on:true,prayer:true,every:30,sal:rem.sal||false,snd:rem.snd||false,wake:rem.wake||false});let perm='unsupported';try{if(window.Notification)perm=await Notification.requestPermission()}catch(e){}
  $('#hcRst').textContent=perm==='granted'?'تم التفعيل. سيصلك تنبيه عند دخول كل صلاة ما دام التطبيق أو الموقع مفتوحًا.':(perm==='denied'?'التذكير مفعّل داخل الصفحة فقط لأن الإشعارات مرفوضة في المتصفح.':'التذكير مفعّل داخل الصفحة فقط (الإشعارات غير مدعومة هنا).');rb.style.display='none'};
}catch(e){console.error(e)}return r};
};
