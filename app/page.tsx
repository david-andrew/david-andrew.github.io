"use client"
import Image from 'next/image'

export default function Home() {
  return (
    // TODO: custom gentona font. need to add font and update tailwind.config.js
    <div>
      <h1 className="font-mono text-4xl font-bold">Hello World</h1>
      <button onClick={() => document.documentElement.style.setProperty('--accent-color', '#09912b')}>Green</button>
    </div>
  )
}
