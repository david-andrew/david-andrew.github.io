import React from 'react'
import profile from '../images/profile.jpg'

export const Home = (): JSX.Element => {
    return (
        <div
            style={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
            }}
        >
            <img
                src={profile}
                style={{
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    maxWidth: '50%',
                    maxHeight: '50%',
                    width: 'auto',
                    height: 'auto',
                }}
            ></img>
        </div>
    )
}
