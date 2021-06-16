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
    // const img0src = r(r.keys()[0]).default
    const placeholderSrcs: string[] = r.keys().map(() => placeholderImg) as string[]
    const cloverSrcs: string[] = r.keys().map((path: string) => r(path).default) as string[]

    const [loadedPaths, setLoadedPaths] = useState<{ [src: string]: LoadingStates }>({})
    const [imageSrcs, setImageSrcs] = useState(placeholderSrcs)
    const [renderId, setRenderId] = useState<number>(0)

    //preload all the images. when an image is loaded, allow the collage to show it
    useEffect(() => {
        ;(async () => {
            cloverSrcs.forEach((src, i) => {
                const img = new Image()
                img.src = src
                setLoadedPaths((p) => {
                    return { ...p, [src]: LoadingStates.loading }
                })
                img.onload = () => {
                    setLoadedPaths((p) => {
                        return { ...p, [src]: LoadingStates.loaded }
                    })
                }
                img.onerror = () => {
                    setLoadedPaths((p) => {
                        return { ...p, [src]: LoadingStates.error }
                    })
                }
            })
        })()
    }, [])

    useEffect(() => {
        setRenderId((id) => id + 1)

        const loadedImageSrcs: string[] = cloverSrcs.map((src) => {
            return (() => {
                switch (loadedPaths[src]) {
                    case LoadingStates.loading:
                        return placeholderImg
                    case LoadingStates.loaded:
                        return src
                    case LoadingStates.error:
                        return errorImg
                }
            })()
        })
        setImageSrcs(loadedImageSrcs)
    }, [loadedPaths])

    return (
        <PageContainer>
            <Collage key={renderId} imageSrcs={imageSrcs} />
        </PageContainer>
    )
}
