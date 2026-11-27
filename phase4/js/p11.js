/* Amal v21: record-your-recitation page (added alone to the live site) */
window.AmalExtra11=function(API){
const {Pages,app,$,$$,LS,AR,esc,norm,loadScript,needQ,toast,copy,share,crumbs,route}=API;
const css=`<style>
.reccard{text-align:center}
.reccard .mushaf{font-family:'Amiri Quran','Amiri',serif;font-size:1.9rem;line-height:2.6;text-align:center;background:#f6f1e6;color:#141c46;border:2px solid var(--gold);border-radius:16px;padding:18px;margin:10px 0}
.recbtn{border-radius:50%;width:74px;height:74px;font-size:1.7rem;border:0;cursor:pointer;background:linear-gradient(135deg,var(--gold),var(--gold2));color:#122b20;box-shadow:0 4px 18px rgba(0,0,0,.4)}
.recbtn.on{background:linear-gradient(135deg,#c0392b,#e74c3c);color:#fff;animation:recpulse 1.2s infinite}
@keyframes recpulse{0%,100%{box-shadow:0 0 0 0 rgba(231,76,60,.5)}50%{box-shadow:0 0 0 14px rgba(231,76,60,0)}}
.fxrow{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin:10px 0}
.fxpanel{margin:14px 0;text-align:right}.fxpanel summary{cursor:pointer;color:var(--gold);font-weight:700;margin-bottom:8px}.fxgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:10px 18px}.fxs{display:block;font-size:.9rem}.fxs span{display:flex;justify-content:space-between;gap:6px}.fxs b{color:var(--gold);font-weight:700;direction:ltr}.fxs input{width:100%;accent-color:#d4a73c;direction:ltr}
.fxrow .btn.sm.on{background:linear-gradient(135deg,var(--gold),var(--gold2));color:#122b20;font-weight:700;border:0}
</style>`;
/* ---------------- record your recitation ---------------- */
Pages.record=async()=>{const Q=await needQ();
 app.innerHTML=crumbs([['القرآن الكريم','quran.html'],['سجّل تلاوتك']])+css+`<h2 class="sec">سجّل تلاوتك بصوتك</h2>
 <div class="notice">اختر السورة والآيات فيظهر لك نص المصحف أمامك، ثم سجّل صوتك بميكروفون جهازك، وجرّب أكثر من ١٦ مؤثرًا جاهزًا (صدى المسجد والقاعة والكهف، دفء، باس، إشراقة، كورَس، تقليل التشويش…) واضبطها بالمنزلقات حتى يعجبك الناتج، ثم استمع إليه أو نزّله. مؤثر «تجويد» يغيّر الصوت فقط (السرعة والصدى والدفء والرنين) ليقترب إحساسه من التلاوة المجوَّدة، ولا يغيّر طريقتك في التلاوة ولا يصحح أحكام التجويد ولا المقامات. <b>كل شيء يتم على جهازك فقط، ولا يُرفع أي تسجيل إلى أي خادم.</b> المؤثرات تحسّن إحساس الصوت ولا تحوّله إلى صوت شخص آخر. يحتاج المتصفح إذن الميكروفون، وقد لا يعمل التسجيل في المتصفحات القديمة.</div>
 <div class="card"><div class="toolbar"><select class="field" id="rs" style="flex:1;min-width:140px">${Q.map(s=>`<option value="${s.n}">${AR(s.n)}. ${s.name}</option>`).join('')}</select>
 <label style="margin:0">من آية <input class="field" id="ra" type="number" min="1" value="1" style="width:80px;min-width:0"></label><label style="margin:0">إلى <input class="field" id="rb" type="number" min="1" value="1" style="width:80px;min-width:0"></label><button class="btn sm" id="rshow">اعرض النص</button></div>
 <div class="mushaf" id="rm"></div></div>
 <div class="card reccard"><div id="rstate" class="muted">اضغط زر التسجيل واسمح للميكروفون، ثم اقرأ ما أمامك.</div>
 <div style="margin:12px 0"><button class="recbtn" id="rrec" title="تسجيل">🎙️</button></div>
 <div class="muted" id="rtime">0:00</div>
 <h3 class="sec" style="justify-content:center;font-size:1.3rem">المؤثرات</h3>
 <div class="fxrow" id="rfx"></div>
 <details class="fxpanel" id="rpanel" open><summary>ضبط يدوي بالمنزلقات (يتغير الناتج مباشرة)</summary><div class="fxgrid" id="rsl"></div><div class="toolbar" style="justify-content:center"><label style="margin:0"><input type="checkbox" id="rnorm" checked> رفع مستوى الصوت تلقائيًا (توحيد الشدة)</label><button class="btn sm" id="rreset">إعادة الضبط</button></div></details>
 <div class="toolbar" style="justify-content:center"><audio id="rout" controls class="fancy-audio" style="width:100%;max-width:420px;display:none"></audio></div>
 <div class="toolbar" style="justify-content:center"><a class="btn gold sm" id="rdl" style="display:none">⬇ تنزيل التسجيل (WAV)</a><span class="muted" id="rwork"></span></div></div>`;
 let cur={s:1,a:1,b:1};
 const show=()=>{const s=+$('#rs').value,S=Q[s-1];let a=Math.max(1,+$('#ra').value||1),b=Math.min(S.count,Math.max(a,+$('#rb').value||a));$('#ra').value=a;$('#rb').value=b;cur={s,a,b};
  $('#rm').innerHTML=(s!==1&&s!==9?'<div style="font-size:1.4rem;color:#1e7a52">بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</div>':'')+S.ayahs.slice(a-1,b).map((t,i)=>esc(t)+' ﴿'+AR(a+i)+'﴾').join(' ')};
 $('#rshow').onclick=show;$('#rs').onchange=()=>{$('#ra').value=1;$('#rb').value=1;show()};show();
 let mediaRec=null,chunks=[],stream=null,t0=0,timer=null,raw=null;
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
 const SL=[['rev','حجم الصدى (مسجد/قاعة)',0,5,.1,'ث'],['revMix','كمية الصدى',0,1,.05,''],['delay','زمن التكرار (إيكو)',0,.8,.02,'ث'],['delayMix','قوة التكرار',0,.8,.05,''],['bass','الجهورية (باس)',-10,12,1,'dB'],['warm','دفء الصوت',-6,10,1,'dB'],['mid','وضوح الكلام',-6,8,1,'dB'],['treble','إشراقة (حدة عالية)',-10,10,1,'dB'],['chorus','تعدد الأصوات (كورَس)',0,1,.05,''],['comp','ضغط ديناميكي (توازن الشدة)',0,1,.05,''],['denoise','تقليل التشويش',0,1,.05,''],['hp','قطع الترددات المنخفضة',20,300,10,'Hz'],['lp','قطع الترددات العالية',3000,20000,500,'Hz'],['gain','رفع الصوت',-6,12,1,'dB'],['tempo','سرعة التلاوة (أبطأ = ترتيل ممدود)',.7,1.15,.01,'×']];
 const DEF={rev:0,revMix:0,delay:0,delayMix:0,bass:0,warm:0,mid:0,treble:0,chorus:0,comp:0,denoise:0,hp:60,lp:18000,gain:0,tempo:1};
 const PRE=[['none','بدون مؤثرات',{}],['mosque','صدى المسجد',{rev:2.8,revMix:.45,hp:70,lp:14000}],['hall','قاعة كبيرة',{rev:4.2,revMix:.5,hp:80,lp:12000}],['room','غرفة صغيرة',{rev:.9,revMix:.25}],['cave','كهف عميق',{rev:5,revMix:.65,bass:2,lp:9000}],['echo','صدى خفيف',{delay:.32,delayMix:.3}],['echol','صدى طويل',{delay:.6,delayMix:.5,rev:1.5,revMix:.2}],['warm','دفء الصوت',{warm:6,treble:-2,lp:12000}],['bass','باس عميق',{bass:8,warm:3,lp:12000}],['bright','صوت مشرق',{treble:6,mid:3,hp:90}],['clear','وضوح الكلام',{mid:5,treble:2,hp:110,comp:.5,denoise:.4}],['clean','تقليل التشويش',{hp:100,lp:11000,denoise:.8,comp:.5}],['loud','شدة موحّدة وعالية',{comp:.9,gain:4}],['choir','كورَس',{chorus:.6,rev:1.8,revMix:.3}],['studio','استوديو مصقول',{rev:1.2,revMix:.2,warm:3,mid:2,treble:2,comp:.6,denoise:.4,hp:90}],['mujawwad','تجويد (للمرتّل: أبطأ، ممدود، رنين دافئ)',{tempo:.86,rev:3.6,revMix:.55,delay:.22,delayMix:.14,bass:5,warm:5,mid:1,treble:-2,comp:.6,hp:70,lp:12500,denoise:.3}],['full','مسجد + دفء + تنقية',{rev:2.4,revMix:.35,warm:4,treble:-2,hp:90,lp:12000,comp:.5,denoise:.5}]];
 let P=Object.assign({},DEF),fx='none';
 $('#rfx').innerHTML=PRE.map(p=>`<button class="btn sm${p[0]==='none'?' on':''}" data-fx="${p[0]}">${p[1]}</button>`).join('');
 $('#rsl').innerHTML=SL.map(x=>`<label class="fxs"><span>${x[1]} <b id="v_${x[0]}"></b></span><input type="range" data-p="${x[0]}" min="${x[2]}" max="${x[3]}" step="${x[4]}"></label>`).join('');
 const syncUI=()=>{SL.forEach(x=>{const el=$('#rsl [data-p="'+x[0]+'"]');el.value=P[x[0]];$('#v_'+x[0]).textContent=AR(P[x[0]])+(x[5]?' '+x[5]:'');try{rangeFill&&rangeFill(el)}catch(e){}})};
 const setPre=id=>{fx=id;const p=PRE.find(q=>q[0]===id);P=Object.assign({},DEF,p?p[2]:{});syncUI()};
 const stretch=(ac,buf,rate)=>{if(Math.abs(rate-1)<.01)return buf;const sr=buf.sampleRate,G=Math.round(sr*.09),Hs=G>>1,Ha=Math.round(Hs*rate),S=Math.round(sr*.012),nch=buf.numberOfChannels,L=buf.length,outLen=Math.ceil(L/rate)+G,out=ac.createBuffer(nch,outLen,sr),win=new Float32Array(G);
  for(let i=0;i<G;i++)win[i]=.5-.5*Math.cos(2*Math.PI*i/(G-1));
  const x0=buf.getChannelData(0),outs=[],ins=[];for(let c=0;c<nch;c++){outs.push(out.getChannelData(c));ins.push(buf.getChannelData(c))}
  let aPos=0,prev=0;for(let o=0,k=0;o+G<outLen;o+=Hs,k++){let a=Math.round(k*Ha);
   if(k>0){let best=-1e30,bs=0;const tgt=prev+Hs;for(let d=-S;d<=S;d+=3){const q=tgt+d;if(q<0||q+G>=L)continue;let cr=0;for(let i=0;i<G;i+=6)cr+=x0[q+i]*x0[a+i<L?a+i:L-1];if(cr>best){best=cr;bs=d}}a=Math.max(0,Math.min(L-G-1,tgt+bs>=0?tgt+bs:a))}
   if(a+G>=L)break;prev=a;for(let c=0;c<nch;c++){const I=ins[c],O=outs[c];for(let i=0;i<G;i++)O[o+i]+=I[a+i]*win[i]}}
  return out};
 const gateBuf=(ac,buf,amt)=>{const out=ac.createBuffer(buf.numberOfChannels,buf.length,buf.sampleRate),w=Math.round(buf.sampleRate*.02),n=Math.ceil(buf.length/w),env=new Float32Array(n);
  const d0=buf.getChannelData(0);for(let i=0;i<n;i++){let m=0;const e=Math.min(buf.length,(i+1)*w);for(let j=i*w;j<e;j++)m+=d0[j]*d0[j];env[i]=Math.sqrt(m/w)}
  const sorted=Array.from(env).sort((a,b)=>a-b),floor=sorted[Math.floor(n*.15)]||1e-4,thr=floor*(2+3*amt),g=new Float32Array(n);let cur=1;
  for(let i=0;i<n;i++){const t=env[i]<thr?1-.85*amt:1;cur+=(t-cur)*(t>cur?.6:.25);g[i]=cur}
  for(let c=0;c<buf.numberOfChannels;c++){const s=buf.getChannelData(c),o=out.getChannelData(c);for(let i=0;i<buf.length;i++){const k=Math.floor(i/w),k2=Math.min(n-1,k+1),fr=(i%w)/w;o[i]=s[i]*(g[k]*(1-fr)+g[k2]*fr)}}return out};
 let busy=false,again=false;
 async function render(){if(!raw)return;if(busy){again=true;return}busy=true;$('#rwork').textContent='جارٍ تطبيق المؤثر…';
  try{const f=P,rate=raw.sampleRate,tail=(f.tempo<1?raw.duration*(1/f.tempo-1):0)+Math.max(f.rev>0?f.rev*f.revMix*0+f.rev+.5:0,f.delay>0?f.delay*4*f.delayMix:0);
   const oc=new OfflineAudioContext(2,Math.ceil((raw.duration+tail+.2)*rate),rate);
   const src=oc.createBufferSource();let base=stretch(oc,raw,f.tempo);src.buffer=f.denoise>0?gateBuf(oc,base,f.denoise):base;let node=src;
   const bq=(type,fr,g,q)=>{const b=oc.createBiquadFilter();b.type=type;b.frequency.value=fr;if(g!=null)b.gain.value=g;if(q)b.Q.value=q;node.connect(b);node=b};
   if(f.hp>20)bq('highpass',f.hp);if(f.lp<20000)bq('lowpass',f.lp);
   if(f.bass)bq('lowshelf',180,f.bass);if(f.warm)bq('peaking',320,f.warm,.8);if(f.mid)bq('peaking',2800,f.mid,1);if(f.treble)bq('highshelf',6000,f.treble);
   if(f.comp>0){const cp=oc.createDynamicsCompressor();cp.threshold.value=-18-26*f.comp;cp.knee.value=20;cp.ratio.value=2+10*f.comp;cp.attack.value=.005;cp.release.value=.22;node.connect(cp);node=cp;const mg=oc.createGain();mg.gain.value=Math.pow(10,(10*f.comp)/20);node.connect(mg);node=mg}
   const master=oc.createGain();master.gain.value=Math.pow(10,f.gain/20);node.connect(master);
   if(f.rev>0&&f.revMix>0){const cv=oc.createConvolver();cv.buffer=impulse(oc,f.rev,2.4);const wg=oc.createGain();wg.gain.value=f.revMix;node.connect(cv);cv.connect(wg);wg.connect(master)}
   if(f.delay>0&&f.delayMix>0){const dl=oc.createDelay(1);dl.delayTime.value=f.delay;const fb=oc.createGain();fb.gain.value=.35;const dg=oc.createGain();dg.gain.value=f.delayMix;node.connect(dl);dl.connect(fb);fb.connect(dl);dl.connect(dg);dg.connect(master)}
   if(f.chorus>0){[[.011,.7],[.019,.55]].forEach(([base,rt],i)=>{const dl=oc.createDelay(.1);dl.delayTime.value=base;const lfo=oc.createOscillator();lfo.frequency.value=rt;const dp=oc.createGain();dp.gain.value=.004;lfo.connect(dp);dp.connect(dl.delayTime);const cg=oc.createGain();cg.gain.value=f.chorus*.6;const pn=oc.createStereoPanner?oc.createStereoPanner():null;node.connect(dl);if(pn){pn.pan.value=i?.6:-.6;dl.connect(pn);pn.connect(cg)}else dl.connect(cg);cg.connect(master);lfo.start()})}
   master.connect(oc.destination);src.start();
   let out=await oc.startRendering();
   if($('#rnorm').checked){let pk=0;for(let c=0;c<out.numberOfChannels;c++){const d=out.getChannelData(c);for(let i=0;i<d.length;i++){const v=Math.abs(d[i]);if(v>pk)pk=v}}if(pk>0){const k=.89/pk;for(let c=0;c<out.numberOfChannels;c++){const d=out.getChannelData(c);for(let i=0;i<d.length;i++)d[i]*=k}}}
   const blob=wav(out);const u=URL.createObjectURL(blob);
   const a=$('#rout');a.src=u;a.style.display='block';
   const d=$('#rdl');d.href=u;d.download='talawa-'+Q[cur.s-1].name+'-'+fx+'.wav';d.style.display='inline-block';$('#rwork').textContent=''}catch(e){$('#rwork').textContent='تعذر تطبيق المؤثر.'}
  busy=false;if(again){again=false;render()}}
 function wav(buf){const ch=Math.min(2,buf.numberOfChannels),len=buf.length*ch*2,ab=new ArrayBuffer(44+len),v=new DataView(ab);
  const ws=(o,s)=>{for(let i=0;i<s.length;i++)v.setUint8(o+i,s.charCodeAt(i))};
  ws(0,'RIFF');v.setUint32(4,36+len,true);ws(8,'WAVE');ws(12,'fmt ');v.setUint32(16,16,true);v.setUint16(20,1,true);v.setUint16(22,ch,true);v.setUint32(24,buf.sampleRate,true);v.setUint32(28,buf.sampleRate*ch*2,true);v.setUint16(32,ch*2,true);v.setUint16(34,16,true);ws(36,'data');v.setUint32(40,len,true);
  let off=44;const cs=[];for(let c=0;c<ch;c++)cs.push(buf.getChannelData(c));
  for(let i=0;i<buf.length;i++)for(let c=0;c<ch;c++){let s=Math.max(-1,Math.min(1,cs[c][i]));v.setInt16(off,s<0?s*32768:s*32767,true);off+=2}
  return new Blob([ab],{type:'audio/wav'})}
 $('#rfx').onclick=e=>{const b=e.target.closest('[data-fx]');if(!b)return;setPre(b.dataset.fx);$$('#rfx .btn').forEach(x=>x.classList.toggle('on',x===b));render()};
 let dt=null;$('#rsl').oninput=e=>{const el=e.target.closest('[data-p]');if(!el)return;P[el.dataset.p]=+el.value;const x=SL.find(q=>q[0]===el.dataset.p);$('#v_'+x[0]).textContent=AR(P[x[0]])+(x[5]?' '+x[5]:'');try{rangeFill&&rangeFill(el)}catch(_){}fx='custom';$$('#rfx .btn').forEach(b=>b.classList.remove('on'));clearTimeout(dt);dt=setTimeout(render,350)};
 $('#rnorm').onchange=render;$('#rreset').onclick=()=>{setPre('none');$$('#rfx .btn').forEach(b=>b.classList.toggle('on',b.dataset.fx==='none'));render()};
 setPre('none');
};
};
