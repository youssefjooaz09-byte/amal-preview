/* Amal v45 preview: Ibtihalat (mubtahileen) + Anasheed library. Sourced data only. */
window.AmalExtra16=function(API){
const {Pages,app,$,$$,LS,AR,esc,loadScript,crumbs,toast}=API;
(window.AmalSections=window.AmalSections||[]).push(['ibtihalat.html','الابتهالات والمبتهلون','audio','headset'],['anasheed.html','الأناشيد الإسلامية','audio','spark']);
const css=`<style>
.ib-g{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}.ib-c{display:block;padding:12px;border:1px solid rgba(255,255,255,.14);border-radius:14px;background:rgba(255,255,255,.05);text-align:center;text-decoration:none;color:inherit}
.ib-av{width:84px;height:84px;margin:0 auto 8px;border-radius:50%;overflow:hidden;display:grid;place-items:center;font-size:2.2rem;background:linear-gradient(135deg,#3b2a78,#14284b);color:#e7c76a;border:2px solid rgba(231,199,106,.5)}.ib-av img{width:100%;height:100%;object-fit:cover}
.ib-c b{display:block}.ib-c small{opacity:.7}
.ib-hd{display:flex;gap:14px;align-items:center}.ib-hd .ib-av{width:110px;height:110px;margin:0;flex:none}
.tk{display:flex;align-items:center;gap:8px;width:100%;text-align:right;padding:10px;border:1px solid rgba(255,255,255,.12);border-radius:10px;background:rgba(255,255,255,.04);color:inherit;font:inherit;margin:4px 0;cursor:pointer}.tk.on{border-color:#e7c76a;background:rgba(231,199,106,.12)}.tk span{flex:1;overflow:hidden;text-overflow:ellipsis}
.ap{position:sticky;bottom:78px;z-index:5;padding:10px;border-radius:14px;background:#14284b;border:1px solid rgba(231,199,106,.5);margin-top:10px}.ap audio{width:100%}.ap .vr{display:flex;gap:8px;align-items:center;margin-top:6px}.ap input[type=range]{flex:1}
.an-c{display:flex;gap:10px;align-items:flex-start;padding:10px;border:1px solid rgba(255,255,255,.14);border-radius:14px;background:rgba(255,255,255,.05);margin:8px 0}.an-c .ib-av{width:52px;height:52px;font-size:1.4rem;margin:0;flex:none}.an-b{flex:1;min-width:0}.an-b h3{margin:0 0 2px;font-size:1.05rem}.an-t{display:flex;gap:6px;flex-wrap:wrap;margin-top:6px}.an-t .btn{padding:4px 10px}
.an-yt{position:relative;padding-top:56.25%;background:#000;border-radius:10px;overflow:hidden;margin-top:8px}.an-yt iframe{position:absolute;inset:0;width:100%;height:100%;border:0}
.chips{display:flex;gap:6px;flex-wrap:wrap;margin:8px 0}.chips .btn{padding:4px 12px}
</style>`;
const ia=(i,f)=>`https://archive.org/download/${i}/${encodeURIComponent(f)}`;
const cm=f=>`https://commons.wikimedia.org/wiki/File:${encodeURIComponent(f.replace(/ /g,'_'))}`;
const cf=f=>`https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(f.replace(/ /g,'_'))}?width=360`;
const av=p=>`<div class="ib-av">${p.p?`<img src="${cf(p.p[0])}" alt="${esc(p.n)}" loading="lazy" onerror="this.parentNode.textContent='${esc(p.n.trim()[0])}'">`:esc(p.n.trim()[0])}</div>`;
const stopOthers=a=>document.querySelectorAll('audio').forEach(x=>{if(x!==a)x.pause()});
Pages.ibtihalat=async(p)=>{
 const D=await loadScript('data/ibtihalat.js','IBT');const id=p.get('id');const m=id&&D.find(x=>x.id===id);
 if(!m){
  const main=D.filter(x=>!x.x),ext=D.filter(x=>x.x);
  const card=x=>`<a class="ib-c" href="ibtihalat.html?id=${x.id}">${av(x)}<b>${esc(x.n)}</b><small>${esc(x.r)}${x.t.length?' · '+AR(x.t.length)+' تسجيل':' · بلا تسجيل بعد'}</small></a>`;
  app.innerHTML=css+crumbs([['الابتهالات والمبتهلون']])+`<h2 class="sec">الابتهالات والمبتهلون</h2>
  <input class="field" id="iq" type="search" placeholder="ابحث باسم المبتهل…" style="width:100%;margin:8px 0"><h2 class="sec">المبتهلون</h2><div class="ib-g" id="ig1">${main.map(card).join('')}</div><h2 class="sec">مبتهلون وأسماء أخرى أضفناها</h2><div class="ib-g" id="ig2">${ext.map(card).join('')}</div>`;
  $('#iq').oninput=e=>{const q=API.norm?API.norm(e.target.value):e.target.value;[['ig1',main],['ig2',ext]].forEach(([g,L])=>{$('#'+g).innerHTML=L.filter(x=>!q||(API.norm?API.norm(x.n):x.n).includes(q)).map(card).join('')})};
  return}
 app.innerHTML=css+crumbs([['الابتهالات والمبتهلون','ibtihalat.html'],[m.n]])+`<div class="ib-hd">${av(m)}<div><h2 class="sec" style="margin:0">${esc(m.n)}</h2><div class="muted">${esc(m.r)}</div>${m.p?`<small class="muted">الصورة: <a href="${cm(m.p[0])}" target="_blank" rel="noopener">ويكيميديا كومنز</a> (${esc(m.p[1])})</small>`:``}</div></div>
  <div class="card" style="margin:10px 0"><h3>نبذة</h3><p style="line-height:1.9">${esc(m.b)}</p></div>
  <h2 class="sec">الابتهالات والتسجيلات ${m.t.length?'('+AR(m.t.length)+')':''}</h2>
  ${m.t.length?`<div id="tl">${m.t.map((t,i)=>`<button class="tk" data-i="${i}"><span>▶ ${esc(t[2])}</span></button>`).join('')}</div>
  <div class="ap"><div id="np" class="muted">اختر تسجيلًا للتشغيل</div><audio id="au" controls preload="none"></audio><div class="vr"><span>🔈</span><input type="range" id="vol" min="0" max="1" step="0.05" value="1" aria-label="مستوى الصوت"><span>🔊</span></div></div>
  </div>`:``}`;
 if(m.t.length){const a=$('#au');let cur=-1;const play=i=>{cur=i;const t=m.t[i];stopOthers(a);a.src=ia(t[0],t[1]);a.play().catch(()=>toast('تعذّر التشغيل، جرّب تسجيلًا آخر'));$('#np').textContent='▶ '+t[2];$$('#tl .tk').forEach((b,j)=>b.classList.toggle('on',j===i))};
  $('#tl').onclick=e=>{const b=e.target.closest('.tk');if(b)play(+b.dataset.i)};a.onended=()=>{if(cur+1<m.t.length)play(cur+1)};a.onerror=()=>{if(cur>=0)toast('هذا التسجيل لا يعمل الآن')};
  $('#vol').oninput=e=>{a.volume=+e.target.value}}
};
const CATS=['الكل','مدح النبي ﷺ','توبة ومناجاة','ذكر وتأمل','القرآن','الوالدان','منوّعة'];
Pages.anasheed=async()=>{
 const A=await loadScript('data/anasheed.js','ANSH');let q='',cat='الكل',pf='',view='all',open=null;
 const favs=()=>LS.get('anfav',[]),pls=()=>LS.get('anpl',{});
 const perfs=[...new Set(A.map(x=>x.p).filter(Boolean))].sort();
 app.innerHTML=css+crumbs([['الأناشيد الإسلامية']])+`<h2 class="sec">الأناشيد الإسلامية</h2>
 <input class="field" id="aq" type="search" placeholder="ابحث باسم الأنشودة أو المنشد…" style="width:100%"><div class="chips" id="ac">${CATS.map((c,i)=>`<button class="btn sm ${i?'':'gold'}" data-c="${c}">${c}</button>`).join('')}</div>
 <div class="toolbar"><select class="field" id="ap"><option value="">كل المنشدين</option>${perfs.map(p=>`<option>${esc(p)}</option>`).join('')}</select><button class="btn sm" data-v="fav">♥ المفضلة</button><button class="btn sm" data-v="pl">☰ قوائمي</button><button class="btn sm" data-v="all">الكل</button></div><div id="al"></div>`;
 const card=x=>{const f=favs().includes(x.id);return `<div class="an-c"><div class="ib-av">${esc(x.t.trim()[0])}</div><div class="an-b"><h3>${esc(x.t)}</h3><div class="muted">${x.p?esc(x.p)+' · ':''}${esc(x.c)}</div>
  <div class="an-t">${x.y?`<button class="btn sm gold" data-pl="${x.id}">▶ تشغيل</button>`:''}${x.s?`<a class="btn sm" href="${esc(x.s)}" target="_blank" rel="noopener">${x.y?'القناة الرسمية':'صفحة مرجعية'}</a>`:''}<button class="btn sm" data-f="${x.id}">${f?'♥ في المفضلة':'♡ مفضلة'}</button><button class="btn sm" data-a="${x.id}">＋ قائمة</button></div>
  ${open===x.id&&x.y?`<div class="an-yt"><iframe src="https://www.youtube-nocookie.com/embed/${x.y}?rel=0" allow="encrypted-media; picture-in-picture" allowfullscreen loading="lazy" title="${esc(x.t)}"></iframe></div>`:''}</div></div>`};
 const draw=()=>{let L=A;const n=API.norm||(s=>s);
  if(view==='fav')L=L.filter(x=>favs().includes(x.id));
  if(view==='pl'){const P=pls();const names=Object.keys(P);$('#al').innerHTML=`<div class="toolbar"><input class="field" id="pn" placeholder="اسم قائمة جديدة"><button class="btn sm gold" id="pc">إنشاء</button></div>`+(names.length?names.map(k=>`<div class="card" style="margin:8px 0"><h3>${esc(k)} (${AR(P[k].length)}) <button class="btn sm" data-dl="${esc(k)}">حذف</button></h3>${P[k].map(id=>{const x=A.find(a=>a.id===id);return x?`<div>${esc(x.t)} <button class="btn sm" data-rm="${esc(k)}|${id}">✕</button></div>`:''}).join('')||'<div class="muted">القائمة فارغة. أضف من زر ＋ قائمة.</div>'}</div>`).join(''):'<div class="notice">لا توجد قوائم بعد. أنشئ قائمة ثم أضف إليها من أي أنشودة.</div>');return}
  if(cat!=='الكل')L=L.filter(x=>x.c===cat);if(pf)L=L.filter(x=>x.p===pf);
  if(q)L=L.filter(x=>n(x.t).includes(n(q))||n(x.p||'').includes(n(q)));
  $('#al').innerHTML=L.length?L.map(card).join(''):'<div class="notice">لا نتائج.</div>'};
 draw();
 $('#aq').oninput=e=>{q=e.target.value.trim();view='all';draw()};
 $('#ap').onchange=e=>{pf=e.target.value;view='all';draw()};
 $('#ac').onclick=e=>{const b=e.target.closest('[data-c]');if(!b)return;cat=b.dataset.c;view='all';$$('#ac .btn').forEach(x=>x.classList.toggle('gold',x===b));draw()};
 app.onclick=e=>{const g=s=>e.target.closest(s);let b;
  if(b=g('[data-v]')){view=b.dataset.v;draw()}
  else if(b=g('[data-f]')){let f=favs();f=f.includes(b.dataset.f)?f.filter(x=>x!==b.dataset.f):f.concat(b.dataset.f);LS.set('anfav',f);draw()}
  else if(b=g('[data-pl]')){open=open===b.dataset.pl?null:b.dataset.pl;document.querySelectorAll('audio').forEach(a=>a.pause());draw()}
  else if(b=g('[data-a]')){const P=pls();const names=Object.keys(P);if(!names.length){toast('أنشئ قائمة أولًا من زر ☰ قوائمي');return}const k=prompt('اكتب اسم القائمة:\n'+names.join('، '));if(k&&P[k]){if(!P[k].includes(b.dataset.a))P[k].push(b.dataset.a);LS.set('anpl',P);toast('تمت الإضافة')}else if(k)toast('لا توجد قائمة بهذا الاسم')}
  else if(b=g('#pc')){const k=$('#pn').value.trim();if(!k)return;const P=pls();if(!P[k])P[k]=[];LS.set('anpl',P);draw()}
  else if(b=g('[data-dl]')){const P=pls();delete P[b.dataset.dl];LS.set('anpl',P);draw()}
  else if(b=g('[data-rm]')){const [k,id]=b.dataset.rm.split('|');const P=pls();P[k]=(P[k]||[]).filter(x=>x!==id);LS.set('anpl',P);draw()}}
};
};
