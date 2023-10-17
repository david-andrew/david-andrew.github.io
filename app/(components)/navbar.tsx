"use client"
import { useState, useEffect, useRef } from 'react';
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

    return (
        <Link href={href} draggable={false} className="select-none">
            <div className={`relative cursor-pointer text-center font-quadon
                m-2 text-white border-solid sm:border-white md:border-transparent hover:border-white 
                text-xl border-2
                md:text-2xl md:border-3
                lg:text-4xl lg:border-4
                ${active ? "bg-accent" : ""}`}
            >
                <div className={`
                    py-3 px-4 
                    md:py-3 md:px-4 
                    lg:py-6 lg:px-9`
                }>{content}</div>
            </div>
        </Link>
    );
}


export const NavbarDummy = (): JSX.Element => <div className='pointer-events-none select-none' style={{height: 'var(--navbar-height)'}}>&nbsp;</div>;

export const Navbar = (): JSX.Element => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const pathname = usePathname();
    
    // function to determine which navbar button is active 
    const isActiveButton = (buttonRoute:string) => {
        if (buttonRoute === '/') return pathname === '/';    
        if (buttonRoute === pathname) return true;    
        if (pathname.startsWith(`${buttonRoute}/`)) return true;
        return false;
    }
    
    //close the hamburger menu after the route changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);
    
    // keep track of the height of the navbar
    const navbarRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        function handleResize() {
            if (navbarRef.current) {
                const height = navbarRef.current.offsetHeight;
                document.documentElement.style.setProperty('--navbar-height', `${height}px`);
            }
        }
        // set the initial height and update it on resize
        handleResize();    
        window.addEventListener('resize', handleResize);
    
        // Clean up the event listener when the component is unmounted
        return () => { window.removeEventListener('resize', handleResize); };
      }, []);
    


    return (
        <>
            {/* ---------------- Actual Navbar ---------------- */}
            <div className="fixed w-screen bg-black z-50" >
                <div ref={navbarRef}>
                    <div className="flex flex-row md:justify-center justify-left px-4 py-2">
                        
                        {/* For Small Screens: Hamburger Menu Button */}
                        <div className="md:hidden">
                            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                <span className="text-white text-4xl align-middle">☰</span>
                            </button>
                        </div>

                        {/* For Large Screens: Full Menu */}
                        <div className="hidden md:flex">
                            {navItems.map(item => (
                                <NavbarButton key={item.href} content={item.content} href={item.href} active={isActiveButton(item.href)} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Dropdown menu for small screens */}
                {isMenuOpen && (
                    <div className="md:hidden bg-black w-full">
                        {navItems.map(item => (
                            <NavbarButton key={item.href} content={item.content} href={item.href} active={isActiveButton(item.href)} />
                        ))}
                    </div>
                )}
            </div>

            {/* ---------------- Dummy Spacer ---------------- */}
            <NavbarDummy />

        </>

    );
}

