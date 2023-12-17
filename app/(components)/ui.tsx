import NextLink from "next/link";
import { ComponentProps } from 'react';
import { twMerge } from "tailwind-merge";


type CheckboxProps = {
    label: string;
    isChecked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
};

export const Checkbox = ({ label, isChecked, onChange, className }: CheckboxProps) => {
    return (
        <div className={twMerge('flex items-center', className)}>
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
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-[1190px]">
            {children}
        </div>
    );
};


export const Divider = ({className=''}:{className?:string}) => {
    return (
        <hr className={twMerge("h-px my-4 bg-gray-500 border-0", className)}/>
    );
}


export function H1({children, className='', ...props}: {children:React.ReactNode, className?:string, title?:string}) {
    return (
        <h1 className={twMerge('text-4xl my-6 font-quadon', className)} {...props}>
            {children}
        </h1>
    );
}
  
export function H2({children, className='', ...props}: {children:React.ReactNode, className?:string, title?:string}) {
    return (
        <h2 className={twMerge('text-3xl mt-6 mb-3 font-quadon', className)} {...props}>
            {children}
        </h2>
    );
}
  
export function H3({children, className='', ...props}: {children:React.ReactNode, className?:string, title?:string}) {
    return (
        <h3 className={twMerge('text-2xl mt-6 mb-2 font-quadon', className)} {...props}>
            {children}
        </h3>
    );
}

export function H4({children, className='', ...props}: {children:React.ReactNode, className?:string, title?:string}) {
    return (
        <h3 className={twMerge('text-xl mt-4 mb-2 font-quadon ', className)} {...props}>
            {children}
        </h3>
    );
}
  


type NextLinkProps = ComponentProps<typeof NextLink>;
type Url = NextLinkProps['href'];

export const Link = ({href, children, className='', ...props}: {href:Url, children?:React.ReactNode, className?:string, target?:string}) => {
    return (
        <NextLink href={href} className={twMerge('text-blue-400 hover:text-blue-500 font-gentona text-xl', className)} {...props}>
            {children || href.toString()}
        </NextLink>
    );
}
  
export const P = ({children, className='', ...props}: {children:React.ReactNode, className?:string}) => {
    return (
        <p className={twMerge('mb-6 text-xl font-gentona text-justify', className)} {...props}>
            {children}
        </p>
    );
}

export const Caption = ({children, className='', ...props}: {children:React.ReactNode, className?:string}) => {
    return (
        <p className={twMerge('w-full my-4 text-xl font-gentona text-center', className)} {...props}>
            {children}
        </p>
    );
}


export const UL = ({children, className='', ...props}: {children:React.ReactNode, className?:string}) => {
    return (
        <ul className={twMerge('list-disc mb-6 pl-10 text-xl font-gentona', className)} {...props}>
            {children}
        </ul>
    );
}

export const OL = ({children, className='', ...props}: {children:React.ReactNode, className?:string}) => {
    return (
        <ol className={twMerge('list-decimal mb-6 pl-10 text-xl font-gentona', className)} {...props}>
            {children}
        </ol>
    );
}


//TODO: make this use a firefox-looking scrollbar for non-firefox browsers
export const HorizontalScroll = ({className='', children}:{className?:string, children:React.ReactNode}):JSX.Element => {
    return (
        <div className={twMerge("flex flex-row overflow-y-hidden overflow-x-auto", className)}> {/* hide-h-scrollbar */}
            {children}
        </div>
    )
}