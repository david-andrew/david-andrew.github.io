import { useState, useRef, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router'
import { getGithubTimestamp } from '../Components'
import { toMonthDayYearString, toMonthYearString } from './'

interface useQueryReturn {
    params: { [key: string]: string }
    setParam: (key: string, value: string) => void
    clearParam: (key: string) => void
}

//custom hook for managing query parameters in the url
export const useQuery = (): useQueryReturn => {
    const history = useHistory()
    const { pathname, search } = useLocation()

    //convert the search string to a query object
    const urlParams = new URLSearchParams(search)

    //convert the query object to a dictionary containing each entry
    const params: useQueryReturn['params'] = {}
    urlParams.forEach((value: string, key: string) => {
        params[key] = value
    })

    //callback functions for changing the url parameters
    const setParam = (key: string, value: string): void => {
        urlParams.set(key, value)
        history.push({ pathname, search: urlParams.toString() })
    }
    const clearParam = (key: string): void => {
        urlParams.delete(key)
        history.push({ pathname, search: urlParams.toString() })
    }

    return { params, setParam, clearParam }
}

//Hook for getting a timestamp string for a given git repo
export const useGithubTimestamp = (repoName: string, includeDay: boolean = false): string => {
    //fetch the timestamp and store into the timestamp state
    //undefined indicates not yet returned, null indicates failed to fetch
    const [timestamp, setTimestamp] = useState<Date | undefined | null>()
    useEffect(() => {
        setTimestamp(undefined)
        getGithubTimestamp(repoName, (repoTimestamp?: Date) => {
            setTimestamp(repoTimestamp ?? null)
        })
    }, [repoName])

    //handle the string output based on the value of the timestamp
    const [timestampStr, setTimestampStr] = useState<string>('Fetching Date...')
    useEffect(() => {
        if (timestamp === undefined) {
            setTimestampStr('Fetching Date...')
        } else if (timestamp === null) {
            setTimestampStr('Unknown Date')
        } else {
            setTimestampStr(includeDay ? toMonthDayYearString(timestamp) : toMonthYearString(timestamp))
        }
    }, [timestamp, includeDay])

    return timestampStr
}
