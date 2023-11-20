import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { twMerge } from 'tailwind-merge';

interface DropdownProps<T extends string> {
    text: string;
    selected?: T;
    options: readonly T[];
    inverted?: boolean;
    onClick?: (selectedOption: T) => void;
    className?: string;
}

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export const Dropdown = <T extends string>({ text, selected, options, inverted, onClick, className  }: DropdownProps<T>): JSX.Element => {
    return (
        <Menu as="div" className={twMerge('relative inline-block text-left', className)}>
            <div>
                <Menu.Button className={`inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-md font-semibold shadow-sm ring-1 ring-inset 
                    ${inverted ? 
                        "bg-black text-white ring-white hover:bg-gray-900" : 
                        "bg-white text-gray-900 ring-gray-300 hover:bg-gray-50"
                    }
                `}>
                    {text}{selected && `: ${selected}`}
                    <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className={`absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md shadow-lg ring-1 ring-opacity-70 focus:outline-none
                    ${inverted ? 
                        "bg-black ring-white" : 
                        "bg-white ring-black"
                    }
                `}>
                    <div className="py-1">
                        {options.map((option, index) => (
                            <Menu.Item key={index}>
                                {({ active }) => (
                                    <button
                                        onClick={() => onClick && onClick(option)}
                                        className={classNames(
                                            inverted ?
                                                (active ? 'bg-gray-600 text-white' : 'text-white') :
                                                (active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'),
                                            'block w-full px-4 py-2 text-left text-md'
                                        )}
                                    >
                                        {option}
                                    </button>
                                )}
                            </Menu.Item>
                        ))}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}
