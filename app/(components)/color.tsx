'use client'
import { SwatchIcon as SolidSwatchIcon } from '@heroicons/react/24/solid'
import { SwatchIcon as OutlineSwatchIcon } from '@heroicons/react/24/outline'
import { useRef, useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { getCookie, setCookie, deleteCookie } from 'cookies-next'
import { useHover } from 'usehooks-ts'
import { Checkbox } from './ui'

const palette = ['#002d72', '#2d7200', '#720000', '#cf4520', '#e6b000', '#470a68', '#333333']

const tooltip = 'Select Accent Color. Color is saved in a cookie.'

const PaletteColor = ({ color, onClick }: { color: string; onClick: () => void }): JSX.Element => {
    return (
        <div
            className="
                w-8 h-8 m-1
                lg:w-12 lg:h-12 lg:m-2 
                rounded-sm cursor-pointer pointer-events-auto
            "
            title={tooltip}
            style={{ backgroundColor: color }}
            onClick={onClick}
        />
    )
}

export const ColorPicker = (): JSX.Element => {
    const hoverRef = useRef(null)
    const isHover = useHover(hoverRef)
    const [savePalette, setSavePalette] = useState<boolean>(false)

    const pathname = usePathname()
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

    // check if the user had a cookie already set for the color, else set the default color
    // accent color starts at black on initial page load, and is then set here
    useEffect(() => {
        const color = getCookie('color')
        if (color && palette.includes(color.toLowerCase())) {
            document.documentElement.style.setProperty('--accent-color', color)
            setSavePalette(true)
        } else {
            document.documentElement.style.setProperty('--accent-color', palette[0])
            setSavePalette(false)
        }
    }, [])

    //close the color picker if the route changes
    useEffect(() => setIsMenuOpen(false), [pathname])

    return (
        <div
            className="fixed bottom-0 right-0 w-full flex flex-row-reverse pointer-events-none"
            style={{ height: 'var(--navbar-height)' }}
        >
            <div
                className="flex flex-row justify-center"
                style={{ width: 'var(--navbar-height)', height: 'var(--navbar-height)' }}
            >
                <div className="flex flex-col justify-center">
                    <div
                        ref={hoverRef}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="hidden md:block hover:cursor-pointer pointer-events-auto"
                    >
                        {isHover ? (
                            <SolidSwatchIcon
                                title={tooltip}
                                className="
                                    lg:h-16 lg:w-16
                                    md:h-12 md:w-12
                                    sm:h-8 sm:w-8
                                    h-8 w-8
                                    "
                            />
                        ) : (
                            <OutlineSwatchIcon
                                title={tooltip}
                                className="
                                    lg:h-16 lg:w-16
                                    md:h-12 md:w-12
                                    sm:h-8 sm:w-8
                                    h-8 w-8
                                    "
                            />
                        )}
                    </div>
                    <OutlineSwatchIcon
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        title={tooltip}
                        //TODO: fixed max-md:bottom-3 max-md:right-3
                        className="
                            pointer-events-auto
                            lg:h-16 lg:w-16
                            md:h-12 md:w-12
                            sm:h-8 sm:w-8
                            h-8 w-8
                            md:hidden
                            "
                    />
                    {isMenuOpen && (
                        <div
                            className="
                            absolute -translate-x-full
                            p-1 -ml-2 border-2
                            lg:p-2 lg:-ml-4 lg:border-4
                            border-solid border-white 
                            bg-black -z-10 flex flex-col
                            pointer-events-auto
                            max-md:bottom-2
                            "
                        >
                            <Checkbox
                                label="Save preference to cookie"
                                isChecked={savePalette}
                                onChange={() => {
                                    setSavePalette(!savePalette)

                                    // delete the cookie if the user unchecks the checkbox, or set the cookie
                                    if (savePalette) deleteCookie('color', { sameSite: 'strict' })
                                    else
                                        setCookie(
                                            'color',
                                            document.documentElement.style.getPropertyValue('--accent-color'),
                                            { sameSite: 'strict' },
                                        )
                                }}
                                className="m-1 lg:ml-2 font-gentona text-md sm:text-xl"
                            />

                            <div className="flex flex-row">
                                {palette.map((color) => (
                                    <PaletteColor
                                        color={color}
                                        key={color}
                                        onClick={() => {
                                            document.documentElement.style.setProperty('--accent-color', color)
                                            if (savePalette) setCookie('color', color, { sameSite: 'strict' })
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
