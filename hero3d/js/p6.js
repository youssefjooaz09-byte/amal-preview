window.AmalExtra6=function(API){
const {Pages,app,$,$$,LS,AR,esc,norm,loadScript,needQ,toast,crumbs}=API;
const WA='https://wa.me/201101850134',FB='https://www.facebook.com/share/1G125uLmT7/';
const ICW='<svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true"><path d="M20.5 3.5A11.9 11.9 0 0 0 2.1 17.9L1 23l5.3-1.4A11.9 11.9 0 0 0 12 23a11.9 11.9 0 0 0 8.5-19.5zM12 21a9.9 9.9 0 0 1-5-1.4l-.4-.2-3.1.8.8-3-.2-.4A9.9 9.9 0 1 1 12 21zm5.4-7.4c-.3-.1-1.7-.8-1.9-.9s-.5-.1-.7.1-.8.9-.9 1.1-.3.2-.6.1a8 8 0 0 1-2.4-1.5 9 9 0 0 1-1.7-2.1c-.2-.3 0-.5.1-.6l.4-.5.3-.5c.1-.2 0-.4 0-.5l-.9-2.1c-.2-.5-.5-.5-.7-.5h-.6a1.2 1.2 0 0 0-.9.4 3.6 3.6 0 0 0-1.1 2.7 6.2 6.2 0 0 0 1.3 3.3 14 14 0 0 0 5.4 4.8c2 .8 2.8.9 3.8.7a3.2 3.2 0 0 0 2.1-1.5 2.6 2.6 0 0 0 .2-1.5c-.1-.1-.3-.2-.6-.3z"/></svg>';
const ICF='<svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true"><path d="M13.5 22v-8.2h2.8l.5-3.3h-3.3V8.4c0-.9.4-1.7 1.8-1.7h1.6V3.8s-1.4-.3-2.8-.3c-2.8 0-4.5 1.7-4.5 4.7v2.3H6.8v3.3h2.8V22z"/></svg>';
const contactIcons=`<div class="contact-ic"><a href="${WA}" target="_blank" rel="noopener" title="تواصل عبر واتساب" aria-label="تواصل عبر واتساب">${ICW}</a><a href="${FB}" target="_blank" rel="noopener" title="صفحتنا على فيسبوك" aria-label="صفحتنا على فيسبوك">${ICF}</a></div>`;
/* footer contact + report link */
const ft=$('#foot');if(ft&&!$('#ftc')){ft.insertAdjacentHTML('afterbegin',`<div id="ftc" style="margin-bottom:10px"><div class="muted">تواصل معنا</div>${contactIcons}<a class="muted" href="report.html">إبلاغ عن خطأ</a></div>`)}
/* ---------- contact ---------- */
Pages.contact=async()=>{app.innerHTML=crumbs([['تواصل']])+`<h2 class="sec">تواصل معنا</h2><div class="card" style="text-align:center"><p>للاقتراحات أو الملاحظات أو التبليغ عن خطأ:</p>${contactIcons}<div class="toolbar" style="justify-content:center"><a class="btn gold" href="${WA}" target="_blank" rel="noopener">محادثة واتساب</a><a class="btn" href="${FB}" target="_blank" rel="noopener">فيسبوك</a><a class="btn" href="report.html">إبلاغ عن خطأ</a></div></div>`};
/* ---------- report an error ---------- */
Pages.report=async(p)=>{const Q=await needQ();const t=p.get('t')||'ayah';let ref='';
 if(t==='ayah'&&p.get('s')&&Q[p.get('s')-1])ref=`سورة ${Q[p.get('s')-1].name} - آية ${p.get('a')||''}`;
 else if(t==='hadith')ref=`${p.get('c')||''} - حديث رقم ${p.get('n')||''}`;
 else if(p.get('ref'))ref=p.get('ref');
 const from=p.get('from')||'';
 app.innerHTML=crumbs([['إبلاغ عن خطأ']])+`<h2 class="sec">إبلاغ عن خطأ</h2><div class="notice">إن وجدت خطأ في آية أو حديث أو معلومة، اكتب التفاصيل ثم اضغط إرسال: سيفتح تطبيق واتساب برسالة جاهزة تراجعها وترسلها بنفسك. لا يُرسل شيء تلقائيًا ولا نحفظ بياناتك.</div>
 <div class="card"><label>نوع الخطأ</label><select class="field" id="rt"><option value="آية" ${t==='ayah'?'selected':''}>آية قرآنية</option><option value="حديث" ${t==='hadith'?'selected':''}>حديث</option><option value="ذكر أو دعاء">ذكر أو دعاء</option><option value="معلومة أخرى" ${t==='info'?'selected':''}>معلومة أو نص آخر في الموقع</option><option value="مشكلة تقنية">مشكلة تقنية</option></select>
 <label>أين وجدت الخطأ؟ (سورة وآية، رقم الحديث، اسم الصفحة)</label><input class="field" id="rr" value="${esc(ref)}" style="width:100%">
 <label>ما الخطأ؟ وما الصحيح مع المصدر إن أمكن</label><textarea class="field" id="rd" rows="5" style="width:100%"></textarea>
 <div class="toolbar"><a class="btn gold" id="rs" href="#" target="_blank" rel="noopener">إرسال عبر واتساب</a><button class="btn" id="rc">نسخ الرسالة</button></div></div>`;
 const msg=()=>`إبلاغ عن خطأ في موقع «اعمل لآخرتك»\nالنوع: ${$('#rt').value}\nالموضع: ${$('#rr').value||'-'}\nالتفاصيل: ${$('#rd').value||'-'}\nالصفحة: ${from||document.referrer||location.href}`;
 const upd=()=>{$('#rs').href=WA+'?text='+encodeURIComponent(msg())};['#rt','#rr','#rd'].forEach(s=>$(s).addEventListener('input',upd));upd();
 $('#rc').onclick=()=>{navigator.clipboard.writeText(msg()).then(()=>toast('تم نسخ الرسالة'),()=>toast('تعذر النسخ'))}};
/* ---------- scholars ---------- */
Pages.scholars=async()=>{const S=await loadScript('data/scholars.js','SCHOLARS');
 app.innerHTML=crumbs([['سير العلماء']])+`<h2 class="sec">سير العلماء</h2><div class="notice">النصوص هنا مقتطفات حرفية من «سير أعلام النبلاء» للحافظ الذهبي (ت ٧٤٨هـ) كما نُسخت في ويكي مصدر العربية، دون أي تعديل أو كتابة من المنصة، وبين الرموز مثل (ع) أو (خت) رموز أصحاب الكتب الستة في الأصل. الاقتباس مقتطع من أول الترجمة، والنص الكامل في الرابط. اقتصرنا على ثلاثة أئمة لأن هذه هي التراجم التي وجدنا لها نصًا موثقًا يمكن نقله بأمانة؛ لم نكتب سيرة أحد من الذاكرة.</div>
 ${S.map(s=>`<div class="card" style="margin:12px 0"><h3>${esc(s.name)}</h3><div class="muted">المصدر: الذهبي، سير أعلام النبلاء، ويكي مصدر · <a href="${s.url}" target="_blank" rel="noopener">النص الكامل</a>${s.cut?' · مقتطع':''}</div>${s.excerpt.map(t=>`<p style="font-family:Amiri,serif;font-size:1.25rem;line-height:2.2">${esc(t)}</p>`).join('')}<a class="muted" href="report.html?t=info&ref=${encodeURIComponent('سير العلماء - '+s.name)}">إبلاغ عن خطأ</a></div>`).join('')}`};
/* ---------- wallpapers + share cards (generated in the browser) ---------- */
const SIZES={m:[1080,1920,'موبايل ١٠٨٠×١٩٢٠'],d:[1920,1080,'كمبيوتر ١٩٢٠×١٠٨٠'],s:[1080,1080,'مربع للمشاركة ١٠٨٠×١٠٨٠']};
const DESIGNS=[['نجمة ذهبية على كحلي',{a:'#0b1230',b:'#2d1a5a',g:'#c9a54b',txt:'#f6f1e6',p:'star'}],['أقواس بنفسجية',{a:'#1b0f45',b:'#5b2a9e',g:'#e2c779',txt:'#fbf6e9',p:'arch'}],['دوائر ذهبية',{a:'#070c22',b:'#1d1450',g:'#d8b65c',txt:'#f6f1e6',p:'circ'}],['وهج الغروب',{a:'#2a1458',b:'#a0602a',g:'#f0d38a',txt:'#fff8e6',p:'dots'}],['ورق فاتح',{a:'#f7f0de',b:'#eadfc0',g:'#8a6d1f',txt:'#1b1b3a',p:'star'}],['كحلي هادئ',{a:'#0e1a3d',b:'#0e1a3d',g:'#c9a54b',txt:'#f6f1e6',p:'none'}]];
function pattern(c,w,h,d){const ctx=c;ctx.save();ctx.strokeStyle=d.g;ctx.fillStyle=d.g;ctx.globalAlpha=.18;ctx.lineWidth=2;const u=Math.max(w,h)/14;
 if(d.p==='star'){for(let y=0;y<h+u;y+=u)for(let x=0;x<w+u;x+=u){ctx.save();ctx.translate(x,y);for(let k=0;k<2;k++){ctx.rotate(k?Math.PI/4:0);ctx.strokeRect(-u*.32,-u*.32,u*.64,u*.64)}ctx.restore()}}
 else if(d.p==='circ'){for(let y=0;y<h+u;y+=u)for(let x=0;x<w+u;x+=u){ctx.beginPath();ctx.arc(x,y,u*.5,0,7);ctx.stroke();ctx.beginPath();ctx.arc(x,y,u*.25,0,7);ctx.stroke()}}
 else if(d.p==='arch'){for(let y=0;y<h+u;y+=u*1.2)for(let x=0;x<w+u;x+=u){ctx.beginPath();ctx.moveTo(x-u/2,y+u*.6);ctx.lineTo(x-u/2,y);ctx.quadraticCurveTo(x,y-u*.6,x+u/2,y);ctx.lineTo(x+u/2,y+u*.6);ctx.stroke()}}
 else if(d.p==='dots'){for(let y=u/4;y<h;y+=u/2)for(let x=u/4;x<w;x+=u/2){ctx.beginPath();ctx.arc(x,y,3,0,7);ctx.fill()}}
 ctx.restore();
 ctx.save();ctx.globalAlpha=.9;ctx.strokeStyle=d.g;ctx.lineWidth=6;const m=Math.min(w,h)*.04;ctx.strokeRect(m,m,w-2*m,h-2*m);ctx.lineWidth=2;ctx.strokeRect(m*1.6,m*1.6,w-3.2*m,h-3.2*m);ctx.restore()}
function wrap(ctx,text,maxW){const words=text.split(/\s+/);const L=[];let cur='';for(const w of words){const t=cur?cur+' '+w:w;if(ctx.measureText(t).width>maxW&&cur){L.push(cur);cur=w}else cur=t}if(cur)L.push(cur);return L}
async function render(o){await Promise.all([document.fonts.load('48px Amiri'),document.fonts.load('48px "Amiri Quran"'),document.fonts.load('bold 40px Cairo')]).catch(()=>{});
 const [w,h]=SIZES[o.size],d=DESIGNS[o.design][1];const cv=document.createElement('canvas');cv.width=w;cv.height=h;const x=cv.getContext('2d');
 const gr=x.createLinearGradient(0,0,w*.4,h);gr.addColorStop(0,d.a);gr.addColorStop(1,d.b);x.fillStyle=gr;x.fillRect(0,0,w,h);
 const rg=x.createRadialGradient(w/2,h*.4,10,w/2,h*.4,Math.max(w,h)*.7);rg.addColorStop(0,'rgba(255,255,255,.10)');rg.addColorStop(1,'rgba(0,0,0,.25)');x.fillStyle=rg;x.fillRect(0,0,w,h);
 pattern(x,w,h,d);x.direction='rtl';x.textAlign='center';x.textBaseline='alphabetic';
 const pad=Math.min(w,h)*.12;let ok=true;
 x.fillStyle=d.g;x.font=`bold ${Math.round(Math.min(w,h)*.035)}px Cairo, Tajawal, sans-serif`;x.fillText('اعمل لآخرتك',w/2,pad*.85);
 if(o.text){const maxW=w-pad*2,maxH=h-pad*2.9;let fs=Math.round(Math.min(w,h)*.07),lines;const fam=o.quran?'"Amiri Quran", Amiri, serif':'Amiri, serif';
  for(;fs>=26;fs-=2){x.font=`${fs}px ${fam}`;lines=wrap(x,o.text,maxW);if(lines.length*fs*1.75<=maxH)break}
  if(fs<26||lines.length*fs*1.75>maxH){ok=false}
  else{const lh=fs*1.75,tot=lines.length*lh,y0=(h-tot)/2+lh*.7+pad*.1;x.fillStyle=d.txt;lines.forEach((l,i)=>x.fillText(l,w/2,y0+i*lh));
   x.font=`${Math.round(Math.min(w,h)*.032)}px Cairo, Tajawal, sans-serif`;x.fillStyle=d.g;x.fillText(o.src,w/2,h-pad*.8)}}
 return{cv,ok}}
Pages.wallpapers=async(p)=>{const Q=await needQ();
 app.innerHTML=crumbs([['مركز الخلفيات الإسلامية']])+`<h2 class="sec">مركز الخلفيات الإسلامية</h2><div class="notice">تصاميم هندسية وتدرجات لونية تُرسم داخل متصفحك، فلا صور محمية ولا صور لأشخاص. النص القرآني من مصحف المدينة (حفص) كما في الموقع، والأذكار من حصن المسلم، والأحاديث من الأربعين النووية، ويُكتب مصدر كل نص أسفل البطاقة. إن كان النص أطول من أن يتسع للبطاقة بخط مقروء فلن نقتطعه، اختر بطاقة أكبر أو نصًا أقصر.</div>
 <div class="card"><div class="toolbar" style="flex-wrap:wrap"><select class="field" id="wt"><option value="none">خلفية بدون نص</option><option value="ayah">بطاقة آية</option><option value="adhkar">بطاقة ذكر</option><option value="hadith">بطاقة حديث (الأربعون النووية)</option></select><select class="field" id="wsz">${Object.entries(SIZES).map(([k,v])=>`<option value="${k}">${v[2]}</option>`).join('')}</select><select class="field" id="wd">${DESIGNS.map((d,i)=>`<option value="${i}">${d[0]}</option>`).join('')}</select></div>
 <div class="toolbar" style="flex-wrap:wrap" id="wsel"></div>
 <div class="toolbar"><button class="btn gold" id="wdl">تنزيل الصورة</button><button class="btn" id="wsh">مشاركة</button></div><div id="wmsg" class="muted"></div></div><div style="text-align:center"><canvas id="wc" style="max-width:100%;max-height:70vh;border:1px solid var(--gold);border-radius:12px"></canvas></div>`;
 const A=await loadScript('data/adhkar.js','ADHKAR');let N=[];try{N=await loadScript('data/hadith/nawawi-1.js','H_nawawi_1')}catch(e){}
 const S={t:p.get('t')||'none',s:+p.get('s')||1,a:+p.get('a')||1,c:0,i:0,n:1};if(p.get('t')==='ayah')S.t='ayah';
 $('#wt').value=S.t;if(p.get('z'))$('#wsz').value=p.get('z');else if(S.t!=='none')$('#wsz').value='s';
 const sel=()=>{const t=$('#wt').value;let h='';
  if(t==='ayah')h=`<select class="field" id="xs">${Q.map(q=>`<option value="${q.n}" ${q.n===S.s?'selected':''}>${AR(q.n)}. ${q.name}</option>`).join('')}</select><input class="field" id="xa" type="number" min="1" max="${Q[S.s-1].ayahs.length}" value="${S.a}" style="width:90px">`;
  if(t==='adhkar')h=`<select class="field" id="xc">${A.map((c,k)=>`<option value="${k}" ${k===S.c?'selected':''}>${esc(c.cat)}</option>`).join('')}</select><select class="field" id="xi">${A[S.c].items.map((it,k)=>`<option value="${k}" ${k===S.i?'selected':''}>${AR(k+1)}. ${esc(it.t.slice(0,40))}</option>`).join('')}</select>`;
  if(t==='hadith')h=`<select class="field" id="xn">${N.map(x=>`<option value="${x[0]}" ${x[0]===S.n?'selected':''}>حديث ${AR(x[0])}</option>`).join('')}</select>`;
  $('#wsel').innerHTML=h;
  if($('#xs'))$('#xs').onchange=e=>{S.s=+e.target.value;S.a=1;sel();draw()};if($('#xa'))$('#xa').oninput=e=>{S.a=Math.min(Q[S.s-1].ayahs.length,Math.max(1,+e.target.value||1));draw()};
  if($('#xc'))$('#xc').onchange=e=>{S.c=+e.target.value;S.i=0;sel();draw()};if($('#xi'))$('#xi').onchange=e=>{S.i=+e.target.value;draw()};if($('#xn'))$('#xn').onchange=e=>{S.n=+e.target.value;draw()}};
 let last=null;const draw=async()=>{const t=$('#wt').value;let o={size:$('#wsz').value,design:+$('#wd').value,text:'',src:'',quran:false};
  if(t==='ayah'){const q=Q[S.s-1];o.text=`﴿${q.ayahs[S.a-1]}﴾`;o.src=`سورة ${q.name} · الآية ${AR(S.a)} · مصحف المدينة (حفص)`;o.quran=true}
  if(t==='adhkar'){const c=A[S.c],it=c.items[S.i];o.text=it.t;o.src=`حصن المسلم · ${c.cat}`}
  if(t==='hadith'){const h=N.find(x=>x[0]===S.n);o.text=h?h[1]:'';o.src=`الأربعون النووية · حديث رقم ${AR(S.n)}`}
  const r=await render(o);last=r;const c=$('#wc');c.width=r.cv.width;c.height=r.cv.height;c.getContext('2d').drawImage(r.cv,0,0);$('#wmsg').textContent=r.ok?'':'النص أطول من أن يتسع للبطاقة بخط مقروء، فلم نعرضه. اختر مقاسًا آخر أو نصًا أقصر.';if(!r.ok){c.getContext('2d').clearRect(0,0,c.width,c.height)}};
 ['#wt','#wsz','#wd'].forEach(s=>$(s).onchange=()=>{if(s==='#wt')sel();draw()});
 const blob=()=>new Promise(r=>$('#wc').toBlob(r,'image/png'));
 $('#wdl').onclick=async()=>{if(!last||!last.ok){toast('لا توجد صورة صالحة');return}const b=await blob();const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='amal-liakhirtak-'+$('#wt').value+'.png';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),4000)};
 $('#wsh').onclick=async()=>{if(!last||!last.ok){toast('لا توجد صورة صالحة');return}const b=await blob();const f=new File([b],'amal-liakhirtak.png',{type:'image/png'});if(navigator.canShare&&navigator.canShare({files:[f]}))navigator.share({files:[f],title:'اعمل لآخرتك'}).catch(()=>{});else toast('المشاركة المباشرة غير متاحة في هذا المتصفح، استخدم زر التنزيل.')};
 sel();draw()};
};
