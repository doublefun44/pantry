// 每次发版把版本号 +1（或改成日期），老缓存会在 activate 时被清掉
var CACHE = 'funtry-v15';
var ASSETS = [
  './',
  './index.html',
  './manifest.json',
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(cache) {
      return Promise.all(
        ASSETS.map(function(url) {
          return cache.add(url).catch(function(err) {
            console.log('SW cache failed for', url, err);
          });
        })
      );
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(k){ return k !== CACHE; }).map(function(k){ return caches.delete(k); })
      );
    }).then(function(){ return self.clients.claim(); })
  );
});

// Network-first（对 HTML/JSON）＋ Cache-first（对图片/图标等静态资源）
// 核心思路：HTML 总是优先去拉最新的，拉不到再用缓存兜底；这样一改 index.html 用户刷新就生效
self.addEventListener('fetch', function(e) {
  if (e.request.method !== 'GET') return;
  var url = new URL(e.request.url);
  if (url.origin !== location.origin) return;

  var accept = e.request.headers.get('accept') || '';
  var isHTML = e.request.mode === 'navigate'
            || accept.indexOf('text/html') >= 0
            || url.pathname.endsWith('.html')
            || url.pathname.endsWith('/');
  var isJSON = url.pathname.endsWith('.json');

  if (isHTML || isJSON) {
    // network-first：先拉网络，成功就顺便更新缓存；失败（离线）用缓存兜底
    e.respondWith(
      fetch(e.request).then(function(resp) {
        var respClone = resp.clone();
        caches.open(CACHE).then(function(cache){ cache.put(e.request, respClone); });
        return resp;
      }).catch(function() {
        return caches.match(e.request).then(function(cached) {
          return cached || caches.match('./index.html');
        });
      })
    );
    return;
  }

  // 其他静态资源（图片、图标）：cache-first
  e.respondWith(
    caches.match(e.request).then(function(cached) {
      return cached || fetch(e.request).then(function(resp) {
        var respClone = resp.clone();
        caches.open(CACHE).then(function(cache){ cache.put(e.request, respClone); });
        return resp;
      });
    })
  );
});

self.addEventListener('notificationclick', function(e) {
  e.notification.close();
  var url = (e.notification.data && e.notification.data.url) ? e.notification.data.url : './';
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(list) {
      for (var i = 0; i < list.length; i++) {
        if (list[i].url.indexOf(url) >= 0 && 'focus' in list[i]) return list[i].focus();
      }
      return clients.openWindow(url);
    })
  );
});
