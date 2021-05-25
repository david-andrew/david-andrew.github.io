import { useLocation, useHistory } from 'react-router'

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
