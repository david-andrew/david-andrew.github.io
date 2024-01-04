// const BASE_URL_SUFFIX = '__SyncMessageServiceWorkerInput__'
// const VERSION = '__sync-message-v2__'

// interface ServiceWorkerReadRequest {
//     messageId: string
//     timeout: number
// }

// interface ServiceWorkerWriteRequest {
//     messageId: string
//     message: string
// }

// interface ServiceWorkerResponse {
//     message: any
//     version: string
// }

// /**
//  * Checks whether the given request is meant to be intercepted by the sync-message serviceWorkerFetchListener.
//  */
// export function isServiceWorkerRequest(request: FetchEvent | string): boolean {
//     if (typeof request !== 'string') {
//         request = request.request.url
//     }
//     return request.includes(BASE_URL_SUFFIX)
// }

// /**
//  * Returns a function that can respond to fetch events in a service worker event listener.
//  * The function returns true if the request came from this library and it responded.
//  * Call `serviceWorkerFetchListener` and reuse the returned function as it manages internal state.
//  */
// export function serviceWorkerFetchListener(): (e: FetchEvent) => boolean {
//     const earlyMessages: { [messageId: string]: any } = {}
//     const resolvers: { [messageId: string]: (r: Response) => void } = {}

//     return (e: FetchEvent): boolean => {
//         const { url } = e.request
//         if (!isServiceWorkerRequest(url)) {
//             return false
//         }

//         async function respond(): Promise<Response> {
//             function success(message: any) {
//                 const response: ServiceWorkerResponse = { message, version: VERSION }
//                 return new Response(JSON.stringify(response), { status: 200 })
//             }

//             if (url.endsWith('/read')) {
//                 const { messageId, timeout }: ServiceWorkerReadRequest = await e.request.json()
//                 if (messageId in earlyMessages) {
//                     const message = earlyMessages[messageId]
//                     delete earlyMessages[messageId]
//                     return success(message)
//                 } else {
//                     return await new Promise((resolver) => {
//                         resolvers[messageId] = resolver

//                         function callback() {
//                             delete resolvers[messageId]
//                             resolver(new Response('', { status: 408 })) // timeout
//                         }

//                         setTimeout(callback, timeout)
//                     })
//                 }
//             } else if (url.endsWith('/write')) {
//                 const { message, messageId }: ServiceWorkerWriteRequest = await e.request.json()
//                 const resolver = resolvers[messageId]
//                 if (resolver) {
//                     resolver(success(message))
//                     delete resolvers[messageId]
//                 } else {
//                     earlyMessages[messageId] = message
//                 }
//                 return success({ early: !resolver })
//             } else if (url.endsWith('/version')) {
//                 return new Response(VERSION, { status: 200 })
//             }
//         }

//         e.respondWith(respond())
//         return true
//     }
// }

import { serviceWorkerFetchListener } from 'sync-message'

self.addEventListener('install', () => {
    console.log('installing service worker')
    self.skipWaiting()
})
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()))

// self.addEventListener('fetch', serviceWorkerFetchListener())
const fetchListener = serviceWorkerFetchListener()

self.addEventListener('fetch', (e: any) => {
    console.log('fetch event', e)
    if (fetchListener(e)) {
        // This event has been handled by this library
        return
    }
    // Otherwise, add your own service worker logic here,
    // e.g. passthrough to a normal network request:
    e.respondWith(fetch(e.request))
})
