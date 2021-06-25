import React, { useState, MouseEventHandler } from 'react'
import Carousel, { Modal, ModalGateway, ViewType } from 'react-images'
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

const CollageImg = ({
    src,
    widthPercent = '100%',
    idx,
    openModal,
}: {
    src: string
    widthPercent?: string
    idx: number
    openModal: (idx: number) => void
}): JSX.Element => {
    const onClick: MouseEventHandler<HTMLImageElement> = () => {
        openModal(idx)
    }

    return <img src={src} style={{ width: widthPercent, margin: '1px', objectFit: 'cover', cursor: 'pointer', userSelect: 'none' }} onClick={onClick} />
}

const CollageRow = ({ children, rowHeight = '250px' }: { children: React.ReactNode; rowHeight?: string }): JSX.Element => {
    return <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: rowHeight }}>{children}</div>
}

interface ImageData {
    src: string
    idx: number
}

export const CollagePage = ({
    previewSrcs,
    rowSizes,
    rowHeight,
    openModal,
}: {
    previewSrcs: string[]
    rowSizes?: number[]
    rowHeight?: string
    openModal: (idx: number) => void
}): JSX.Element => {
    const layout = getLayout(previewSrcs.length, rowSizes)

    let count = 0
    const rows: ImageData[][] = []
    layout.forEach((rowSize: number) => {
        const row = previewSrcs.slice(count, count + rowSize).map((src, i) => {
            return { src, idx: count + i }
        })

        rows.push(row)
        count += rowSize
    })

    return (
        <div>
            {rows.map((row: ImageData[], i) => (
                <CollageRow key={i} rowHeight={rowHeight}>
                    {row.map(({ src, idx }: ImageData) => (
                        <CollageImg key={idx} idx={idx} src={src} widthPercent={`${100 / row.length}%`} openModal={openModal} />
                    ))}
                </CollageRow>
            ))}
        </div>
    )
}

export const Collage = ({
    imageSrcs,
    previewSrcs,
    rowSizes,
    rowHeight,
}: {
    imageSrcs: string[]
    previewSrcs?: string[]
    rowSizes?: number[]
    rowHeight?: string
}): JSX.Element => {
    //use the images themselves if no previews provided (less efficient)
    previewSrcs = previewSrcs ?? imageSrcs

    const [viewerIsOpen, setViewerIsOpen] = useState<boolean>(false)
    const [currentImage, setCurrentImage] = useState<number>(0)

    const openModal = (idx: number): void => {
        setViewerIsOpen(true)
        setCurrentImage(idx)
    }
    const closeModal = (): void => {
        setViewerIsOpen(false)
        setCurrentImage(0)
    }

    const photos: ViewType[] = imageSrcs.map((src) => {
        return {
            source: src,
        }
    })

    console.log('currentImage', currentImage)

    return (
        <>
            <CollagePage previewSrcs={previewSrcs} rowSizes={rowSizes} rowHeight={rowHeight} openModal={openModal} />
            <ModalGateway>
                {viewerIsOpen ? (
                    <Modal onClose={closeModal} closeOnEsc allowFullscreen={false}>
                        <Carousel views={photos} currentIndex={currentImage} />
                    </Modal>
                ) : null}
            </ModalGateway>
        </>
    )
}
