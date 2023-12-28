import { serviceWorkerFetchListener } from "sync-message";

console.log("registering service worker fetch listener");
addEventListener("fetch", serviceWorkerFetchListener());

// // networkService.ts
// self.addEventListener('fetch', event => {
//     console.log('Handling fetch event for', event.request.url);

//     // You can put your logic here to handle the request.
//     // For demonstration, we'll just respond with the same request.
//     event.respondWith(fetch(event.request));
// });