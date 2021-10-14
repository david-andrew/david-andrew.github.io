import React, { useEffect } from 'react'
import { useLocation } from 'react-router'
import ReactGA from 'react-ga'

export const PageViewTracker = (): JSX.Element => {
    const location = useLocation()
    const { pathname, search } = location

    //report a pageview any time the location changes
    useEffect(() => {
        console.log('logging page view', location)
        ReactGA.pageview(pathname + search)
    }, [location])
    return <></>
}
