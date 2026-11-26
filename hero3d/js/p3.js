window.AmalExtra=function(API){if(window.AmalExtra6)window.AmalExtra6(API);if(window.AmalExtra4)window.AmalExtra4(API);if(window.AmalExtra7)window.AmalExtra7(API);if(window.AmalExtra8)window.AmalExtra8(API);
'use strict';
const {Pages,app,$,$$,LS,AR,esc,norm,loadScript,needQ,toast,copy,share,crumbs}=API;
const today=()=>new Date().toISOString().slice(0,10);
/* ================= HADITH ================= */
const COL={bukhari:['صحيح البخاري','البخاري'],muslim:['صحيح مسلم','مسلم'],nawawi:['الأربعون النووية','النووي'],qudsi:['الأربعون القدسية','الأحاديث القدسية'],abudawud:['سنن أبي داود','أبو داود'],tirmidhi:['جامع الترمذي','الترمذي'],nasai:['سنن النسائي','النسائي'],ibnmajah:['سنن ابن ماجه','ابن ماجه'],malik:['موطأ مالك','مالك']};
const GRADE={abudawud:'',tirmidhi:'',nasai:'',ibnmajah:'',malik:'',bukhari:'من «الصحيحين»: أحاديث صحيح البخاري صحيحة عند أهل العلم، تلقّتها الأمة بالقبول (حكم عام على الكتاب، وليس حكمًا مستقلًّا على كل حديث).',muslim:'من «الصحيحين»: أحاديث صحيح مسلم صحيحة عند أهل العلم، تلقّتها الأمة بالقبول (حكم عام على الكتاب، وليس حكمًا مستقلًّا على كل حديث).',nawawi:'درجة الحديث غير موجودة في مصدر البيانات، فلم نضع حكمًا.',qudsi:'درجة الحديث غير موجودة في مصدر البيانات، فلم نضع حكمًا.'};
// الموضوع = كتب من تصنيف المصدر نفسه (+ كلمات مفتاحية للتصفية عند الحاجة)
const TOPICS=[
 ['الصلاة',{bukhari:[8,9,10,11,21],muslim:[4,5]}],
 ['الصيام',{bukhari:[30],muslim:[14]}],
 ['الزكاة والصدقة',{bukhari:[24],muslim:[13]}],
 ['بر الوالدين',{bukhari:[78],muslim:[45],kw:['والدي','والديه','امك','ابوك']}],
 ['الأخلاق والتعامل مع الناس',{bukhari:[78],muslim:[45,39]}],
 ['الرحمة',{bukhari:[78],muslim:[45],kw:['يرحم','الرحمه','الراحمون','رحمه','ارحمو']}],
 ['التوبة',{bukhari:[80],muslim:[48,50]}],
 ['طلب العلم',{bukhari:[3],muslim:[47]}],
 ['الصبر',{bukhari:[81],muslim:[55],g:'sabr'}],
 ['الأمانة',{bukhari:[2,78,93],muslim:[1,45],g:'amana'}]];
let HI=null;const loadIdx=()=>loadScript('data/hadith-index.js','HINDEX');
const loadChunk=(c,b)=>loadScript(`data/hadith/${c}-${b}.js`,`H_${c}_${b}`);
const favH=()=>new Set(LS.get('favh',[]));
const stripKw=t=>norm(t);
Pages.hadith=async(p)=>{HI=await loadIdx();
 const col=p.get('c')||'bukhari',book=+(p.get('b')||0),topic=p.get('t')||'',pg=+(p.get('pg')||1),q=p.get('q')||'';
 const idx=HI[col];const book0=book||idx[0].b;
 app.innerHTML=crumbs([['الأحاديث النبوية']])+`<h2 class="sec">الأحاديث النبوية</h2>
 <div class="toolbar">${Object.keys(COL).map(k=>`<a class="btn ${k===col?'gold':''}" href="hadith.html?c=${k}">${COL[k][0]}</a>`).join('')}<a class="btn ${col==='fav'?'gold':''}" href="hadith.html?c=fav">★ المفضلة</a></div>
 <div class="notice">المصدر: بيانات Hadith API (fawazahmed0، مأخوذة من موقع sunnah.com) بالنص العربي كما هو، وأرقام الأحاديث حسب ترقيم المصدر. درجات السنن والموطأ منقولة من المصدر مع اسم المحدّث (الألباني، الزبير علي زئي، شعيب الأرناؤوط…) وقد تختلف أحكامهم، وبعضها ضعيف فتنبّه. النص يتضمن السند والراوي كما ورد. لم نضف شرحًا أو فوائد من عندنا حتى لا ننسب شيئًا بغير توثيق.</div>
 <div id="hbody"></div>`;
 const body=$('#hbody');
 if(col==='fav'){const f=[...favH()];if(!f.length){body.innerHTML='<div class="notice">لا مفضلة بعد.</div>';return}
  const items=[];for(const k of f){const[c,b,n]=k.split(':');try{const arr=await loadChunk(c,b);const h=arr.find(x=>String(x[0])===n);if(h)items.push({c,b:+b,h})}catch(e){}}
  body.innerHTML=items.map(x=>card(x.c,x.b,x.h)).join('');wire(body);return}
 let toolbar=`<div class="toolbar"><select class="field" id="hb">${idx.map(x=>`<option value="${x.b}" ${(!topic&&x.b===book0)?'selected':''}>${AR(x.b)}. ${x.ar||x.en}${x.n?' ('+AR(x.n)+')':''}</option>`).join('')}</select>
 <select class="field" id="ht"><option value="">كل المواضيع</option>${TOPICS.filter(t=>t[1][col]).map(t=>`<option ${t[0]===topic?'selected':''}>${t[0]}</option>`).join('')}</select>
 <input class="field" id="hq" value="${esc(q)}" placeholder="بحث في النتائج"><button class="btn" id="hs">بحث</button></div>`;
 body.innerHTML=toolbar+'<div id="hl"></div>';
 const nav=(o)=>{const u=new URLSearchParams({c:col,...o});return 'hadith.html?'+u};
 $('#hb').onchange=e=>API.route(nav({b:e.target.value}),true);$('#ht').onchange=e=>API.route(nav(e.target.value?{t:e.target.value}:{b:book0}),true);
 $('#hs').onclick=()=>API.route(nav({...(topic?{t:topic}:{b:book0}),q:$('#hq').value}),true);$('#hq').onkeydown=e=>{if(e.key==='Enter')$('#hs').click()};
 let list=[];const hl=$('#hl');hl.innerHTML='<div class="notice">جارٍ تحميل الأحاديث…</div>';
 try{
  if(topic){const T=TOPICS.find(t=>t[0]===topic)[1];const bs=T[col]||[];const kw=T.kw;
   if(T.g){const G=await loadScript(`data/topics/${T.g}.js`,'TOPIC_'+T.g);(G[col]||[]).forEach(([b,n,t])=>list.push({b,h:[n,t]}))}
   else for(const b of bs){const arr=await loadChunk(col,b);arr.forEach(h=>{if(!kw||kw.some(k=>norm(h[1]).includes(k)))list.push({b,h})})}
   hl.insertAdjacentHTML('beforebegin',`<div class="notice">موضوع «${topic}»: ${kw?'أحاديث من الكتب ذات الصلة في المصدر تحتوي على كلمات الموضوع (تصفية آلية بالكلمات، وليست تصنيفًا بشريًا)':(T.g?'أحاديث من كل كتب المصدر تحتوي على كلمات الموضوع (تصفية آلية بالكلمات، وليست تصنيفًا بشريًا)':'كتب المصدر المتعلقة بالموضوع')}.</div>`)}
  else{const arr=await loadChunk(col,book0);list=arr.map(h=>({b:book0,h}))}
 }catch(e){hl.innerHTML='<div class="notice">تعذر تحميل الأحاديث. تحقق من تشغيل المشروع عبر Live Server.</div>';return}
 if(q){const nq=norm(q);list=list.filter(x=>norm(x.h[1]).includes(nq))}
 const per=20,pages=Math.max(1,Math.ceil(list.length/per)),cur=Math.min(pg,pages);
 hl.innerHTML=`<div class="muted">${AR(list.length)} حديث</div>`+list.slice((cur-1)*per,cur*per).map(x=>card(col,x.b,x.h)).join('')+(pages>1?`<div class="toolbar" style="justify-content:center">${cur>1?`<a class="btn" href="${nav({...(topic?{t:topic}:{b:book0}),...(q?{q}:{}),pg:cur-1})}">→ السابق</a>`:''}<span>صفحة ${AR(cur)} من ${AR(pages)}</span>${cur<pages?`<a class="btn" href="${nav({...(topic?{t:topic}:{b:book0}),...(q?{q}:{}),pg:cur+1})}">التالي ←</a>`:''}</div>`:'');
 wire(hl)};
function bookName(c,b){const x=HI&&HI[c]&&HI[c].find(y=>y.b===b);return x&&c!=='nawawi'&&c!=='qudsi'?(x.ar?` — كتاب ${x.ar}`:` — ${x.en}`):''}
function card(c,b,h){const k=`${c}:${b}:${h[0]}`,f=favH().has(k);
 return`<div class="card" style="margin:12px 0" data-k="${k}"><div class="muted">${COL[c][0]}${bookName(c,b)} — حديث رقم ${AR(h[0])} · <a href="report.html?t=hadith&c=${c}&b=${b}&n=${h[0]}">إبلاغ عن خطأ</a>${c==='nawawi'?` · <a href="wallpapers.html?t=hadith&n=${h[0]}">صورة للمشاركة</a>`:''}</div>
 <div style="font-family:'Amiri',serif;font-size:1.35rem;line-height:2.2;margin:8px 0">${esc(h[1])}</div>
 <div class="muted" style="margin-bottom:6px"><b>الدرجة:</b> ${h[2]&&h[2].length?h[2].map(g=>`${g[1]} <span class="tag">${g[0]}</span>`).join(' · '):GRADE[c]||'لم تتوفر درجة في مصدر البيانات لهذا الحديث، فلم نضع حكمًا.'}</div>
 <div class="toolbar"><button class="btn sm" data-a="copy">نسخ</button><button class="btn sm" data-a="share">مشاركة</button><button class="btn sm" data-a="fav">${f?'★ إزالة':'☆ مفضلة'}</button></div></div>`}
function wire(root){root.onclick=e=>{const b=e.target.closest('[data-a]');if(!b)return;const c=b.closest('[data-k]'),k=c.dataset.k,[col,bk,n]=k.split(':');
 const txt=c.querySelector('div[style*=Amiri]').textContent+`\n[${COL[col][0]} — حديث رقم ${AR(n)}]`;
 if(b.dataset.a==='copy')copy(txt);else if(b.dataset.a==='share')shareMenu({title:'حديث نبوي',text:txt,url:new URL(`hadith.html?c=${col}&b=${bk}`,location.href).href});
 else{const s=favH();s.has(k)?s.delete(k):s.add(k);LS.set('favh',[...s]);b.textContent=s.has(k)?'★ إزالة':'☆ مفضلة'}}}
/* ================= AZKAR / DUAS ================= */
const AZ=['أذكار الصباح والمساء','أذكار النوم','أذكار الاستيقاظ من النوم','الأذكار بعد السلام من الصلاة','الذكر عند الخروج من المنزل','الذكر عند دخول المنزل','دعاء السفر','دعاء الركوب','ذكر الرجوع من السفر','الدعاء قبل الطعام','الدعاء عند الفراغ من الطعام','فضل التسبيح و التحميد، و التهليل، و التكبير','كيف كان النبي يسبح؟','أذكار الآذان','دعاء دخول المسجد','دعاء الخروج من المسجد','دعاء الذهاب إلى المسجد'];
const TAWBA=['الاستغفار و التوبة','ما يقول ويفعل من أذنب ذنبا'],KARB=['دعاء الهم والحزن','دعاء الكرب','دعاء الفزع في النوم و من بُلِيَ بالوحشة','دعاء من استصعب عليه أمر','الدعاء حينما يقع ما لا يرضاه أو ُ غلب على أمره'];
const favZ=()=>new Set(LS.get('favz',[]));
const prog=()=>{const d=LS.get('azk',{});return d.day===today()?d:{day:today(),c:{}}};
function itemHtml(cid,i,it,pr,f){const k=cid+'_'+i,done=pr.c[k]||0,fin=done>=it.c;
 return`<div class="card" style="margin:10px 0;${fin?'opacity:.6':''}" data-k="${k}" data-n="${it.c}"><div style="font-family:'Amiri',serif;font-size:1.3rem;line-height:2.1">${esc(it.t)}</div>
 <div class="toolbar"><button class="btn gold sm" data-z="tap">${fin?'✓ تم':'سبّح'}</button><span class="muted" data-cnt>${AR(done)} / ${AR(it.c)}</span><button class="btn sm" data-z="reset">إعادة</button><button class="btn sm" data-z="copy">نسخ</button><button class="btn sm" data-z="fav">${f.has(k)?'★':'☆'}</button></div></div>`}
function wireZ(root,groups){root.onclick=e=>{const b=e.target.closest('[data-z]');if(!b)return;const c=b.closest('[data-k]'),k=c.dataset.k,n=+c.dataset.n,pr=prog();
 if(b.dataset.z==='tap'){pr.c[k]=Math.min(n,(pr.c[k]||0)+1);LS.set('azk',pr);if(navigator.vibrate)navigator.vibrate(15)}
 else if(b.dataset.z==='reset'){pr.c[k]=0;LS.set('azk',pr)}
 else if(b.dataset.z==='copy'){copy(c.querySelector('div').textContent+'\n[حصن المسلم]');return}
 else{const s=favZ();s.has(k)?s.delete(k):s.add(k);LS.set('favz',[...s]);b.textContent=s.has(k)?'★':'☆';return}
 const d=pr.c[k]||0;c.querySelector('[data-cnt]').textContent=AR(d)+' / '+AR(n);c.style.opacity=d>=n?.6:1;c.querySelector('[data-z=tap]').textContent=d>=n?'✓ تم':'سبّح'}}
const SRC='المصدر: «حصن المسلم» لسعيد بن علي القحطاني (بيانات Adhkar-json). الأذكار منقولة بنصها، ولم يتضمن مصدر البيانات تخريج كل ذكر أو درجته، فلا نضيف حكمًا لم نتحقق منه. يُعاد ضبط العدّاد كل يوم.';
Pages.azkar=async(p)=>{const A=await loadScript('data/adhkar.js','ADHKAR');const cats=A.filter(c=>AZ.includes(c.cat));const cid=+(p.get('id')||cats[0].id);const cur=cats.find(c=>c.id===cid)||cats[0];const pr=prog(),f=favZ();
 app.innerHTML=crumbs([['الأذكار']])+`<h2 class="sec">الأذكار</h2><div class="notice">${SRC}</div><div class="toolbar">${cats.map(c=>`<a class="btn ${c.id===cur.id?'gold':''}" href="azkar.html?id=${c.id}">${c.cat}</a>`).join('')}</div><h2 class="sec">${cur.cat}</h2><div id="zl">${cur.items.map((it,i)=>itemHtml(cur.id,i,it,pr,f)).join('')}</div>
 <h2 class="sec">عدّاد تسبيح حر</h2><div class="card" style="text-align:center"><div id="tc" style="font-size:3rem;font-family:Amiri">${AR(LS.get('tasbih',0))}</div><div class="toolbar" style="justify-content:center"><button class="btn gold" id="tp" style="font-size:1.3rem;padding:12px 40px">سبّح</button><button class="btn" id="tr">تصفير</button></div></div>`;
 wireZ($('#zl'));$('#tp').onclick=()=>{const n=LS.get('tasbih',0)+1;LS.set('tasbih',n);$('#tc').textContent=AR(n);if(navigator.vibrate)navigator.vibrate(10)};$('#tr').onclick=()=>{LS.set('tasbih',0);$('#tc').textContent=AR(0)}};
const QDUA=[ // [سورة، من، إلى، وصف مؤكد أو '']
 [2,127,128,'دعاء إبراهيم وإسماعيل عليهما السلام'],[2,201,201,''],[2,250,250,''],[2,286,286,'خاتمة سورة البقرة'],[3,8,8,''],[3,16,16,''],[3,38,38,'دعاء زكريا عليه السلام'],[3,147,147,''],[3,191,194,''],[7,23,23,'دعاء آدم وحواء عليهما السلام'],[7,126,126,''],[10,85,86,''],[12,101,101,'دعاء يوسف عليه السلام'],[14,40,41,'دعاء إبراهيم عليه السلام'],[17,24,24,'الدعاء للوالدين'],[18,10,10,'دعاء الفتية'],[20,25,28,'دعاء موسى عليه السلام'],[20,114,114,''],[21,83,83,'دعاء أيوب عليه السلام'],[21,87,87,'دعاء يونس عليه السلام'],[23,97,98,''],[23,118,118,''],[25,74,74,''],[46,15,15,''],[59,10,10,''],[66,8,8,''],[71,28,28,'دعاء نوح عليه السلام']];
Pages.duas=async(p)=>{const[Q,A]=await Promise.all([needQ(),loadScript('data/adhkar.js','ADHKAR')]);const tab=p.get('t')||'q';const pr=prog(),f=favZ();
 const prophetic=A.filter(c=>!AZ.includes(c.cat));
 const groups={q:'أدعية قرآنية',t:'التوبة والاستغفار',k:'الكرب والهم',n:'أدعية نبوية (حصن المسلم)'};
 let h='';
 if(tab==='q'){h=`<div class="notice">نص الآيات من المصحف المحقق في الموقع (لم يُكتب من الذاكرة). الدعاء المنسوب إلى نبي ذُكر اسمه حيث تثبت نسبته في سياق الآية.</div>`+QDUA.map(([s,a,z,d])=>{const t=[];for(let i=a;i<=z;i++)t.push(Q[s-1].ayahs[i-1]+' ﴿'+AR(i)+'﴾');return`<div class="card" style="margin:10px 0"><div class="muted">${d||'دعاء قرآني'} — سورة ${Q[s-1].name}: ${AR(a)}${z>a?'–'+AR(z):''}</div><div style="font-family:'Amiri Quran',serif;font-size:1.5rem;line-height:2.4;margin:6px 0">${esc(t.join(' '))}</div><div class="toolbar"><button class="btn sm" data-d="${esc(t.join(' '))} [سورة ${Q[s-1].name}: ${AR(a)}]">نسخ</button><a class="btn sm" href="surah.html?s=${s}&a=${a}#a${a}">اقرأ في السياق</a></div></div>`}).join('')}
 else{const names=tab==='t'?TAWBA:tab==='k'?KARB:null;const cats=names?A.filter(c=>names.includes(c.cat)):prophetic.filter(c=>!TAWBA.includes(c.cat)&&!KARB.includes(c.cat));const cid=+(p.get('id')||0);
  h=`<div class="notice">${SRC}</div>`+(tab==='n'?`<div class="toolbar"><select class="field" id="dc" style="min-width:260px">${cats.map(c=>`<option value="${c.id}" ${c.id===cid?'selected':''}>${c.cat}</option>`).join('')}</select><input class="field" id="dq" placeholder="بحث في الأدعية"></div>`:'')+`<div id="dl"></div>`;
  setTimeout(()=>{const dl=$('#dl');const draw=(list)=>{dl.innerHTML=list.map(c=>`<h2 class="sec" style="font-size:1.4rem">${c.cat}</h2>`+c.items.map((it,i)=>itemHtml(c.id,i,it,pr,f)).join('')).join('')||'<div class="notice">لا نتائج</div>'};
   if(tab==='n'){const sel=$('#dc');const go=()=>{const q=norm($('#dq').value);draw(q.length>1?cats.map(c=>({...c,items:c.items.filter(i=>norm(i.t).includes(q)||norm(c.cat).includes(q))})).filter(c=>c.items.length):cats.filter(c=>c.id===+sel.value))};sel.onchange=go;$('#dq').oninput=go;go()}else draw(cats);wireZ(dl)})}
 app.innerHTML=crumbs([['الأدعية']])+`<h2 class="sec">الأدعية</h2><div class="toolbar">${Object.entries(groups).map(([k,v])=>`<a class="btn ${k===tab?'gold':''}" href="duas.html?t=${k}">${v}</a>`).join('')}</div>${h}`;
 app.onclick=e=>{const b=e.target.closest('[data-d]');if(b)copy(b.dataset.d)}};
/* ================= QUIZ ================= */
const FACTS=[ // [سؤال، الصحيحة، [مشتتات], شرح، مستوى]
['كم عدد أركان الإسلام؟','خمسة',['أربعة','ستة','سبعة'],'أركان الإسلام خمسة: الشهادتان، إقام الصلاة، إيتاء الزكاة، صوم رمضان، حج البيت لمن استطاع (حديث ابن عمر، متفق عليه: البخاري ٨، مسلم ١٦).','e'],
['كم عدد أركان الإيمان؟','ستة',['خمسة','أربعة','سبعة'],'الإيمان بالله وملائكته وكتبه ورسله واليوم الآخر والقدر خيره وشره (حديث جبريل، صحيح مسلم ٨).','e'],
['ما أول سورة نزلت من القرآن الكريم (أول آياتها نزولًا)؟','العلق',['الفاتحة','المدثر','البقرة'],'أول ما نزل «اقرأ باسم ربك الذي خلق» من سورة العلق (حديث عائشة، صحيح البخاري ٣).','e'],
['كم عدد الصلوات المفروضة في اليوم والليلة؟','خمس',['ثلاث','أربع','ست'],'الصلوات المفروضة خمس: الفجر والظهر والعصر والمغرب والعشاء.','e'],
['كم ركعة في صلاة المغرب؟','ثلاث',['ركعتان','أربع','خمس'],'المغرب ثلاث ركعات.','e'],
['كم ركعة في صلاة الفجر (الفريضة)؟','ركعتان',['ثلاث','أربع','واحدة'],'فريضة الفجر ركعتان.','e'],
['في أي شهر فُرض صيام رمضان على المسلمين؟','رمضان',['شعبان','محرم','ذو الحجة'],'قال تعالى: ﴿شَهْرُ رَمَضَانَ الَّذِي أُنزِلَ فِيهِ الْقُرْآنُ﴾ [البقرة: ١٨٥].','e'],
['إلى أي جهة يتجه المسلمون في صلاتهم؟','الكعبة المشرفة بمكة المكرمة',['المسجد النبوي','المسجد الأقصى','جبل عرفات'],'قال تعالى: ﴿فَوَلِّ وَجْهَكَ شَطْرَ الْمَسْجِدِ الْحَرَامِ﴾ [البقرة: ١٤٤].','e'],
['من هو خاتم الأنبياء والمرسلين؟','محمد ﷺ',['عيسى عليه السلام','موسى عليه السلام','إبراهيم عليه السلام'],'قال تعالى: ﴿وَلَٰكِن رَّسُولَ اللَّهِ وَخَاتَمَ النَّبِيِّينَ﴾ [الأحزاب: ٤٠].','e'],
['أي نبي ابتلعه الحوت؟','يونس عليه السلام',['نوح عليه السلام','أيوب عليه السلام','يوسف عليه السلام'],'ذُكر ذلك في سورة الصافات: ١٣٩–١٤٢ وسورة الأنبياء: ٨٧.','e'],
['أي نبي نجّاه الله من النار فجعلها بردًا وسلامًا؟','إبراهيم عليه السلام',['موسى عليه السلام','هود عليه السلام','صالح عليه السلام'],'قال تعالى: ﴿قُلْنَا يَا نَارُ كُونِي بَرْدًا وَسَلَامًا عَلَىٰ إِبْرَاهِيمَ﴾ [الأنبياء: ٦٩].','e'],
['على أي نبي أُنزل الزبور؟','داود عليه السلام',['موسى عليه السلام','عيسى عليه السلام','سليمان عليه السلام'],'قال تعالى: ﴿وَآتَيْنَا دَاوُودَ زَبُورًا﴾ [النساء: ١٦٣].','m'],
['من هو الخليفة الراشد الأول؟','أبو بكر الصديق رضي الله عنه',['عمر بن الخطاب رضي الله عنه','عثمان بن عفان رضي الله عنه','علي بن أبي طالب رضي الله عنه'],'الخلفاء الراشدون بالترتيب: أبو بكر، ثم عمر، ثم عثمان، ثم علي رضي الله عنهم.','e'],
['من هو الخليفة الراشد الثالث؟','عثمان بن عفان رضي الله عنه',['أبو بكر الصديق رضي الله عنه','عمر بن الخطاب رضي الله عنه','علي بن أبي طالب رضي الله عنه'],'الخلفاء الراشدون بالترتيب: أبو بكر، ثم عمر، ثم عثمان، ثم علي رضي الله عنهم.','m'],
['إلى أي مدينة هاجر النبي ﷺ؟','المدينة المنورة (يثرب)',['الطائف','الحبشة','القدس'],'هاجر النبي ﷺ من مكة إلى المدينة المنورة، وهي الهجرة النبوية.','e'],
['في أي مدينة وُلد النبي ﷺ؟','مكة المكرمة',['المدينة المنورة','الطائف','القدس'],'وُلد النبي ﷺ في مكة المكرمة.','e'],
['من هي أول زوجات النبي ﷺ؟','خديجة بنت خويلد رضي الله عنها',['عائشة رضي الله عنها','حفصة رضي الله عنها','سودة رضي الله عنها'],'خديجة بنت خويلد رضي الله عنها أول زوجاته ﷺ.','m'],
['في أي غزوة انتصر المسلمون في رمضان من السنة الثانية للهجرة؟','بدر',['أحد','الخندق','حنين'],'كانت غزوة بدر الكبرى في رمضان من السنة الثانية للهجرة.','m'],
['كم عدد الأصناف الذين تُصرف لهم الزكاة؟','ثمانية',['خمسة','ستة','عشرة'],'قال تعالى في سورة التوبة (آية ٦٠) أصناف مصارف الزكاة، وهم ثمانية.','m'],
['على أي نبي أُنزلت التوراة؟','موسى عليه السلام',['عيسى عليه السلام','داود عليه السلام','محمد ﷺ'],'قال تعالى: ﴿وَآتَيْنَا مُوسَى الْكِتَابَ﴾، وأُنزل الإنجيل على عيسى عليه السلام.','e'],
['أي نبي كلّمه الله تكليمًا؟','موسى عليه السلام',['إبراهيم عليه السلام','نوح عليه السلام','يوسف عليه السلام'],'قال تعالى: ﴿وَكَلَّمَ اللَّهُ مُوسَىٰ تَكْلِيمًا﴾ [النساء: ١٦٤].','m'],
['أين نزل الوحي على النبي ﷺ أول مرة؟','غار حراء',['غار ثور','المسجد الحرام','جبل أحد'],'جاءه الوحي أول مرة في غار حراء (حديث عائشة، صحيح البخاري ٣).','m'],
['من الصحابي الذي لُقّب بالفاروق؟','عمر بن الخطاب رضي الله عنه',['أبو بكر الصديق رضي الله عنه','خالد بن الوليد رضي الله عنه','حمزة بن عبد المطلب رضي الله عنه'],'لُقّب عمر بن الخطاب رضي الله عنه بالفاروق.','m'],
['كم لبث نوح عليه السلام في قومه يدعوهم؟','ألف سنة إلا خمسين عامًا',['مئة عام','ثلاثمائة سنة','خمسمائة عام'],'قال تعالى: ﴿فَلَبِثَ فِيهِمْ أَلْفَ سَنَةٍ إِلَّا خَمْسِينَ عَامًا﴾ [العنكبوت: ١٤].','m'],
['كم لبث أصحاب الكهف في كهفهم؟','ثلاثمائة سنين وازدادوا تسعًا',['مئة سنة','ثلاث سنوات','ألف سنة'],'قال تعالى: ﴿وَلَبِثُوا فِي كَهْفِهِمْ ثَلَاثَ مِائَةٍ سِنِينَ وَازْدَادُوا تِسْعًا﴾ [الكهف: ٢٥].','h'],
['في كم يومًا خلق الله السماوات والأرض؟','ستة أيام',['سبعة أيام','ثلاثة أيام','أربعة أيام'],'قال تعالى: ﴿خَلَقَ السَّمَاوَاتِ وَالْأَرْضَ فِي سِتَّةِ أَيَّامٍ﴾ [الأعراف: ٥٤].','e'],
['ليلة القدر خير من كم شهرًا؟','ألف شهر',['مئة شهر','عشرة آلاف شهر','ألف يوم'],'قال تعالى: ﴿لَيْلَةُ الْقَدْرِ خَيْرٌ مِّنْ أَلْفِ شَهْرٍ﴾ [القدر: ٣].','e'],
['أي نبي سأل الله ملكًا لا ينبغي لأحد من بعده؟','سليمان عليه السلام',['داود عليه السلام','يوسف عليه السلام','موسى عليه السلام'],'قال تعالى: ﴿رَبِّ اغْفِرْ لِي وَهَبْ لِي مُلْكًا لَّا يَنبَغِي لِأَحَدٍ مِّن بَعْدِي﴾ [ص: ٣٥].','m'],
['أي نبي قال الله عنه: ﴿وَرَفَعْنَاهُ مَكَانًا عَلِيًّا﴾؟','إدريس عليه السلام',['هود عليه السلام','صالح عليه السلام','شعيب عليه السلام'],'ورد ذلك في سورة مريم: ٥٦–٥٧.','h'],
['أي نبي وصفه الله بقوله: ﴿إِنَّا وَجَدْنَاهُ صَابِرًا نِّعْمَ الْعَبْدُ﴾؟','أيوب عليه السلام',['يعقوب عليه السلام','نوح عليه السلام','يحيى عليه السلام'],'ورد ذلك في سورة ص: ٤٤.','m'],
['أي نبي اتخذه الله خليلًا؟','إبراهيم عليه السلام',['موسى عليه السلام','نوح عليه السلام','يوسف عليه السلام'],'قال تعالى: ﴿وَاتَّخَذَ اللَّهُ إِبْرَاهِيمَ خَلِيلًا﴾ [النساء: ١٢٥].','m'],
['أي نبي كان يُحيي الموتى بإذن الله؟','عيسى عليه السلام',['موسى عليه السلام','سليمان عليه السلام','زكريا عليه السلام'],'قال تعالى على لسان عيسى: ﴿وَأُحْيِي الْمَوْتَىٰ بِإِذْنِ اللَّهِ﴾ [آل عمران: ٤٩].','e'],
['أي نبي رأى في المنام أنه يذبح ابنه؟','إبراهيم عليه السلام',['نوح عليه السلام','يعقوب عليه السلام','زكريا عليه السلام'],'ورد ذلك في سورة الصافات: ١٠٢.','m'],
['أي نبي رفع قواعد الكعبة مع ابنه إسماعيل؟','إبراهيم عليه السلام',['نوح عليه السلام','آدم عليه السلام','موسى عليه السلام'],'قال تعالى: ﴿وَإِذْ يَرْفَعُ إِبْرَاهِيمُ الْقَوَاعِدَ مِنَ الْبَيْتِ وَإِسْمَاعِيلُ﴾ [البقرة: ١٢٧].','e']];
const SURAH_FAMOUS=[1,2,18,36,55,67,112,113,114,108,103,109,110,111,105,106,107,97,93,94,87,36,56,78,81,82];
function mkBank(Q){const B=[];const nameQ=s=>'سورة '+s.name;const uniq={};Q.forEach(s=>s.ayahs.forEach(a=>{uniq[a]=(uniq[a]||0)+1}));
 const lvl=n=>SURAH_FAMOUS.includes(n)?'e':(n%3?'m':'h');
 const rnd=(a,k,ex)=>{const o=new Set();while(o.size<k){const v=a[Math.floor(Math.random()*a.length)];if(v!==ex)o.add(v)}return[...o]};
 Q.forEach(s=>{
  const near=[...new Set([s.count-2,s.count-1,s.count+1,s.count+2,s.count+5,s.count*2].filter(v=>v>0&&v!==s.count))];
  B.push({id:'cnt'+s.n,cat:'القرآن الكريم',l:lvl(s.n),q:`كم عدد آيات ${nameQ(s)}؟`,a:String(s.count),d:near.sort(()=>Math.random()-.5).slice(0,3).map(String),e:`عدد آيات ${nameQ(s)} ${AR(s.count)} آية.`});
  B.push({id:'ord'+s.n,cat:'القرآن الكريم',l:lvl(s.n),q:`ما ترتيب ${nameQ(s)} في المصحف؟`,a:String(s.n),d:[...new Set([s.n-1,s.n+1,s.n+2,s.n-2].filter(v=>v>0&&v<115))].slice(0,3).map(String),e:`${nameQ(s)} هي السورة رقم ${AR(s.n)} في ترتيب المصحف.`});
  B.push({id:'tf'+s.n,cat:'القرآن الكريم',l:lvl(s.n),tf:true,q:`${nameQ(s)} ${Math.random()<.5?s.type:(s.type==='مكية'?'مدنية':'مكية')}.`,_s:s});
 });
 B.forEach(b=>{if(b._s){const s=b._s;const claimed=b.q.endsWith('مكية.')?'مكية':'مدنية';b.a=claimed===s.type?'صح':'خطأ';b.d=[b.a==='صح'?'خطأ':'صح'];b.e=`${nameQ(s)} ${s.type}.`;delete b._s}});
 const names=Q.map(x=>x.name);
 Q.forEach(s=>{s.ayahs.forEach((t,ai)=>{
  if(uniq[t]===1&&t.length>=25&&t.length<=200&&s.count>1){B.push({id:'ay'+s.n+'_'+ai,cat:'القرآن الكريم',l:t.length<70?'m':'h',q:`من أي سورة هذه الآية؟\n﴿${t}﴾`,a:s.name,d:rnd(names,3,s.name),e:`الآية ${AR(ai+1)} من سورة ${s.name}.`})}
  if(ai+1<s.count&&uniq[t]===1&&t.length>=20&&t.length<=160&&s.ayahs[ai+1].length<=200&&s.count>=4){const pool=s.ayahs.filter((x,j)=>j!==ai+1&&x!==s.ayahs[ai+1]);if(pool.length>=3)B.push({id:'nx'+s.n+'_'+ai,cat:'القرآن الكريم',l:s.n<=114&&s.count<=20?'m':'h',q:`ما الآية التي تلي قوله تعالى في سورة ${s.name}:\n﴿${t}﴾`,a:s.ayahs[ai+1],d:rnd(pool,3,s.ayahs[ai+1]),e:`هذه الآية ${AR(ai+2)} من سورة ${s.name}.`})}
 })});
 Q.forEach((s,i)=>{if(i<113){const nx=Q[i+1];B.push({id:'nxs'+s.n,cat:'القرآن الكريم',l:lvl(s.n),q:`ما السورة التي تلي ${nameQ(s)} في ترتيب المصحف؟`,a:nx.name,d:rnd(names,3,nx.name),e:`تلي ${nameQ(s)} سورة ${nx.name}.`})}
  if(i>0){const pv=Q[i-1];B.push({id:'pvs'+s.n,cat:'القرآن الكريم',l:lvl(s.n),q:`ما السورة التي تسبق ${nameQ(s)} في ترتيب المصحف؟`,a:pv.name,d:rnd(names,3,pv.name),e:`تسبق ${nameQ(s)} سورة ${pv.name}.`})}
  if(window.JUZ){const j=window.JUZ[i];B.push({id:'juz'+s.n,cat:'القرآن الكريم',l:'h',q:`في أي جزء تبدأ ${nameQ(s)}؟`,a:'الجزء '+AR(j),d:[...new Set([j-1,j+1,j+2,j-2,j+3].filter(v=>v>=1&&v<=30))].slice(0,3).map(v=>'الجزء '+AR(v)),e:`تبدأ ${nameQ(s)} في الجزء ${AR(j)}.`})}});
 B.push({id:'prophnames',cat:'الأنبياء',l:'m',q:'أي السور التالية سُمّيت باسم نبي؟',a:'يوسف',d:['الكهف','النمل','الحجر'.replace('الحجر','القصص')],e:'سورة يوسف سُمّيت باسم نبي الله يوسف عليه السلام.'});
 const long=Q.reduce((a,b)=>b.count>a.count?b:a),short=Q.reduce((a,b)=>b.count<a.count?b:a);
 B.push({id:'long',cat:'القرآن الكريم',l:'e',q:'ما أطول سورة في القرآن الكريم؟',a:long.name,d:['آل عمران','النساء','الأعراف'],e:`أطول سورة هي ${long.name} (${AR(long.count)} آية).`});
 B.push({id:'short',cat:'القرآن الكريم',l:'e',q:'ما أقصر سورة في القرآن الكريم من حيث عدد الآيات؟',a:short.name,d:['الإخلاص','العصر','النصر'],e:`أقصر سورة هي ${short.name} (${AR(short.count)} آيات).`});
 B.push({id:'nobasm',cat:'القرآن الكريم',l:'m',q:'أي سورة لا تبدأ بالبسملة؟',a:'التوبة',d:['الأنفال','الفاتحة','يونس'],e:'سورة التوبة هي السورة الوحيدة التي لا تبدأ بالبسملة.'});
 B.push({id:'cnt114',cat:'القرآن الكريم',l:'e',q:'كم عدد سور القرآن الكريم؟',a:'١١٤',d:['١١٣','١١٦','١٢٠'],e:'عدد السور ١١٤ سورة.'});
 B.push({id:'cntA',cat:'القرآن الكريم',l:'h',q:'كم عدد آيات القرآن الكريم في المصحف (برواية حفص)؟',a:'٦٢٣٦',d:['٦٦٦٦','٦٠٠٠','٦٣٤٨'],e:'عدد الآيات ٦٢٣٦ آية بعد العدّ الكوفي، كما في المصدر المعتمد.'});
 FACTS.forEach((f,i)=>B.push({id:'f'+i,cat:/نبي|موسى|يونس|داود|إبراهيم|الزبور|التوراة/.test(f[0])?'الأنبياء':/غزوة|الصحاب|الخليف|الفاروق|زوج|هاج|وُلد|غار/.test(f[0])?'السيرة والصحابة':'العقيدة والعبادات',l:f[4],q:f[0],a:f[1],d:f[2],e:f[3]}));
 return B.concat(window.EXTRA_BANK||[]).filter(x=>new Set([x.a,...x.d]).size===x.d.length+1&&x.d.length>=1)}
let BANK=null;window.__bankDbg=()=>BANK;
function seeded(seed){let s=0;for(const c of seed)s=(s*31+c.charCodeAt(0))>>>0;return()=>{s=(s*1664525+1013904223)>>>0;return s/4294967296}}
Pages.quiz=async(p)=>{const Q=await needQ();await loadScript('data/juz.js','JUZ').catch(()=>{});BANK=BANK||mkBank(Q);const cats=['الكل',...new Set(BANK.map(b=>b.cat))];const st=LS.get('qstats',{pts:0,played:0,best:0,hist:[]});const lv=Math.floor(st.pts/150)+1;
 app.innerHTML=crumbs([['الأسئلة الدينية']])+`<h2 class="sec">الأسئلة الدينية</h2><div class="notice">أسئلة القرآن مولّدة آليًا من النص المحقق في الموقع (عدد الآيات، الترتيب، مكية/مدنية، السورة). أسئلة العقيدة والأنبياء والسيرة عددها محدود ومراجَعة ومرفقة بدليل في التفسير. نضيف المزيد في المراحل القادمة بعد مراجعتها. بنك الأسئلة الحالي: ${AR(BANK.length)} سؤال.</div>
 <div class="grid"><div class="card"><div class="muted">المستوى</div><h3>${AR(lv)}</h3></div><div class="card"><div class="muted">النقاط</div><h3>${AR(st.pts)}</h3></div><div class="card"><div class="muted">اختبارات</div><h3>${AR(st.played)}</h3></div><div class="card"><div class="muted">أفضل نتيجة</div><h3>${AR(st.best)}/${AR(10)}</h3></div></div>
 <h2 class="sec">ابدأ اختبارًا</h2><div class="toolbar"><select class="field" id="qc">${cats.map(c=>`<option>${c}</option>`).join('')}</select><select class="field" id="ql"><option value="">كل المستويات</option><option value="e">سهل</option><option value="m">متوسط</option><option value="h">صعب</option></select><button class="btn gold" id="qs">ابدأ (١٠ أسئلة)</button><button class="btn primary" id="qd">تحدي اليوم</button></div><div id="qa"></div>
 <h2 class="sec">آخر النتائج</h2><div id="qh">${st.hist.length?st.hist.slice(0,8).map(h=>`<div class="muted">${h.d} — ${h.cat} — ${AR(h.s)}/${AR(h.n)}</div>`).join(''):'<div class="muted">لا نتائج بعد</div>'}</div>`;
 const run=(qs,label)=>{let i=0,score=0,pts=0;const area=$('#qa');
  const show=()=>{if(i>=qs.length){const s=LS.get('qstats',{pts:0,played:0,best:0,hist:[]});s.pts+=pts;s.played++;s.best=Math.max(s.best,score);s.hist.unshift({d:today(),cat:label,s:score,n:qs.length});s.hist=s.hist.slice(0,30);LS.set('qstats',s);
    area.innerHTML=`<div class="card" style="text-align:center"><h3>نتيجتك: ${AR(score)} من ${AR(qs.length)}</h3><div class="muted">+${AR(pts)} نقطة</div><div class="toolbar" style="justify-content:center"><button class="btn gold" id="again">إعادة الاختبار</button><a class="btn" href="quiz.html">النتائج</a></div></div>`;$('#again').onclick=()=>run(qs.slice().sort(()=>Math.random()-.5),label);return}
   const q=qs[i];const opts=[q.a,...q.d].sort(()=>Math.random()-.5);
   area.innerHTML=`<div class="card"><div class="muted">سؤال ${AR(i+1)} من ${AR(qs.length)} · ${({e:'سهل',m:'متوسط',h:'صعب'}[q.l]||'متوسط')}</div><h3 style="white-space:pre-line;font-family:'Amiri Quran','Amiri',serif;font-size:1.5rem">${esc(q.q)}</h3><div class="toolbar" style="flex-direction:column;align-items:stretch">${opts.map(o=>`<button class="btn" data-o="${esc(o)}">${esc(o)}</button>`).join('')}</div><div id="fb"></div></div>`;
   area.onclick=e=>{const b=e.target.closest('[data-o]');if(!b)return;const ok=b.dataset.o===q.a;$$('[data-o]',area).forEach(x=>{x.disabled=true;if(x.dataset.o===q.a)x.style.borderColor='var(--sky)';});if(ok){score++;pts+={e:10,m:15,h:20}[q.l]}b.style.background=ok?'rgba(110,193,228,.3)':'rgba(200,80,80,.3)';
    $('#fb').innerHTML=`<div class="notice">${ok?'✓ إجابة صحيحة':'✗ الإجابة الصحيحة: '+esc(q.a)}<br>${esc(q.e)}</div><button class="btn primary" id="nx">${i+1<qs.length?'التالي':'النتيجة'}</button>`;$('#nx').onclick=()=>{i++;show()}}};show()};
 const pick=(pool,rand)=>{const out=[];let last='';const a=pool.slice();for(let k=a.length-1;k>0;k--){const j=Math.floor(rand()*(k+1));[a[k],a[j]]=[a[j],a[k]]}const prev=LS.get('qprev',[]);const fresh=a.filter(x=>!prev.includes(x.id));(fresh.length>=10?fresh:a).slice(0,10).forEach(x=>out.push(x));return out};
 $('#qs').onclick=()=>{const c=$('#qc').value,l=$('#ql').value;const pool=BANK.filter(b=>(c==='الكل'||b.cat===c)&&(!l||b.l===l));if(pool.length<4){toast('عدد الأسئلة غير كافٍ');return}const qs=pick(pool,Math.random);LS.set('qprev',qs.map(x=>x.id));run(qs,c)};
 $('#qd').onclick=()=>{const r=seeded('amal'+today());const pool=BANK.slice().sort((x,y)=>x.id<y.id?-1:1);const a=pool.slice();for(let k=a.length-1;k>0;k--){const j=Math.floor(r()*(k+1));[a[k],a[j]]=[a[j],a[k]]}run(a.slice(0,10),'تحدي اليوم '+today())}};
if(window.AmalExtra9)window.AmalExtra9(API);
if(window.AmalExtra11)window.AmalExtra11(API);
if(window.AmalExtra12)window.AmalExtra12(API);
};
