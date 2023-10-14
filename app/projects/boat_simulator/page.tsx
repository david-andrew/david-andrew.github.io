import { Link, P, H3} from '@/app/(components)/ui'
import { Collage } from '@/app/(components)/collage'
import { getImages } from '../fetch'
import Image from 'next/image'
import windows from '@/app/(images)/icons/windows_logo.png';
import apple from '@/app/(images)/icons/apple_logo.png'
import linux from '@/app/(images)/icons/linux_logo.png'

const Page = async (): Promise<JSX.Element> => {
    //image objects for photo collage
    // const images = await getImages('app/(images)/boat_simulator')
    const images = await getImages('boat_simulator')

    return (
        <>
            <P>
                Boat Simulator was a small Unity3D game I made at the Spring 2017 JHU hackathon. My initial goal was to build a game that demonstrated the
                physics of sailing, especially the fact that sailing with the wind is one of the slower directions you can sail. Ultimately, building a
                completely accurate simulation was a bit beyond my Unity skills, but, with some suggestions from family, I did end up with a fun little
                meditative experience.
            </P>
            <P>
                The player controls a small boat sailing along an endless ocean under a starry sky. John Tavener&apos;s Song for Athene provides an ethereal
                soundscape for the dreamlike scene. The entire game lasts for about 7 minutes, with the boat picking up speed towards the climax of the
                song, and ultimately taking off for the great beyond.
            </P>
            <H3>Photos</H3>
            <Collage images={images} rowSizes={[1,2,3]} />
            <H3>Try It</H3>
            <div className='flex flex-col space-y-3'>
                <span>
                    <Image src={windows} alt='Windows Logo' className='inline-block w-8 h-8 mr-2' />
                    <Link href="https://www.dropbox.com/s/95v6y2a4zgls45y/Build11_Windows_64_bit.zip?dl=0">
                        Boat Simulator Build 11
                    </Link>
                </span>
                <span>
                    <Image src={apple} alt='Apple Logo' className='inline-block w-8 h-8 mr-2' />
                    Recommend using <Link href="https://www.winehq.org/">Wine</Link>
                </span>
                <span>
                    <Image src={linux} alt='Linux Logo' className='inline-block w-8 h-8 mr-2' />
                    Recommend using <Link href="https://www.winehq.org/">Wine</Link>
                </span>
            </div>
        </>
    )
}


export default Page;
