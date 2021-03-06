//promise-based sleep function which can be called via `await sleep()`
export const sleep = (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

export const getScrollbarWidth = (): number => {
    // Creating invisible container
    const outer = document.createElement('div')
    outer.style.visibility = 'hidden'
    outer.style.overflow = 'scroll' // forcing scrollbar to appear
    // outer.style.msOverflowStyle = 'scrollbar' // needed for WinJS apps
    document.body.appendChild(outer)

    // Creating inner element and placing it in the container
    const inner = document.createElement('div')
    outer.appendChild(inner)

    // Calculating difference between container's full width and the child width
    const scrollbarWidth = outer.offsetWidth - inner.offsetWidth

    // Removing temporary elements from the DOM
    outer.parentNode?.removeChild(outer)

    return scrollbarWidth
}

//used for importing image sources from a directory
export const getImageSources = (r: __WebpackModuleApi.RequireContext): string[] => {
    return r.keys().map((path: string) => r(path).default) as string[]
}
