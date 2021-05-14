import React, { useState } from 'react'
// import { Button, ButtonProps } from 'semantic-ui-react'
import { useHistory, useLocation } from 'react-router-dom'
import '../fonts/quadon/quadon.css'

//
interface NavbarButtonProps {
    content: string
    active: boolean
    onClick: () => void
}
const NavbarButton = ({ content, onClick, active }: NavbarButtonProps): JSX.Element => {
    //track if the mouse is hovering over the element
    const [hover, setHover] = useState<boolean>(false)

    return (
        <div
            style={{
                textAlign: 'center',
                fontFamily: 'quadon',
                fontSize: '2vmin',
                margin: '1%',
                color: '#FFFFFF',
                border: '0.08em solid #000000',
                borderColor: 'transparent',
                ...(hover ? { borderColor: '#FFFFFF' } : {}),
                ...(active ? { backgroundColor: '#002d72' } : {}),
            }}
            onClick={onClick}
            onMouseEnter={(): void => setHover(true)}
            onMouseLeave={(): void => setHover(false)}
        >
            <div style={{ padding: '0.8em 1.2em 0.8em 1.2em' }}>{content}</div>
        </div>
    )
}

export const Navbar = (): JSX.Element => {
    const history = useHistory()
    const location = useLocation()
    const { pathname: path } = location

    //render component
    return (
        <div
            style={{
                width: '100vw',
                display: 'flex',
                justifyContent: 'center',
                marginTop: '0.5%',
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <NavbarButton content="Home" onClick={(): void => history.push('/home')} active={path === '/home' || path === '/'} />
                <NavbarButton content="Projects" onClick={(): void => history.push('/projects')} active={path === '/projects'} />
                <NavbarButton content="About" onClick={(): void => history.push('/about')} active={path === '/about'} />
                <NavbarButton content="Misc" onClick={(): void => history.push('/misc')} active={path === '/misc'} />
                <NavbarButton content="Contact" onClick={(): void => history.push('/contact')} active={path === '/contact'} />
            </div>
        </div>
    )
}
