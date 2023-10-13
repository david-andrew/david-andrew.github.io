"use client";
import Image, { StaticImageData } from "next/image";
import { useEffect } from "react";

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

    //close the carousel when the user presses escape
    useEffect(() => {
        const handleEsc = (e:KeyboardEvent) => {
            if (e.key === "Escape") setIsOpen(false);
        }
        document.addEventListener("keydown", handleEsc);
        return () => {
            document.removeEventListener("keydown", handleEsc);
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

    if (!isOpen) return <></>;
    return (
        <div className="fixed top-0 left-0 h-full w-full flex items-center justify-center z-[60] bg-black/80" onClick={() => setIsOpen(false)}>
            {/* image */}
            <Image className="object-contain" src={images[i]} alt="..." onClick={(e:React.MouseEvent) => e.stopPropagation()}/>
            
            {/* x button in top right */}
            <div className="absolute top-5 right-5 p-2 text-5xl text-gray-300 hover:text-white cursor-pointer" onClick={() => setIsOpen(false)}>×</div>
            
            {/* Left arrow */}
            <div className="absolute left-5 p-2 text-5xl text-gray-300 hover:text-white cursor-pointer" onClick={(e) => { e.stopPropagation(); handlePrev(); }}>←</div>
            
            {/* Right arrow */}
            <div className="absolute right-5 p-2 text-5xl text-gray-300 hover:text-white cursor-pointer" onClick={(e) => { e.stopPropagation(); handleNext(); }}>→</div>


        </div>
    )
}

