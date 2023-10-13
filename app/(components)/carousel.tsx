"use client";
import Image, { StaticImageData } from "next/image";
import { useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useSwipeable } from 'react-swipeable';

type CarouselProps = {
    images: StaticImageData[];
    i: number;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    setIdx: (newIdx: number) => void;
    loop?: boolean;
};

export const Carousel = ({images, i, isOpen, setIsOpen, setIdx, loop=false}:CarouselProps): JSX.Element => {

    //disable scrolling when the carousel is open
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "unset";
        }
    }, [isOpen]);

    // handling next and prev
    const handleNext = () => {
        if (i === images.length - 1) 
            setIdx(loop ? 0 : i);
        else 
            setIdx(i + 1);
    }
    const handlePrev = () => {
        if (i === 0) 
            setIdx(loop ? images.length - 1 : i);
        else 
            setIdx(i - 1);
    }


    //close the carousel when the user presses escape. Also handle next and prev with arrow keys
    useEffect(() => {
        const handleKeydown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsOpen(false);
            if (e.key === "ArrowRight") handleNext();
            if (e.key === "ArrowLeft") handlePrev();
        }
        document.addEventListener("keydown", handleKeydown);
        return () => {
            document.removeEventListener("keydown", handleKeydown);
        }
    }, [isOpen, i, loop]); // Note the added dependencies
    

    const handlers = useSwipeable({
        onSwipedLeft: () => handleNext(),
        onSwipedRight: () => handlePrev(),
        trackMouse: false
      });

    if (!isOpen) return <></>;
    return (
        <>
        <div {...handlers} className="fixed inset-0 flex items-center justify-center z-[60] bg-black/80" onClick={() => setIsOpen(false)}>
            {/* image */}
            <Image className="object-contain max-h-screen max-w-screen" src={images[i]} alt="..." onClick={(e:React.MouseEvent) => e.stopPropagation()} draggable={false}/>
            
            {/* x button in top right */}
            <div className="absolute top-5 right-5 p-2 text-5xl text-gray-300 hover:text-white cursor-pointer" onClick={() => setIsOpen(false)}>
                <XMarkIcon className="h-8 w-8"/>
            </div>
            
            {/* Left arrow */}
            {(loop || i !== 0) &&
                <div className="absolute left-5 p-2 text-5xl text-gray-300 hover:text-white cursor-pointer" onClick={(e) => { e.stopPropagation(); handlePrev(); }}>
                    <ChevronLeftIcon className="h-8 w-8"/>
                </div>
            }
            
            {/* Right arrow */}
            {(loop || i !== images.length - 1) &&
                <div className="absolute right-5 p-2 text-5xl text-gray-300 hover:text-white cursor-pointer" onClick={(e) => { e.stopPropagation(); handleNext(); }}>
                    <ChevronRightIcon className="h-8 w-8"/>
                </div>
            }

            {/* Text indicating the current image out of the total */}
            <div className="absolute bottom-5 right-5 p-2 text-xl text-gray-300 pointer-events-none">
                {`${i + 1} / ${images.length}`}
            </div>
        </div>
        </>

    )
}

