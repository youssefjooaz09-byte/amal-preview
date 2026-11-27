/* Amal v55 preview: Zad Ramadan welcome shell. No inner content yet. */
window.AmalExtra23=function(API){
const {Pages,app,crumbs}=API;
if(!Pages)return;
const lantern=`<svg viewBox="0 0 40 90" fill="none" stroke="#e2c779" stroke-width="1.6"><path d="M20 0v14"/><path d="M12 14h16l3 6H9z" fill="#c9a54b33"/><path d="M10 20c-4 10-4 26 0 36h20c4-10 4-26 0-36z" fill="#e2c77922"/><path d="M20 20v36M14 20c-2 12-2 24 0 36M26 20c2 12 2 24 0 36"/><path d="M10 56h20l-3 8H13z" fill="#c9a54b33"/><path d="M20 64v8"/><circle cx="20" cy="38" r="4" fill="#e2c779"/></svg>`;
const crescent=`<svg width="58" height="58" viewBox="0 0 60 60"><path d="M40 6A24 24 0 0 0 40 54A32 32 0 0 1 40 6Z" fill="#e2c779"/><path d="M47 14l1.6 3.4 3.6.5-2.6 2.6.6 3.7-3.2-1.8-3.2 1.8.6-3.7-2.6-2.6 3.6-.5z" fill="#fff6d6"/></svg>`;
/* Future content: add objects here, e.g. {t:'title',h:'<html>'}. Each one renders as a card under the welcome. Empty now, so nothing extra is shown. */
const SECTIONS=[];
const css=`<style id="zcss">
.zad .zh{position:relative;overflow:hidden;border:1px solid var(--gold);border-radius:24px;padding:34px 18px 28px;text-align:center;background:radial-gradient(120% 140% at 50% -10%,#1d2a6b 0,#0b1230 62%);color:#f6f1e6}
.zad .zs{position:absolute;inset:0;pointer-events:none;background-image:radial-gradient(1.5px 1.5px at 12% 20%,#fff8 50%,transparent 51%),radial-gradient(1.5px 1.5px at 70% 12%,#fff9 50%,transparent 51%),radial-gradient(1.5px 1.5px at 85% 60%,#fff7 50%,transparent 51%),radial-gradient(1.5px 1.5px at 25% 75%,#fff7 50%,transparent 51%),radial-gradient(1px 1px at 45% 30%,#fff8 50%,transparent 51%),radial-gradient(1px 1px at 58% 82%,#fff7 50%,transparent 51%)}
.zad .zl{position:absolute;top:0;width:36px;transform-origin:50% 0;animation:zsw 5s ease-in-out infinite}
.zad .zl.a{right:16px}.zad .zl.b{left:16px;animation-delay:-2.5s}
@keyframes zsw{0%,100%{transform:rotate(-4deg)}50%{transform:rotate(4deg)}}
@media (prefers-reduced-motion:reduce){.zad .zl{animation:none}}
.zad .zh h2{margin:8px 0 14px;font-family:Amiri,serif;font-size:2.1rem;color:#e2c779}
.zad .orn{display:flex;align-items:center;justify-content:center;gap:10px;margin:10px auto;color:#e2c779;max-width:320px}
.zad .orn:before,.zad .orn:after{content:'';flex:1;height:1px;background:linear-gradient(90deg,transparent,#c9a54b,transparent)}
.zad .msg{position:relative;font-family:Amiri,serif;font-size:1.3rem;line-height:2.2;max-width:640px;margin:0 auto}
.zad .msg p{margin:8px 0}
.zad .meet{position:relative;display:inline-block;margin:18px 0 4px;padding:10px 30px;border:1.5px solid #e2c779;border-radius:40px;font-family:Amiri,serif;font-size:1.7rem;font-weight:700;color:#0b1230;background:linear-gradient(135deg,#f1d98f,#c9a54b);box-shadow:0 0 24px #c9a54b55}
.zad .soon{position:relative;margin-top:10px;font-size:1.15rem;color:#e2c779}
.zad .zx{margin-top:16px}
.zhome{display:flex;align-items:center;gap:14px;margin:14px 0;padding:16px 18px;border:1px solid #c9a54b;border-radius:20px;text-decoration:none;color:#f6f1e6;background:radial-gradient(120% 160% at 100% 0,#1d2a6b 0,#0b1230 70%)}
.zhome .zi{flex:none;width:54px}
.zhome b{display:block;font-family:Amiri,serif;font-size:1.5rem;color:#e2c779}
.zhome span{display:block;font-size:.98rem;color:#d8d4ea}
.zhome em{font-style:normal;margin-inline-start:auto;flex:none;padding:6px 14px;border-radius:20px;background:linear-gradient(135deg,#f1d98f,#c9a54b);color:#0b1230;font-weight:700;font-size:.9rem}
</style>`;
const ORN='<div class="orn">\u2726 \u06DE \u2726</div>';
Pages.zad=async()=>{
 app.innerHTML=crumbs([['زاد رمضان']])+css+`<div class="zad">
 <div class="zh"><div class="zs"></div><div class="zl a">${lantern}</div><div class="zl b">${lantern}</div>${crescent}<h2>زاد رمضان</h2>${ORN}
 <div class="msg"><p>ليس مجرد شهر يمضي، بل فرصة جديدة قد تغيّر حياتك...</p><p>نستعد لاستقبال شهر القرآن، شهر الرحمة والمغفرة والعتق من النار.</p><p>موعدنا مع الطاعة في رمضان، فاستعد بقلبك قبل أيامك.</p></div>
 <div class="meet">نلتقي في رمضان</div><div class="soon">قريباً بإذن الله 🌙</div></div>
 ${SECTIONS.map(x=>`<div class="zx">${x.h}</div>`).join('')}
 </div>`;
};
/* standalone card on the home page */
const _h=Pages.home;
Pages.home=async function(...a){const r=await _h.apply(this,a);try{
 if(!document.getElementById('zcss'))document.head.insertAdjacentHTML('beforeend',css);
 const c=document.createElement('a');c.className='zhome';c.href='zad.html';
 c.innerHTML=`<div class="zi">${crescent}</div><div><b>زاد رمضان</b><span>نلتقي في رمضان · قريباً بإذن الله</span></div><em>افتح</em>`;
 const hero=app.querySelector('.herob'),an=app.querySelector('#sections');if(hero)hero.insertAdjacentElement('afterend',c);else if(an)an.insertAdjacentElement('beforebegin',c);else app.appendChild(c);
}catch(e){console.error(e)}return r};
};
