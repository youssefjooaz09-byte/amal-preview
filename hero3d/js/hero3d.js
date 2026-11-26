// Cinematic 3D hero: procedural mosque + drone-camera flythrough (Three.js, MIT).
// Everything here is generated in code: no photos, no external assets.
const BASE = new URL('../vendor/', import.meta.url).href;

export async function initHero(root) {
  const stage = root.querySelector('.h3-stage');
  const bar = root.querySelector('.h3-bar i');
  const lab = root.querySelector('.h3-lab');
  const btn = root.querySelector('.h3-mo');
  const ls = { get: () => { try { return localStorage.getItem('amal.h3d.still'); } catch (e) { return null; } }, set: v => { try { localStorage.setItem('amal.h3d.still', v); } catch (e) {} } };
  const step = async (p, t) => { bar.style.width = p + '%'; lab.textContent = t; await new Promise(r => requestAnimationFrame(() => setTimeout(r, 0))); };
  const mobile = matchMedia('(max-width:760px)').matches || (navigator.deviceMemory && navigator.deviceMemory <= 2) || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 3);
  const reduced = matchMedia('(prefers-reduced-motion:reduce)').matches;

  await step(4, 'جارٍ تحميل المحرك الثلاثي الأبعاد');
  const THREE = await import(BASE + 'three.module.js');
  const canvas = document.createElement('canvas');
  stage.appendChild(canvas);
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: !mobile, powerPreference: 'high-performance' });
  } catch (e) { throw new Error('webgl'); }
  const gl = renderer.getContext();
  if (!gl) throw new Error('webgl');
  const DPR = mobile ? 1 : Math.min(devicePixelRatio || 1, 1.75);
  renderer.setPixelRatio(DPR);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.95;
  if (!mobile) { renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap; }

  const scene = new THREE.Scene();
  const HORIZON = new THREE.Color('#e9b79a');
  scene.fog = new THREE.FogExp2(HORIZON, mobile ? 0.0042 : 0.0036);
  const camera = new THREE.PerspectiveCamera(mobile ? 58 : 48, 1, 0.5, 2500);

  // ---------- procedural textures ----------
  const mk = (w, h, fn) => { const c = document.createElement('canvas'); c.width = w; c.height = h; const x = c.getContext('2d'); fn(x, w, h); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; t.anisotropy = mobile ? 2 : 8; return t; };
  const rnd = (() => { let s = 7; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  await step(12, 'جارٍ صنع الخامات والرخام');
  const stoneTex = (base, line) => mk(512, 512, (x, w, h) => {
    x.fillStyle = base; x.fillRect(0, 0, w, h);
    for (let i = 0; i < 9000; i++) { x.fillStyle = `rgba(${rnd() < .5 ? '90,70,50' : '255,250,240'},${rnd() * 0.07})`; x.fillRect(rnd() * w, rnd() * h, 1 + rnd() * 3, 1 + rnd() * 3); }
    x.strokeStyle = line; x.lineWidth = 2;
    for (let r = 0; r < 8; r++) { const y = r * 64; x.beginPath(); x.moveTo(0, y); x.lineTo(w, y); x.stroke(); for (let c = 0; c < 4; c++) { const xx = c * 128 + (r % 2) * 64; x.beginPath(); x.moveTo(xx, y); x.lineTo(xx, y + 64); x.stroke(); } }
  });
  const wallTex = stoneTex('#efe2c9', 'rgba(150,125,95,.22)'); wallTex.repeat.set(1 / 7, 1 / 7);
  const wallTexB = wallTex.clone(); wallTexB.repeat.set(0.16, 0.16); wallTexB.needsUpdate = true;
  const marbleTex = mk(512, 512, (x, w, h) => {
    x.fillStyle = '#f4ecdc'; x.fillRect(0, 0, w, h);
    for (let i = 0; i < 26; i++) { x.strokeStyle = `rgba(150,140,125,${0.05 + rnd() * 0.07})`; x.lineWidth = 1 + rnd() * 2; x.beginPath(); let px = rnd() * w, py = 0; x.moveTo(px, py); for (let k = 0; k < 10; k++) { px += (rnd() - .5) * 80; py += h / 10; x.lineTo(px, py); } x.stroke(); }
  });
  // courtyard paving: geometric star pattern in cream, sand and a little gold
  const pave = mk(1024, 1024, (x, w, h) => {
    x.fillStyle = '#e6d6b8'; x.fillRect(0, 0, w, h);
    const n = 8, s = w / n;
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
      const cx = i * s + s / 2, cy = j * s + s / 2;
      x.fillStyle = (i + j) % 2 ? '#d9c6a2' : '#eee2c8'; x.fillRect(i * s, j * s, s, s);
      x.strokeStyle = 'rgba(120,95,60,.35)'; x.lineWidth = 2; x.strokeRect(i * s + 2, j * s + 2, s - 4, s - 4);
      x.beginPath(); for (let k = 0; k < 16; k++) { const a = k * Math.PI / 8, r = k % 2 ? s * 0.2 : s * 0.4; const px = cx + Math.cos(a) * r, py = cy + Math.sin(a) * r; k ? x.lineTo(px, py) : x.moveTo(px, py); } x.closePath();
      x.fillStyle = (i + j) % 2 ? 'rgba(176,140,70,.55)' : 'rgba(120,150,150,.35)'; x.fill(); x.stroke();
    }
    for (let i = 0; i < 14000; i++) { x.fillStyle = `rgba(80,60,40,${rnd() * 0.05})`; x.fillRect(rnd() * w, rnd() * h, 2, 2); }
  });
  pave.repeat.set(5, 6);
  const sandTex = mk(512, 512, (x, w, h) => { x.fillStyle = '#c8b18b'; x.fillRect(0, 0, w, h); for (let i = 0; i < 20000; i++) { x.fillStyle = `rgba(${rnd() < .5 ? '120,95,60' : '240,225,190'},${rnd() * 0.08})`; x.fillRect(rnd() * w, rnd() * h, 2, 2); } });
  sandTex.repeat.set(60, 60);
  const ribTex = mk(512, 256, (x, w, h) => {
    x.fillStyle = '#f2ead8'; x.fillRect(0, 0, w, h);
    const R = 24; for (let i = 0; i < R; i++) { const g = x.createLinearGradient(i * w / R, 0, (i + 1) * w / R, 0); g.addColorStop(0, 'rgba(140,115,80,.0)'); g.addColorStop(.08, 'rgba(120,95,60,.35)'); g.addColorStop(.2, 'rgba(255,255,255,.12)'); g.addColorStop(1, 'rgba(0,0,0,.05)'); x.fillStyle = g; x.fillRect(i * w / R, 0, w / R, h); }
    for (let i = 0; i < 3000; i++) { x.fillStyle = `rgba(90,70,50,${rnd() * 0.05})`; x.fillRect(rnd() * w, rnd() * h, 2, 2); }
  });
  const cloudTex = mk(256, 256, (x, w, h) => {
    for (let i = 0; i < 38; i++) { const cx = w * (0.2 + rnd() * 0.6), cy = h * (0.35 + rnd() * 0.3), r = 24 + rnd() * 44; const g = x.createRadialGradient(cx, cy, 0, cx, cy, r); g.addColorStop(0, 'rgba(255,255,255,.30)'); g.addColorStop(1, 'rgba(255,255,255,0)'); x.fillStyle = g; x.fillRect(0, 0, w, h); }
  });
  cloudTex.wrapS = cloudTex.wrapT = THREE.ClampToEdgeWrapping;

  // ---------- materials ----------
  const std = (o) => new THREE.MeshStandardMaterial(o);
  const M = {
    wall: std({ map: wallTex, roughness: 0.82, metalness: 0 }),
    wallB: std({ map: wallTexB, roughness: 0.85 }),
    marble: std({ map: marbleTex, roughness: 0.38, metalness: 0.02 }),
    dome: std({ map: ribTex, roughness: 0.42, metalness: 0.05 }),
    gold: std({ color: '#d4a537', roughness: 0.28, metalness: 1 }),
    teal: std({ color: '#2f7f86', roughness: 0.4, metalness: 0.1 }),
    glow: std({ color: '#1b0f08', emissive: '#ffb45e', emissiveIntensity: 1.25, roughness: 1 }),
    floor: std({ map: pave, roughness: 0.62 }),
    sand: std({ map: sandTex, roughness: 1 }),
    water: std({ color: '#5f98a8', roughness: 0.06, metalness: 0.6 }),
    dark: std({ color: '#3a2c22', roughness: 0.9 }),
  };
  M.wall.map.anisotropy = M.dome.map.anisotropy = 4;
  ribTex.wrapS = THREE.RepeatWrapping;

  const shadowOn = !mobile;
  const add = (g, m, x, y, z, parent) => { const o = new THREE.Mesh(g, m); o.position.set(x, y, z); o.castShadow = shadowOn; o.receiveShadow = shadowOn; (parent || mosque).add(o); return o; };
  const mosque = new THREE.Group(); scene.add(mosque);

  // ---------- geometry helpers ----------
  const archPath = (w, h, rise = 0.45) => { const s = h - w * 0.62, p = new THREE.Path(); p.moveTo(-w / 2, 0); p.lineTo(-w / 2, s); p.quadraticCurveTo(-w / 2, s + w * rise, 0, h); p.quadraticCurveTo(w / 2, s + w * rise, w / 2, s); p.lineTo(w / 2, 0); p.lineTo(-w / 2, 0); return p; };
  const archShape = (w, h) => new THREE.Shape(archPath(w, h).getPoints(16));
  const wallWithArches = (W, H, arches, depth, mat, curveSeg = 14) => {
    const sh = new THREE.Shape(); sh.moveTo(-W / 2, 0); sh.lineTo(W / 2, 0); sh.lineTo(W / 2, H); sh.lineTo(-W / 2, H); sh.lineTo(-W / 2, 0);
    arches.forEach(([cx, w, h]) => { const pts = archPath(w, h).getPoints(curveSeg).map(p => new THREE.Vector2(p.x + cx, p.y)); sh.holes.push(new THREE.Path(pts.reverse())); });
    const g = new THREE.ExtrudeGeometry(sh, { depth, bevelEnabled: false, curveSegments: curveSeg });
    return g;
  };
  await step(26, 'جارٍ بناء المسجد: الواجهة والأقواس');

  // main prayer hall
  const HW = 36, HD = 22, HH = 13;
  const hallMats = [M.wallB, M.wallB, M.wall, M.wall, M.glow, M.wallB];
  add(new THREE.BoxGeometry(HW, HH, HD), hallMats, 0, HH / 2, 0);
  // facade with arches, extruded in front of hall
  const fArches = [[0, 9, 10.2], [-7.5, 4.6, 7.4], [7.5, 4.6, 7.4], [-12.8, 3.2, 6], [12.8, 3.2, 6]];
  const fac = add(wallWithArches(HW, HH - 0.01, fArches, 1.6, M.wall), M.wall, 0, 0, HD / 2);
  // arch frames (gold trim) around the big arch and a raised portal
  const portalShape = archShape(11.2, 12); portalShape.holes.push(new THREE.Path(archPath(9, 10.2).getPoints(16).reverse()));
  add(new THREE.ExtrudeGeometry(portalShape, { depth: 2.4, bevelEnabled: false }), M.marble, 0, 0, HD / 2);
  const trim = new THREE.Shape(archPath(9.4, 10.6).getPoints(16)); trim.holes.push(new THREE.Path(archPath(9, 10.2).getPoints(16).reverse()));
  add(new THREE.ExtrudeGeometry(trim, { depth: 2.6, bevelEnabled: false }), M.gold, 0, 0, HD / 2);
  // columns on the facade
  [-4.9, 4.9, -10.3, 10.3].forEach(x => { add(new THREE.CylinderGeometry(0.42, 0.5, HH - 3, 12), M.marble, x, (HH - 3) / 2 + 0.3, HD / 2 + 1.9); });
  // parapet + cornice
  add(new THREE.BoxGeometry(HW + 1.2, 0.8, HD + 1.2), M.marble, 0, HH + 0.1, 0);
  // front crenellated parapet (merlons)
  for (let i = -17; i <= 17; i += 1.7) add(new THREE.BoxGeometry(0.9, 1.1, 0.5), M.marble, i, HH + 0.95, HD / 2 + 0.4);

  // domes
  const domeGeo = (r, stretch = 1.12) => { const pts = []; const N = mobile ? 24 : 40; for (let i = 0; i <= N; i++) { const a = (Math.PI / 2) * (1 - i / N); const bulge = 1 + 0.10 * Math.sin(a * 2) ; pts.push(new THREE.Vector2(Math.max(0.0001, Math.sin(a) * r * bulge), Math.cos(a) * r * stretch)); } return new THREE.LatheGeometry(pts, mobile ? 32 : 64); };
  const finial = (x, y, z, s) => {
    const g = new THREE.Group(); g.position.set(x, y, z); mosque.add(g);
    add(new THREE.CylinderGeometry(0.08 * s, 0.14 * s, 1.6 * s, 8), M.gold, 0, 0.8 * s, 0, g);
    [0.5, 0.9].forEach(h => add(new THREE.SphereGeometry(0.22 * s, 10, 8), M.gold, 0, h * s + .1, 0, g));
    const cr = add(new THREE.TorusGeometry(0.55 * s, 0.09 * s, 8, 24, Math.PI * 1.55), M.gold, 0, 2.0 * s, 0, g); cr.rotation.z = 0.5;
    add(new THREE.SphereGeometry(0.16 * s, 10, 8), M.gold, 0.12 * s, 2.0 * s, 0, g);
    return g;
  };
  const bigR = 8.2;
  add(new THREE.CylinderGeometry(bigR, bigR + 0.3, 3.4, 40), M.wall, 0, HH + 1.7, 0);
  for (let i = 0; i < 16; i++) { const a = i / 16 * Math.PI * 2; const w = add(new THREE.BoxGeometry(0.9, 2, 0.15), M.glow, Math.sin(a) * (bigR + 0.02), HH + 1.8, Math.cos(a) * (bigR + 0.02)); w.rotation.y = a; }
  add(new THREE.TorusGeometry(bigR + 0.1, 0.25, 8, 48), M.gold, 0, HH + 3.4, 0).rotation.x = Math.PI / 2;
  add(domeGeo(bigR), M.dome, 0, HH + 3.4, 0);
  finial(0, HH + 3.4 + bigR * 1.12 - 0.2, 0, 1.5);
  const smallDome = (x, z, r, y = HH + 0.5) => { add(new THREE.CylinderGeometry(r, r + 0.2, 1.4, 24), M.wall, x, y + 0.7, z); add(domeGeo(r), M.dome, x, y + 1.4, z); finial(x, y + 1.4 + r * 1.12 - 0.15, z, 0.7); };
  smallDome(-13, 0, 4.2); smallDome(13, 0, 4.2);
  [-14, -7.5, 7.5, 14].forEach(x => smallDome(x, 8, 1.7));
  [-14, -7.5, 7.5, 14].forEach(x => smallDome(x, -8, 1.7));
  // semi-domes flanking the portal
  await step(46, 'جارٍ بناء المآذن والقباب');

  // minarets
  const minaret = (x, z) => {
    const g = new THREE.Group(); g.position.set(x, 0, z); mosque.add(g);
    add(new THREE.BoxGeometry(4.2, 7, 4.2), M.wall, 0, 3.5, 0, g);
    add(new THREE.BoxGeometry(4.6, 0.5, 4.6), M.marble, 0, 7.1, 0, g);
    add(new THREE.CylinderGeometry(1.45, 1.8, 14, 8), M.wall, 0, 14, 0, g);
    add(new THREE.CylinderGeometry(2.4, 2.4, 0.45, 16), M.marble, 0, 21.3, 0, g);
    add(new THREE.CylinderGeometry(2.55, 2.1, 0.5, 16), M.gold, 0, 21.0, 0, g);
    add(new THREE.CylinderGeometry(1.25, 1.4, 9, 8), M.wall, 0, 26, 0, g);
    for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2 + Math.PI / 8; const w = add(new THREE.BoxGeometry(0.5, 1.6, 0.1), M.glow, Math.sin(a) * 1.28, 25, Math.cos(a) * 1.28, g); w.rotation.y = a; }
    add(new THREE.CylinderGeometry(1.9, 1.9, 0.4, 16), M.marble, 0, 30.7, 0, g);
    add(new THREE.CylinderGeometry(1.7, 1.2, 0.5, 16), M.gold, 0, 30.4, 0, g);
    add(new THREE.CylinderGeometry(0.9, 1.05, 3.2, 8), M.wall, 0, 32.5, 0, g);
    add(new THREE.LatheGeometry([[0.0001, 4.4], [0.35, 3.7], [0.85, 2.7], [1.15, 1.6], [1.25, 0.2], [1.1, 0]].map(p => new THREE.Vector2(p[0] * 1.05, p[1])), 20), M.teal, 0, 34.1, 0, g);
    finial(x, 34.1 + 4.4 - 0.1, z, 1.0);
    // slim arched balcony railing
    for (let i = 0; i < 16; i++) { const a = i / 16 * Math.PI * 2; add(new THREE.CylinderGeometry(0.06, 0.06, 0.9, 5), M.gold, Math.sin(a) * 1.8, 21.7 + 0.2, Math.cos(a) * 1.8, g); }
  };
  const MX = HW / 2 + 3.2, MZ = HD / 2 + 1;
  [[-MX, MZ], [MX, MZ], [-MX, -MZ], [MX, -MZ]].forEach(p => minaret(p[0], p[1]));
  await step(62, 'جارٍ بناء الصحن والأروقة');

  // courtyard
  const CZ0 = HD / 2 + 2.4, CL = 66, CW = 62;
  add(new THREE.PlaneGeometry(CW, CL), M.floor, 0, 0.02, CZ0 + CL / 2, scene).rotation.x = -Math.PI / 2;
  // arcades (riwaq) left and right
  const nArch = 9, aW = 4, aH = 7, pitch = 5.4, AL = nArch * pitch + 1.2;
  const arcArr = Array.from({ length: nArch }, (_, i) => [-AL / 2 + 0.6 + pitch * (i + 0.5), aW, aH]);
  const arcGeo = wallWithArches(AL, aH + 1.8, arcArr, 2.2, M.wall, 10);
  [-1, 1].forEach(sd => {
    const a = new THREE.Mesh(arcGeo, M.wall); a.castShadow = shadowOn; a.receiveShadow = shadowOn;
    a.rotation.y = sd * Math.PI / 2; a.position.set(sd * (CW / 2 - 1.1) - (sd > 0 ? 0 : 0), 0, CZ0 + CL * 0.5 - 6 + (sd > 0 ? 0 : 0)); a.position.x = sd * (CW / 2 - 1.1);
    // extrude is along +z of local; after rotation, offset so thickness faces inward
    a.position.x += sd > 0 ? 0 : 0; scene.add(a);
    const back = new THREE.Mesh(new THREE.PlaneGeometry(AL, aH), M.glow); back.rotation.y = -sd * Math.PI / 2; back.position.set(sd * (CW / 2 + 1.15), aH / 2, a.position.z); scene.add(back);
    const roof = add(new THREE.BoxGeometry(2.8, 0.5, AL + 0.6), M.marble, sd * (CW / 2 - 0.9), aH + 1.9, a.position.z, scene);
    for (let i = 0; i < nArch + 1; i++) { add(new THREE.CylinderGeometry(0.28, 0.32, aH - 0.4, 10), M.marble, sd * (CW / 2 - 2.4), (aH - 0.4) / 2, a.position.z - AL / 2 + 0.6 + pitch * i, scene); }
    for (let i = 0; i < nArch; i++) add(new THREE.SphereGeometry(1.25, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2), M.dome, sd * (CW / 2 - 1.1), aH + 2.15, a.position.z - AL / 2 + 0.6 + pitch * (i + .5), scene);
  });
  // fountain
  const fz = CZ0 + 24;
  add(new THREE.CylinderGeometry(5.2, 5.6, 0.9, 32), M.marble, 0, 0.45, fz, scene);
  add(new THREE.CylinderGeometry(4.5, 4.5, 0.2, 32), M.water, 0, 0.82, fz, scene);
  add(new THREE.CylinderGeometry(0.5, 0.8, 2.2, 14), M.marble, 0, 1.6, fz, scene);
  add(new THREE.CylinderGeometry(1.7, 0.5, 0.5, 20), M.marble, 0, 2.7, fz, scene);
  add(new THREE.SphereGeometry(0.35, 12, 8), M.gold, 0, 3.2, fz, scene);
  // lamp posts along the central axis
  for (let k = 0; k < 6; k++) [-1, 1].forEach(sd => { const x = sd * 9, z = CZ0 + 8 + k * 9; add(new THREE.CylinderGeometry(0.1, 0.14, 3.6, 8), M.dark, x, 1.8, z, scene); add(new THREE.SphereGeometry(0.34, 10, 8), M.glow, x, 3.8, z, scene); });
  // ground beyond
  const ground = add(new THREE.PlaneGeometry(4000, 4000), M.sand, 0, -0.05, 0, scene); ground.rotation.x = -Math.PI / 2; ground.castShadow = false; ground.receiveShadow = shadowOn;
  // palm trees (cheap) beside the courtyard
  const palm = (x, z, s) => {
    const g = new THREE.Group(); g.position.set(x, 0, z); scene.add(g);
    const trunk = add(new THREE.CylinderGeometry(0.28 * s, 0.4 * s, 9 * s, 7), M.dark, 0, 4.5 * s, 0, g); trunk.rotation.z = 0.05;
    const leafMat = new THREE.MeshStandardMaterial({ color: '#4c6b3a', roughness: .8, side: THREE.DoubleSide });
    for (let i = 0; i < 9; i++) { const lg = new THREE.PlaneGeometry(0.9 * s, 5 * s, 1, 4); lg.translate(0, 2.5 * s, 0); const lf = add(lg, leafMat, 0, 9 * s, 0, g); lf.rotation.set(Math.PI / 2 - 0.55, 0, 0); const a = i / 9 * Math.PI * 2; const piv = new THREE.Group(); g.add(piv); g.remove(lf); piv.add(lf); piv.position.y = 9 * s; lf.position.y = 0; lf.rotation.set(-1.0, 0, 0); piv.rotation.y = a; }
  };
  const palms = mobile ? [[-34, 30], [34, 30]] : [[-34, 20], [-34, 38], [-34, 56], [34, 20], [34, 38], [34, 56], [-48, 10], [48, 10]];
  palms.forEach(p => palm(p[0], CZ0 + p[1], 1.1));
  // distant low hills for depth
  const hills = new THREE.Mesh(new THREE.CylinderGeometry(900, 900, 60, 96, 1, true), new THREE.MeshBasicMaterial({ color: '#8a6e76', side: THREE.BackSide, fog: true }));
  { const pos = hills.geometry.attributes.position; for (let i = 0; i < pos.count; i++) { if (pos.getY(i) > 0) { const a = Math.atan2(pos.getZ(i), pos.getX(i)); pos.setY(i, 6 + 22 * Math.abs(Math.sin(a * 3.1) * Math.cos(a * 1.7)) + 8 * Math.sin(a * 9)); } else pos.setY(i, -5); } hills.geometry.computeVertexNormals(); }
  scene.add(hills);
  await step(78, 'جارٍ ضبط الضوء والسماء');

  // ---------- light ----------
  const sunDir = new THREE.Vector3(-0.78, 0.2, 0.3).normalize();
  const sun = new THREE.DirectionalLight('#ffc48c', 3.6);
  sun.position.copy(sunDir).multiplyScalar(160); sun.target.position.set(0, 4, 18); scene.add(sun, sun.target);
  if (shadowOn) { sun.castShadow = true; const s = sun.shadow; s.mapSize.set(2048, 2048); const c = s.camera; c.left = -90; c.right = 90; c.top = 70; c.bottom = -50; c.near = 10; c.far = 420; s.bias = -0.0004; s.normalBias = 0.5; }
  const fill = new THREE.DirectionalLight('#ffb7b0', 0.9); fill.position.set(30, 25, 120); scene.add(fill);
  scene.add(new THREE.HemisphereLight('#a9b8e8', '#b99a7a', 1.15));
  // sky dome
  const sky = new THREE.Mesh(new THREE.SphereGeometry(1800, 32, 20), new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false, fog: false,
    uniforms: { sd: { value: sunDir } },
    vertexShader: 'varying vec3 vP; void main(){ vP=normalize(position); gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }',
    fragmentShader: `varying vec3 vP; uniform vec3 sd;
      void main(){ float h=clamp(vP.y,-0.05,1.); 
        vec3 hor=vec3(.98,.72,.56), mid=vec3(.72,.55,.72), top=vec3(.12,.2,.45);
        vec3 c=mix(hor,mid,smoothstep(0.0,.22,h)); c=mix(c,top,smoothstep(.15,.75,h));
        float s=max(dot(normalize(vP),normalize(sd)),0.);
        c+=vec3(1.,.62,.3)*pow(s,6.)*.55 + vec3(1.,.85,.6)*pow(s,120.)*1.6 + vec3(1.,.75,.45)*pow(s,900.)*4.;
        gl_FragColor=vec4(c,1.); }`,
  }));
  scene.add(sky);
  scene.background = null;
  // clouds
  const clouds = [];
  const nC = mobile ? 9 : 22;
  for (let i = 0; i < nC; i++) {
    const m = new THREE.SpriteMaterial({ map: cloudTex, color: new THREE.Color().setHSL(0.03 + rnd() * 0.08, 0.5, 0.8 + rnd() * 0.12), transparent: true, opacity: 0.55 + rnd() * 0.3, depthWrite: false, fog: false });
    const s = new THREE.Sprite(m); const a = rnd() * Math.PI * 2, d = 350 + rnd() * 900;
    s.position.set(Math.sin(a) * d, 90 + rnd() * 160, Math.cos(a) * d - 100); s.scale.set(240 + rnd() * 320, 70 + rnd() * 90, 1);
    s.userData.v = 0.5 + rnd() * 0.8; scene.add(s); clouds.push(s);
  }
  // birds
  const birds = [];
  if (!mobile) {
    const bg = new THREE.BufferGeometry(); bg.setAttribute('position', new THREE.BufferAttribute(new Float32Array([0, 0, 0.5, -1.5, 0.15, -0.35, 0, 0, -0.1, 0, 0, 0.5, 0, 0, -0.1, 1.5, 0.15, -0.35]), 3)); bg.computeVertexNormals();
    const bm = new THREE.MeshBasicMaterial({ color: '#2a2230', side: THREE.DoubleSide });
    for (let i = 0; i < 14; i++) { const b = new THREE.Mesh(bg, bm); b.userData = { r: 50 + rnd() * 70, a: rnd() * 6.28, y: 42 + rnd() * 40, sp: 0.035 + rnd() * 0.04, ph: rnd() * 6, sc: 1.1 + rnd() * 0.9 }; scene.add(b); birds.push(b); }
  }
  await step(90, 'جارٍ تجهيز مسار الكاميرا');

  // ---------- drone path ----------
  const V = (x, y, z) => new THREE.Vector3(x, y, z);
  const posPts = [V(70, 78, 190), V(46, 58, 150), V(26, 40, 112), V(18, 30, 80), V(20, 24, 50), V(32, 21, 26), V(42, 18, 0), V(34, 17, -22), V(8, 20, -36), V(-30, 18, -14), V(-42, 15, 14), V(-30, 10, 46), V(-10, 6.5, 58), V(0, 5.2, 66)];
  const tgtPts = [V(0, 16, 0), V(0, 15, 0), V(0, 15, 0), V(0, 17, 0), V(0, 21, 0), V(0, 20, 0), V(0, 19, 0), V(0, 18, 0), V(0, 17, 0), V(0, 14, 0), V(0, 9, 6), V(0, 7, 10), V(0, 6, 4), V(0, 5, 0)];
  const posC = new THREE.CatmullRomCurve3(posPts, false, 'centripetal'), tgtC = new THREE.CatmullRomCurve3(tgtPts, false, 'centripetal');
  const DUR = mobile ? 40 : 52;
  const ease = u => u < 0 ? 0 : u > 1 ? 1 : u - Math.sin(u * 2 * Math.PI) / (2 * Math.PI) * 0.55; // gentle start and end, near-constant speed in the middle
  const tmpP = new THREE.Vector3(), tmpT = new THREE.Vector3(), right = new THREE.Vector3(), up = new THREE.Vector3(0, 1, 0), fwd = new THREE.Vector3();

  let still = reduced ? true : (ls.get() === '1');
  let time = still ? DUR : 0;
  let mx = 0, my = 0, smx = 0, smy = 0;
  const setStill = (v, persist) => { still = v; btn.setAttribute('aria-pressed', v ? 'true' : 'false'); btn.textContent = v ? '▶ تشغيل الحركة' : '❚❚ إيقاف الحركة'; if (persist) ls.set(v ? '1' : '0'); if (v) draw(); else kick(); };
  const place = (t, dt) => {
    const u = ease(t / DUR);
    posC.getPoint(Math.min(u, 1), tmpP); tgtC.getPoint(Math.min(u, 1), tmpT);
    if (t > DUR) { const k = t - DUR; tmpP.x += Math.sin(k * 0.11) * 3.5; tmpP.y += Math.sin(k * 0.17) * 0.5; tmpP.z -= (1 - Math.cos(k * 0.07)) * 4; }
    camera.position.copy(tmpP);
    if (!still && !mobile) { smx += (mx - smx) * Math.min(1, dt * 2.5); smy += (my - smy) * Math.min(1, dt * 2.5); }
    fwd.subVectors(tmpT, tmpP).normalize(); right.crossVectors(fwd, up).normalize();
    camera.position.addScaledVector(right, smx * 2.6).addScaledVector(up, -smy * 1.4);
    tmpT.addScaledVector(right, smx * 1.8).addScaledVector(up, -smy * 1.2);
    camera.lookAt(tmpT);
  };
  window.addEventListener('pointermove', e => { if (e.pointerType === 'touch') return; const r = root.getBoundingClientRect(); if (r.bottom < 0 || r.top > innerHeight) return; mx = (e.clientX / innerWidth - 0.5) * 2; my = (e.clientY / innerHeight - 0.5) * 2; }, { passive: true });

  const resize = () => { const w = root.clientWidth, h = root.clientHeight; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); draw(); };
  const draw = () => { sky.position.copy(camera.position); renderer.render(scene, camera); };
  let visible = true, running = false, last = 0, firstDone = false;
  const frame = ts => {
    running = false;
    if (!visible || document.hidden) return;
    const dt = Math.min(0.1, (ts - last) / 1000 || 0.016); last = ts;
    if (!still) {
      time += dt;
      clouds.forEach(c => { c.position.x += c.userData.v * dt; if (c.position.x > 1300) c.position.x = -1300; });
      birds.forEach(b => { const d = b.userData; d.a += d.sp * dt; b.position.set(Math.sin(d.a) * d.r, d.y + Math.sin(d.a * 3 + d.ph) * 3, Math.cos(d.a) * d.r - 20); b.rotation.y = d.a + Math.PI; const f = 0.55 + 0.45 * Math.sin(ts / 1000 * 7 + d.ph); b.scale.set(d.sc, d.sc * (0.5 + f), d.sc); });
    }
    place(time, dt); draw();
    if (!firstDone) { firstDone = true; root.classList.remove('pending'); root.classList.add('gl'); }
    if (!still) kick();
  };
  const kick = () => { if (!running) { running = true; requestAnimationFrame(frame); } };
  new IntersectionObserver(es => { visible = es[0].isIntersecting; if (visible) { last = performance.now(); kick(); } }, { threshold: 0 }).observe(root);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) { last = performance.now(); kick(); } });
  new ResizeObserver(resize).observe(root);
  canvas.addEventListener('webglcontextlost', e => { e.preventDefault(); root.classList.remove('gl', 'pending'); root.classList.add('nogl'); });
  btn.onclick = () => setStill(!still, true);
  btn.setAttribute('aria-pressed', still ? 'true' : 'false'); btn.textContent = still ? '▶ تشغيل الحركة' : '❚❚ إيقاف الحركة';
  await step(100, 'جاهز');
  resize(); place(time, 0.016); draw(); kick();
  // test/debug handle (no effect on the site)
  window.__hero3d = { seek: t => { time = t; place(time, 0.016); draw(); }, DUR, mobile, setStill };
}
