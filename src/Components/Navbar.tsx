import React, { useState } from 'react'
import { Menu, MenuItemProps } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'

export const Navbar = (): JSX.Element => {
    const [selection, setSelection] = useState<string | undefined>('Home')

    const history = useHistory()

    //update the active page when selected
    const handleOnClick = (
        e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
        { name }: MenuItemProps
    ) => {
        setSelection(name)
        history.push(`/${name}`)
    }

    //render component
    return (
        <div
            style={{
                width: '100vw',
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <Menu secondary inverted size="massive">
                <Menu.Item
                    name="Home"
                    active={selection === 'Home'}
                    onClick={handleOnClick}
                />
                <Menu.Item
                    name="Projects"
                    active={selection === 'Projects'}
                    onClick={handleOnClick}
                />
                <Menu.Item
                    name="About"
                    active={selection === 'About'}
                    onClick={handleOnClick}
                />
                <Menu.Item
                    name="Misc"
                    active={selection === 'Misc'}
                    onClick={handleOnClick}
                />
                <Menu.Item
                    name="Contact"
                    active={selection === 'Contact'}
                    onClick={handleOnClick}
                />
            </Menu>
        </div>
    )
}
