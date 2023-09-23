"use client"
import Image from 'next/image'
import profile from './(images)/profile.jpg'
import { NavbarDummy } from './(components)/navbar'


export default function Home() {
    return (

        // <div>
        //   <h1 className="font-mono text-4xl font-bold">Hello World</h1>
        //   <button onClick={() => document.documentElement.style.setProperty('--accent-color', '#09912b')}>Green</button>
        // </div>

        <div className="flex flex-col pointer-events-none select-none justify-center items-center font-quadon text-center h-full">
            <div style={{fontSize:'10vmin'}}>David-Andrew Samson</div>
            <Image src={profile} alt='Image of David' style={{maxWidth:'50vmin'}} />
            <div style={{fontSize:'5vmin'}}>AI/ML - Music - Engineering</div>
            <NavbarDummy />
            
        </div>
    )
}
