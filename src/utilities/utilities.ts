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

//return a sorted array, ensuring that elements that compare to 0 are in the same relative order
//generates a new copy of the array, without modifying the original
export const stableSorted = <T>(arr: T[], compareFn?: (a: T, b: T) => number): T[] => {
    type Pair<T> = [T, number]

    //default compare function if none passed
    const defaultCompare = (a: T, b: T): number => String(a).localeCompare(String(b))

    //ensure all zeros are integer so we can do (compareFn(A, B) || Ai - Bi)
    const zero = (n: number): number => (n == 0 ? 0 : n)

    return arr
        .map((val: T, i: number): Pair<T> => {
            return [val, i]
        })
        .sort(([A, Ai]: Pair<T>, [B, Bi]: Pair<T>) => zero((compareFn ?? defaultCompare)(A, B)) || Ai - Bi)
        .map(([val]: Pair<T>) => val)
}
