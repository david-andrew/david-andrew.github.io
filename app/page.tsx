"use client"
import Image from 'next/image'
import profile from './(images)/profile.jpg'


export default function Home() {
  return (
  // <div
  //   id="HomePage"
  //   style={{
  //       userSelect: 'none',
  //       pointerEvents: 'none',
  //       width: '100%',
  //       height: '100%',
  //       display: 'flex',
  //       flexDirection: 'column',
  //       justifyContent: 'center',
  //   }}
  // >
  //     <div style={{ fontFamily: 'quadon', fontSize: '10vmin', textAlign: 'center' }}>
  //         <p>David-Andrew Samson</p>
  //     </div>
  //     <img src={profile} style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', width: '50vmin' }}></img>
  //     <div style={{ fontFamily: 'quadon', fontSize: '5vmin', textAlign: 'center' }}>
  //         <p>AI/ML - Music - Game Dev</p>
  //     </div>
  // </div>
    
    // <div>
    //   <h1 className="font-mono text-4xl font-bold">Hello World</h1>
    //   <button onClick={() => document.documentElement.style.setProperty('--accent-color', '#09912b')}>Green</button>
    // </div>

    <div className="flex flex-col pointer-events-none select-none justify-center fixed inset-0 w-full h-full -z-10">
      <div style={{fontSize:'10vmin'}} className="font-quadon text-center">David-Andrew Samson</div>
      <Image src={profile} alt='Image of David' className="mx-auto w-1/2" />
      <div style={{fontSize:'5vmin'}} className="font-quadon text-center">AI/ML - Music - Game Dev</div>
    </div>
  )
}
