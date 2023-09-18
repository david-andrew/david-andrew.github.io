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
}

const NavbarButton = ({ content, href, active }: NavbarButtonProps) => {
    const [hover, setHover] = useState<boolean>(false);

    return (
        <Link href={href}>
            <div
                className={`relative cursor-pointer text-center font-quadon text-2xl m-2 text-white border-transparent hover:border-white ${active ? 'bg-blue-700' : ''}`}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                <div className="py-3 px-4">{content}</div>
            </div>
        </Link>
    );
}




const Navbar = (): JSX.Element => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const pathname = usePathname();

    return (
        <div className="w-screen bg-black">
            <div className="flex justify-between items-center px-4 py-2">
                
                {/* For Small Screens: Hamburger Menu */}
                <div className="md:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <span className="text-white">☰</span>
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
                        <NavbarButton  key={item.href} content={item.content} href={item.href} active={item.href === pathname} />
                    ))}
                </div>
            )}

        </div>
    );

    // return (
    //     <div className="bg-blue-500 p-4">
    //     {/* Desktop Nav */}
    //     <div className="hidden md:flex justify-between items-center">
    //         <div>Your Logo Here</div>
    //         <div className="space-x-4">
    //         <a href="#" className="text-white">Home</a>
    //         <a href="#" className="text-white">About</a>
    //         <a href="#" className="text-white">Contact</a>
    //         {/* ... other links */}
    //         </div>
    //     </div>

    //     {/* Mobile Nav */}
    //     <div className="md:hidden flex justify-between items-center">
    //         <div>Your Logo Here</div>
    //         <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
    //         <span className="text-white">☰</span>
    //         </button>
    //     </div>
    //     {isMenuOpen && (
    //         <div className="md:hidden">
    //         <a href="#" className="block text-white p-2">Home</a>
    //         <a href="#" className="block text-white p-2">About</a>
    //         <a href="#" className="block text-white p-2">Contact</a>
    //         {/* ... other links */}
    //         </div>
    //     )}
    //     </div>
    // );
}

export default Navbar;