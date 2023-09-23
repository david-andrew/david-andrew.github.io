"use client";
import { SwatchIcon as SolidSwatchIcon } from "@heroicons/react/24/solid";
import { SwatchIcon as OutlineSwatchIcon  } from "@heroicons/react/24/outline";
import { useEffect, useRef } from "react";
import { useHover } from 'usehooks-ts'

export const ColorPicker = (): JSX.Element => {
    const hoverRef = useRef(null)
    const isHover = useHover(hoverRef)
    
    return (
        <div className="fixed bottom-0 right-0 w-full flex flex-row-reverse" style={{height:'var(--navbar-height)'}}>
            <div className="flex flex-row justify-center" style={{width:'var(--navbar-height)', height:'var(--navbar-height)'}}>
                <div className="flex flex-col justify-center">
                    <div ref={hoverRef} onClick={() => console.log('clicked palette')} className="hidden md:block">
                        { (isHover ? (
                            <SolidSwatchIcon 
                                className="
                                    lg:h-16 lg:w-16
                                    md:h-12 md:w-12
                                    sm:h-8 sm:w-8
                                    h-8 w-8
                                    "
                            />
                        ) : (
                            <OutlineSwatchIcon
                                className="
                                    lg:h-16 lg:w-16
                                    md:h-12 md:w-12
                                    sm:h-8 sm:w-8
                                    h-8 w-8
                                    "
                            />
                        ))}
                    </div>
                    <OutlineSwatchIcon
                        className="
                            lg:h-16 lg:w-16
                            md:h-12 md:w-12
                            sm:h-8 sm:w-8
                            h-8 w-8
                            md:hidden
                            "
                    />
                </div>
            </div>
        </div>

    );
}