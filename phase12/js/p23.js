/* Amal v55 preview: Zad Ramadan (phase 1). All texts come from the site's own sourced data; nothing is written here except short titles. */
window.AmalExtra23=function(API){
const {Pages,app,$,$$,LS,AR,esc,norm,loadScript,needQ,crumbs,toast,copy}=API;
if(!Pages)return;
const css=`<style id="zcss">
.zad{--zg:#e2c779}
.zad .zh{position:relative;overflow:hidden;border:1px solid var(--gold);border-radius:22px;padding:22px 16px 18px;text-align:center;background:radial-gradient(120% 140% at 50% -10%,#1d2a6b 0,#0b1230 62%);color:#f6f1e6}
.zad .zh h2{margin:6px 0 2px;font-family:Amiri,serif;font-size:1.9rem;color:var(--zg)}
.zad .zh p{margin:2px 0;color:#d8d4ea}
.zad .zs{position:absolute;inset:0;pointer-events:none;background-image:radial-gradient(1.5px 1.5px at 12% 20%,#fff8 50%,transparent 51%),radial-gradient(1.5px 1.5px at 70% 12%,#fff9 50%,transparent 51%),radial-gradient(1px 1px at 40% 40%,#fff7 50%,transparent 51%),radial-gradient(1.5px 1.5px at 88% 55%,#fff8 50%,transparent 51%),radial-gradient(1px 1px at 25% 75%,#fff7 50%,transparent 51%)}
.zad .zl{position:absolute;top:0;width:34px;transform-origin:50% 0;animation:zsw 5s ease-in-out infinite}
.zad .zl.a{right:14px}.zad .zl.b{left:14px;animation-delay:-2.5s}
@keyframes zsw{0%,100%{transform:rotate(-4deg)}50%{transform:rotate(4deg)}}
@media (prefers-reduced-motion:reduce){.zad .zl{animation:none}}
.zad .zc{border:1px solid var(--cardb);border-radius:18px;background:var(--card);padding:14px;margin:12px 0}
.zad .zc h3{margin:0 0 8px;color:var(--gold2);font-family:Amiri,serif;font-size:1.25rem}
.zad .zbar{height:10px;border-radius:8px;background:rgba(255,255,255,.12);overflow:hidden}.zad .zbar i{display:block;height:100%;background:linear-gradient(90deg,var(--gold),var(--zg))}
.zad .zg{display:grid;grid-template-columns:repeat(6,1fr);gap:7px;margin:8px 0}
.zad .zg button{font:inherit;cursor:pointer;border:1px solid var(--cardb);border-radius:12px;background:var(--card);color:var(--text);padding:6px 0;min-height:48px;position:relative;line-height:1.2}
.zad .zg button b{display:block;font-size:1.05rem}.zad .zg button small{display:block;font-size:.66rem;color:var(--muted)}
.zad .zg button.done{background:linear-gradient(135deg,rgba(201,165,75,.35),rgba(201,165,75,.12));border-color:var(--gold)}
.zad .zg button.done::after{content:'✓';position:absolute;top:1px;left:5px;color:var(--zg);font-size:.8rem}
.zad .zg button.sel{outline:2px solid var(--zg)}.zad .zg button.tod{box-shadow:0 0 0 2px var(--sky) inset}
.zad .zg button.ten{border-style:dashed}
.zad .zv{font-family:'Amiri Quran','Amiri',serif;font-size:1.6rem;line-height:2.3;margin:6px 0;text-align:center}
.zad .zt{font-family:Amiri,serif;font-size:1.25rem;line-height:2.1;margin:6px 0}
.zad .ztf{font-size:1rem;line-height:1.9}
.zad .zm{color:var(--muted);font-size:.86rem}
.zad .zr{display:flex;gap:6px;flex-wrap:wrap;margin-top:8px}
.zad details{margin:6px 0}.zad summary{cursor:pointer;color:var(--zg)}
.zad textarea,.zad input[type=text],.zad input[type=search]{width:100%;box-sizing:border-box;font:inherit;border:1px solid var(--cardb);border-radius:12px;background:var(--card);color:var(--text);padding:8px 10px}
.zad textarea{min-height:90px}
.zad .zchk{display:flex;gap:8px;align-items:center;margin:8px 0;font-weight:700}
.zad .zchk input{width:22px;height:22px;accent-color:#c9a54b}
.zad .zsr a{display:inline-block;margin:3px;padding:3px 10px;border:1px solid var(--cardb);border-radius:12px}
@media(min-width:700px){.zad .zg{grid-template-columns:repeat(10,1fr)}}
</style>`;
/* ---------- fixed, sourced references ---------- */
// verse of each day [surah, ayah]
const VERSES=[[2,183],[2,185],[2,186],[2,187],[3,133],[3,134],[13,28],[39,53],[2,261],[59,9],[76,8],[17,23],[49,10],[65,2],[94,5],[51,18],[32,16],[25,63],[41,34],[2,255],[44,3],[73,6],[97,3],[29,45],[20,14],[33,41],[2,152],[87,14],[87,15],[2,286]];
// deed of each day: title (short, taken from the hadith meaning), then the exact hadith in the site's data [collection, chunk, index]
const DEEDS=[
['جدّد نيتك: في رمضان تُفتح أبواب الجنة','bukhari',30,7],['تسحّر: في السحور بركة','bukhari',30,32],['عجّل الفطر','bukhari',30,66],['احفظ لسانك من قول الزور','bukhari',30,12],
['الصيام جُنّة: اترك الرفث والجهل','bukhari',30,3],['أفطِر صائمًا','tirmidhi',8,125],['قيام رمضان إيمانًا واحتسابًا','bukhari',2,29],['كن جوادًا ودارِس القرآن','bukhari',30,11,'كان النبي صلى الله عليه وسلم أجود الناس'],
['تصدّق ولو بشقّ تمرة','bukhari',24,22],['صِل رحمك','bukhari',78,15],['الصلاة على وقتها وبرّ الوالدين','bukhari',9,5,'سألت النبي'],['أحسِن إلى جارك','bukhari',78,45],
['الكلمة الطيبة صدقة','bukhari',56,207],['اكفل يتيمًا أو ساهم في كفالته','bukhari',68,53],['لا تحقرنّ من المعروف شيئًا','muslim',45,190],['دُلّ على خير','tirmidhi',38,147],
['استُر على أخيك المسلم','bukhari',46,2],['أكثِر من الاستغفار','bukhari',80,3],['كلمتان خفيفتان على اللسان','bukhari',80,102],['حافظ على الصلوات الخمس','muslim',5,362],
['تحرَّ ليلة القدر في الوتر من العشر الأواخر','bukhari',32,3],['الاعتكاف في العشر الأواخر','bukhari',33,0,'كان رسول الله صلى الله عليه وسلم يعتكف'],['قُم ليلة القدر إيمانًا واحتسابًا','bukhari',30,10],['ادعُ: اللهم إنك عفوّ','tirmidhi',47,562],
['صُم يومًا في سبيل الله','muslim',13,218],['تعاهد القرآن وإن شقّ عليك','muslim',6,292],['صيام رمضان إيمانًا واحتسابًا','bukhari',2,30],['املك نفسك عند الغضب','bukhari',78,144],
['أدِّ زكاة الفطر','bukhari',24,108,'فرض رسول الله'],['فرحة الصائم عند فطره وعند لقاء ربه','bukhari',30,13]];
const SAADI=new Set([105,11,12,18,19,2,20,21,27,28,3,31,34,37,38,5,68,7,85]);
const COLN={bukhari:'صحيح البخاري',muslim:'صحيح مسلم',tirmidhi:'سنن الترمذي'};
const SAHIHAYN='من «الصحيحين»: أحاديث الكتاب صحيحة عند أهل العلم وتلقّتها الأمة بالقبول (حكم عام على الكتاب، وليس حكمًا مستقلًّا على كل حديث).';
// duas: taken in order from these categories of the site's adhkar data (Hisn al-Muslim)
const DUACATS=[['دعاء رؤية الهلال',1],['الدعاء عند إفطار الصائم',2],['الاستغفار و التوبة',6],['الدعاء بعد التشهد الأخير قبل السلام',11],['دعاء الهم والحزن',2],['دعاء الكرب',4],['دعاء قضاء الدين',2],['فضل التسبيح و التحميد، و التهليل، و التكبير',2]];
const TAF_NAME='التفسير الميسر (مجمع الملك فهد لطباعة المصحف الشريف)';
/* ---------- helpers ---------- */
const HF=new Intl.DateTimeFormat('en-u-ca-islamic-umalqura-nu-latn',{day:'numeric',month:'numeric',year:'numeric'});
const hj=d=>{const o={};HF.formatToParts(d).forEach(p=>{if(p.type!=='literal'&&p.type!=='era')o[p.type]=+p.value});return o};
const DAY=864e5;
function ramadan(){const now=new Date();now.setHours(12,0,0,0);const h=hj(now);
 if(h.month===9)return{start:new Date(now.getTime()-(h.day-1)*DAY),today:h.day,year:h.year};
 for(let i=1;i<=420;i++){const d=new Date(now.getTime()+i*DAY),x=hj(d);if(x.month===9&&x.day===1)return{start:d,today:0,year:x.year,left:i}}
 return{start:now,today:0,year:h.year,left:0}}
const gdate=(st,n)=>new Date(st.getTime()+(n-1)*DAY).toLocaleDateString('ar-EG',{weekday:'long',day:'numeric',month:'long'});
const ST=()=>{const s=LS.get('zad',null)||{};['done','deed','note','goal','fav'].forEach(k=>s[k]=s[k]||{});return s};
const save=s=>LS.set('zad',s);
const kh=()=>LS.get('khatm',{s:[],j:[]});
const lantern=`<svg viewBox="0 0 40 90" fill="none" stroke="#e2c779" stroke-width="1.6"><path d="M20 0v14"/><path d="M12 14h16l3 6H9z" fill="#c9a54b33"/><path d="M10 20c-4 10-4 26 0 36h20c4-10 4-26 0-36z" fill="#e2c77922"/><path d="M20 20v36M14 20c-2 12-2 24 0 36M26 20c2 12 2 24 0 36"/><path d="M10 56h20l-3 8H13z" fill="#c9a54b33"/><path d="M20 64v8"/><circle cx="20" cy="38" r="4" fill="#e2c779"/></svg>`;
const crescent=`<svg width="58" height="58" viewBox="0 0 60 60"><path d="M40 6A24 24 0 0 0 40 54A32 32 0 0 1 40 6Z" fill="#e2c779"/><path d="M47 14l1.6 3.4 3.6.5-2.6 2.6.6 3.7-3.2-1.8-3.2 1.8.6-3.7-2.6-2.6 3.6-.5z" fill="#fff6d6"/></svg>`;
const strip=s=>String(s).replace(/[\u064B-\u065F\u0670\u0640\u06D6-\u06ED]/g,'');
const matn=(t,from)=>{if(from){const mp=[];let st='';for(let i=0;i<t.length;i++){if(!/[\u064B-\u065F\u0670\u0640\u06D6-\u06ED]/.test(t[i])){st+=t[i];mp.push(i)}}const k=st.indexOf(from);if(k>=0)return t.slice(mp[k]).trim()}const a=t.indexOf('"'),b=t.lastIndexOf('"');if(a>=0&&b>a+8)return t.slice(a+1,b).trim();return t};
let QD=null,AD=null,HI=null;
async function data(){if(!QD)QD=await needQ();if(!AD)AD=await loadScript('data/adhkar.js','ADHKAR');if(!HI){try{HI=await loadScript('data/hadith-index.js','HINDEX')}catch(e){HI={}}}}
function duaOf(n){const seq=[];DUACATS.forEach(([c,k])=>{const cat=AD.find(x=>x.cat===c);if(cat)cat.items.slice(0,k).forEach((it,i)=>seq.push({c,i,t:it.t}))});return seq[(n-1)%seq.length]}
async function hadithOf(n){const [title,col,b,i]=DEEDS[n-1];const arr=await loadScript(`data/hadith/${col}-${b}.js`,`H_${col}_${b}`);const h=arr[i];const ch=HI&&HI[col]&&HI[col].find(x=>x.b===b);return{title,col,h,ch:ch&&ch.ar?ch.ar:'',from:DEEDS[n-1][4]}}
const tag=(s)=>`<span class="tag">${esc(s)}</span>`;
/* ---------- page ---------- */
Pages.zad=async()=>{
 await data();const R=ramadan(),S=ST();const q=new URLSearchParams(location.search);
 let sel=+q.get('d')||R.today||1;if(sel<1||sel>30)sel=1;
 const doneCount=()=>Object.keys(ST().done).filter(k=>ST().done[k]).length;
 const inRamadan=R.today>0;
 app.innerHTML=crumbs([['زاد رمضان']])+css+`<div class="zad">
 <div class="zh"><div class="zs"></div><div class="zl a">${lantern}</div><div class="zl b">${lantern}</div>${crescent}<h2>زاد رمضان – رحلة إيمانية</h2><p>ثلاثون يومًا: آية، وحديث وعمل، ودعاء، وورد، ومحاسبة للنفس</p></div>
 <div class="zc"><div class="zm">${inRamadan?`اليوم ${AR(R.today)} من رمضان ${AR(R.year)} هـ (بالتقويم الحسابي لأم القرى).`:`رمضان ${AR(R.year)} هـ يبدأ حسابيًا ${gdate(R.start,1)} (بعد نحو ${AR(R.left||0)} يومًا). التواريخ هنا بالحساب (أم القرى)، والبداية الفعلية تُحدَّد برؤية الهلال، فالمحتوى مرتّب بالأيام ١ إلى ٣٠ ويصلح لأي بداية.`}</div>
 <div style="margin-top:8px"><b id="zpc"></b><div class="zbar"><i id="zpb"></i></div></div></div>
 <input type="search" id="zq" placeholder="ابحث في زاد رمضان (آية، حديث، دعاء، عمل)…" aria-label="بحث"><div class="zsr" id="zsr"></div>
 <div class="zc"><h3>تقويم الثلاثين يومًا</h3><div class="zg" id="zg"></div><div class="zm">اضغط على أي يوم لعرض محتواه. علامة ✓ تعني أنك أتممت اليوم. الأيام المنقّطة هي العشر الأواخر. تقدمك محفوظ على جهازك فقط.</div></div>
 <div id="zd"></div>
 <div class="zc"><h3>أدوات مساعدة</h3><div class="zr"><a class="btn" href="azkar.html#tasbeeh">المسبحة الإلكترونية</a><a class="btn" href="khatm.html">رحلة ختم القرآن</a><a class="btn" href="salah.html">مواقيت الصلاة</a><a class="btn" href="duas.html">الأدعية</a></div></div>
 <div class="zc" id="zfv"></div></div>`;
 const grid=$('#zg');
 const drawGrid=()=>{const S=ST();grid.innerHTML=Array.from({length:30},(_,i)=>{const n=i+1;return`<button data-n="${n}" class="${S.done[n]?'done':''} ${n===sel?'sel':''} ${R.today===n?'tod':''} ${n>=21?'ten':''}" aria-label="اليوم ${n}"><b>${AR(n)}</b><small>${new Date(R.start.getTime()+i*DAY).toLocaleDateString('ar-EG',{day:'numeric',month:'short'})}</small></button>`}).join('');
  const c=doneCount();$('#zpc').textContent=`أتممت ${AR(c)} من ٣٠ يومًا`;$('#zpb').style.width=(c/30*100)+'%'};
 const favBtn=(k)=>`<button class="btn sm" data-fav="${k}">${ST().fav[k]?'★ إزالة من المفضلة':'☆ مفضلة'}</button>`;
 const drawFav=()=>{const S=ST(),ks=Object.keys(S.fav).filter(k=>S.fav[k]);const nm={v:'آية',h:'عمل وحديث',d:'دعاء'};$('#zfv').innerHTML=`<h3>مفضلتي في زاد رمضان</h3>`+(ks.length?`<div class="zsr">${ks.map(k=>{const [t,n]=k.split(':');return`<a href="#" data-go="${n}">${nm[t]} · اليوم ${AR(n)}</a>`}).join('')}</div>`:'<div class="zm">لم تضف شيئًا بعد. اضغط ☆ على أي آية أو دعاء أو حديث.</div>')};
 const draw=async()=>{
  const n=sel,S=ST();const [sn,an]=VERSES[n-1];const sur=QD[sn-1];const vtxt=sur.ayahs[an-1];
  let tf='';try{const T=await loadScript('data/tafsir-muyassar.js','TAFSIR_MUYASSAR');tf=(T[sn-1]||[])[an-1]||''}catch(e){}
  let sa='';if(SAADI.has(sn))try{const SD=await loadScript(`data/saadi/${sn}.js`,'SAADI_'+sn);sa=SD&&SD[an]||''}catch(e){}
  const du=duaOf(n);let hd=null;try{hd=await hadithOf(n)}catch(e){}
  const khj=new Set(kh().j);
  const grade=hd?(hd.h[2]&&hd.h[2].length?hd.h[2].map(g=>`${esc(g[1])} ${tag(g[0])}`).join(' · '):(hd.col==='tirmidhi'?'لم تتوفر درجة في مصدر البيانات لهذا الحديث':SAHIHAYN)):'';
  $('#zd').innerHTML=`<div class="zc"><h3>اليوم ${AR(n)} · ${gdate(R.start,n)}${n>=21&&n%2?' · ليلة وتر في العشر الأواخر (تُطلب فيها ليلة القدر)':''}</h3>
  <label class="zchk"><input type="checkbox" id="zdone" ${S.done[n]?'checked':''}> أتممت يوم ${AR(n)}</label></div>
  <div class="zc" data-b="v"><h3>آية اليوم</h3><div class="zv">﴿ ${esc(vtxt)} ﴾</div><div class="zm" style="text-align:center">سورة ${esc(sur.name)} · الآية ${AR(an)} · نص مصحف المدينة (رواية حفص)</div>
   ${tf?`<details open><summary>${TAF_NAME}</summary><div class="ztf">${esc(tf)}</div></details>`:''}${sa?`<details><summary>تفسير السعدي</summary><div class="ztf">${esc(sa)}</div></details>`:''}
   <div class="zr"><button class="btn sm" data-copy="v">نسخ</button><button class="btn sm" data-share="v">مشاركة</button>${favBtn('v:'+n)}<a class="btn sm" href="surah.html?s=${sn}&a=${an}#a${an}">افتح في المصحف</a></div></div>
  <div class="zc" data-b="h"><h3>عمل اليوم</h3><label class="zchk"><input type="checkbox" id="zdeed" ${S.deed[n]?'checked':''}> ${esc(DEEDS[n-1][0])}</label>
   ${hd?`<div class="zt" id="zhm">${esc(matn(hd.h[1],hd.from))}</div><div class="zm">${COLN[hd.col]}${hd.ch?' — كتاب '+esc(hd.ch):''} — حديث رقم ${AR(hd.h[0])} (بترقيم بيانات الموقع)</div><div class="zm"><b>الدرجة:</b> ${grade}</div>
   <details><summary>النص الكامل بالإسناد</summary><div class="ztf">${esc(hd.h[1])}</div></details>
   <div class="zr"><button class="btn sm" data-copy="h">نسخ</button><button class="btn sm" data-share="h">مشاركة</button>${favBtn('h:'+n)}<a class="btn sm" href="report.html?t=hadith&c=${hd.col}&b=${DEEDS[n-1][2]}&n=${hd.h[0]}">إبلاغ عن خطأ</a></div>`:'<div class="zm">تعذر تحميل نص الحديث الآن. تحقق من الاتصال.</div>'}</div>
  <div class="zc" data-b="d"><h3>دعاء اليوم</h3><div class="zt" id="zdt">${esc(du.t)}</div><div class="zm">المصدر: حصن المسلم (من بيانات الموقع) — باب: ${esc(du.c)}</div>
   <div class="zr"><button class="btn sm" data-copy="d">نسخ</button><button class="btn sm" data-share="d">مشاركة</button>${favBtn('d:'+n)}</div></div>
  <div class="zc"><h3>ورد القرآن</h3><label class="zchk"><input type="checkbox" id="zjz" ${khj.has(n)?'checked':''}> قرأت الجزء ${AR(n)} (جزء لكل يوم)</label><div class="zm">يتزامن مع <a href="khatm.html">رحلة الختم</a> في الموقع.</div></div>
  <div class="zc"><h3>محاسبة النفس</h3><label>هدفي اليوم</label><input type="text" id="zgo" value="${esc(S.goal[n]||'')}" maxlength="200"><label style="display:block;margin-top:8px">ما أنجزته وما قصّرت فيه</label><textarea id="znt" maxlength="2000">${esc(S.note[n]||'')}</textarea><div class="zm">يُحفظ تلقائيًا على جهازك فقط.</div></div>`;
  const sv=(k,v)=>{const s=ST();s[k][n]=v;save(s)};
  $('#zdone').onchange=e=>{sv('done',e.target.checked);drawGrid()};
  $('#zdeed').onchange=e=>sv('deed',e.target.checked);
  $('#zgo').oninput=e=>sv('goal',e.target.value);$('#znt').oninput=e=>sv('note',e.target.value);
  $('#zjz').onchange=e=>{const k=kh();k.j=e.target.checked?[...new Set([...(k.j||[]),n])]:(k.j||[]).filter(x=>x!==n);LS.set('khatm',k)};
  const txt={v:`﴿ ${vtxt} ﴾\n[سورة ${sur.name}: ${AR(an)}]`,h:hd?`${matn(hd.h[1],hd.from)}\n[${COLN[hd.col]} — حديث رقم ${AR(hd.h[0])}]`:'',d:`${du.t}\n[حصن المسلم]`};
  $$('#zd [data-copy]').forEach(b=>b.onclick=()=>copy(txt[b.dataset.copy]));
  $$('#zd [data-share]').forEach(b=>b.onclick=()=>window.shareMenu({title:'زاد رمضان',text:txt[b.dataset.share],url:new URL('zad.html?d='+n,location.href).href}));
  $$('#zd [data-fav]').forEach(b=>b.onclick=()=>{const s=ST(),k=b.dataset.fav;s.fav[k]=!s.fav[k];save(s);b.textContent=s.fav[k]?'★ إزالة من المفضلة':'☆ مفضلة';drawFav()});
 };
 grid.onclick=e=>{const b=e.target.closest('[data-n]');if(!b)return;sel=+b.dataset.n;history.replaceState(null,'','zad.html?d='+sel);drawGrid();draw();$('#zd').scrollIntoView({behavior:'smooth',block:'start'})};
 $('#zfv').onclick=e=>{const a=e.target.closest('[data-go]');if(!a)return;e.preventDefault();sel=+a.dataset.go;drawGrid();draw();$('#zd').scrollIntoView({behavior:'smooth'})};
 const idx=Array.from({length:30},(_,i)=>{const n=i+1,[sn,an]=VERSES[i],du=duaOf(n);return{n,v:norm(QD[sn-1].ayahs[an-1]),d:norm(du.t),t:norm(DEEDS[i][0])}});
 $('#zq').oninput=e=>{const k=norm(e.target.value.trim());const o=$('#zsr');if(k.length<2){o.innerHTML='';return}
  const r=[];idx.forEach(x=>{if(x.t.includes(k))r.push([x.n,'عمل']);if(x.v.includes(k))r.push([x.n,'آية']);if(x.d.includes(k))r.push([x.n,'دعاء'])});
  o.innerHTML=r.length?r.slice(0,24).map(([n,t])=>`<a href="#" data-go="${n}">اليوم ${AR(n)} · ${t}</a>`).join(''):'<div class="zm">لا نتائج.</div>'};
 $('#zsr').onclick=e=>{const a=e.target.closest('[data-go]');if(!a)return;e.preventDefault();sel=+a.dataset.go;drawGrid();draw();$('#zd').scrollIntoView({behavior:'smooth'})};
 drawGrid();drawFav();await draw();
};
};
