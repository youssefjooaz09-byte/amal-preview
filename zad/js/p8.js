window.AmalExtra8=function(API){
const {Pages,app,$,$$,LS,AR,esc,norm,loadScript,needQ,toast,crumbs,route}=API;
const old=Pages.library;Pages.sources=old;
const libCSS=`<style>
.bk{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:14px}
.bkc{position:relative;display:flex;flex-direction:column;gap:8px;text-decoration:none;color:inherit}
.cov{aspect-ratio:3/4;border-radius:10px;border:2px solid var(--gold);background:linear-gradient(160deg,#0c231c,#275344 70%,#1f6a50);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:14px;position:relative;overflow:hidden;box-shadow:var(--shadow)}
.cov:before{content:"";position:absolute;inset:7px;border:1px solid rgba(226,199,121,.55);border-radius:6px;pointer-events:none}
.cov b{font-family:'Reem Kufi','Amiri',serif;font-size:1.15rem;line-height:1.7;color:#e2c779}
.cov i{font-style:normal;margin-top:10px;font-size:.78rem;color:#f6f1e6;opacity:.85}
.cov .o{font-size:1.6rem;color:#c9a54b;margin-bottom:8px}
.fv{position:absolute;top:8px;left:8px;z-index:2;background:rgba(12,35,28,.8);border:1px solid var(--gold);color:var(--gold2);border-radius:50%;width:34px;height:34px;cursor:pointer;font-size:1.1rem}
.rd{display:flex;flex-direction:column;align-items:center;gap:10px}
.rd canvas{max-width:100%;background:#fff;border-radius:6px;box-shadow:var(--shadow)}
.rdw{width:100%;overflow:auto;max-height:80vh;text-align:center;border:1px solid var(--cardb);border-radius:10px;padding:8px}
.im{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:14px}
.mono{width:84px;height:84px;border-radius:50%;margin:0 auto 8px;border:2px solid var(--gold);background:linear-gradient(160deg,#0c231c,#1f6a50);display:flex;align-items:center;justify-content:center;font-family:'Aref Ruqaa','Amiri',serif;font-size:2.4rem;color:#e2c779}
</style>`;
const LIB=()=>loadScript('data/library.js','LIBRARY');
const fav=()=>LS.get('libfav',[]);
const cover=b=>`<div class="cov"><div class="o">۞</div><b>${esc(b.t)}</b><i>${esc(b.a)}</i></div>`;
Pages.library=async(p)=>{const L=await LIB();let q='',cat='',au='';
 const cats=[...new Set(L.map(b=>b.c))],aus=[...new Set(L.map(b=>b.a))];
 app.innerHTML=crumbs([['المكتبة الإسلامية']])+libCSS+`<h2 class="sec">المكتبة الإسلامية</h2><div class="notice">${AR(L.length)} كتابًا بصيغة PDF من موقع «دار الإسلام IslamHouse» (مشروع دعوي مجاني التوزيع، يتبع المكتب التعاوني بالربوة). لا توجد نسخ مقرصنة، ولكل كتاب رابط مصدره. الأغلفة تصميم زخرفي من الموقع وليست أغلفة الطبعات. <a href="sources.html">فهرس مصادر الموقع</a></div>
 <div class="toolbar"><input class="field" id="lq" placeholder="ابحث باسم الكتاب أو المؤلف" style="flex:1;min-width:180px"><select class="field" id="lc"><option value="">كل المواضيع</option>${cats.map(c=>`<option>${esc(c)}</option>`).join('')}<option value="__f">المفضلة ★</option></select><select class="field" id="la"><option value="">كل المؤلفين</option>${aus.map(c=>`<option>${esc(c)}</option>`).join('')}</select></div><div class="bk" id="bk"></div>`;
 const draw=()=>{const F=fav(),n=norm(q);const R=L.filter(b=>(!n||norm(b.t+' '+b.a).includes(n))&&(!cat||(cat==='__f'?F.includes(b.id):b.c===cat))&&(!au||b.a===au));
  $('#bk').innerHTML=R.length?R.map(b=>`<div class="card bkc"><button class="fv" data-f="${b.id}" aria-label="مفضلة">${F.includes(b.id)?'★':'☆'}</button><a href="book.html?id=${b.id}" style="text-decoration:none;color:inherit">${cover(b)}</a><div class="muted" style="text-align:center">${esc(b.c)} · ${AR(b.mb)} م.ب</div><a class="btn sm gold" href="book.html?id=${b.id}">فتح الكتاب</a></div>`).join(''):'<div class="muted">لا نتائج.</div>'};
 $('#lq').oninput=e=>{q=e.target.value;draw()};$('#lc').onchange=e=>{cat=e.target.value;draw()};$('#la').onchange=e=>{au=e.target.value;draw()};
 $('#bk').onclick=e=>{const f=e.target.closest('[data-f]');if(!f)return;let F=fav();const i=f.dataset.f;F=F.includes(i)?F.filter(x=>x!==i):[...F,i];LS.set('libfav',F);draw()};draw()};
let pdfReady;const loadPdf=()=>pdfReady||(pdfReady=new Promise((res,rej)=>{if(window.pdfjsLib){return res(window.pdfjsLib)}const s=document.createElement('script');s.src='js/lib/pdf.min.js';s.onload=()=>{pdfjsLib.GlobalWorkerOptions.workerSrc='js/lib/pdf.worker.min.js';res(pdfjsLib)};s.onerror=()=>rej(new Error('تعذر تحميل قارئ PDF'));document.head.appendChild(s)}));
Pages.book=async(p)=>{const L=await LIB(),b=L.find(x=>x.id===p.get('id'));if(!b){app.innerHTML=crumbs([['المكتبة الإسلامية','library.html'],['غير موجود']])+'<div class="notice">الكتاب غير موجود.</div>';return}
 const F=fav();let pg=LS.get('libpos',{})[b.id]||1,sc=1.2,doc=null,rend=false,pend=null;
 app.innerHTML=crumbs([['المكتبة الإسلامية','library.html'],[b.t]])+libCSS+`<h2 class="sec">${esc(b.t)}</h2><div class="bkp"><div>${cover(b)}<div class="muted" style="margin:8px 0">المؤلف: ${esc(b.a)}<br>الموضوع: ${esc(b.c)}<br>الحجم: ${AR(b.mb)} م.ب</div>
 <div class="toolbar" style="flex-direction:column;align-items:stretch"><a class="btn gold" href="${esc(b.pdf)}" target="_blank" rel="noopener">تحميل PDF</a>${(b.more||[]).map(m=>`<a class="btn" href="${esc(m.u)}" target="_blank" rel="noopener">${esc(m.l)}</a>`).join('')}<a class="btn" href="${esc(b.src)}" target="_blank" rel="noopener">صفحة المصدر</a><button class="btn" id="bf">${F.includes(b.id)?'★ في المفضلة':'☆ أضف للمفضلة'}</button></div></div>
 <div class="rd"><div class="toolbar"><button class="btn sm" id="pn">التالي ›</button><span>صفحة <input class="field" id="pi" type="number" min="1" value="${pg}" style="width:80px"> / <b id="pt">…</b></span><button class="btn sm" id="pp">‹ السابق</button><button class="btn sm" id="zi">+</button><button class="btn sm" id="zo">−</button></div>
 <div class="toolbar"><input class="field" id="sq" placeholder="ابحث داخل الكتاب" style="min-width:180px"><button class="btn sm" id="sg">بحث</button><button class="btn sm" id="sx">إيقاف</button></div><div id="sr" class="muted" style="width:100%"></div>
 <div class="rdw"><canvas id="cv"></canvas><div id="ld" class="muted">جارٍ تحميل الكتاب (${AR(b.mb)} م.ب)…</div></div></div></div>`;
 $('#bf').onclick=()=>{let f=fav();f=f.includes(b.id)?f.filter(x=>x!==b.id):[...f,b.id];LS.set('libfav',f);$('#bf').textContent=f.includes(b.id)?'★ في المفضلة':'☆ أضف للمفضلة'};
 let lib;try{lib=await loadPdf()}catch(e){$('#ld').textContent=e.message+'. يمكنك تحميل الملف مباشرة.';return}
 const save=()=>{const o=LS.get('libpos',{});o[b.id]=pg;LS.set('libpos',o)};
 const show=async()=>{if(!doc)return;if(rend){pend=true;return}rend=true;pg=Math.min(Math.max(1,pg),doc.numPages);$('#pi').value=pg;const page=await doc.getPage(pg),dpr=window.devicePixelRatio||1,w0=page.getViewport({scale:1}).width,fit=Math.min(1,($('.rdw').clientWidth-24)/w0*1)*sc*(w0>0?1:1);const vp=page.getViewport({scale:Math.max(.3,sc*Math.min(1.6,($('.rdw').clientWidth-24)/w0))}),c=$('#cv');c.width=vp.width*dpr;c.height=vp.height*dpr;c.style.width=vp.width+'px';await page.render({canvasContext:c.getContext('2d'),viewport:vp,transform:[dpr,0,0,dpr,0,0]}).promise;save();rend=false;if(pend){pend=null;show()}};
 try{doc=await lib.getDocument({url:b.pdf,disableAutoFetch:true,disableStream:false}).promise}catch(e){$('#ld').innerHTML='تعذر فتح الملف داخل الموقع ('+esc(e.message||'خطأ')+'). حمّله من الزر.';return}
 $('#ld').remove();$('#pt').textContent=AR(doc.numPages);await show();
 $('#pn').onclick=()=>{pg++;show()};$('#pp').onclick=()=>{pg--;show()};$('#pi').onchange=e=>{pg=+e.target.value||1;show()};$('#zi').onclick=()=>{sc=Math.min(3,sc+.2);show()};$('#zo').onclick=()=>{sc=Math.max(.4,sc-.2);show()};
 let stop=false;$('#sx').onclick=()=>{stop=true};
 $('#sg').onclick=async()=>{const q=norm($('#sq').value.trim());if(!q)return;stop=false;const hits=[];$('#sr').innerHTML='جارٍ البحث…';
  for(let i=1;i<=doc.numPages&&!stop&&hits.length<30;i++){const t=await (await doc.getPage(i)).getTextContent();const s=t.items.map(x=>x.str).join(' ');if(norm(s).includes(q))hits.push(i);if(i%10===0)$('#sr').innerHTML=`جارٍ البحث… الصفحة ${AR(i)} من ${AR(doc.numPages)}`}
  $('#sr').innerHTML=hits.length?'النتائج في الصفحات: '+hits.map(h=>`<a href="#" data-g="${h}">${AR(h)}</a>`).join(' · '):(stop?'تم الإيقاف.':'لا نتائج (قد يكون الملف صورًا بلا نص قابل للبحث).');};
 $('#sr').onclick=e=>{const a=e.target.closest('[data-g]');if(!a)return;e.preventDefault();pg=+a.dataset.g;show()};
};
/* ---------------- Imams of the Two Harams ---------------- */
Pages.imams=async()=>{location.replace('reciters.html')};

/* ---------------- Majalis al-Ilm ---------------- */
const MJ=()=>loadScript('data/majalis.js','MAJALIS');
const mUrl=(S,n)=>S.pat[0]+S.pat[1]+String(n).padStart(S.pat[2],'0')+S.pat[3];
const slug=a=>encodeURIComponent(a);
const lfav=()=>LS.get('mjfav',[]);
const lpos=()=>LS.get('mjpos',{});
const sCard=S=>`<div class="card"><div class="muted">${esc(S.c)} · ${S.v?'مرئي':'صوتي'} · ${AR(S.ok.length)} درسًا</div><h3 style="margin:6px 0"><a href="series.html?id=${S.id}" style="text-decoration:none;color:inherit">${esc(S.t)}</a></h3><div class="muted"><a href="aalim.html?n=${slug(S.a)}">${esc(S.a)}</a></div><div class="toolbar" style="margin-top:8px"><a class="btn sm gold" href="series.html?id=${S.id}">فتح السلسلة</a>${lpos()[S.id]?`<a class="btn sm" href="lesson.html?s=${S.id}&n=${lpos()[S.id]}">أكمل من الدرس ${AR(lpos()[S.id])}</a>`:''}</div></div>`;
Pages.majalis=async()=>{const M=await MJ();let q='',c='',a='';const cats=['العقيدة','التفسير','الحديث','الفقه','السيرة النبوية','علوم القرآن','تزكية النفس والأخلاق'],have=new Set(M.map(x=>x.c));const aus=[...new Set(M.map(x=>x.a))];
 app.innerHTML=crumbs([['مجالس العلم']])+libCSS+`<h2 class="sec">مجالس العلم</h2><div class="notice">${AR(M.length)} سلسلة علمية (${AR(M.reduce((t,x)=>t+x.ok.length,0))} درسًا) من موقع «دار الإسلام IslamHouse»، تعمل بملفات صوت وفيديو رسمية تم التحقق من وجود كل ملف منها. عناوين الدروس بالأرقام كما هي في المصدر. التصنيفات التي ليس فيها دروس موثقة بعد: ${cats.filter(x=>!have.has(x)).join('، ')}. لا توجد ملخصات أو فوائد منسوبة لأحد، فقط وصف السلسلة من صفحة المصدر. <a href="#" id="mf">دروسي المفضلة</a></div>
 <div class="toolbar"><input class="field" id="mq" placeholder="ابحث باسم الشيخ أو عنوان السلسلة" style="flex:1"><select class="field" id="mc"><option value="">كل التصنيفات</option>${cats.map(x=>`<option ${have.has(x)?'':'disabled'}>${esc(x)}${have.has(x)?'':' (قريبًا)'}</option>`).join('')}</select><select class="field" id="ma"><option value="">كل العلماء</option>${aus.map(x=>`<option>${esc(x)}</option>`).join('')}</select></div><div class="im" id="ml"></div>`;
 const draw=()=>{const n=norm(q);const R=M.filter(x=>(!n||norm(x.t+' '+x.a).includes(n))&&(!c||x.c===c.replace(' (قريبًا)',''))&&(!a||x.a===a));$('#ml').innerHTML=R.map(sCard).join('')||'<div class="muted">لا نتائج.</div>'};
 $('#mq').oninput=e=>{q=e.target.value;draw()};$('#mc').onchange=e=>{c=e.target.value;draw()};$('#ma').onchange=e=>{a=e.target.value;draw()};
 $('#mf').onclick=e=>{e.preventDefault();const F=lfav();$('#ml').innerHTML=F.length?F.map(k=>{const [id,n]=k.split(':'),S=M.find(x=>x.id===id);return S?`<div class="card"><h3>${esc(S.t)}</h3><div class="muted">الدرس ${AR(n)} · ${esc(S.a)}</div><a class="btn sm gold" href="lesson.html?s=${id}&n=${n}">افتح الدرس</a></div>`:''}).join(''):'<div class="muted">لا دروس في المفضلة بعد.</div>'};draw()};
Pages.series=async(p)=>{const M=await MJ(),S=M.find(x=>x.id===p.get('id'));if(!S){app.innerHTML=crumbs([['مجالس العلم','majalis.html'],['غير موجود']])+'<div class="notice">السلسلة غير موجودة.</div>';return}
 const pos=lpos()[S.id],F=lfav();
 app.innerHTML=crumbs([['مجالس العلم','majalis.html'],[S.t]])+libCSS+`<h2 class="sec">${esc(S.t)}</h2><div class="card"><div class="muted">${esc(S.c)} · ${S.v?'مرئي':'صوتي'} · <a href="aalim.html?n=${slug(S.a)}">${esc(S.a)}</a></div><p>${esc(S.d)}${S.d.length>=300?'…':''}</p><div class="toolbar"><a class="btn" href="${esc(S.src)}" target="_blank" rel="noopener">المصدر الأصلي</a>${pos?`<a class="btn gold" href="lesson.html?s=${S.id}&n=${pos}">أكمل من الدرس ${AR(pos)}</a>`:`<a class="btn gold" href="lesson.html?s=${S.id}&n=${S.ok[0]}">ابدأ الدرس الأول</a>`}</div></div><div class="card" style="margin-top:12px"><h3>الدروس</h3><div id="ls" style="display:grid;gap:6px">${S.ok.map(n=>`<a class="btn sm ${n===pos?'gold':''}" style="justify-content:space-between" href="lesson.html?s=${S.id}&n=${n}"><span>الدرس ${AR(n)}</span><span>${F.includes(S.id+':'+n)?'★':''}</span></a>`).join('')}</div></div>`};
Pages.lesson=async(p)=>{const M=await MJ(),S=M.find(x=>x.id===p.get('s')),n=+p.get('n');if(!S||!S.ok.includes(n)){app.innerHTML=crumbs([['مجالس العلم','majalis.html'],['غير موجود']])+'<div class="notice">الدرس غير موجود.</div>';return}
 const u=mUrl(S,n),i=S.ok.indexOf(n),pv=S.ok[i-1],nx=S.ok[i+1],k=S.id+':'+n,F=lfav();const o=lpos();o[S.id]=n;LS.set('mjpos',o);
 app.innerHTML=crumbs([['مجالس العلم','majalis.html'],[S.t,'series.html?id='+S.id],['الدرس '+AR(n)]])+libCSS+`<h2 class="sec">${esc(S.t)} · الدرس ${AR(n)}</h2><div class="card"><div class="muted">${esc(S.c)} · <a href="aalim.html?n=${slug(S.a)}">${esc(S.a)}</a> · الدرس ${AR(n)} من ${AR(S.ok.length)}</div>
 ${S.v?`<video id="lp" controls preload="metadata" playsinline style="width:100%;max-height:70vh;background:#000;border-radius:10px;margin-top:10px" src="${esc(u)}"></video>`:`<audio id="lp" controls preload="metadata" style="width:100%;margin-top:10px" src="${esc(u)}"></audio>`}
 <div class="toolbar" style="margin-top:10px">${nx?`<a class="btn sm gold" href="lesson.html?s=${S.id}&n=${nx}">الدرس التالي ›</a>`:''}${pv?`<a class="btn sm" href="lesson.html?s=${S.id}&n=${pv}">‹ الدرس السابق</a>`:''}<button class="btn sm" id="lf">${F.includes(k)?'★ في المفضلة':'☆ أضف للمفضلة'}</button><a class="btn sm" href="${esc(u)}" target="_blank" rel="noopener">فتح الملف / تحميل</a><a class="btn sm" href="${esc(S.src)}" target="_blank" rel="noopener">المصدر الأصلي</a></div>
 <p class="muted" style="margin-top:10px">عن السلسلة (من صفحة المصدر): ${esc(S.d)}${S.d.length>=300?'…':''}</p></div>`;
 const m=$('#lp'),tk='mjt_'+k;const t=LS.get(tk,0);m.addEventListener('loadedmetadata',()=>{if(t>5&&t<m.duration-5)m.currentTime=t},{once:true});m.ontimeupdate=()=>{if(Math.floor(m.currentTime)%5===0)LS.set(tk,Math.floor(m.currentTime))};m.onended=()=>{LS.set(tk,0);if(nx)route('lesson.html?s='+S.id+'&n='+nx,true)};
 $('#lf').onclick=()=>{let f=lfav();f=f.includes(k)?f.filter(x=>x!==k):[...f,k];LS.set('mjfav',f);$('#lf').textContent=f.includes(k)?'★ في المفضلة':'☆ أضف للمفضلة'}};
Pages.aalim=async(p)=>{const M=await MJ(),a=p.get('n'),L=M.filter(x=>x.a===a);app.innerHTML=crumbs([['مجالس العلم','majalis.html'],[a||'']])+libCSS+`<h2 class="sec">${esc(a||'')}</h2><div class="notice">سلاسل الشيخ المتاحة في الموقع من المصدر الرسمي. لا أضع نبذة عن سيرته هنا إلا من مصدر موثق.</div><div class="im">${L.map(sCard).join('')||'<div class="muted">لا سلاسل.</div>'}</div>`};
};
