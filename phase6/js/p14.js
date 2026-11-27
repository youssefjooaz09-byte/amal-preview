/* Amal v44 preview: home categories (7 collapsible cards) + "All sections" page. No section removed: every existing page is listed in a category. */
window.AmalExtra14=function(API){
const {Pages,app,$,$$,LS,esc,crumbs,toast,icon}=API;
const CATS=[
 {id:'quran',t:'القرآن الكريم',ic:'book',d:'المصحف والتفسير والتلاوات'},
 {id:'sunnah',t:'السنة النبوية',ic:'scroll',d:'الأحاديث والسيرة والصحابة'},
 {id:'circles',t:'مجالس العلم',ic:'lib',d:'دروس العلماء والشيوخ'},
 {id:'audio',t:'الصوتيات والإنشاد',ic:'headset',d:'إذاعة وتلاوات وتسجيلات'},
 {id:'act',t:'الأنشطة الدينية',ic:'quiz',d:'أسئلة وبطاقات وحفظ'},
 {id:'library',t:'المكتبة الإسلامية',ic:'lib',d:'كتب وقصص ومعارف وأدوات'},
 {id:'worship',t:'العبادات والأذكار',ic:'beads',d:'أذكار وأدعية ومواقيت'},
 {id:'more',t:'أدوات وإعدادات',ic:'spark',d:'أدوات إضافية وإعدادات وتواصل'}
];
/* [href, label, category, icon, optional extra categories] - every page of the site appears exactly once as primary */
const ITEMS=[
 ['quran.html','المصحف الشريف','quran','book'],['tafsir.html','التفسير','quran','tafsir'],['reciters.html','القرّاء والتلاوات','quran','headset',['audio']],['record.html','سجّل تلاوتك','quran','headset'],['tasmee.html','تسميع الحفظ','quran','book'],['khatm.html','رحلة الختم','quran','book'],
 ['hadith.html','الأحاديث النبوية','sunnah','scroll'],['seerah.html','السيرة النبوية','sunnah','book'],['companions.html','الصحابة','sunnah','star'],['fiqh.html','الفقه والعبادات','sunnah','mosque'],
 ['majalis.html','مجالس العلم','circles','lib'],['videos.html','دروس مرئية','circles','lib'],['sheikhs.html','دروس الشيوخ','circles','headset'],['scholars.html','سير العلماء','circles','scroll'],
 ['radio.html','إذاعة القرآن الكريم','audio','mosque'],['oldschool.html','مدرسة التلاوة المصرية القديمة','audio','headset'],
 ['quiz.html','الأسئلة الدينية','act','quiz'],['cards.html','بطاقات يومية','act','spark'],['journal.html','مفكرتي','act','scroll'],['favorites.html','المفضلة','act','star'],
 ['library.html','الكتب الإسلامية','library','lib'],['storyhub.html','القصص والحكايات','library','scroll'],['prophets.html','الأنبياء','library','star'],['glossary.html','قاموس المصطلحات','library','book'],['names-of-allah.html','أسماء الله الحسنى','library','spark'],['kids.html','ركن الأطفال','library','star'],['newmuslim.html','المسلم الجديد','library','star'],['images.html','معرض الصور','more','image'],['wallpapers.html','مركز الخلفيات','more','image'],['videomaker.html','صانع الفيديو','more','image'],['shelf.html','رفّ كتبي','more','lib'],['sources.html','المصادر','more','lib'],['settings.html','الإعدادات','more','spark'],['contact.html','تواصل','more','spark'],['report.html','إبلاغ عن خطأ','more','spark'],['share.html','شارك التطبيق','more','spark'],
 ['azkar.html','الأذكار','worship','beads'],['duas.html','الأدعية','worship','hands'],['wird.html','ورد يومي','worship','beads'],['salah.html','مواقيت الصلاة','worship','clock'],['qibla.html','اتجاه القبلة','worship','compass'],['hijri.html','التقويم الهجري','worship','clock'],['remind.html','التذكير بالصلاة','more','clock']
];
/* new sections register here in later phases: window.AmalSections.push([href,label,cat,icon]) */
window.AmalSections=window.AmalSections||[];
const all=()=>ITEMS.concat(window.AmalSections);
const fav=()=>LS.get('secfav',[]);
const setFav=a=>LS.set('secfav',a);
const inCat=c=>all().filter(i=>i[2]===c||(i[4]||[]).includes(c));
const link=i=>`<a class="cs-item" href="${i[0]}"><span class="cs-ic">${icon(i[3])}</span><span>${esc(i[1])}</span></a>`;
const css=`<style>
.cs{display:grid;gap:10px;margin:2px 0 14px}
.cs details{border:1px solid var(--cardb);border-radius:18px;background:var(--card);overflow:hidden}
.cs summary{list-style:none;display:flex;align-items:center;gap:12px;padding:12px 14px;cursor:pointer;min-height:56px}
.cs summary::-webkit-details-marker{display:none}
.cs .cs-h{width:44px;height:44px;border-radius:14px;display:grid;place-items:center;flex:none;color:var(--gold2);background:rgba(226,199,121,.12);border:1px solid rgba(226,199,121,.28)}
.cs .cs-h svg{width:26px;height:26px}
.cs .cs-t{flex:1;min-width:0}.cs .cs-t b{display:block;font-size:1.05rem;color:var(--text)}.cs .cs-t small{color:var(--muted);font-size:.8rem}
.cs .cs-n{font-size:.78rem;color:var(--muted);border:1px solid var(--cardb);border-radius:999px;padding:1px 9px}
.cs .cs-c{transition:transform .2s;color:var(--gold2)}.cs details[open] .cs-c{transform:rotate(90deg)}
.cs .cs-b{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;padding:4px 12px 14px}
@media(min-width:720px){.cs .cs-b{grid-template-columns:repeat(4,1fr)}}
.cs-item{display:flex;align-items:center;gap:8px;padding:10px;border-radius:12px;border:1px solid var(--cardb);background:rgba(255,255,255,.04);color:var(--text)!important;font-size:.9rem;min-height:44px;text-decoration:none}
.cs-item:hover{border-color:var(--gold)}
.cs-ic{flex:none;color:var(--gold2);display:grid}.cs-ic svg{width:22px;height:22px}
.cs-all{display:flex;justify-content:center;margin:0 0 6px}
.cs-chips{display:flex;gap:8px;flex-wrap:wrap;margin:0 0 12px}.cs-chips a{border:1px solid var(--cardb);border-radius:999px;padding:6px 12px;background:var(--card);font-size:.88rem}
.as-search{width:100%;padding:12px 14px;border-radius:14px;border:1px solid var(--cardb);background:var(--card);color:var(--text);font:inherit;margin:6px 0 12px}
.as-grp h3{margin:14px 0 8px;font-size:1rem;color:var(--gold2)}
.as-list{display:grid;grid-template-columns:repeat(2,1fr);gap:8px}@media(min-width:720px){.as-list{grid-template-columns:repeat(3,1fr)}}
.as-row{position:relative}.as-row .cs-item{padding-inline-end:44px}
.as-star{position:absolute;inset-inline-end:4px;top:50%;transform:translateY(-50%);width:40px;height:40px;border:0;background:none;color:var(--muted);font-size:1.3rem;cursor:pointer}
.as-star.on{color:var(--gold2)}
</style>`;
const catHtml=(c,open)=>{const it=inCat(c.id);return `<details ${open?'open':''} data-c="${c.id}"><summary><span class="cs-h">${icon(c.ic)}</span><span class="cs-t"><b>${c.t}</b><small>${c.d}</small></span><span class="cs-n">${API.AR(it.length)}</span><span class="cs-c">‹</span></summary><div class="cs-b">${it.map(link).join('')}</div></details>`};
window.AmalCats={
 find(q){const n=(API.norm||(x=>x))(q);return all().filter(i=>(API.norm||(x=>x))(i[1]).includes(n)).slice(0,6)},
 home(){const f=fav();const chips=f.length?`<div class="cs-chips">${f.map(h=>{const i=all().find(x=>x[0]===h);return i?`<a href="${i[0]}">★ ${esc(i[1])}</a>`:''}).join('')}</div>`:'';
  return css+`<div class="cs-all"><a class="btn gold" href="allsections.html">جميع الأقسام والبحث</a></div>${chips}<div class="cs" id="sections">${CATS.map(c=>catHtml(c,false)).join('')}</div>`},
 bind(){}
};
Pages.allsections=async()=>{
 const draw=q=>{const n=q.trim();const f=fav();const match=i=>!n||i[1].includes(n)||CATS.find(c=>c.id===i[2]).t.includes(n);
  const fl=f.map(h=>all().find(x=>x[0]===h)).filter(Boolean).filter(match);
  const row=i=>`<div class="as-row">${link(i)}<button class="as-star ${f.includes(i[0])?'on':''}" data-h="${i[0]}" aria-label="${f.includes(i[0])?'إزالة من المفضلة':'إضافة إلى المفضلة'}">${f.includes(i[0])?'★':'☆'}</button></div>`;
  let h='';if(fl.length)h+=`<div class="as-grp"><h3>★ أقسامي المفضلة</h3><div class="as-list">${fl.map(row).join('')}</div></div>`;
  CATS.forEach(c=>{const it=all().filter(i=>i[2]===c.id).filter(match);if(it.length)h+=`<div class="as-grp"><h3>${c.t}</h3><div class="as-list">${it.map(row).join('')}</div></div>`});
  $('#asr').innerHTML=h||'<div class="notice">لا نتائج</div>'};
 app.innerHTML=css+crumbs([['جميع الأقسام']])+`<h2 class="sec">جميع الأقسام</h2><input class="as-search" id="asq" type="search" placeholder="ابحث عن قسم…" aria-label="بحث في الأقسام"><div id="asr"></div>`;
 draw('');$('#asq').oninput=e=>draw(e.target.value);
 $('#asr').onclick=e=>{const b=e.target.closest('.as-star');if(!b)return;const h=b.dataset.h;let f=fav();f=f.includes(h)?f.filter(x=>x!==h):f.concat(h);setFav(f);draw($('#asq').value)};
};
};
