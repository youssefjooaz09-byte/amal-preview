/* Amal v46 preview: Poems library. Every poem is from ar.wikisource.org with its page link shown. */
window.AmalExtra17=function(API){
const {Pages,app,$,$$,LS,AR,esc,loadScript,crumbs,toast}=API;
(window.AmalSections=window.AmalSections||[]).push(['poems.html','مكتبة القصائد','quran','book']);
const CATS=['الكل','مدح النبي ﷺ','التوبة والاستغفار','الجنة والآخرة','بر الوالدين','الصبر والابتلاء','محبة الله والتوكل','الزهد والتقوى'];
const css=`<style>.pm-c{padding:12px;border:1px solid rgba(255,255,255,.14);border-radius:14px;background:rgba(255,255,255,.05);margin:8px 0}.pm-c h3{margin:0 0 4px}.pm-v{margin:10px 0;line-height:2.1;font-size:1.1rem;font-family:'Amiri',serif}.pm-v div{display:flex;flex-wrap:wrap;gap:4px 28px;justify-content:center;text-align:center;border-bottom:1px dotted rgba(255,255,255,.1);padding:2px 0}.pm-v div span{flex:1 1 140px}.pm-t{display:flex;gap:6px;flex-wrap:wrap;margin-top:8px}.pm-n{font-size:.85rem;opacity:.85;margin:6px 0;padding:8px;border-radius:8px;background:rgba(231,199,106,.1)}</style>`;
Pages.poems=async()=>{
 const P=await loadScript('data/poems.js','POEMS');let q='',cat='الكل',open=null,fav=false;
 const favs=()=>LS.get('pmfav',[]);
 app.innerHTML=css+crumbs([['مكتبة القصائد']])+`<h2 class="sec">مكتبة القصائد</h2>
 <input class="field" id="pq" type="search" placeholder="ابحث باسم القصيدة أو الشاعر أو كلمة منها…" style="width:100%"><div class="chips" id="pc">${CATS.filter(c=>c==='الكل'||P.some(x=>x.c===c)).map((c,i)=>`<button class="btn sm${i?'':' gold'}" data-c="${c}">${c}</button>`).join('')}<button class="btn sm" data-fv="1">★ المفضلة</button></div><div id="pl"></div>`;
 const card=x=>{const f=favs().includes(x.id),o=open===x.id;return `<div class="pm-c"><h3>${esc(x.t)}</h3><div class="muted">${esc(x.p)} · ${esc(x.c)} · ${AR(x.v.length)} بيت</div>
 ${o?`<div class="pm-v">${x.v.map(v=>`<div><span>${esc(v[0])}</span><span>${esc(v[1])}</span></div>`).join('')}</div>`:''}
 <div class="pm-t"><button class="btn sm gold" data-o="${x.id}">${o?'إخفاء':'اقرأ'}</button><button class="btn sm" data-f="${x.id}">${f?'★ في المفضلة':'☆ أضف للمفضلة'}</button></div></div>`};
 const draw=()=>{const n=API.norm||(s=>s);let L=P;if(fav)L=L.filter(x=>favs().includes(x.id));if(cat!=='الكل')L=L.filter(x=>x.c===cat);
  if(q)L=L.filter(x=>n(x.t).includes(n(q))||n(x.p).includes(n(q))||x.v.some(v=>n(v[0]+' '+v[1]).includes(n(q))));
  $('#pl').innerHTML=L.length?L.map(card).join(''):`<div class="notice">لا نتائج.</div>`};
 draw();
 $('#pq').oninput=e=>{q=e.target.value.trim();draw()};
 app.onclick=e=>{const g=s=>e.target.closest(s);let b;
  if(b=g('[data-c]')){cat=b.dataset.c;fav=false;$$('#pc .btn').forEach(x=>x.classList.toggle('gold',x===b));draw()}
  else if(b=g('[data-fv]')){fav=!fav;b.classList.toggle('gold',fav);draw()}
  else if(b=g('[data-o]')){open=open===b.dataset.o?null:b.dataset.o;draw()}
  else if(b=g('[data-f]')){let f=favs();f=f.includes(b.dataset.f)?f.filter(x=>x!==b.dataset.f):f.concat(b.dataset.f);LS.set('pmfav',f);draw()}};
};
};
