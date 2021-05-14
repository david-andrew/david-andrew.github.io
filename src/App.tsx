import React from 'react'
import { Navbar } from './Components/Navbar'
import { HomePage } from './Pages/Home'

function App() {
    return (
        <div
            style={{
                backgroundColor: 'grey',
                width: '100vw',
                height: '100vh',
                color: 'white',
            }}
        >
            <Navbar />
            <HomePage />
        </div>
    )
}

export default App
