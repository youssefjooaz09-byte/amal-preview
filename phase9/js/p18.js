/* Amal v48 preview: bottom navigation bar (mobile), bigger search with section matches, stories hub. */
window.AmalExtra18=function(API){
const {Pages,app,$,$$,esc,crumbs,icon}=API;
const css=document.createElement('style');css.textContent=`
#bnav{display:none}
.sh-g{display:grid;gap:10px;margin-top:10px}.sh-g a{display:flex;align-items:center;gap:12px;padding:16px;border:1px solid var(--cardb);border-radius:16px;background:var(--card);color:var(--text)!important;font-size:1.1rem;text-decoration:none}.sh-g a span.i{color:var(--gold2);display:grid}.sh-g svg{width:28px;height:28px}
.searchbox input{min-width:240px;min-height:42px;font-size:1rem}
#sres a.sec-hit{background:rgba(226,199,121,.14)}
@media(max-width:800px){
 .top .tools{width:100%;flex-basis:100%;order:3;display:flex;gap:8px}.top .searchbox{flex:1}.top .searchbox input{width:100%;min-height:48px;box-sizing:border-box}
 #sres{width:100%;inset-inline:0}
 #bnav{display:flex;position:fixed;bottom:0;inset-inline:0;z-index:75;height:58px;background:#0b1230;border-top:1px solid var(--gold);box-shadow:0 -4px 16px rgba(0,0,0,.4)}
 #bnav a,#bnav button{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px;background:none;border:0;color:#cfcde6;font:inherit;font-size:.72rem;text-decoration:none;cursor:pointer;padding:0}
 #bnav .on{color:var(--gold2)}#bnav svg{width:22px;height:22px}#bnav .e{font-size:1.2rem;line-height:22px}
 #player{bottom:58px}body{padding-bottom:154px}
}`;document.head.appendChild(css);
const page=(location.pathname.split('/').pop()||'index.html');
const it=(href,ic,t,on)=>`<a href="${href}" class="${on?'on':''}">${ic}<span>${t}</span></a>`;
const b=document.createElement('nav');b.id='bnav';b.setAttribute('aria-label','التنقل السريع');
b.innerHTML=it('index.html',icon('mosque'),'الرئيسية',page==='index.html')+it('quran.html',icon('book'),'القرآن',/^(quran|surah)\.html/.test(page))+it('azkar.html',icon('beads'),'الأذكار',page==='azkar.html')
 +`<button type="button" id="bsearch"><span class="e">🔍</span><span>بحث</span></button>`+it('allsections.html',icon('lib'),'المزيد',page==='allsections.html');
document.body.appendChild(b);
$('#bsearch').onclick=()=>{window.scrollTo({top:0,behavior:'smooth'});const q=$('#q');if(q)setTimeout(()=>q.focus(),250)};
const q=$('#q'),box=$('#sres');
if(q){q.placeholder='🔍 ابحث عن قسم أو سورة أو آية…';
 new MutationObserver(()=>{const v=q.value.trim();if(v.length<2||!window.AmalCats||box.querySelector('.sec-hit'))return;
  const hits=AmalCats.find(v);if(!hits.length)return;
  box.querySelectorAll('a:not([href])').forEach(a=>a.remove());
  box.insertAdjacentHTML('afterbegin',hits.map(i=>`<a class="sec-hit" href="${esc(i[0])}">▸ ${esc(i[1])} <span class="muted">قسم</span></a>`).join(''));box.style.display='block'}).observe(box,{childList:true})}
Pages.storyhub=async()=>{
 app.innerHTML=crumbs([['القصص والحكايات']])+`<h2 class="sec">القصص والحكايات</h2><div class="sh-g"><a href="qisas.html"><span class="i">${icon('scroll')}</span>قصص الأنبياء</a><a href="stories.html"><span class="i">${icon('book')}</span>قصص وعبر</a><a href="hekayat.html"><span class="i">${icon('book')}</span>حكايات وعبر</a></div>`};
};
