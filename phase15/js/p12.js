/* Amal v27: original fictional stories in Egyptian Arabic (hekayat) */
window.AmalExtra12=function(API){
const {Pages,app,$,$$,AR,esc,norm,loadScript,needQ,crumbs}=API;
const HK=()=>loadScript('data/hekayat.js','HEKAYAT');
const css=`<style>.hk .it{display:block;margin:8px 0}.hk p{line-height:2.1;font-size:1.08rem;margin:.7em 0}.hk .dl{border-inline-start:3px solid var(--gold);padding-inline-start:10px}.hk h3.sc{margin:1.4em 0 .3em;color:var(--gold)}.hk .tg{display:inline-block;font-size:.78rem;border:1px solid var(--gold);border-radius:999px;padding:1px 10px;margin-inline-end:6px}</style>`;
Pages.hekayat=async()=>{const S=await HK();let q='',c='';const cats=[...new Set(S.map(x=>x.c))];
 app.innerHTML=crumbs([['حكايات وعبر']])+css+`<div class="hk"><h2 class="sec">حكايات وعبر بالعامية المصرية</h2><input class="field" id="hq" type="search" placeholder="ابحث في الحكايات" style="width:100%"><div class="toolbar" id="hc" style="margin:8px 0"><button class="btn sm gold" data-c="">الكل</button>${cats.map(x=>`<button class="btn sm" data-c="${esc(x)}">${esc(x)}</button>`).join('')}</div><div class="muted" id="hn"></div><div id="hl"></div><div class="muted" style="margin-top:14px">وفي قسم <a href="stories.html">قصص وعبر</a> قصص من القرآن والصحيحين بنصوصها.</div></div>`;
 const draw=()=>{const L=S.filter(x=>(!c||x.c===c)&&(!q||norm(x.t+' '+x.sum+' '+x.c).includes(norm(q))));$('#hn').textContent=AR(L.length)+' حكاية';
  $('#hl').innerHTML=L.map(x=>{const w=x.b.join(' ').split(/\s+/).length;return`<a class="card it" href="hekaya.html?id=${x.id}"><b style="font-family:Amiri;font-size:1.25rem">${esc(x.t)}</b><div><span class="tg">${esc(x.c)}</span><span class="muted">قراءة نحو ${AR(Math.max(1,Math.round(w/180)))} دقائق · حكاية خيالية</span></div><div class="muted">${esc(x.sum)}</div></a>`}).join('')||'<div class="notice">لا نتائج.</div>'};
 draw();$('#hq').oninput=e=>{q=e.target.value;draw()};$('#hc').onclick=e=>{const b=e.target.closest('[data-c]');if(!b)return;c=b.dataset.c;$$('#hc .btn').forEach(z=>z.classList.toggle('gold',z===b));draw()}};
Pages.hekaya=async(p)=>{const S=await HK(),i=S.findIndex(y=>y.id===p.get('id'));if(i<0){app.innerHTML=crumbs([['حكايات وعبر','hekayat.html'],['غير موجودة']])+'<div class="notice">الحكاية غير موجودة.</div><a class="btn" href="hekayat.html">كل الحكايات</a>';return}
 const x=S[i],Q=await needQ(),[s,a,b]=x.q,sur=Q[s-1],ay=[];for(let k=a;k<=b;k++)ay.push(`${esc(sur.ayahs[k-1])} ﴿${AR(k)}﴾`);
 const body=x.b.map(l=>l.startsWith('## ')?`<h3 class="sc">${esc(l.slice(3))}</h3>`:l.startsWith('—')?`<p class="dl">${esc(l)}</p>`:`<p>${esc(l)}</p>`).join('');
 app.innerHTML=crumbs([['حكايات وعبر','hekayat.html'],[x.t]])+css+`<div class="hk"><h2 class="sec">${esc(x.t)}</h2><div><span class="tg">${esc(x.c)}</span><span class="muted">حكاية خيالية من تأليفنا</span></div>${body}
 <h3 class="sec">العبرة</h3><div class="card"><ul style="line-height:2;margin:0;padding-inline-start:20px">${x.m.map(m=>`<li>${esc(m)}</li>`).join('')}</ul><div class="muted">هذه خلاصة تأمل من كاتب الحكاية، وليست نصًا شرعيًا.</div></div>
 <h3 class="sec">من القرآن الكريم</h3><div class="card" style="text-align:center;line-height:2.4"><div class="p9q">${ay.join(' ')}</div><div class="muted">سورة ${esc(sur.name)}، ${b!==a?'الآيات '+AR(a)+'–'+AR(b):'الآية '+AR(a)}. <a href="surah.html?s=${s}&a=${a}">اقرأ في المصحف</a></div></div>
 <div class="p9row" style="margin:14px 0;display:flex;gap:8px;flex-wrap:wrap">${i>0?`<a class="btn" href="hekaya.html?id=${S[i-1].id}">السابقة</a>`:''}${i<S.length-1?`<a class="btn gold" href="hekaya.html?id=${S[i+1].id}">التالية</a>`:''}<a class="btn" href="hekayat.html">كل الحكايات</a></div></div>`};

/* ---------------- tasmee3: check memorization against the Quran text ---------------- */
const nz=w=>w.replace(/[\u0640\u064B-\u065F\u0670\u06D6-\u06ED\u08D3-\u08FF]/g,'').replace(/[أإآٱ]/g,'ا').replace(/ى/g,'ي').replace(/ة/g,'ه').replace(/ؤ/g,'و').replace(/ئ/g,'ي').replace(/[^\u0621-\u064A]/g,'');
const lev=(a,b)=>{const m=a.length,n=b.length;if(!m)return n;if(!n)return m;let p=Array.from({length:n+1},(_,j)=>j);for(let i=1;i<=m;i++){const c=[i];for(let j=1;j<=n;j++)c[j]=Math.min(p[j]+1,c[j-1]+1,p[j-1]+(a[i-1]===b[j-1]?0:1));p=c}return p[n]};
/* the Uthmani text drops many alifs (e.g. العلمين) that normal spelling keeps, so also compare with alifs removed */
const na=w=>w.replace(/ا/g,'');
const sim=(a,b)=>{if(a===b)return 0;const x=na(a),y=na(b);const s1=lev(a,b)/Math.max(a.length,b.length),s2=x&&y?lev(x,y)/Math.max(x.length,y.length):1;return Math.min(1,s1,s2)};
/* align spoken words to the expected words; the end of the expected text is free, so reciting only a part is fine */
const align=(E,S)=>{const n=E.length,m=S.length,D=Array.from({length:n+1},()=>new Array(m+1).fill(0)),B=Array.from({length:n+1},()=>new Array(m+1).fill(0));
 for(let i=0;i<=n;i++)D[i][0]=i;for(let j=0;j<=m;j++)D[0][j]=j;
 for(let i=1;i<=n;i++)for(let j=1;j<=m;j++){const s=sim(E[i-1],S[j-1]),sub=D[i-1][j-1]+(s===0?0:(s<=0.34?0.6:1)),del=D[i-1][j]+1,ins=D[i][j-1]+1;let v=sub,t=0;if(del<v){v=del;t=1}if(ins<v){v=ins;t=2}D[i][j]=v;B[i][j]=t}
 let bi=0,bv=1e9;for(let i=0;i<=n;i++){const v=D[i][m]+0*i;if(v<bv-1e-9){bv=v;bi=i}}
 /* only count expected words up to the last one the reciter actually reached */
 const res=new Array(n).fill(null).map(()=>({st:'todo'})),extra=[];let i=bi,j=m;
 while(i>0||j>0){if(i>0&&j>0&&B[i][j]===0){const s=sim(E[i-1],S[j-1]);res[i-1]=s===0?{st:'ok'}:(s<=0.34?{st:'close',h:S[j-1]}:{st:'bad',h:S[j-1]});i--;j--}else if(i>0&&(j===0||B[i][j]===1)){res[i-1]={st:'miss'};i--}else{extra.push({after:i,w:S[j-1]});j--}}
 return{res,extra,reached:bi}};
window.__tasmee={nz,align};
Pages.tasmee=async()=>{const Q=await needQ();const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
 app.innerHTML=crumbs([['القرآن الكريم','quran.html'],['تسميع الحفظ']])+css+`<div class="hk"><h2 class="sec">تسميع الحفظ</h2>
 <div class="notice">اختر السورة التي حفظتها واقرأها من حفظك، وسنقارن كلامك بنص المصحف الموجود في الموقع ونعلّم الكلمة الخاطئة أو الناقصة. <b>حدود مهمة:</b> هذه الأداة تقارن <b>الكلمات فقط</b> ولا تحكم على التجويد ولا مخارج الحروف ولا المدود. قد يسيء برنامج التعرف على الكلام فهم كلمة صحيحة، فالعلامة الحمراء تعني «لم أتأكد» وليست حكمًا نهائيًا. ولا تغني عن شيخ يسمع منك.</div>
 <div class="notice" id="tpriv">الخصوصية: الموقع لا يسجل صوتك ولا يرفعه إلى أي خادم عندنا، ولا يحفظ شيئًا منه. التعرف على الكلام يتولاه متصفحك نفسه، وفي متصفحات مثل Chrome وEdge قد يُرسل الصوت إلى خدمة المتصفح (جوجل أو مايكروسوفت) ليتحول إلى نص، ولذلك يحتاج إنترنت وإذن الميكروفون. ${SR?'':'<b>متصفحك الحالي لا يدعم التعرف على الصوت، فاستخدم خانة الكتابة بالأسفل أو افتح الموقع في Chrome.</b>'}</div>
 <div class="card"><div class="toolbar"><select class="field" id="ts" style="flex:1;min-width:0" aria-label="السورة">${Q.map(s=>`<option value="${s.n}">${AR(s.n)}. ${esc(s.name)} (${AR(s.ayahs.length)} آية)</option>`).join('')}</select></div>
 <div class="toolbar"><label class="muted">من الآية</label><input class="field" id="tfa" type="number" min="1" value="1" style="width:80px"><label class="muted">إلى</label><input class="field" id="tfb" type="number" min="1" style="width:80px"></div>
 <div class="muted">يمكنك تسميع جزء من السورة بتحديد الآيات. بسملة بداية السورة ليست ضمن النص المقارَن، فابدأ من أول آية.</div>
 <div class="toolbar"><label class="muted"><input type="checkbox" id="thide" checked> أخفِ النص أثناء التسميع (للحفظ من غير نظر)</label></div>
 <div class="toolbar"><button class="btn gold" id="tgo" ${SR?'':'disabled'}>🎤 ابدأ التسميع</button><button class="btn" id="tstop" disabled>إنهاء وإظهار النتيجة</button><button class="btn" id="treset">من جديد</button></div>
 <div class="muted" id="tst" role="status">اضغط «ابدأ التسميع» ثم اسمح للميكروفون وابدأ القراءة.</div></div>
 <div class="card" style="margin-top:10px"><b>أو اكتب ما حفظته</b><div class="muted">تعمل في أي متصفح من غير ميكروفون، وهي نفس المقارنة.</div><textarea class="field" id="ttx" rows="4" placeholder="اكتب الآيات من حفظك هنا" style="width:100%"></textarea><button class="btn" id="tchk">قارن ما كتبته</button></div>
 <div id="tres" aria-live="polite"></div></div>`;
 const surah=()=>Q[+$('#ts').value-1];
 const range=()=>{const s=surah(),a=Math.max(1,Math.min(s.ayahs.length,+$('#tfa').value||1)),b=Math.max(a,Math.min(s.ayahs.length,+$('#tfb').value||s.ayahs.length));return[a,b]};
 const setMax=()=>{const s=surah();$('#tfa').value=1;$('#tfb').value=s.ayahs.length;$('#tfb').max=s.ayahs.length;$('#tfa').max=s.ayahs.length};setMax();$('#ts').onchange=()=>{setMax();$('#tres').innerHTML=''};
 const words=()=>{const s=surah(),[a,b]=range(),W=[];for(let k=a;k<=b;k++)s.ayahs[k-1].split(/\s+/).filter(Boolean).forEach(w=>{const z=nz(w);if(z)W.push({w,z,ay:k})});return W};
 const render=(txt,final)=>{const W=words(),E=W.map(x=>x.z),S=txt.split(/\s+/).map(nz).filter(Boolean);const R=align(E,S),r=R.res;
  const cnt={ok:0,close:0,bad:0,miss:0};r.forEach((x,i)=>{if(i<R.reached)cnt[x.st]=(cnt[x.st]||0)+1});
  const hide=$('#thide').checked&&!final;let h='';
  W.forEach((x,i)=>{const st=i<R.reached?r[i].st:'todo';const endOfAyah=i===W.length-1||W[i+1].ay!==x.ay;const mk=endOfAyah?` <span class="amk" style="color:var(--gold);white-space:nowrap">\uFD3F${AR(x.ay)}\uFD3E</span>`:'';
   const col={ok:'#1f8f5a',close:'#c98a00',bad:'#d23c3c',miss:'#d27a1c',todo:'inherit'}[st];
   if(st==='todo'&&hide)return;
   const tip=st==='bad'?` <small>(سُمع: ${esc(r[i].h)})</small>`:st==='close'?' <small>(قريبة، تأكد)</small>':st==='miss'?' <small>(ناقصة)</small>':'';
   h+=`<span style="color:${col};${st==='bad'||st==='miss'?'text-decoration:underline wavy;':''}${st==='todo'?'opacity:.55':''}">${esc(x.w)}${hide&&st==='ok'?'':tip}</span>${mk} `});
  const ex=R.extra.length?`<div class="notice">كلمات زائدة سُمعت ولا تطابق النص: ${R.extra.map(e=>esc(e.w)).join('، ')}</div>`:'';
  const done=R.reached>=W.length&&!r.some(x=>x.st==='miss'||x.st==='bad'||x.st==='close');
  $('#tres').innerHTML=`<div class="card" style="margin-top:10px;line-height:2.8;font-size:1.3rem;font-family:'Amiri Quran',Amiri,serif;text-align:justify;text-align-last:right" dir="rtl">${h||'<span class="muted">ابدأ القراءة...</span>'}</div>${ex}<div class="muted">وصلت إلى الكلمة ${AR(R.reached)} من ${AR(W.length)} · صحيحة ${AR(cnt.ok)} · قريبة ${AR(cnt.close)} · خاطئة ${AR(cnt.bad)} · ناقصة ${AR(cnt.miss)}${final&&done?' · أتممت المقطع كاملًا بلا أخطاء ظاهرة، والحمد لله':(final&&R.reached>=W.length?' · وصلت إلى آخر المقطع، لكن راجع الكلمات الملوّنة':'')}</div><div class="muted">الألوان: <span style="color:#1f8f5a">أخضر صحيحة</span> · <span style="color:#c98a00">أصفر قريبة وقد تكون سوء سمع</span> · <span style="color:#d23c3c">أحمر مختلفة</span> · <span style="color:#d27a1c">برتقالي ناقصة</span>. هذه مقارنة كلمات فقط، لا حكم على التجويد.</div>`};
 $('#tchk').onclick=()=>{const t=$('#ttx').value.trim();if(!t){API.toast('اكتب شيئًا أولًا');return}render(t,true)};
 let rec=null,fin='',itm='',on=false;
 const stop=()=>{on=false;try{rec&&rec.stop()}catch(e){}$('#tgo').disabled=!SR;$('#tstop').disabled=true};
 $('#treset').onclick=()=>{stop();fin='';itm='';$('#tres').innerHTML='';$('#ttx').value='';$('#tst').textContent='جاهز من جديد.'};
 $('#tstop').onclick=()=>{stop();render((fin+' '+itm).trim(),true);$('#tst').textContent='انتهى التسميع.'};
 if(SR)$('#tgo').onclick=()=>{fin='';itm='';rec=new SR();rec.lang='ar-SA';rec.continuous=true;rec.interimResults=true;on=true;
  rec.onresult=e=>{itm='';for(let i=e.resultIndex;i<e.results.length;i++){const t=e.results[i][0].transcript;if(e.results[i].isFinal)fin+=' '+t;else itm+=' '+t}render((fin+' '+itm).trim(),false)};
  rec.onerror=e=>{const m={'not-allowed':'لم يُسمح بالميكروفون. فعّل الإذن من إعدادات المتصفح ثم حاول.','service-not-allowed':'خدمة التعرف على الصوت غير متاحة في هذا المتصفح.','no-speech':'لم أسمع صوتًا، اقترب من الميكروفون.','network':'التعرف على الصوت يحتاج إنترنت، تحقق من الاتصال.','audio-capture':'لم أجد ميكروفونًا.'}[e.error]||'حدث خطأ في التعرف على الصوت ('+e.error+').';$('#tst').textContent=m;if(['not-allowed','service-not-allowed','audio-capture','network'].includes(e.error))stop()};
  rec.onend=()=>{if(on){try{rec.start()}catch(e){stop()}}};
  try{rec.start();$('#tgo').disabled=true;$('#tstop').disabled=false;$('#tst').textContent='أسمعك... اقرأ من حفظك.';render('',false)}catch(e){$('#tst').textContent='تعذر بدء الميكروفون.'}};
};

/* share bar for hekaya page */
{const _hk=Pages.hekaya;Pages.hekaya=async function(p){const r=await _hk.call(this,p);const h=app.querySelector('.hk h2.sec'),box=app.querySelector('.hk');if(h&&box&&!box.querySelector('[data-shm-t]')){const ps=[...box.querySelectorAll('p')].slice(0,3).map(n=>n.textContent.trim()).join('\n');const w=document.createElement('div');w.className='toolbar';w.style.margin='14px 0';w.innerHTML=shareBtn(h.textContent,h.textContent+' (حكاية خيالية من تأليفنا)\n\n'+ps+'…');box.appendChild(w)}return r}}
};
