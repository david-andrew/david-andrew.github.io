import Image, { StaticImageData } from 'next/image'
import linux from '@/app/(images)/icons/linux_logo.png'
import windows from '@/app/(images)/icons/windows.svg'
import apple from '@/app/(images)/icons/apple.svg'
import gamepad from '@/app/(images)/icons/gamepad.svg'
import github from '@/app/(images)/icons/github.svg'
import docs from '@/app/(images)/icons/docs.svg'
import hashtag from '@/app/(images)/icons/hashtag.svg'
import object_group from '@/app/(images)/icons/object_group.svg'
import jhu_hub from '@/app/(images)/icons/jhu_hub.svg'
import chrome from '@/app/(images)/icons/chrome.svg'
import table from '@/app/(images)/icons/table.svg'
import envelope from '@/app/(images)/icons/envelope.svg'
import linkedin from '@/app/(images)/icons/linkedin.svg'
import code from '@/app/(images)/icons/code.svg'
import cubes from '@/app/(images)/icons/cubes.svg'
import branch from '@/app/(images)/icons/branch.svg'
import circuit from '@/app/(images)/icons/circuit.png'
import gears from '@/app/(images)/icons/gears.png'
import apl_shield from '@/app/(images)/icons/apl_shield.png'
import jhu_shield from '@/app/(images)/icons/jhu_shield.png'
import idt_starburst from '@/app/(images)/icons/idt_starburst.png'
import jataware_logo from '@/app/(images)/icons/jataware_logo.png'
import trello from '@/app/(images)/icons/trello.svg'
import { twMerge } from 'tailwind-merge'

//TODO: is there a way to specify the type of the object keys?
// {[key: Icon]: StaticImageData}
const icon_map = {
    windows,
    apple,
    linux,
    gamepad,
    github,
    docs,
    hashtag,
    'object group': object_group,
    'jhu hub': jhu_hub,
    chrome,
    table,
    envelope,
    linkedin,
    code,
    cubes,
    branch,
    circuit,
    gears,
    'apl shield': apl_shield,
    'jhu shield': jhu_shield,
    'idt starburst': idt_starburst,
    'jataware logo': jataware_logo,
    trello,
} as const
type Icon = keyof typeof icon_map

export const IconBullet = ({
    icon,
    responsive = false,
    className = '',
    children,
}: {
    icon: Icon
    responsive?: boolean
    className?: string
    children: React.ReactNode
}) => {
    const src = icon_map[icon]
    return (
        <div className={twMerge('flex flex-row text-sm items-center', className)}>
            <Image
                src={src}
                alt={`${icon} icon`}
                className={`inline-block w-8 h-8 mr-2 ${
                    responsive ? 'md:w-12 md:h-12 md:mr-3 lg:w-16 lg:h-16 lg:mr-4' : ''
                } pointer-events-none select-none`}
                draggable={false}
            />
            <span className="align-middle">{children}</span>
        </div>
    )
}

export const IconBulletList = ({ children, className = '' }: { className?: string; children: React.ReactNode }) => {
    return <div className={twMerge('flex flex-col space-y-3', className)}>{children}</div>
}
