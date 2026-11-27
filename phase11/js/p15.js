/* Amal v45 preview: activities hub (quiz categories + daily challenge streak) */
window.AmalExtra15=function(API){
const {Pages,app,$,$$,LS,AR,esc,loadScript,crumbs}=API;
(window.AmalSections=window.AmalSections||[]).push(['activities.html','مركز الأنشطة','act','quiz']);
const oq=Pages.quiz;
const day=d=>d.toISOString().slice(0,10);
const streak=()=>{const h=LS.get('dchist',[]);let n=0;const d=new Date();if(!h.includes(day(d)))d.setDate(d.getDate()-1);while(h.includes(day(d))){n++;d.setDate(d.getDate()-1)}return n};
Pages.quiz=async(p)=>{try{await loadScript('data/quiz-x.js','QX')}catch(e){}
 await oq(p);
 const c=p.get('cat');if(c&&$('#qc')){$('#qc').value=c;if(p.get('go')&&$('#qs'))$('#qs').click()}
  const b=$('#qd');if(b)b.addEventListener('click',()=>{const h=LS.get('dchist',[]);const t=day(new Date());if(!h.includes(t)){h.push(t);LS.set('dchist',h.slice(-400))}});
 if(p.get('daily')&&b)b.click()};
const CARDS=[
 ['الأنبياء','قصص الأنبياء عليهم السلام: من هو؟ وإلى أي قوم؟','star'],
 ['الصحابة','الخلفاء الراشدون والصحابة ومناقبهم','star'],
 ['السيرة النبوية','من المولد إلى الهجرة والغزوات','book'],
 ['القرآن الكريم','السور والأجزاء والمكي والمدني','book'],
 ['الحديث','رواة الأحاديث من الأربعين النووية','scroll'],
 ['العقيدة والعبادات','أركان الإسلام والإيمان والصلاة والصيام','mosque']];
Pages.activities=async()=>{
 const st=LS.get('qstats',{pts:0,played:0,best:0});const sk=streak();const done=LS.get('dchist',[]).includes(day(new Date()));
 app.innerHTML=`<style>.ac-g{display:grid;grid-template-columns:1fr;gap:10px}.ac-c{display:flex;gap:12px;align-items:center;padding:14px;border:1px solid var(--line,rgba(255,255,255,.14));border-radius:14px;background:var(--card,rgba(255,255,255,.05));text-decoration:none;color:inherit}.ac-c b{display:block}.ac-c small{opacity:.75}.ac-ic{width:38px;height:38px;flex:none;display:grid;place-items:center;color:var(--gold,#e7c76a)}.ac-ic svg{width:28px;height:28px;stroke:currentColor;fill:none;stroke-width:1.7}.ac-st{display:flex;gap:8px;flex-wrap:wrap}.ac-st div{flex:1 1 90px;text-align:center;padding:10px;border-radius:12px;background:var(--card,rgba(255,255,255,.05))}.ac-st h3{margin:2px 0}</style>`+crumbs([['الأنشطة الدينية']])+`<h2 class="sec">الأنشطة الدينية</h2>
 <div class="ac-st"><div><div class="muted">النقاط</div><h3>${AR(st.pts)}</h3></div><div><div class="muted">اختبارات</div><h3>${AR(st.played)}</h3></div><div><div class="muted">أيام متتالية</div><h3>${AR(sk)}</h3></div></div>
 <h2 class="sec">تحدي اليوم</h2><a class="ac-c" href="quiz.html?daily=1"><span class="ac-ic">${API.icon('spark')}</span><span><b>${done?'أنجزتَ تحدي اليوم ✓ (يمكنك إعادته)':'ابدأ تحدي اليوم'}</b><small>١٠ أسئلة متنوعة تتغير كل يوم، مع الإجابة الصحيحة والشرح بعد كل سؤال</small></span></a>
 <h2 class="sec">اختبارات حسب القسم</h2><div class="ac-g">${CARDS.map(c=>`<a class="ac-c" href="quiz.html?cat=${encodeURIComponent(c[0])}&go=1"><span class="ac-ic">${API.icon(c[2])}</span><span><b>${esc(c[0])}</b><small>${esc(c[1])}</small></span></a>`).join('')}</div>
 <h2 class="sec">أنشطة أخرى</h2><div class="ac-g"><a class="ac-c" href="cards.html"><span class="ac-ic">${API.icon('spark')}</span><span><b>بطاقات يومية</b></span></a><a class="ac-c" href="tasmee.html"><span class="ac-ic">${API.icon('book')}</span><span><b>تسميع الحفظ</b></span></a><a class="ac-c" href="khatm.html"><span class="ac-ic">${API.icon('book')}</span><span><b>رحلة الختم</b></span></a><a class="ac-c" href="quiz.html"><span class="ac-ic">${API.icon('quiz')}</span><span><b>كل الأسئلة والنتائج</b></span></a></div>
`};
};
