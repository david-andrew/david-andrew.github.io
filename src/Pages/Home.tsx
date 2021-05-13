import React, { useState } from 'react';
import {Menu, MenuItemProps} from 'semantic-ui-react'

export const HomePage = (): JSX.Element => {
    
    const [activeItem, setActiveItem] = useState<string | undefined>(undefined);
    
    const handleOnClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, {name}: MenuItemProps) => {setActiveItem(name)}

    return (
        <>
            <Menu secondary>
                <Menu.Item name='Home' active={activeItem === 'Home'} onClick={handleOnClick}/>
                <Menu.Item name='Projects' active={activeItem === 'Projects'} onClick={handleOnClick}/>
                <Menu.Item name='About' active={activeItem === 'About'} onClick={handleOnClick}/>
                <Menu.Item name='Misc.' active={activeItem === 'Misc.'} onClick={handleOnClick}/>
                <Menu.Item name='Contact' active={activeItem === 'Contacts'} onClick={handleOnClick}/>
            </Menu>
        </>
    );
}