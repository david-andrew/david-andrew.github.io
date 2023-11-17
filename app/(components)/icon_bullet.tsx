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

type IconObject = {src: StaticImageData, alt: string};

//TODO: is there a way to specify the type of the object keys?
// {[key: Icon]: IconObject}
const icon_map = {
    windows: {src: windows, alt: 'windows icon'},
    apple: {src: apple, alt: 'apple icon'},
    linux: {src: linux, alt: 'linux icon'},
    gamepad: {src: gamepad, alt: 'gamepad icon'},
    github: {src: github, alt: 'github icon'},
    docs: {src: docs, alt: 'document icon'},
    hashtag: {src: hashtag, alt: 'hashtag icon'},
    "object group": {src: object_group, alt: 'object group icon'},
    "jhu hub": {src: jhu_hub, alt: 'jhu hub icon'},
} as const;
type Icon = keyof typeof icon_map;


export const IconBullet = ({icon, children}:{icon:Icon, children:React.ReactNode}) => {
    const {src, alt} = icon_map[icon];
    return (
        <span>
            <Image src={src} alt={alt} className='inline-block w-8 h-8 mr-2 pointer-events-none select-none' draggable={false} />
            {children}
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