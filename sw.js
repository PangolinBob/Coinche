'use strict';

const CACHE_PREFIX = 'coinche-shell-';
const CACHE_NAME = `${CACHE_PREFIX}v1`;
const NETWORK_TIMEOUT_MS = 3000;
const SHELL_FILES = [
  './',
  './index.html',
  './IconCoinche.png',
  './grain.png',
  './accueil.png'
];

function absoluteShellUrls(){
  return SHELL_FILES.map((file) => new URL(file, self.registration.scope).href);
}

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    for(const url of absoluteShellUrls()){
      try{
        const response = await fetch(url, {cache:'no-store'});
        if(response.ok) await cache.put(url, response.clone());
      }catch(e){}
    }
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names
      .filter((name) => name.startsWith(CACHE_PREFIX) && name !== CACHE_NAME)
      .map((name) => caches.delete(name)));
    await self.clients.claim();
  })());
});

function timeout(){
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error('network timeout')), NETWORK_TIMEOUT_MS);
  });
}

async function networkFirst(request){
  const cache = await caches.open(CACHE_NAME);
  const rootUrl = new URL('./', self.registration.scope).href;
  const cacheKey = request.mode === 'navigate' ? rootUrl : request;
  const network = fetch(request).then(async (response) => {
    if(!response.ok) throw new Error(`server returned ${response.status}`);
    await cache.put(cacheKey, response.clone());
    return response;
  });

  try{
    return await Promise.race([network, timeout()]);
  }catch(e){
    const cached = await cache.match(cacheKey, {ignoreSearch:true});
    if(cached) return cached;
    return network;
  }
}

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if(request.method !== 'GET') return;

  const url = new URL(request.url);
  const scope = new URL(self.registration.scope);
  if(url.origin !== scope.origin || !url.pathname.startsWith(scope.pathname)) return;

  const shellPaths = absoluteShellUrls().map((item) => new URL(item).pathname);
  if(request.mode !== 'navigate' && !shellPaths.includes(url.pathname)) return;

  event.respondWith(networkFirst(request));
});
