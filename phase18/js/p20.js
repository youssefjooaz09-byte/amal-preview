/* Amal v50: share-the-site page (native share sheet, copy-link fallback). */
window.AmalExtra20=function(API){
const {Pages,app,$,crumbs}=API;
const css=document.createElement('style');css.textContent=`.shr{max-width:560px;margin:8px auto;text-align:center}.shr .btn{display:block;width:100%;margin:10px 0;padding:14px;font-size:1.05rem}.shr p{line-height:1.9;opacity:.9}.shr .st{text-align:right;border:1px solid var(--cardb);border-radius:14px;background:var(--card);padding:12px 16px;margin:12px 0}`;document.head.appendChild(css);
const site='https://youssefjooaz09-byte.github.io/amal-liakhirtak/';
const text='اعمل لآخرتك: موسوعة إسلامية للعلم والذكر والعمل الصالح.';
Pages.share=async()=>{
 app.innerHTML=crumbs([['شارك الموقع']])+`<h2 class="sec">شارك الموقع</h2><div class="shr"><p>ساعد غيرك يستفيد: ابعت الموقع لأهلك وأصحابك.</p>
 <button class="btn gold" id="shA">📤 شارك الموقع</button>
 <button class="btn" id="cpA">🔗 نسخ الرابط</button>
 <div class="st"><b>أندرويد:</b> افتح الموقع في كروم، قائمة الثلاث نقط، ثم «تثبيت التطبيق».<br><b>آيفون:</b> افتح الرابط في سفاري، ثم زر المشاركة، ثم «إضافة إلى الشاشة الرئيسية».</div></div>`;
 $('#shA').onclick=async()=>{if(navigator.share){try{await navigator.share({title:'اعمل لآخرتك',text,url:site})}catch(e){}}else{try{await navigator.clipboard.writeText(text+' '+site);$('#shA').textContent='✅ تم نسخ الرسالة والرابط'}catch(e){prompt('انسخ الرابط',site)}}};
 $('#cpA').onclick=async()=>{try{await navigator.clipboard.writeText(site);$('#cpA').textContent='✅ تم النسخ'}catch(e){prompt('انسخ الرابط',site)}};
};
};
