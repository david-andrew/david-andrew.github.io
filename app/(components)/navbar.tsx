"use client"
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'


// Define navigation items
const navItems = [
    { content: 'Home', href: '/' },
    { content: 'Projects', href: '/projects' },
    { content: 'About', href: '/about' },
    { content: 'Clovers', href: '/clovers' },
    { content: 'Contact', href: '/contact' }
];



interface NavbarButtonProps {
    content: string;
    href: string;
    active: boolean;
    onClick?: () => void;
}

const NavbarButton = ({ content, href, active, onClick }: NavbarButtonProps) => {

    return (
        <Link href={href}>
            <div className={`relative cursor-pointer text-center font-quadon
                m-2 text-white border-solid border-transparent hover:border-white border-2
                lg:text-4xl 
                md:text-2xl md:border-4
                ${active ? "bg-accent" : ""}`}
            >
                <div className={`
                    py-3 px-4 
                    md:py-3 md:px-4 
                    lg:py-6 lg:px-10`
                } onClick={onClick}>{content}</div>
            </div>
        </Link>
    );
}




const Navbar = (): JSX.Element => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const pathname = usePathname();

    return (
        <div className="w-screen bg-black">
            <div className="flex flex-row md:justify-center justify-left px-4 py-2">
                
                {/* For Small Screens: Hamburger Menu */}
                <div className="md:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <span className="text-white text-2xl align-middle">☰</span>
                    </button>
                </div>

                {/* For Large Screens: Full Menu */}
                <div className="hidden md:flex">
                    {navItems.map(item => (
                        <NavbarButton key={item.href} content={item.content} href={item.href} active={item.href === pathname} />
                    ))}
                </div>
            </div>

            {/* Dropdown menu for small screens */}
            {isMenuOpen && (
                <div className="md:hidden">
                    {navItems.map(item => (
                        <NavbarButton key={item.href} content={item.content} href={item.href} active={item.href === pathname} onClick={() => setIsMenuOpen(false)} />
                    ))}
                </div>
            )}

        </div>
    );
}

export default Navbar;