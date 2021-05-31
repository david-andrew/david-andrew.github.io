import React from 'react'
import { Collage, PageContainer } from '../Components'

export const Clovers = (): JSX.Element => {
    const r = require.context('../images/clovers')
    const imageObjs = r.keys().map((path: string) => r(path))

    return (
        <PageContainer>
            <Collage imageObjs={imageObjs} />
        </PageContainer>
    )
}
