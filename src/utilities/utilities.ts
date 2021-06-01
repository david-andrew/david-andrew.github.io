//promise-based sleep function which can be called via `await sleep()`
export const sleep = (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms))
}
