import React, { useState, MouseEvent, MouseEventHandler } from 'react'
import { ReactPhotoCollage } from 'react-photo-collage'
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

const EfficientCollageImg = ({
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
    const onClick: MouseEventHandler<HTMLImageElement> = (event: MouseEvent<HTMLImageElement, globalThis.MouseEvent>) => {
        console.log('clicked image', idx)
        openModal(idx)
    }

    return <img src={src} style={{ width: widthPercent, margin: '1px', objectFit: 'cover', cursor: 'pointer', userSelect: 'none' }} onClick={onClick} />
}

const EfficientCollageRow = ({ children, rowHeight = '250px' }: { children: React.ReactNode; rowHeight?: string }): JSX.Element => {
    return <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: rowHeight }}>{children}</div>
}

interface ImageData {
    src: string
    idx: number
}

export const EfficientCollagePage = ({
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
                <EfficientCollageRow key={i} rowHeight={rowHeight}>
                    {row.map(({ src, idx }: ImageData) => (
                        <EfficientCollageImg key={idx} idx={idx} src={src} widthPercent={`${100 / row.length}%`} openModal={openModal} />
                    ))}
                </EfficientCollageRow>
            ))}
        </div>
    )
}

export const EfficientCollage = ({
    imageSrcs,
    previewSrcs,
    rowSizes,
    rowHeight,
}: {
    imageSrcs: string[]
    previewSrcs: string[]
    rowSizes?: number[]
    rowHeight?: string
}): JSX.Element => {
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
            <EfficientCollagePage previewSrcs={previewSrcs} rowSizes={rowSizes} rowHeight={rowHeight} openModal={openModal} />
            <ModalGateway>
                {viewerIsOpen && (
                    <Modal onClose={closeModal}>
                        <Carousel views={photos} currentIndex={currentImage} />
                    </Modal>
                )}
            </ModalGateway>
        </>
    )
}
