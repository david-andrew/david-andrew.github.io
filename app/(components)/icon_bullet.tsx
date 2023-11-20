import Image, { StaticImageData } from 'next/image';
import linux from '@/app/(images)/icons/linux_logo.png'
import windows from '@/app/(images)/icons/windows.svg';
import apple from '@/app/(images)/icons/apple.svg'
import gamepad from '@/app/(images)/icons/gamepad.svg'
import github from '@/app/(images)/icons/github.svg'
import docs from "@/app/(images)/icons/docs.svg";
import hashtag from "@/app/(images)/icons/hashtag.svg";
import object_group from "@/app/(images)/icons/object_group.svg";
import jhu_hub from "@/app/(images)/icons/jhu_hub.svg";
import chrome from "@/app/(images)/icons/chrome.svg";
import table from "@/app/(images)/icons/table.svg";
import envelope from "@/app/(images)/icons/envelope.svg";
import linkedin from "@/app/(images)/icons/linkedin.svg";
import { twMerge } from 'tailwind-merge';

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
    "object group": object_group,
    "jhu hub": jhu_hub,
    chrome,
    table,
    envelope,
    linkedin,
} as const;
type Icon = keyof typeof icon_map;


export const IconBullet = ({icon, responsive=false, children}:{icon:Icon, responsive?:boolean, className?:string, children:React.ReactNode}) => {
    const src = icon_map[icon];
    return (
        <span className='text-sm'>
            <Image src={src} alt={`${icon} icon`} className={`inline-block w-8 h-8 mr-2 ${responsive ? 'md:w-12 md:h-12 md:mr-3 lg:w-16 lg:h-16 lg:mr-4' : ''} pointer-events-none select-none`} draggable={false} />
            <span className='align-middle'>
                {children}
            </span>
        </span>
    );
}

export const IconBulletList = ({children}:{children:React.ReactNode}) => {
    return (
        <div className='flex flex-col space-y-3'>
            {children}
        </div>
    );
}