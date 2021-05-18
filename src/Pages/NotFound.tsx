import React from 'react'
import { DummyNavBar } from '../Components/Navbar'

export const NotFound = (): JSX.Element => {
    return (
        <>
            <DummyNavBar />
            <div>404 Page not found</div>
        </>
    )
}

export const NotImplemented = (): JSX.Element => {
    return (
        <>
            <DummyNavBar />
            <div>This page is still under construction</div>
        </>
    )
}
