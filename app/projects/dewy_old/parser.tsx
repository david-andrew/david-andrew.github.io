"use client";
import { H4 } from "@/app/(components)/ui";
import { assert } from "console";
import { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";
import { twMerge } from "tailwind-merge";

export type DemoGrammar = {
    label: string,
    grammar: string,
    source: string,
}


const AutoHeightTextArea = ({text, setText, className=''}:{text:string, setText:Dispatch<SetStateAction<string>>, className?:string}): JSX.Element => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
  
    // Function to update textarea height
    const updateHeight = () => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = '0px'; // Reset height to shrink on delete
            const scrollHeight = textAreaRef.current.scrollHeight;
            textAreaRef.current.style.height = scrollHeight + 'px';
        }
    };

    useEffect(() => {
        updateHeight();

        // Update height whenever window is resized
        window.addEventListener('resize', updateHeight);
        return () => window.removeEventListener('resize', updateHeight);
    }, [text]);
  
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);
    };
  
    return (
        <textarea
            ref={textAreaRef}
            className={twMerge("font-mono resize-none overflow-x-scroll whitespace-pre outline outline-1 outline-[#808080] focus:outline-2 focus:outline-white px-0.5", className)} // Set fixed width and horizontal scroll
            style={{ minHeight: '1em' }} // Minimum height of one line
            value={text}
            spellCheck={false}
            onChange={handleChange}
        />
    );
};



const Accordion = ({ title, children, defaultOpen=false }:{title?:string, children:React.ReactNode, defaultOpen?:boolean}) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    const rotation = isOpen ? '' : '-rotate-90';

    return (
        <div className="my-2">
            <button
                className="flex items-center w-full text-left"
                onClick={() => setIsOpen(!isOpen)}
            >
                <svg
                    className={twMerge('h-4 w-4 mr-2 transform transition-transform', rotation)}
                    fill="currentColor"
                    viewBox="0 0 96.154 96.154"
                >
                    <path d="M0.561,20.971l45.951,57.605c0.76,0.951,2.367,0.951,3.127,0l45.956-57.609c0.547-0.689,0.709-1.716,0.414-2.61
                            c-0.061-0.187-0.129-0.33-0.186-0.437c-0.351-0.65-1.025-1.056-1.765-1.056H2.093c-0.736,0-1.414,0.405-1.762,1.056
                            c-0.059,0.109-0.127,0.253-0.184,0.426C-0.15,19.251,0.011,20.28,0.561,20.971z" />
                </svg>
                <span className="font-quadon text-xl">{title}</span>
            </button>
            {isOpen && <div className="py-2">{children}</div>}
        </div>
    );
};





export const DewyLiveParser = ({grammars, initial_idx=0}:{grammars:DemoGrammar[], initial_idx?:number}) => {
    if (grammars.length < initial_idx) {
        throw new Error(`initial_idx must be less than the number of grammars. initial_idx: ${initial_idx}, grammars.length: ${grammars.length}`);
    }
    const [started, setStarted] = useState(false);
    const [sourceText, setSourceText] = useState(grammars[initial_idx].source);
    const [grammarText, setGrammarText] = useState(grammars[initial_idx].grammar);


    const gap = started ? 'gap-x-[2%]' : 'gap-x-[5%]';
    const columns = started ? 'grid-cols-[4fr,0fr,5fr]' : 'grid-cols-[1fr,1fr]';
    return (
        <>
            {/* full desktop version */}
            <div className={twMerge("max-md:hidden grid w-full", gap, columns)}>
                <div className="flex flex-col justify-end">                
                    <H4 className="mt-0">Source Input</H4>
                </div>
                {started && (<H4 className="mt-0 select-none">&nbsp;</H4>)}
                <div className="flex flex-col justify-end">
                    <H4 className="mt-0">Grammar Specification</H4>
                </div>
                <AutoHeightTextArea className="w-full bg-[#232323] text-xl" text={sourceText} setText={setSourceText}/>
                {started && (
                    <div className="flex whitespace-nowrap font-mono h-min select-none">
                        <span className="text-xl pr-1">&lt;</span>
                        <span className="text-lg outline outline-1 outline-white px-1">edit me</span>
                        <span className="text-xl pl-1">&gt;</span>
                    </div>
                )}
                <AutoHeightTextArea className="w-full bg-[#232323] text-xl" text={grammarText} setText={setGrammarText}/>
            </div>
            
            {/* mobile version */}
            <div className="md:hidden flex flex-col">
                <H4 className="mt-0">Grammar Specification</H4>
                <AutoHeightTextArea className="w-full bg-[#232323]" text={grammarText} setText={setGrammarText}/>
                <H4>Source Input</H4>
                <AutoHeightTextArea className="w-full bg-[#232323]" text={sourceText} setText={setSourceText}/>
            </div>
            {
                !started && (
                    <div className="flex flex-col justify-center pt-6">
                        <button className="w-24 h-8 bg-[#232323] text-white rounded-md" onClick={() => setStarted(!started)}>
                            Try Me
                        </button>
                    </div>
                )
            }
            { started && (
                <div className="w-full my-6">
                    <Accordion title="Samples">
                        <p>This is the content for section 1</p>
                    </Accordion>
                    <Accordion title="Output" defaultOpen>
                        <p>This is the content for section 2</p>
                    </Accordion>
                </div>
            )}
        </>
    );
}