import React from 'react'
import { ReactPhotoCollage } from 'react-photo-collage'
import './Collage.css'

const getLayout = (numPhotos: number): number[] => {
    const layout: number[] = []
    {
        let remaining = numPhotos
        let i = 0
        const rowSizes = [3, 4, 5]
        while (remaining > 0) {
            const rowSize = rowSizes[i++ % rowSizes.length]
            layout.push(rowSize)
            remaining -= rowSize
        }
    }
    return layout
}

export const Collage = ({ imageObjs }: { imageObjs: any[] }): JSX.Element => {
    const layout = getLayout(imageObjs.length)
    const heights = layout.map(() => '250px')
    const photos = imageObjs.map((obj: any) => {
        return { source: obj.default }
    })

    return (
        <div className="CollageWrapperDiv">
            <ReactPhotoCollage width="100%" height={heights} layout={layout} photos={photos} showNumOfRemainingPhotos />
        </div>
    )
}
