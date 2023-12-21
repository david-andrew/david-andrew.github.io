// used to type-correctly filter (T|undefined)[] to T[]
export const isDefined = <T>(value: T | undefined): value is T => value !== undefined

export const try_or_undefined = <T, U>(fn:(value:T)=>U): (value:T)=>U|undefined => {
    return (value:T) => {
        try {
            return fn(value)
        } catch (e) {
            console.error(e)
            console.error(value)
        }
    }
}

const monthMap = new Map<string, number>([
    ['january', 0],
    ['february', 1],
    ['march', 2],
    ['april', 3],
    ['may', 4],
    ['june', 5],
    ['july', 6],
    ['august', 7],
    ['september', 8],
    ['october', 9],
    ['november', 10],
    ['december', 11],
])
export const convertToDate = (monthYearString: string): Date => {
    //try to parse the string directly
    const date = new Date(monthYearString)
    if (!isNaN(date.getTime())) {
        return date
    }

    const parts = monthYearString.toLowerCase().split(' ')
    if (parts.length !== 2) {
        throw new Error(`String must be in the format '<Month> <Year>'. Got '${monthYearString}'`)
    }

    const monthName = parts[0]
    const year = parseInt(parts[1])
    if (isNaN(year)) {
        throw new Error('Invalid year')
    }
    const monthIndex = monthMap.get(monthName)
    if (monthIndex === undefined) {
        throw new Error('Invalid month name')
    }

    return new Date(year, monthIndex)
}
