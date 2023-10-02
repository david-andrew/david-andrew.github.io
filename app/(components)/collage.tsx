"use client";
import { useState, MouseEventHandler } from 'react'
import Image, { StaticImageData } from 'next/image'
// import Carousel, { Modal, ModalGateway, ViewType } from 'react-images'



type CollageProps = {
    images: StaticImageData[];
    rowSizes?: number[];
    // rowHeight?: string;
};




export const Collage = ({ images, rowSizes }: CollageProps): JSX.Element => {
    return (
        <>
            <CollagePage images={images} rowSizes={rowSizes}/>
            {/* TODO: carousal modal */}
        </>
    )
}



export const CollagePage = ({images, rowSizes}: CollageProps): JSX.Element => {
    const layout = getLayout(images.length, rowSizes)

    let count = 0
    const rows: {image:StaticImageData, idx:number}[][] = []
    layout.forEach((rowSize: number) => {
        const row = images.slice(count, count + rowSize).map((image, i) => {
            return { image, idx: count + i }
        })

        rows.push(row)
        count += rowSize
    })

    return (
        <>
            {rows.map((row) => (
                <CollageRow>
                    {row.map(({ image, idx }) => (
                        <CollageImg key={idx} idx={idx} image={image} widthPercent={`${100 / row.length}%`} />
                    ))}
                </CollageRow>
            ))}
        </>
    )
}

const CollageRow = ({ children}: { children: React.ReactNode }): JSX.Element => {
    return <div className='flex flex-row w-full h-64'>{children}</div>
}

const CollageImg = ({
    image,
    widthPercent = '100%',
    idx,
    openModal,
}: {
    image: StaticImageData
    widthPercent?: string
    idx: number
    openModal?: (idx: number) => void
}): JSX.Element => {
    const onClick: MouseEventHandler<HTMLImageElement> = () => {
        openModal?.(idx)
    }

    return <Image
            style={{width:widthPercent}}
            className='m-px object-cover cursor-pointer select-none'
            src={image}
            onClick={onClick}
            alt='image'
        />
}


const getLayout = (numPhotos: number, rowSizes: number[] = [3, 4, 5]): number[] => {
    const layout: number[] = []
    {
        let remaining = numPhotos
        let i = 0
        while (remaining > 0) {
            const rowSize = rowSizes[i++ % rowSizes.length]
            layout.push(rowSize)
            remaining -= rowSize
        }
    }
    return layout
}