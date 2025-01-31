/// <reference lib="webworker" />

// 声明 self 为 ServiceWorkerGlobalScope 类型
declare let self: ServiceWorkerGlobalScope;
// self.addEventListener('push', function (event: PushEvent) {
//     const data = event.data!.json();
//     const options = {
//         body: data.notification.body,
//         icon: data.notification.icon
//     };
//     event.waitUntil(
//         self.registration.showNotification(data.notification.title, options)
//     );
// });

self.addEventListener('push', (event: PushEvent) => {
  const data = event.data ? event.data.json() : {};
  const options: NotificationOptions = {
    body: data.notification.body,
    icon: data.notification.icon,
    data: {
      url: data.url || '/'
    }
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'Default title', options)
  );
});

self.addEventListener('notificationclick', (event: NotificationEvent) => {
  const urlToOpen = new URL(event.notification.data.url, self.location.origin).href;

  const promiseChain = self.clients.matchAll({
    type: 'window',
    includeUncontrolled: true
  }).then((windowClients) => {
    let matchingClient: WindowClient | null = null;

    for (let i = 0; i < windowClients.length; i++) {
      const windowClient = windowClients[i];
      if (windowClient.url === urlToOpen) {
        matchingClient = windowClient;
        break;
      }
    }

    if (matchingClient) {
      return matchingClient.focus();
    } else {
      return self.clients.openWindow(urlToOpen);
    }
  });

  event.waitUntil(promiseChain);
});



self.addEventListener('activate', (event: ExtendableEvent) => {
  console.log('Service worker activating...', event);
});

self.addEventListener('fetch', (event: FetchEvent) => {
  console.log('Fetching:', event.request.url);
});
