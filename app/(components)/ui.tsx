
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



// TODO: move to components/utilities
export const Container = ({children}:{children:React.ReactNode}) => {
    return (
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-[1048px]">
          {children}
        </div>
    );
};