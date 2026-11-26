window.AmalExtra4=function(API){
const {Pages,app,$,$$,LS,AR,esc,norm,loadScript,needQ,toast,copy,share,crumbs}=API;
const TF=[['muyassar','التفسير الميسر','مجمع الملك فهد لطباعة المصحف الشريف',null],['ar-tafseer-al-saddi','تفسير السعدي','عبدالرحمن بن ناصر السعدي','ar-tafseer-al-saddi'],['ar-tafsir-ibn-kathir','تفسير ابن كثير','إسماعيل بن عمر بن كثير','ar-tafsir-ibn-kathir'],['ar-tafsir-al-tabari','تفسير الطبري','محمد بن جرير الطبري','ar-tafsir-al-tabari']];
const CDN='https://cdn.jsdelivr.net/gh/spa5k/tafsir_api@main/tafsir/';
const cache={};
async function getTafsir(slug,s){const k=slug+s;if(cache[k])return cache[k];if(slug==='muyassar'){const T=await loadScript('data/tafsir-muyassar.js','TAFSIR_MUYASSAR');return cache[k]=T[s-1].map((t,i)=>({ayah:i+1,text:t}))}
 const r=await fetch(`${CDN}${slug}/${s}.json`);if(!r.ok)throw new Error('http '+r.status);const j=await r.json();return cache[k]=(j.ayahs||j)}
API.getTafsir=getTafsir;API.TF=TF;
Pages.tafsir=async(p)=>{const Q=await needQ();const s=Math.min(114,Math.max(1,+(p.get('s')||1))),t=p.get('t')||'muyassar',S=Q[s-1],T=TF.find(x=>x[0]===t)||TF[0];
 app.innerHTML=crumbs([['التفسير']])+`<h2 class="sec">التفسير</h2><div class="notice">التفاسير منقولة بنصها من مصادرها دون تعديل: الميسر محفوظ داخل الموقع، والسعدي وابن كثير والطبري تُحمَّل عند الطلب من مستودع tafsir_api (بيانات مأخوذة من quran.com / QUL)، فتحتاج اتصالًا بالإنترنت. لا يوجد في هذه الصفحة شرح من المنصة. لا نعرض أسباب النزول لأن المصدر لا يفصلها.</div>
 <div class="toolbar"><select class="field" id="ts">${Q.map(x=>`<option value="${x.n}" ${x.n===s?'selected':''}>${AR(x.n)}. ${x.name}</option>`).join('')}</select><select class="field" id="tt2">${TF.map(x=>`<option value="${x[0]}" ${x[0]===T[0]?'selected':''}>${x[1]}</option>`).join('')}</select><input class="field" id="tg" type="number" min="1" max="${S.count}" placeholder="آية" style="width:90px;min-width:90px"></div>
 <h2 class="sec">سورة ${S.name} — ${T[1]}</h2><div id="tl"><div class="notice">جارٍ التحميل…</div></div>`;
 const go=()=>API.route(`tafsir.html?s=${$('#ts').value}&t=${$('#tt2').value}`,true);$('#ts').onchange=go;$('#tt2').onchange=go;
 let A;try{A=await getTafsir(T[0],s)}catch(e){$('#tl').innerHTML='<div class="notice">تعذر تحميل هذا التفسير (يتطلب اتصالًا بالإنترنت). جرّب التفسير الميسر.</div>';return}
 const by={};A.forEach(x=>{by[x.ayah]=x.text});
 $('#tl').innerHTML=S.ayahs.map((t,i)=>`<div class="card" style="margin:10px 0" id="t${i+1}"><div style="font-family:'Amiri Quran','Amiri',serif;font-size:1.5rem;line-height:2.4">${esc(t)} ﴿${AR(i+1)}﴾</div><div class="tafsir"><small>${T[1]} — ${T[2]}</small>${by[i+1]?esc(by[i+1]).replace(/\n/g,'<br>'):'<span class="muted">لا يوجد نص تفسير منفصل لهذه الآية في المصدر (قد يكون تفسيرها مع آية مجاورة).</span>'}</div></div>`).join('');
 $('#tg').onchange=e=>{const el=$('#t'+e.target.value);if(el)el.scrollIntoView({block:'center'})}};
Pages.prophets=async(p)=>{const[Q,P]=await Promise.all([needQ(),loadScript('data/prophets.js','PROPHETS')]);const nm=p.get('n');
 if(nm){const x=P.find(y=>y.name===nm);if(!x){return API.route('prophets.html',false)}
  const by={};x.refs.forEach(([s,a])=>(by[s]=by[s]||[]).push(a));
  app.innerHTML=crumbs([['الأنبياء','prophets.html'],[x.name]])+`<h2 class="sec">${x.name}${x.name==='محمد'?' ﷺ':' عليه السلام'}</h2><div class="notice">هذه الصفحة تعرض الآيات التي ورد فيها اسمه، من نص المصحف المحقق في الموقع (بحث آلي بالاسم، وقد لا يشمل المواضع التي ذُكر فيها بلا اسم). القصة المفصلة والدروس لم تُضَف بعد لأنها تحتاج مصدرًا موثقًا نراجعه ولا نكتبها من عندنا.</div><div class="muted">${AR(x.refs.length)} موضعًا في ${AR(Object.keys(by).length)} سورة</div>`+Object.entries(by).map(([s,as])=>`<h2 class="sec" style="font-size:1.3rem">سورة ${Q[s-1].name}</h2>`+as.map(a=>`<div class="card" style="margin:8px 0"><div style="font-family:'Amiri Quran','Amiri',serif;font-size:1.4rem;line-height:2.3">${esc(Q[s-1].ayahs[a-1])} ﴿${AR(a)}﴾</div><div class="toolbar"><a class="btn sm" href="surah.html?s=${s}&a=${a}#a${a}">في السورة</a><a class="btn sm" href="tafsir.html?s=${s}#t${a}">التفسير</a></div></div>`).join('')).join('');return}
 app.innerHTML=crumbs([['الأنبياء']])+`<h2 class="sec">الأنبياء المذكورون في القرآن</h2><div class="notice">أسماء الأنبياء الخمسة والعشرين المذكورين بالاسم في القرآن (مع محمد ﷺ). لكل نبي صفحة بالآيات التي ورد فيها اسمه من النص المحقق. قصص الأنبياء المفصلة قيد الإضافة بمصدر موثق.</div><div class="grid">${P.map(x=>`<a class="card" href="prophets.html?n=${encodeURIComponent(x.name)}"><h3>${x.name}</h3><div class="muted">${AR(x.refs.length)} موضعًا</div></a>`).join('')}</div>`};

Pages['names-of-allah']=async()=>{const N=await loadScript('data/names.js','NAMES');
 app.innerHTML=crumbs([['أسماء الله الحسنى']])+`<h2 class="sec">أسماء الله الحسنى</h2><div class="notice">الأسماء التسعة والتسعون من واجهة AlAdhan البرمجية (api.aladhan.com). المنصة لا تضيف شرحًا للمعاني؛ المعنى الإنجليزي المعروض كما ورد في المصدر.</div><div class="grid">${N.map(n=>`<div class="card" style="text-align:center"><small>${n[0]}</small><div style="font-family:Amiri;font-size:1.8rem">${esc(n[1])}</div><small>${esc(n[2])} · ${esc(n[3])}</small></div>`).join('')}</div>`};
Pages.qibla=async()=>{const KL=21.4225,KO=39.8262,R=Math.PI/180;
 const CITIES=[['القاهرة',30.0444,31.2357],['الإسكندرية',31.2001,29.9187],['أسوان',24.0889,32.8998],['الرياض',24.7136,46.6753],['جدة',21.4858,39.1925],['المدينة المنورة',24.4686,39.6142],['عمّان',31.9454,35.9284],['بغداد',33.3152,44.3661],['الخرطوم',15.5007,32.5599],['تونس',36.8065,10.1815],['الجزائر',36.7538,3.0588],['الدار البيضاء',33.5731,-7.5898],['دبي',25.2048,55.2708],['إسطنبول',41.0082,28.9784],['كراتشي',24.8607,67.0011],['كوالالمبور',3.139,101.6869],['لندن',51.5074,-0.1278],['باريس',48.8566,2.3522],['نيويورك',40.7128,-74.006]];
 const bearing=(la,lo)=>{const a=la*R,d=(KO-lo)*R,k=KL*R;return(Math.atan2(Math.sin(d),Math.cos(a)*Math.tan(k)-Math.sin(a)*Math.cos(d))/R+360)%360};
 const dist=(la,lo)=>{const a=la*R,k=KL*R,dl=(KO-lo)*R,dp=k-a,h=Math.sin(dp/2)**2+Math.cos(a)*Math.cos(k)*Math.sin(dl/2)**2;return 12742*Math.asin(Math.sqrt(h))};
 const diff=(a,b)=>{let d=((a-b+540)%360)-180;return d};
 app.innerHTML=crumbs([['اتجاه القبلة']])+`<style>.qwrap{max-width:360px;margin:8px auto;position:relative}.qwrap svg{width:100%;height:auto;display:block}.qdial{transition:transform .15s linear;transform-origin:150px 150px}.qok{color:#2ecc71;font-weight:700}.qrow{display:flex;gap:8px;flex-wrap:wrap;align-items:center;justify-content:center;margin:8px 0}.qbig{font-size:1.5rem;color:var(--gold2);font-family:'Amiri',serif}</style>
 <h2 class="sec">اتجاه القبلة</h2>
 <div class="notice">يُحسب اتجاه القبلة رياضيًا (أقصر مسار على سطح الكرة الأرضية) من موقعك إلى الكعبة (٢١.٤٢٢٥°ش، ٣٩.٨٢٦٢°ق)، ثم تدور البوصلة مع هاتفك. الموقع يبقى في جهازك ولا يُرسل لأي خادم. <b>حدود صريحة:</b> البوصلة تعتمد على حساس المغناطيس في الهاتف، وقد تنحرف بقرب المعادن والمغناطيس وحافظات الهاتف المغناطيسية، ولا تعمل على أغلب أجهزة الكمبيوتر. يلزم فتح الموقع عبر HTTPS (روابط GitHub Pages تفي بذلك). استخدمها للتقريب وتحقق من علامات المسجد إن وُجدت.</div>
 <div class="card" style="text-align:center"><div class="qrow"><button class="btn gold" id="qg">📍 استخدم موقعي</button><button class="btn" id="qc">🧭 شغّل البوصلة</button></div>
 <div class="qrow"><select class="field" id="qcity" style="min-width:150px"><option value="">أو اختر مدينتك…</option>${CITIES.map((c,i)=>`<option value="${i}">${c[0]}</option>`).join('')}</select><input class="field" id="qlat" placeholder="خط العرض" inputmode="decimal" style="width:110px;min-width:0"><input class="field" id="qlon" placeholder="خط الطول" inputmode="decimal" style="width:110px;min-width:0"><button class="btn sm" id="qset">احسب</button></div>
 <div id="qmsg" class="muted"></div>
 <div class="qwrap"><svg viewBox="0 0 300 300" id="qsvg"><circle cx="150" cy="150" r="140" fill="#101a3a" stroke="#e2c779" stroke-width="3"/><g class="qdial" id="qd"><circle cx="150" cy="150" r="128" fill="none" stroke="#2c3b72" stroke-width="1"/>${Array.from({length:72},(_,i)=>{const a=i*5,l=a%90===0?16:a%30===0?11:6;return`<line x1="150" y1="${22}" x2="150" y2="${22+l}" stroke="${a===0?'#e74c3c':'#8fc2ab'}" stroke-width="${a%90===0?3:1.5}" transform="rotate(${a} 150 150)"/>`}).join('')}
  <text x="150" y="58" text-anchor="middle" fill="#e74c3c" font-size="22" font-weight="700">N</text><text x="248" y="158" text-anchor="middle" fill="#cfe3d9" font-size="18" transform="rotate(0)">E</text><text x="150" y="254" text-anchor="middle" fill="#cfe3d9" font-size="18">S</text><text x="52" y="158" text-anchor="middle" fill="#cfe3d9" font-size="18">W</text>
  <g id="qk" transform="rotate(0 150 150)"><line x1="150" y1="150" x2="150" y2="46" stroke="#e2c779" stroke-width="3" stroke-dasharray="6 4"/><rect x="138" y="8" width="24" height="24" rx="3" fill="#111" stroke="#e2c779" stroke-width="2"/><line x1="138" y1="16" x2="162" y2="16" stroke="#e2c779" stroke-width="2"/></g></g>
  <polygon points="150,2 142,22 158,22" fill="#e2c779"/><circle cx="150" cy="150" r="6" fill="#e2c779"/></svg></div>
 <div class="qbig" id="qbr">—</div><div class="muted" id="qinfo"></div><div id="qstat" style="margin:6px 0"></div>
 <div class="toolbar" style="justify-content:center"><label style="margin:0">انحراف الشمال المغناطيسي (درجات، شرقًا +): <input class="field" id="qdec" type="number" step="0.5" value="${LS.get('qdecl',0)}" style="width:80px;min-width:0"></label></div>
 <div class="muted" style="font-size:.85rem">البوصلة المغناطيسية تشير للشمال المغناطيسي، والقبلة تُحسب من الشمال الحقيقي. الفرق (الانحراف) يختلف بحسب البلد ويصل لعدة درجات؛ إن عرفت انحراف بلدك أدخله هنا للتصحيح، وإلا فاتركه صفرًا.</div>
 <div id="qsim" style="display:none;margin-top:10px"><div class="muted">لا يوجد حساس بوصلة في هذا الجهاز. حرّك المنزلق لتجرب، أو استعمل بوصلة خارجية ثم وجّه نفسك إلى الزاوية المكتوبة أعلاه من الشمال.</div><input type="range" id="qh" min="0" max="359" value="0" style="width:100%"></div></div>`;
 let pos=null,qb=null,heading=null,listening=false,got=false;
 const upd=()=>{const dec=+$('#qdec').value||0;LS.set('qdecl',dec);const h=heading==null?0:(heading+dec+360)%360;$('#qd').style.transform=`rotate(${-h}deg)`;
  if(qb!=null){$('#qk').setAttribute('transform',`rotate(${qb} 150 150)`);const d=heading==null?null:diff(qb,h);
   $('#qstat').innerHTML=d==null?'<span class="muted">شغّل البوصلة لتدور مع هاتفك.</span>':Math.abs(d)<=3?'<span class="qok">✔ أنت متجه نحو القبلة</span>':'استدر '+(d>0?'يمينًا':'يسارًا')+' حوالي '+AR(Math.round(Math.abs(d)))+'°'}};
 const setPos=(la,lo,src)=>{if(!isFinite(la)||!isFinite(lo)||Math.abs(la)>90||Math.abs(lo)>180){$('#qmsg').textContent='إحداثيات غير صحيحة';return}pos=[la,lo];qb=bearing(la,lo);
  $('#qbr').textContent='اتجاه القبلة: '+qb.toFixed(1)+'° من الشمال الحقيقي (مع عقارب الساعة)';$('#qinfo').textContent=src+' · الموقع '+la.toFixed(4)+'، '+lo.toFixed(4)+' · المسافة إلى الكعبة ≈ '+AR(Math.round(dist(la,lo)))+' كم';$('#qmsg').textContent='';upd()};
 $('#qg').onclick=()=>{if(!navigator.geolocation){$('#qmsg').textContent='المتصفح لا يدعم تحديد الموقع. اختر مدينتك أو أدخل الإحداثيات.';return}
  if(!isSecureContext){$('#qmsg').textContent='تحديد الموقع يحتاج اتصالًا آمنًا (HTTPS).'}
  $('#qmsg').textContent='جارٍ تحديد موقعك…';navigator.geolocation.getCurrentPosition(p=>setPos(p.coords.latitude,p.coords.longitude,'من موقع جهازك (دقة ≈ '+AR(Math.round(p.coords.accuracy))+' م)'),e=>{$('#qmsg').textContent=(e.code===1?'تم رفض إذن الموقع. فعّله من إعدادات المتصفح للموقع أو اختر مدينتك أدناه.':e.code===3?'انتهت مهلة تحديد الموقع. فعّل GPS أو اختر مدينتك أدناه.':'تعذر تحديد الموقع. اختر مدينتك أو أدخل الإحداثيات.')},{enableHighAccuracy:true,timeout:15000,maximumAge:60000})};
 $('#qcity').onchange=e=>{const c=CITIES[+e.target.value];if(c)setPos(c[1],c[2],'مدينة '+c[0])};
 $('#qset').onclick=()=>setPos(parseFloat($('#qlat').value.replace(',','.')),parseFloat($('#qlon').value.replace(',','.')),'إحداثيات أدخلتها');
 $('#qdec').oninput=upd;
 const onOri=e=>{let h=null;if(typeof e.webkitCompassHeading==='number'&&!isNaN(e.webkitCompassHeading))h=e.webkitCompassHeading;else if(e.alpha!=null&&(e.absolute||e.type==='deviceorientationabsolute'))h=(360-e.alpha)%360;
  if(h==null)return;const sa=(screen.orientation&&screen.orientation.angle)||window.orientation||0;h=(h+sa+360)%360;got=true;heading=h;$('#qsim').style.display='none';
  if(qb!=null&&Math.abs(diff(qb,(h+(+$('#qdec').value||0)+360)%360))<=3&&navigator.vibrate&&!onOri.v){onOri.v=1;navigator.vibrate(60);setTimeout(()=>onOri.v=0,1500)}upd();
  const acc=e.webkitCompassAccuracy;if(acc>25||acc<0)$('#qmsg').textContent='دقة البوصلة ضعيفة. حرّك الهاتف على شكل ٨ لمعايرتها وابتعد عن المعادن.'};
 const start=async()=>{if(listening){return}
  try{if(typeof DeviceOrientationEvent!=='undefined'&&typeof DeviceOrientationEvent.requestPermission==='function'){const r=await DeviceOrientationEvent.requestPermission();if(r!=='granted'){$('#qmsg').textContent='تم رفض إذن حساسات الحركة. على الآيفون: الإعدادات ثم سفاري ثم الخصوصية والأمان ثم «الحركة والاتجاه»، ثم أعد تحميل الصفحة.';$('#qsim').style.display='block';return}}}catch(e){$('#qmsg').textContent='تعذر طلب إذن الحساسات: '+e.message;$('#qsim').style.display='block';return}
  if(!window.DeviceOrientationEvent){$('#qmsg').textContent='هذا الجهاز أو المتصفح لا يدعم حساسات الاتجاه.';$('#qsim').style.display='block';return}
  if(!isSecureContext){$('#qmsg').textContent='حساسات الاتجاه تحتاج اتصالًا آمنًا (HTTPS).';$('#qsim').style.display='block';return}
  window.addEventListener('deviceorientationabsolute',onOri,true);window.addEventListener('deviceorientation',onOri,true);listening=true;$('#qmsg').textContent='جارٍ قراءة البوصلة… حرّك الهاتف قليلًا.';
  setTimeout(()=>{if(!got){$('#qmsg').textContent='لم تصل قراءات من البوصلة. قد لا يحتوي الجهاز على حساس مغناطيس، أو الإذن غير مفعّل.';$('#qsim').style.display='block'}else if($('#qmsg').textContent.startsWith('جارٍ'))$('#qmsg').textContent=''},3500)};
 $('#qc').onclick=start;
 $('#qh').oninput=e=>{heading=+e.target.value;upd()};
 upd();
 if(navigator.permissions&&navigator.permissions.query)navigator.permissions.query({name:'geolocation'}).then(s=>{if(s.state==='granted')$('#qg').click()}).catch(()=>{});
};
if(window.AmalExtra5)window.AmalExtra5(API);
};
