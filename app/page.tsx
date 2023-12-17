import Image from 'next/image'
import profile from '@/app/(images)/profile.jpg'
import { NavbarDummy } from '@/app/(components)/navbar'

const Home = (): JSX.Element => {
    return (
        <>
            <div className="flex flex-col pointer-events-none select-none justify-center items-center font-quadon text-center h-full">
                <div style={{fontSize:'10vmin'}}>David-Andrew Samson</div>
                <Image src={profile} alt='Image of David' style={{maxWidth:'50vmin'}} />
                <div style={{fontSize:'5vmin'}}>AI/ML - Engineering - Music</div>
                <NavbarDummy />
            </div>
        </>
    )
}

export default Home