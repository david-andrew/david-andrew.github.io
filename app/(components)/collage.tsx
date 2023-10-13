"use client";
import { MouseEventHandler, Suspense, useState } from 'react'
import Image, { StaticImageData } from 'next/image'
import { Carousel } from './carousel';

type CollageProps = {
    images: StaticImageData[];
    rowSizes?: number[];
    reflowable?: boolean;
};




export const Collage = ({ images, rowSizes = [3, 4, 5], reflowable = false }: CollageProps): JSX.Element => {
    
    const [carouselOpen, setCarouselOpen] = useState(false);
    const [carouselIdx, setCarouselIdx] = useState(0);
    
    const clickHandler = (idx:number) => {
        setCarouselOpen(true);
        setCarouselIdx(idx);
    }

    return (
        <>
            <div className='hidden 2xl:block'>
                <CollagePage images={images} rowSizes={rowSizes} clickHandler={clickHandler}/>
            </div>
            <div className='hidden xl:block 2xl:hidden'>
                <CollagePage images={images} rowSizes={reflowable ? rowSizes.map((rowSize) => Math.max(1, rowSize - 1)) : rowSizes} clickHandler={clickHandler}/>
            </div>
            <div className="hidden lg:block xl:hidden">
                <CollagePage images={images} rowSizes={reflowable ? rowSizes.map((rowSize) => Math.max(1, rowSize - 2)) : rowSizes} clickHandler={clickHandler}/>
            </div>
            <div className="hidden md:block lg:hidden">
                <CollagePage images={images} rowSizes={reflowable ? rowSizes.map((rowSize) => Math.max(1, rowSize - 3)) : rowSizes} clickHandler={clickHandler}/>
            </div>
            <div className="hidden sm:block md:hidden">
                <CollagePage images={images} rowSizes={reflowable ? rowSizes.map((rowSize) => Math.max(1, rowSize - 4)) : rowSizes} clickHandler={clickHandler}/>
            </div>
            <div className="sm:hidden">
                <CollagePage images={images} rowSizes={reflowable ? rowSizes.map((_) => 1) : rowSizes} clickHandler={clickHandler}/>
            </div>

            {/* Carousel when clicking on an image */}
            {carouselOpen && <Carousel images={images} i={carouselIdx} setIdx={setCarouselIdx} isOpen={carouselOpen} setIsOpen={setCarouselOpen}/>}
        </>
    )
}



export const CollagePage = ({images, rowSizes, clickHandler }: {images:StaticImageData[], rowSizes:number[], clickHandler:(idx:number)=>void}): JSX.Element => {
    const rows = getLayout(images, rowSizes);


    return (
        <>    
            {rows.map((row, i) => (
                <CollageRow key={i}>
                    {row.map(({ image, idx }) => (
                        <CollageImg key={idx} idx={idx} image={image} widthPercent={`${100 / row.length}%`} openModal={clickHandler}/>
                    ))}
                </CollageRow>
            ))}
        </>
    )
}

const CollageRow = ({ children}: { children: React.ReactNode }): JSX.Element => {
    return <div className='flex flex-row w-full h-80 md:h-[24rem] lg:h-96 xl:h-80 2xl:h-64'>{children}</div>
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
            draggable={false}
        />
}


const getLayout = (images: StaticImageData[], rowSizes: number[] = [3, 4, 5]): {image:StaticImageData, idx:number}[][] => {
    const layout: number[] = []
    {
        let remaining = images.length
        let i = 0
        while (remaining > 0) {
            const rowSize = rowSizes[i++ % rowSizes.length]
            layout.push(rowSize)
            remaining -= rowSize
        }
    }

    // return layout

    let count = 0
    const rows: {image:StaticImageData, idx:number}[][] = []
    layout.forEach((rowSize: number) => {
        const row = images.slice(count, count + rowSize).map((image, i) => {
            return { image, idx: count + i }
        })

        rows.push(row)
        count += rowSize
    })

    return rows
}