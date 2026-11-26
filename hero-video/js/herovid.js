// Full-screen video hero (user-supplied footage). Video fills the whole first screen.
export async function initHero(root) {
  const HERO = /[?&]mode=hero\b/.test(location.search);
  const stage = (() => { const d = document.createElement('div'); d.id = 'vbg'; d.setAttribute('aria-hidden', 'true'); if (HERO) { root.prepend(d); document.body.classList.add('vidhero'); } else { document.body.prepend(d); const sc = document.createElement('div'); sc.id = 'vscrim'; document.body.prepend(sc); document.body.prepend(d); } return d; })(), btn = root.querySelector('.h3-mo');
  const bar = root.querySelector('.h3-bar i'), lab = root.querySelector('.h3-lab');
  document.body.classList.add('vidhome');
  const onScroll = () => document.body.classList.toggle('vscrolled', scrollY > innerHeight * 0.5);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  stage.style.backgroundImage = `url(${new URL('../video/poster.jpg', import.meta.url).href})`;
  const saver = navigator.connection && navigator.connection.saveData;
  const reduced = matchMedia('(prefers-reduced-motion:reduce)').matches;
  const v = document.createElement('video');
  v.muted = true; v.loop = true; v.playsInline = true; v.setAttribute('playsinline', ''); v.setAttribute('muted', '');
  v.preload = saver ? 'none' : 'auto'; v.poster = new URL('../video/poster.jpg', import.meta.url).href;
  const SRC = new URL('../video/hero.mp4', import.meta.url).href;
  v.setAttribute('aria-hidden', 'true'); v.tabIndex = -1;
  stage.appendChild(v);
  let still = reduced || saver || localStorage.getItem('amal.hv.still') === '1';
  const label = () => { btn.textContent = v.paused ? '▶ تشغيل الحركة' : '❚❚ إيقاف الحركة'; btn.setAttribute('aria-pressed', v.paused ? 'true' : 'false'); };
  const show = () => { root.classList.remove('pending', 'nogl'); root.classList.add('gl'); label(); };
  lab.textContent = 'جارٍ تحميل المشهد'; bar.style.width = '30%';
  v.addEventListener('progress', () => { if (v.buffered.length) bar.style.width = Math.min(95, 30 + 65 * v.buffered.end(0) / 12) + '%'; });
  const ready = new Promise(res => { v.addEventListener('loadeddata', res, { once: true }); v.addEventListener('error', () => res('err'), { once: true }); setTimeout(res, saver ? 10 : 15000, 'to'); });
  if (!saver) { if (document.readyState === 'complete') { v.src = SRC; v.load(); } else addEventListener('load', () => { v.src = SRC; v.load(); }, { once: true }); }
  show(); // poster is visible immediately; video fades in when its first frame is ready
  const r = await ready;
  if (r === 'err') { v.remove(); }
  if (still) { v.pause(); } else if (r === 'err') {} else { try { await v.play(); } catch (e) { v.pause(); } }
  label();
  btn.onclick = () => { if (v.paused) { v.play().catch(() => {}); localStorage.setItem('amal.hv.still', '0'); } else { v.pause(); localStorage.setItem('amal.hv.still', '1'); } label(); };
  v.addEventListener('play', label); v.addEventListener('pause', label);
  document.addEventListener('visibilitychange', () => { if (document.hidden) { if (!v.paused) { v.pause(); v.dataset.auto = '1'; } } else if (v.dataset.auto === '1') { v.dataset.auto = ''; v.play().catch(() => {}); } });
  window.__herovid = v;
}
