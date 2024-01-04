const BASE_URL_SUFFIX = '__SyncMessageServiceWorkerInput__'
const VERSION = '__sync-message-v2__'

if (typeof window === 'undefined') {
    self.addEventListener('install', () => self.skipWaiting())
    self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()))

    self.addEventListener('message', (ev) => {
        if (!ev.data) {
            return
        } else if (ev.data.type === 'deregister') {
            self.registration
                .unregister()
                .then(() => {
                    return self.clients.matchAll()
                })
                .then((clients) => {
                    clients.forEach((client) => client.navigate(client.url))
                })
        }
        //handle other messages
    })

    const earlyMessages = {}
    const resolvers = {}

    self.addEventListener('fetch', (event) => {
        const request = event.request
        const { url } = request
        // skip isolation if request does not contain one of the specified terms or is whitelisted
        if (!url.includes(BASE_URL_SUFFIX)) {
            // If it is, just perform a regular fetch without modifying headers
            event.respondWith(fetch(request).catch((e) => console.error(e)))
            return
        }

        // console.log('pyodide comms fetch', request.url)
        const respond = async () => {
            const success = (message) => {
                const response = { message, version: VERSION }
                return new Response(JSON.stringify(response), { status: 200 })
            }

            if (url.endsWith('/read')) {
                const { messageId, timeout } = await event.request.json()
                if (messageId in earlyMessages) {
                    const message = earlyMessages[messageId]
                    delete earlyMessages[messageId]
                    return success(message)
                } else {
                    return await new Promise((resolver) => {
                        resolvers[messageId] = resolver

                        function callback() {
                            delete resolvers[messageId]
                            resolver(new Response('', { status: 408 })) // timeout
                        }

                        setTimeout(callback, timeout)
                    })
                }
            } else if (url.endsWith('/write')) {
                const { message, messageId } = await event.request.json()
                const resolver = resolvers[messageId]
                if (resolver) {
                    resolver(success(message))
                    delete resolvers[messageId]
                } else {
                    earlyMessages[messageId] = message
                }
                return success({ early: !resolver })
            } else if (url.endsWith('/version')) {
                return new Response(VERSION, { status: 200 })
            }
        }

        event.respondWith(respond())
        return true
    })
} else {
    ;(() => {
        navigator.serviceWorker.register(window.document.currentScript.src).then(
            (registration) => {
                // console.log('Pyodide Comms Service Worker registered', registration.scope)
            },
            (err) => {
                console.error('Pyodide Comms Service Worker failed to register:', err)
            },
        )
    })()
}
