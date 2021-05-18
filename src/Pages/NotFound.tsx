import React from 'react'
import { PageContainer } from '../Components'
import { H1 } from '../utilities'

export const NotFound = (): JSX.Element => {
    return (
        <PageContainer>
            <H1>404: Page not found</H1>
        </PageContainer>
    )
}

export const NotImplemented = (): JSX.Element => {
    return (
        <PageContainer>
            <H1>This page is still under construction</H1>
        </PageContainer>
    )
}
