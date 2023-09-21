"use client"
import Image from 'next/image'
import profile from './(images)/profile.jpg'


export default function Home() {
  return (

    // <div>
    //   <h1 className="font-mono text-4xl font-bold">Hello World</h1>
    //   <button onClick={() => document.documentElement.style.setProperty('--accent-color', '#09912b')}>Green</button>
    // </div>

    <div className="flex flex-col pointer-events-none select-none justify-center fixed inset-0 w-full h-full -z-10 font-quadon text-center">
      <div style={{fontSize:'10vmin'}}>David-Andrew Samson</div>
      <Image src={profile} alt='Image of David' className="mx-auto w-1/2" />
      <div style={{fontSize:'5vmin'}}>AI/ML - Music - Engineering</div>
    </div>
  )
}
