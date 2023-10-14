
type CheckboxProps = {
    label: string;
    isChecked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
};

export const Checkbox = ({ label, isChecked, onChange, className }: CheckboxProps) => {
    return (
        <div className={`flex items-center ${className}`}>
            <input 
                type="checkbox" 
                id="custom-checkbox" 
                className="hidden"
                checked={isChecked}
                onChange={onChange}
            />
            <label 
                htmlFor="custom-checkbox" 
                className="
                    w-6 h-6 border-2 border-gray-300 rounded
                    mr-2 cursor-pointer 
                    bg-white 
                    hover:border-gray-400
                    flex justify-center items-center
                "
            >
                {isChecked && (
                    <svg
                        className="w-4 h-4 mx-auto my-auto"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="black"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="4"
                    >
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                )}
            </label>
            {label}
        </div>
    );
}



export const Container = ({children}:{children:React.ReactNode}) => {
    return (
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-[1048px]">
            {children}
        </div>
    );
};


export const Divider = () => {
    return (
        <hr className="h-px my-4 bg-gray-500 border-0"/>
    );
}



export function H1({children, className='', ...props}: {children:React.ReactNode, className?:string}) {
    return (
        <h1 className={`text-4xl my-4 font-quadon ${className}`} {...props}>
            {children}
        </h1>
    );
}
  
export function H2({children, className='', ...props}: {children:React.ReactNode, className?:string}) {
    return (
        <h2 className={`text-3xl my-3 font-quadon ${className}`} {...props}>
            {children}
        </h2>
    );
}
  
export function H3({children, className='', ...props}: {children:React.ReactNode, className?:string}) {
    return (
        <h3 className={`text-2xl my-2 font-quadon ${className}`} {...props}>
            {children}
        </h3>
    );
}
  

import NextLink from "next/link";
import { ComponentProps } from 'react';
type NextLinkProps = ComponentProps<typeof NextLink>;
type Url = NextLinkProps['href'];

export function Link({href, children, className='', ...props}: {href:Url, children:React.ReactNode, className?:string}) {
    return (
        <NextLink href={href} className={`text-blue-400 hover:text-blue-500 ${className}`} {...props}>
            {children}
        </NextLink>
    );
}
  
export function P({children, className='', ...props}: {children:React.ReactNode, className?:string}) {
    return (
        <p className={`mb-4 text-lg font-gentona ${className}`} {...props}>
            {children}
        </p>
    );
}