/* Amal v19: section landing pages, hub pages for previously-empty sections, and the record-your-recitation feature */
window.AmalExtra10=function(API){
const {Pages,app,$,$$,LS,AR,esc,norm,loadScript,needQ,toast,copy,share,crumbs,route}=API;
const icon=n=>`<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${({book:'<path d="M4 5c3-1 6-1 8 1 2-2 5-2 8-1v13c-3-1-6-1-8 1-2-2-5-2-8-1z"/><path d="M12 6v13"/>',scroll:'<path d="M7 4h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7"/><path d="M7 4a2 2 0 0 0-2 2v1h4V6a2 2 0 0 0-2-2z"/><path d="M9 10h6M9 14h6"/>',beads:'<circle cx="12" cy="5" r="1.6"/><circle cx="7" cy="8" r="1.6"/><circle cx="17" cy="8" r="1.6"/><circle cx="5.5" cy="13" r="1.6"/><circle cx="18.5" cy="13" r="1.6"/><circle cx="8" cy="18" r="1.6"/><circle cx="16" cy="18" r="1.6"/>',hands:'<path d="M12 21c-5-3-8-6-8-10 0-2 1-4 3-4 2 0 3 1 5 3 2-2 3-3 5-3 2 0 3 2 3 4 0 4-3 7-8 10z"/>',quiz:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.7"/><circle cx="12" cy="17" r=".6"/>',tafsir:'<path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z"/><path d="M8 8h7M8 12h7"/>',star:'<path d="M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.5 6.6 19.5l1.2-6L3.3 9.3l6.1-.7z"/>',image:'<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="10" r="1.6"/><path d="M4 18l5-5 4 4 3-3 4 4"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',compass:'<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',spark:'<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>',mosque:'<path d="M4 20v-7h16v7"/><path d="M7 13c0-3 2-5 5-7 3 2 5 4 5 7"/><path d="M12 3v3"/>',lib:'<path d="M5 4v16M10 4v16M15 5l4 15"/>',headset:'<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="3" y="14" width="4" height="6" rx="1"/><rect x="17" y="14" width="4" height="6" rx="1"/>',home:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',mic:'<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0"/><path d="M12 18v3"/>',play:'<circle cx="12" cy="12" r="9"/><path d="M10 8.5l6 3.5-6 3.5z"/>',info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><circle cx="12" cy="8" r=".6"/>',cap:'<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5"/><path d="M22 9v6"/>',gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.5 4.5l2 2M17.5 17.5l2 2M19.5 4.5l-2 2M6.5 17.5l-2 2"/>',heart:'<path d="M12 20c-6-4-9-7-9-11 0-2.5 2-4.5 4.5-4.5C9.6 4.5 11 5.7 12 7c1-1.3 2.4-2.5 4.5-2.5C19 4.5 21 6.5 21 9c0 4-3 7-9 11z"/>',cal:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',srch:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>'})[n]||''}</svg>`;
const css=`<style>
.secgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:12px}
.secgrid .scard{display:flex;gap:12px;align-items:center;background:var(--card);border:1px solid var(--cardb);border-radius:18px;padding:14px;color:var(--text)!important;box-shadow:var(--shadow);transition:.2s}
.secgrid .scard:hover{transform:translateY(-3px);border-color:var(--gold)}
.secgrid .sic{flex:none;width:46px;height:46px;border-radius:14px;display:grid;place-items:center;background:linear-gradient(135deg,var(--purple),var(--purple2));color:#fff}
.secgrid .st b{display:block;font-family:'Amiri',serif;font-size:1.15rem;color:var(--gold2)}
.secgrid .st span{font-size:.85rem;color:var(--muted);line-height:1.5;display:block}
.reccard{text-align:center}
.reccard .mushaf{font-family:'Amiri Quran','Amiri',serif;font-size:1.9rem;line-height:2.6;text-align:center;background:#f6f1e6;color:#141c46;border:2px solid var(--gold);border-radius:16px;padding:18px;margin:10px 0}
.recbtn{border-radius:50%;width:74px;height:74px;font-size:1.7rem;border:0;cursor:pointer;background:linear-gradient(135deg,var(--gold),var(--gold2));color:#122b20;box-shadow:0 4px 18px rgba(0,0,0,.4)}
.recbtn.on{background:linear-gradient(135deg,#c0392b,#e74c3c);color:#fff;animation:recpulse 1.2s infinite}
@keyframes recpulse{0%,100%{box-shadow:0 0 0 0 rgba(231,76,60,.5)}50%{box-shadow:0 0 0 14px rgba(231,76,60,0)}}
.fxrow{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin:10px 0}
.fxrow .btn.sm.on{background:linear-gradient(135deg,var(--gold),var(--gold2));color:#122b20;font-weight:700;border:0}
</style>`;
/* ---------------- section landing pages ---------------- */
const SECTIONS={
 quran:{t:'القرآن الكريم',ic:'book',d:'المصحف كاملًا بالنص المحقق، مع التلاوة والتفسير وأدوات التدبر.',items:[
  ['quran.html','book','سور القرآن الكريم','تصفح السور الـ١١٤ واقرأ بالنص المحقق'],
  ['reciters.html','headset','الاستماع والقرّاء','تلاوات مباشرة بأصوات عشرات القرّاء'],
  ['tafsir.html','tafsir','تفسير الآيات','الميسر والسعدي وابن كثير والطبري'],
  ['record.html','mic','سجّل تلاوتك','اقرأ الآية أمامك وسجّل صوتك بمؤثرات'],
  ['khatm.html','spark','رحلة الختم','تتبّع تقدّمك في ختم القرآن'],
  ['journal.html','scroll','مفكرتي','خواطرك وتدبراتك الخاصة'],
  ['oldschool.html','clock','مدرسة التلاوة المصرية','تسجيلات تراثية نادرة']]},
 sunnah:{t:'السنة النبوية',ic:'scroll',d:'الأحاديث النبوية من الصحيحين والسنن، والسيرة وأصحابها.',items:[
  ['hadith.html','scroll','الأحاديث النبوية','صحيح البخاري ومسلم والسنن والأربعون'],
  ['seerah.html','book','السيرة النبوية','مادة السيرة المتاحة من مصادر موثقة'],
  ['companions.html','star','الصحابة رضي الله عنهم','ما توفر من مادة موثقة عن الصحابة']]},
 azkar:{t:'الأذكار والأدعية',ic:'beads',d:'أذكار اليوم والليلة والأدعية النبوية من «حصن المسلم».',items:[
  ['azkar.html?id=1','beads','أذكار الصباح والمساء','ورد الصباح والمساء كاملًا'],
  ['azkar.html?id=27','mosque','أذكار الصلاة','الأذكار بعد السلام من الصلاة'],
  ['azkar.html?id=2','star','أذكار النوم','ما يقال قبل النوم وعنده'],
  ['duas.html?t=n','hands','الأدعية النبوية','من حصن المسلم'],
  ['duas.html','hands','كل الأدعية','قرآنية ونبوية، التوبة والكرب'],
  ['azkar.html?id=1&tasbih=1','spark','المسبحة الإلكترونية','عدّاد تسبيح حر'],
  ['names-of-allah.html','spark','أسماء الله الحسنى','قائمة الأسماء الحسنى']]},
 majalis:{t:'مجالس العلم',ic:'cap',d:'سلاسل ومحاضرات العلماء من المصدر الرسمي (دار الإسلام IslamHouse).',items:[
  ['majalis.html','cap','محاضرات ودروس العلماء','سلاسل صوتية ومرئية مصنفة'],
  ['section.html?id=haram-makkah','mosque','دروس الحرم المكي','حالة التوفر بصدق'],
  ['section.html?id=haram-nabawi','mosque','دروس المسجد النبوي','حالة التوفر بصدق'],
  ['scholars.html','scroll','سير العلماء','تراجم من مصادر موثقة'],
  ['imams.html','mosque','أئمة الحرمين','قائمة أئمة الحرمين']]},
 'haram-makkah':{t:'دروس الحرم المكي',ic:'mosque',d:'',empty:'لا تتوفر لدينا حاليًا سلاسل موثقة لدروس الحرم المكي في مصادرنا المعتمدة (بيانات دار الإسلام المتاحة في الموقع لا تشمل دروس الحرم). التزامًا بقاعدة الموقع لا نضع محتوى غير موثق ولا روابط غير مفحوصة. عند توفر مصدر موثق سيُضاف هنا.',alt:['majalis.html','تصفح مجالس العلم المتاحة']},
 'haram-nabawi':{t:'دروس المسجد النبوي',ic:'mosque',d:'',empty:'لا تتوفر لدينا حاليًا سلاسل موثقة لدروس المسجد النبوي في مصادرنا المعتمدة (بيانات دار الإسلام المتاحة في الموقع لا تشمل دروس الحرمين). التزامًا بقاعدة الموقع لا نضع محتوى غير موثق ولا روابط غير مفحوصة. عند توفر مصدر موثق سيُضاف هنا.',alt:['majalis.html','تصفح مجالس العلم المتاحة']},
 library:{t:'المكتبة الإسلامية',ic:'lib',d:'كتب PDF من دار الإسلام (مشروع دعوي مجاني التوزيع)، لكل كتاب رابط مصدره.',items:[
  ['book.html?id=riyad','lib','رياض الصالحين','للإمام النووي، نسخة PDF كاملة'],
  ['library.html?c=الحديث','scroll','كتب الحديث','منها الأربعون النووية'],
  ['library.html?c=العقيدة','star','كتب العقيدة',''],
  ['library.html?c=التفسير','tafsir','كتب التفسير',''],
  ['library.html?c=السيرة','book','كتب السيرة النبوية',''],
  ['library.html','lib','كتب متنوعة','كل المكتبة مع البحث والتصنيف'],
  ['shelf.html','lib','رفّ كتبي','الكتب التي فتحتها أو فضلتها'],
  ['newmuslim.html','hands','المسلم الجديد','بدايات مناسبة لمن أسلم حديثًا']]},
 stories:{t:'قصص وعبر',ic:'star',d:'قصص الأنبياء والعبر من مصادر موثقة.',items:[
  ['stories.html','star','قصص وعبر','قصص من القرآن والسيرة'],
  ['qisas.html','book','قصص الأنبياء','من كتاب ابن كثير'],
  ['prophets.html','star','الأنبياء والرسل','قائمة الأنبياء عليهم السلام'],
  ['kids.html','spark','ركن الأطفال','محتوى مناسب للصغار'],
  ['quiz.html','quiz','الأسئلة الدينية','اختبر معلوماتك']]},
 tafsir:{t:'التفسير والتدبر',ic:'tafsir',d:'التفاسير المعتمدة وأدوات التدبر الشخصية.',items:[
  ['tafsir.html','tafsir','التفاسير المعتمدة','الميسر والسعدي وابن كثير والطبري'],
  ['journal.html','scroll','خواطرك وتدبراتك','مفكرتك الخاصة، تُحفظ على جهازك'],
  ['glossary.html','book','قاموس المصطلحات','شرح المصطلحات الشرعية واللغوية']]},
 ibadah:{t:'التسبيح والعبادات',ic:'mosque',d:'أدوات العبادة اليومية: الصلاة والقبلة والتسبيح والورد.',items:[
  ['salah.html','clock','مواقيت الصلاة','حسب مدينتك وطريقة الحساب'],
  ['qibla.html','compass','اتجاه القبلة','بالبوصلة والخريطة'],
  ['azkar.html?id=1&tasbih=1','beads','المسبحة الإلكترونية','عدّاد تسبيح حر'],
  ['wird.html','spark','ورد يومي','سجّل وردك اليومي بخصوصية'],
  ['fiqh.html','mosque','الفقه والعبادات','المتاح من مادة الفقه'],
  ['hijri.html','cal','التقويم الهجري','التاريخ الهجري اليوم'],
  ['remind.html','clock','تذكير الصلاة','تنبيهات الصلاة والصلاة على النبي']]},
 media:{t:'الصوتيات والمرئيات',ic:'headset',d:'الدروس المرئية والصوتية ووسائط المشاركة.',items:[
  ['videos.html','play','الدروس المرئية','٨٢٨ مادة مرئية من دار الإسلام'],
  ['sheikhs.html','headset','دروس الشيوخ','مقاطع من القنوات الرسمية على يوتيوب'],
  ['videomaker.html','play','صانع الفيديو','أنشئ مقطع آية بتصميمك'],
  ['cards.html','image','بطاقات يومية','بطاقات آية وحديث للمشاركة'],
  ['images.html','image','معرض الصور','صور إسلامية مرخصة'],
  ['wallpapers.html','image','الخلفيات','خلفيات آية بتصميمك']]},
 about:{t:'عن الموقع',ic:'info',d:'مصادر الموقع وأدواتك وقنوات التواصل.',items:[
  ['sources.html','book','مصادر الموقع','فهرس كل المصادر المعتمدة'],
  ['search.html','srch','البحث الشامل','ابحث في كل أقسام الموقع'],
  ['favorites.html','heart','المفضلة','كل ما حفظته بنجمة'],
  ['contact.html','hands','تواصل معنا',''],
  ['report.html','scroll','إبلاغ عن خطأ','ساعدنا على التصحيح'],
  ['settings.html','gear','الإعدادات','المظهر والتنزيل للعمل دون اتصال']]}
};
Pages.section=async(p)=>{const id=p.get('id')||'';const S=SECTIONS[id];
 if(!S){app.innerHTML=crumbs([['الأقسام']])+`<div class="notice">القسم غير موجود.</div>`;return}
 let extra='';
 if(id==='majalis'){try{const M=await loadScript('data/majalis.js','MAJALIS');const aus=[...new Set(M.map(x=>x.a))];
  extra=`<h3 class="sec" style="font-size:1.4rem">تصنيف الدروس حسب الشيخ</h3><div class="secgrid">${aus.map(a=>`<a class="scard" href="aalim.html?n=${encodeURIComponent(a)}"><span class="sic">${icon('cap')}</span><span class="st"><b>${esc(a)}</b><span>${AR(M.filter(x=>x.a===a).length)} سلسلة</span></span></a>`).join('')}</div>`}catch(e){}}
 app.innerHTML=crumbs([[S.t]])+css+`<h2 class="sec">${S.t}</h2>${S.d?`<p class="muted">${S.d}</p>`:''}
 ${S.empty?`<div class="notice" style="border-style:solid">${S.empty}</div><div class="toolbar"><a class="btn gold" href="${S.alt[0]}">${S.alt[1]}</a></div>`:`<div class="secgrid">${S.items.map(i=>`<a class="scard" href="${i[0]}"><span class="sic">${icon(i[1])}</span><span class="st"><b>${i[2]}</b><span>${i[3]||''}</span></span></a>`).join('')}</div>`}${extra}`};
/* ---------------- hub pages (were falling back to home) ---------------- */
const hub=(t,d,items,note)=>crumbs([[t]])+css+`<h2 class="sec">${t}</h2><p class="muted">${d}</p>${note?`<div class="notice">${note}</div>`:''}<div class="secgrid">${items.map(i=>`<a class="scard" href="${i[0]}"><span class="sic">${icon(i[1])}</span><span class="st"><b>${i[2]}</b><span>${i[3]||''}</span></span></a>`).join('')}</div>`;
Pages.seerah=async()=>{let books=[],series=[];try{const L=await loadScript('data/library.js','LIBRARY');books=L.filter(b=>b.c==='السيرة')}catch(e){}try{const M=await loadScript('data/majalis.js','MAJALIS');series=M.filter(s=>s.c==='السيرة النبوية')}catch(e){}
 app.innerHTML=hub('السيرة النبوية','مادة السيرة المتاحة في الموقع من مصادر موثقة فقط.',
  [...books.map(b=>['book.html?id='+b.id,'book',b.t,b.a]),...series.map(s=>['series.html?id='+s.id,'headset',s.t,s.a]),['prophets.html','star','الأنبياء والرسل',''],['qisas.html','book','قصص الأنبياء','من كتاب ابن كثير']],
  'لم نكتب سيرة من عندنا. هذه روابط المادة الموثقة المتاحة حاليًا في المكتبة ومجالس العلم، وكل عنصر مذكور مصدره في صفحته.')};
Pages.companions=async()=>{let st=[];try{const S=await loadScript('data/stories.js','STORIES');st=S.filter(x=>x.h)}catch(e){}
 app.innerHTML=hub('الصحابة رضي الله عنهم','ما توفر في الموقع من مادة موثقة تخص الصحابة والسيرة.',
  [['seerah.html','book','السيرة النبوية','مادة السيرة المتاحة'],['stories.html','star','قصص وعبر','منها مواقف للصحابة'],['scholars.html','scroll','سير العلماء','تراجم موثقة']],
  'لا نضع تراجم للصحابة من عندنا؛ نصوص التراجم تحتاج مصدرًا موثقًا. عند توفر مصدر معتمد للتراجم سيُبنى هذا القسم عليه.')};
Pages.fiqh=async()=>{let books=[],series=[];try{const L=await loadScript('data/library.js','LIBRARY');books=L.filter(b=>b.c==='الفقه')}catch(e){}try{const M=await loadScript('data/majalis.js','MAJALIS');series=M.filter(s=>s.c==='الفقه')}catch(e){}
 app.innerHTML=hub('الفقه والعبادات','المتاح من مادة الفقه في مصادر الموقع.',
  [...books.map(b=>['book.html?id='+b.id,'book',b.t,b.a]),...series.map(s=>['series.html?id='+s.id,'headset',s.t,s.a]),['salah.html','clock','مواقيت الصلاة',''],['glossary.html','book','قاموس المصطلحات','شرح المصطلحات الفقهية']],
  'لا نفتي ولا نكتب أحكامًا من عندنا. هذه المادة الموثقة المتاحة حاليًا، وعند توفر مصدر فقهي معتمد أوسع سيُضاف.')};
Pages.kids=async()=>{
 app.innerHTML=hub('ركن الأطفال','أقسام من الموقع تناسب الصغار بإشراف الأهل.',
  [['quiz.html','quiz','الأسئلة الدينية','أسئلة سهلة بمستويات'],['stories.html','star','قصص وعبر','قصص قصيرة هادفة'],['qisas.html','book','قصص الأنبياء','من كتاب ابن كثير'],['names-of-allah.html','spark','أسماء الله الحسنى','']],
  'لا يوجد محتوى مخصص للأطفال من تأليف الموقع؛ هذه روابط الأقسام الموجودة الأنسب لهم.')};
Pages.newmuslim=async()=>{
 app.innerHTML=hub('المسلم الجديد','بدايات مناسبة لمن أسلم حديثًا، من أقسام الموقع الموجودة.',
  [['salah.html','clock','مواقيت الصلاة',''],['quran.html','book','القرآن الكريم','ابدأ بالقراءة'],['azkar.html?id=1','beads','أذكار الصباح والمساء',''],['library.html?c=العقيدة','star','كتب العقيدة','من المكتبة']],
  'لا نؤلف منهجًا للمسلم الجديد من عندنا. هذه روابط أقسام موجودة تناسب البداية، وعند توفر مادة موثقة مخصصة ستُضاف.')};
Pages['names-of-allah']=async()=>{const N=await loadScript('data/names.js','NAMES');
 app.innerHTML=crumbs([['أسماء الله الحسنى']])+css+`<h2 class="sec">أسماء الله الحسنى</h2><div class="notice">قائمة الأسماء الحسنى من ملف بيانات الموقع، والمعاني الإنجليزية كما وردت فيه. قال تعالى: ﴿وَلِلَّهِ الْأَسْمَاءُ الْحُسْنَىٰ فَادْعُوهُ بِهَا﴾ [الأعراف: ١٨٠].</div><div class="secgrid">${N.map(n=>`<div class="scard" style="cursor:default"><span class="sic" style="font-family:Amiri;font-weight:700">${AR(n[0])}</span><span class="st"><b style="font-size:1.4rem">${esc(n[1])}</b><span dir="ltr" style="text-align:end">${esc(n[2])} — ${esc(n[3])}</span></span></div>`).join('')}</div>`};
/* ---------------- record your recitation ---------------- */
Pages.record=async()=>{const Q=await needQ();
 app.innerHTML=crumbs([['القرآن الكريم','section.html?id=quran'],['سجّل تلاوتك']])+css+`<h2 class="sec">سجّل تلاوتك بصوتك</h2>
 <div class="notice">اختر السورة والآيات فيظهر لك نص المصحف أمامك، ثم سجّل صوتك بميكروفون جهازك، وجرّب مؤثرات (صدى المسجد، دفء الصوت، تقليل التشويش) حتى يعجبك الناتج، ثم استمع إليه أو نزّله. <b>كل شيء يتم على جهازك فقط، ولا يُرفع أي تسجيل إلى أي خادم.</b> المؤثرات تحسّن إحساس الصوت ولا تحوّله إلى صوت شخص آخر. يحتاج المتصفح إذن الميكروفون، وقد لا يعمل التسجيل في المتصفحات القديمة.</div>
 <div class="card"><div class="toolbar"><select class="field" id="rs" style="flex:1;min-width:140px">${Q.map(s=>`<option value="${s.n}">${AR(s.n)}. ${s.name}</option>`).join('')}</select>
 <label style="margin:0">من آية <input class="field" id="ra" type="number" min="1" value="1" style="width:80px;min-width:0"></label><label style="margin:0">إلى <input class="field" id="rb" type="number" min="1" value="1" style="width:80px;min-width:0"></label><button class="btn sm" id="rshow">اعرض النص</button></div>
 <div class="mushaf" id="rm"></div></div>
 <div class="card reccard"><div id="rstate" class="muted">اضغط زر التسجيل واسمح للميكروفون، ثم اقرأ ما أمامك.</div>
 <div style="margin:12px 0"><button class="recbtn" id="rrec" title="تسجيل">🎙️</button></div>
 <div class="muted" id="rtime">0:00</div>
 <h3 class="sec" style="justify-content:center;font-size:1.3rem">المؤثرات</h3>
 <div class="fxrow" id="rfx">
  <button class="btn sm on" data-fx="none">بدون مؤثرات</button><button class="btn sm" data-fx="mosque">صدى المسجد</button><button class="btn sm" data-fx="echo">صدى خفيف</button><button class="btn sm" data-fx="warm">دفء الصوت</button><button class="btn sm" data-fx="clean">تقليل التشويش</button><button class="btn sm" data-fx="full">مسجد + دفء + تنقية</button>
 </div>
 <div class="toolbar" style="justify-content:center"><audio id="rout" controls class="fancy-audio" style="width:100%;max-width:420px;display:none"></audio></div>
 <div class="toolbar" style="justify-content:center"><a class="btn gold sm" id="rdl" style="display:none">⬇ تنزيل التسجيل (WAV)</a><span class="muted" id="rwork"></span></div></div>`;
 let cur={s:1,a:1,b:1};
 const show=()=>{const s=+$('#rs').value,S=Q[s-1];let a=Math.max(1,+$('#ra').value||1),b=Math.min(S.count,Math.max(a,+$('#rb').value||a));$('#ra').value=a;$('#rb').value=b;cur={s,a,b};
  $('#rm').innerHTML=(s!==1&&s!==9?'<div style="font-size:1.4rem;color:#1e7a52">بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</div>':'')+S.ayahs.slice(a-1,b).map((t,i)=>esc(t)+' ﴿'+AR(a+i)+'﴾').join(' ')};
 $('#rshow').onclick=show;$('#rs').onchange=()=>{$('#ra').value=1;$('#rb').value=1;show()};show();
 let mediaRec=null,chunks=[],stream=null,t0=0,timer=null,raw=null,fx='none';
 const tick=()=>{const s=Math.floor((Date.now()-t0)/1000);$('#rtime').textContent=Math.floor(s/60)+':'+String(s%60).padStart(2,'0')};
 $('#rrec').onclick=async()=>{
  if(mediaRec&&mediaRec.state==='recording'){mediaRec.stop();return}
  try{stream=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true,noiseSuppression:true}})}catch(e){$('#rstate').textContent='تعذر فتح الميكروفون. تأكد من السماح به من إعدادات المتصفح.';return}
  chunks=[];mediaRec=new MediaRecorder(stream);
  mediaRec.ondataavailable=e=>{if(e.data.size)chunks.push(e.data)};
  mediaRec.onstop=async()=>{stream.getTracks().forEach(t=>t.stop());clearInterval(timer);$('#rrec').classList.remove('on');$('#rrec').textContent='🎙️';$('#rstate').textContent='جارٍ تجهيز التسجيل…';
   try{const buf=await new Blob(chunks).arrayBuffer();const ac=new (window.AudioContext||window.webkitAudioContext)();raw=await ac.decodeAudioData(buf);ac.close();$('#rstate').textContent='تم التسجيل ('+AR(Math.round(raw.duration))+' ثانية). اختر مؤثرًا واستمع.';await render()}catch(e){$('#rstate').textContent='تعذر قراءة التسجيل. جرّب متصفحًا آخر.'}};
  mediaRec.start();t0=Date.now();timer=setInterval(tick,500);$('#rrec').classList.add('on');$('#rrec').textContent='⏹';$('#rstate').textContent='يسجّل الآن… اقرأ ما أمامك ثم اضغط الإيقاف.'};
 const impulse=(ctx,dur,decay)=>{const rate=ctx.sampleRate,len=rate*dur,b=ctx.createBuffer(2,len,rate);for(let c=0;c<2;c++){const d=b.getChannelData(c);for(let i=0;i<len;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/len,decay)}return b};
 const FX={none:{},mosque:{rev:2.8,revMix:.45,hp:70,lp:14000},echo:{delay:.32,delayMix:.3,hp:70,lp:14000},warm:{lowShelf:6,highShelf:-2,lp:12000,hp:60},clean:{hp:100,lp:11000,gate:true,comp:true},full:{rev:2.4,revMix:.35,lowShelf:4,highShelf:-2,hp:90,lp:12000,comp:true}};
 async function render(){if(!raw)return;$('#rwork').textContent='جارٍ تطبيق المؤثر…';
  const f=FX[fx]||{};const rate=raw.sampleRate,oc=new OfflineAudioContext(2,Math.ceil((raw.duration+(f.rev?2:0))*rate),rate);
  const src=oc.createBufferSource();src.buffer=raw;let node=src;
  if(f.hp){const hp=oc.createBiquadFilter();hp.type='highpass';hp.frequency.value=f.hp;node.connect(hp);node=hp}
  if(f.lp){const lp=oc.createBiquadFilter();lp.type='lowpass';lp.frequency.value=f.lp;node.connect(lp);node=lp}
  if(f.lowShelf){const ls=oc.createBiquadFilter();ls.type='lowshelf';ls.frequency.value=250;ls.gain.value=f.lowShelf;node.connect(ls);node=ls}
  if(f.highShelf){const hs=oc.createBiquadFilter();hs.type='highshelf';hs.frequency.value=6000;hs.gain.value=f.highShelf;node.connect(hs);node=hs}
  if(f.comp){const cp=oc.createDynamicsCompressor();cp.threshold.value=-28;cp.ratio.value=4;cp.attack.value=.005;cp.release.value=.2;node.connect(cp);node=cp}
  const master=oc.createGain();node.connect(master);
  if(f.rev){const cv=oc.createConvolver();cv.buffer=impulse(oc,f.rev,2.4);const wg=oc.createGain();wg.gain.value=f.revMix;node.connect(cv);cv.connect(wg);wg.connect(master)}
  if(f.delay){const dl=oc.createDelay(1);dl.delayTime.value=f.delay;const fb=oc.createGain();fb.gain.value=.3;const dg=oc.createGain();dg.gain.value=f.delayMix;node.connect(dl);dl.connect(fb);fb.connect(dl);dl.connect(dg);dg.connect(master)}
  master.connect(oc.destination);src.start();
  try{const out=await oc.startRendering();const blob=wav(out);const u=URL.createObjectURL(blob);
   const a=$('#rout');a.src=u;a.style.display='block';
   const d=$('#rdl');d.href=u;d.download='talawa-'+Q[cur.s-1].name+'-'+fx+'.wav';d.style.display='inline-block';$('#rwork').textContent=''}catch(e){$('#rwork').textContent='تعذر تطبيق المؤثر.'}}
 function wav(buf){const ch=Math.min(2,buf.numberOfChannels),len=buf.length*ch*2,ab=new ArrayBuffer(44+len),v=new DataView(ab);
  const ws=(o,s)=>{for(let i=0;i<s.length;i++)v.setUint8(o+i,s.charCodeAt(i))};
  ws(0,'RIFF');v.setUint32(4,36+len,true);ws(8,'WAVE');ws(12,'fmt ');v.setUint32(16,16,true);v.setUint16(20,1,true);v.setUint16(22,ch,true);v.setUint32(24,buf.sampleRate,true);v.setUint32(28,buf.sampleRate*ch*2,true);v.setUint16(32,ch*2,true);v.setUint16(34,16,true);ws(36,'data');v.setUint32(40,len,true);
  let off=44;const cs=[];for(let c=0;c<ch;c++)cs.push(buf.getChannelData(c));
  for(let i=0;i<buf.length;i++)for(let c=0;c<ch;c++){let s=Math.max(-1,Math.min(1,cs[c][i]));v.setInt16(off,s<0?s*32768:s*32767,true);off+=2}
  return new Blob([ab],{type:'audio/wav'})}
 $('#rfx').onclick=e=>{const b=e.target.closest('[data-fx]');if(!b)return;fx=b.dataset.fx;$$('#rfx .btn').forEach(x=>x.classList.toggle('on',x===b));render()};
};
};
