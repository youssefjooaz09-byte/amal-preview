/* Amal v49: share-the-app page. Android shares the APK download link; iPhone and others share the site (install from the browser). */
window.AmalExtra20=function(API){
const {Pages,app,$,crumbs,icon}=API;
const css=document.createElement('style');css.textContent=`.shr{max-width:560px;margin:8px auto;text-align:center}.shr .btn{display:block;width:100%;margin:10px 0;padding:14px;font-size:1.05rem}.shr p{line-height:1.9;opacity:.9}.shr .st{text-align:right;border:1px solid var(--cardb);border-radius:14px;background:var(--card);padding:12px 16px;margin:12px 0}`;document.head.appendChild(css);
const base=new URL('./',location.href).href;
const apk=base+'app/amal-liakhirtak.apk',site=base;
const isIOS=/iPad|iPhone|iPod/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
const isAndroid=/Android/i.test(navigator.userAgent);
Pages.share=async()=>{
 app.innerHTML=crumbs([['شارك التطبيق']])+`<h2 class="sec">شارك التطبيق</h2><div class="shr"><p>ساعد غيرك يستفيد: ابعت التطبيق لأهلك وأصحابك.</p>
 <button class="btn gold" id="shA">📤 شارك التطبيق</button>
 <a class="btn" id="dlA" href="${apk}" download>⬇️ تحميل تطبيق أندرويد (APK)</a>
 <button class="btn" id="cpA">🔗 نسخ رابط التحميل</button>
 <div class="st"><b>أندرويد:</b> نزّل الملف وافتحه، واسمح بالتثبيت من مصدر خارجي لما يسألك.<br><b>آيفون:</b> افتح رابط الموقع في سفاري، ثم زر المشاركة، ثم «إضافة إلى الشاشة الرئيسية».</div></div>`;
 const target=isIOS?site:apk;
 const text=isIOS?'اعمل لآخرتك: موسوعة إسلامية. افتح الرابط في سفاري واضغط مشاركة ثم "إضافة إلى الشاشة الرئيسية".':'اعمل لآخرتك: موسوعة إسلامية. حمّل التطبيق من هنا:';
 $('#shA').onclick=async()=>{if(navigator.share){try{await navigator.share({title:'اعمل لآخرتك',text,url:target})}catch(e){}}else{try{await navigator.clipboard.writeText(text+' '+target);$('#shA').textContent='✅ تم نسخ الرسالة والرابط'}catch(e){prompt('انسخ الرابط',target)}}};
 $('#cpA').onclick=async()=>{try{await navigator.clipboard.writeText(target);$('#cpA').textContent='✅ تم النسخ'}catch(e){prompt('انسخ الرابط',target)}};
 if(isIOS)$('#dlA').style.display='none';
};
};
