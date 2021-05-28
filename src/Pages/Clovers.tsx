import React from 'react'
import { ReactPhotoCollage } from 'react-photo-collage'
import { PageContainer } from '../Components'
import './Clovers.css'

const importClovers = (): any[] => {
    const r = require.context('../images/clovers')
    const images = r.keys().map((path: string) => r(path))
    return images
}

export const Clovers = (): JSX.Element => {
    const clovers = importClovers()

    const layout: number[] = []
    {
        let remaining = clovers.length
        let i = 0
        const rowSizes = [3, 4, 5]
        while (remaining > 0) {
            const rowSize = rowSizes[i++ % rowSizes.length]
            layout.push(rowSize)
            remaining -= rowSize
        }
    }
    const height = layout.map(() => '250px')
    const photos = clovers.map((obj: any) => {
        return { source: obj.default }
    })

    return (
        <PageContainer>
            <div className="CloverCollageDiv">
                <ReactPhotoCollage width="100%" height={height} layout={layout} photos={photos} showNumOfRemainingPhotos />
            </div>
        </PageContainer>
    )
}