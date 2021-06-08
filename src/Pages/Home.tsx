import React from 'react'
import profile from '../images/profile.jpg'
import '../fonts/quadon/quadon.css'
import '../fonts/arnhem/arnhem.css'
import '../fonts/gentona/gentona.css'
// import '../fonts/titling-gothic/titling-gothic.css'

export const Home = (): JSX.Element => {
    return (
        <div
            id="HomePage"
            style={{
                userSelect: 'none',
                pointerEvents: 'none',
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
            }}
        >
            <div style={{ fontFamily: 'quadon', fontSize: '10vmin', textAlign: 'center' }}>
                <p>David-Andrew Samson</p>
            </div>
            <img src={profile} style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', width: '50vmin' }}></img>
            <div style={{ fontFamily: 'quadon', fontSize: '5vmin', textAlign: 'center' }}>
                <p>AI/ML - Music - Game Dev</p>
            </div>
        </div>
    )
}
