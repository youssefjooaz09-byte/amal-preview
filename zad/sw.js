/* Offline support: same-site files are network-first, cached as they are used (or via the Settings download button). Audio is never cached. */
const V='amal-v41';
self.addEventListener('install',e=>{self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
const API=/^https:\/\/(api\.quran\.com|api\.alquran\.cloud|cdn\.jsdelivr\.net|api\.aladhan\.com|ar\.wikipedia\.org|commons\.wikimedia\.org|upload\.wikimedia\.org)\//;
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||r.headers.has('range'))return;const u=new URL(r.url);
 if(/\.mp3($|\?)/.test(u.pathname))return;
 if(u.origin===location.origin){e.respondWith(caches.open(V).then(async c=>{const net=await fetch(r,{cache:'no-cache'}).then(res=>{if(res.ok)c.put(r,res.clone());return res}).catch(()=>null);if(net)return net;const hit=await c.match(r,{ignoreSearch:r.mode==='navigate'});return hit||new Response('offline',{status:503})}))}
 else if(API.test(r.url)){e.respondWith(fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp))}return res}).catch(()=>caches.match(r).then(h=>h||Response.error())))}});
self.addEventListener('notificationclick',e=>{e.notification.close();const u=new URL((e.notification.data&&e.notification.data.url)||'remind.html',self.registration.scope).href;e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(l=>{for(const c of l){if(c.url.startsWith(self.registration.scope)&&'focus'in c)return c.focus()}return self.clients.openWindow(u)}))});
