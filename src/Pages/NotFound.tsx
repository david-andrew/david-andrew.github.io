import React from 'react'
import { PageContainer } from '../Components'

export const NotFound = (): JSX.Element => {
    return (
        <PageContainer>
            <h1>404: Page not found</h1>
        </PageContainer>
    )
}

export const NotImplemented = (): JSX.Element => {
    return (
        <PageContainer>
            <h1>This page is still under construction</h1>
        </PageContainer>
    )
}
