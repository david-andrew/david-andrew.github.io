import { serviceWorkerFetchListener } from "sync-message";

// addEventListener('install', event => {
//   console.log('Service worker installing...');
// });

// addEventListener('activate', event => {
//   console.log('Service worker activating...');
// });

addEventListener("fetch", serviceWorkerFetchListener());