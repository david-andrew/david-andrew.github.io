import { serviceWorkerFetchListener } from 'sync-message'

// console.log("registering service worker fetch listener");
// addEventListener("fetch", serviceWorkerFetchListener());

// // // networkService.ts
// // self.addEventListener('fetch', event => {
// //     console.log('Handling fetch event for', event.request.url);

// //     // You can put your logic here to handle the request.
// //     // For demonstration, we'll just respond with the same request.
// //     event.respondWith(fetch(event.request));
// // });

addEventListener('install', (e: any) => {
    console.log('installing service worker')
    // e.waitUntil(skipWaiting())
})

const fetchListener = serviceWorkerFetchListener()

addEventListener('fetch', (e: any) => {
    console.log('Handling fetch event for', e.request.url)
    if (fetchListener(e)) {
        // This event has been handled by this library
        return
    }
    // Otherwise, add your own service worker logic here,
    // e.g. passthrough to a normal network request:
    e.respondWith(fetch(e.request))
})
