import React, { useEffect, useState } from 'react'
import { Collage, PageContainer } from '../Components'
import placeholderImg from '../images/green-background-blur.jpg'
import errorImg from '../images/placeholder.png'

enum LoadingStates {
    'loading',
    'loaded',
    'error',
}

export const Clovers = (): JSX.Element => {
    const r = require.context('../images/clovers')
    const imageSrcs: string[] = r.keys().map((path: string) => r(path).default) as string[]

    return (
        <PageContainer>
            <Collage imageSrcs={imageSrcs} />
        </PageContainer>
    )
}
