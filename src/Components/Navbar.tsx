import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

//props for each link/button in the navbar
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
                margin: '1.5% 1% 1.5% 1%',
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
                margin: 'auto',
                backgroundColor: 'black',
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <NavbarButton content="Home" onClick={(): void => history.push('/home')} active={path === '/home' || path === '/'} />
                <NavbarButton content="Projects" onClick={(): void => history.push('/projects')} active={path.startsWith('/projects')} />
                <NavbarButton content="About" onClick={(): void => history.push('/about')} active={path === '/about'} />
                <NavbarButton content="Clovers" onClick={(): void => history.push('/clovers')} active={path === '/clovers'} />
                <NavbarButton content="Contact" onClick={(): void => history.push('/contact')} active={path === '/contact'} />
            </div>
        </div>
    )
}

//dummy nav bar to include at the top of any page so that the nav bar doesn't cover the content
export const DummyNavBar = (): JSX.Element => {
    return (
        <div id="DummyPageNav">
            <div
                style={{
                    width: '100vw',
                    display: 'flex',
                    justifyContent: 'center',
                    margin: 'auto',
                    backgroundColor: 'black',
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {[1, 2, 3, 4, 5].map((_, i) => {
                        return (
                            <div
                                key={i}
                                style={{
                                    textAlign: 'center',
                                    fontFamily: 'quadon',
                                    fontSize: '2vmin',
                                    margin: '1.5% 1% 1.5% 1%',
                                    color: '#FFFFFF',
                                    border: '0.08em solid #000000',
                                    borderColor: 'transparent',
                                }}
                            >
                                <div style={{ padding: '0.8em 1.2em 0.8em 1.2em' }}>Button</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}