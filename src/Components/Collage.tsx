import React from 'react'
import { ReactPhotoCollage } from 'react-photo-collage'
import './Collage.css'

const getLayout = (numPhotos: number, rowSizes: number[] = [3, 4, 5]): number[] => {
    const layout: number[] = []
    {
        let remaining = numPhotos
        let i = 0
        // const rowSizes = [3, 4, 5]
        while (remaining > 0) {
            const rowSize = rowSizes[i++ % rowSizes.length]
            layout.push(rowSize)
            remaining -= rowSize
        }
    }
    return layout
}

export const Collage = ({ imageSrcs, rowSizes }: { imageSrcs: string[]; rowSizes?: number[] }): JSX.Element => {
    const layout = getLayout(imageSrcs.length, rowSizes)
    const heights = layout.map(() => '250px')
    const photos = imageSrcs.map((src: string) => {
        return { source: src }
    })

    return (
        <div className="CollageWrapperDiv">
            <ReactPhotoCollage width="100%" height={heights} layout={layout} photos={photos} showNumOfRemainingPhotos />
        </div>
    )
}
