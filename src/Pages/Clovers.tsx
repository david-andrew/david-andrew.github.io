import React from 'react'
import { Collage, EfficientCollage, PageContainer } from '../Components'

//clover images should be precached from visiting the site, so this shouldn't be too slow
export const Clovers = (): JSX.Element => {
    const r = require.context('../images/clovers')
    const imageSrcs: string[] = r.keys().map((path: string) => r(path).default) as string[]

    return (
        <PageContainer>
            <EfficientCollage imageSrcs={imageSrcs} previewSrcs={imageSrcs} />
        </PageContainer>
    )
}
