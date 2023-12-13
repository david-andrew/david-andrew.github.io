"use client";
import { H4 } from "@/app/(components)/ui";
import { CodeEditor } from "@/app/(components)/syntax";
import { dewy_meta_lang, dewy_meta_theme } from "@/app/(components)/syntax_dewy_meta";
import { useState, useEffect, useRef, useCallback } from "react";
import { twMerge } from "tailwind-merge";


//hook for managing strings output from the dewy parser process
export const useStringBuffer = (): [string | undefined, (chunk: string) => void, () => void, () => void] => {
    const bufferRef = useRef<string[]>()
    const [output, setOutput] = useState<string | undefined>()

    //add a chunk to the buffer
    const addChunk = (chunk: string): void => {
        if (bufferRef.current === undefined) {
            bufferRef.current = []
        }
        bufferRef.current.push(chunk)
    }

    //call when done reading input to turn on the output string
    const flushBuffer = (): void => {
        //combine every chunk into a single big string
        setOutput(bufferRef.current?.join('\n'))
    }

    //reset everything to initial
    const reset = (): void => {
        bufferRef.current = undefined
        setOutput(undefined)
    }

    return [output, addChunk, flushBuffer, reset]
}


export type ParserOutput = {
    metascanner?: string,
    metaast?: string,
    metaparser?: string,
    grammarFirsts?: string,
    grammarItems?: string,
    table?: string,
    result?: string,
    forest?: string,
    grammarError?: string,
    // parseFailed: boolean
}

const ParserOutputPrettyMap: Record<string, keyof ParserOutput> = {
    'Parse Forest': 'forest',
    'RNGLR Table': 'table',
    'Item Sets': 'grammarItems',
    'Meta Scanner': 'metascanner',
    'Meta AST': 'metaast',
    'CFG': 'metaparser',
    'First Sets': 'grammarFirsts',
}
const parserOutputPrettyKeys = Object.keys(ParserOutputPrettyMap)
const parserOutputPrettyValues = parserOutputPrettyKeys.map((key) => ParserOutputPrettyMap[key])

const splitParserOutput = (raw?: string): ParserOutput | undefined => {
    if (raw === undefined) {
        return undefined
    }
    const endArrows = '<<<<<<<<<<<<'
    const [metascanner, metaast, metaparser, grammar, table, result, forest] = raw.split(`${endArrows}`) as (string | undefined)[]
    const [grammarFirsts, grammarItems] = grammar?.split('itemsets:\n') ?? [undefined, undefined]

    const grammarErrorIndex = raw.indexOf('ERROR: ')
    const grammarError = grammarErrorIndex >= 0 ? raw.slice(grammarErrorIndex) : undefined
    const parseError = (result?.indexOf('failure') ?? -1) >= 0

    return {
        metascanner: metascanner?.trimEnd(),
        metaast: metaast?.trimEnd(),
        metaparser: metaparser?.trimEnd(),
        grammarFirsts: grammarFirsts?.slice('first sets:\n'.length).trimEnd(),
        grammarItems: grammarItems?.trimEnd(),
        table: table?.trimEnd(),
        result: result?.trimEnd(),
        forest: parseError ? 'Parse failed' : forest?.trimEnd(),
        grammarError,
    }
}


//module for wasm is loaded by attaching a script element to the dom
declare const Module: any;
type WasmModule = {
    cwrap: (name: string, returnType: string, argTypes: string[]) => any;
};

//hook for managing dewy parser web assembly
//normally you would be able to load the wasm once, and then call the cwrapped function over and over
//but that caused the parser to crash, so the hacky fix is to just reload the whole wasm module every time
const useDewyWasm = (grammar_source: string, input_source: string): ParserOutput | undefined => {
    const [rawParserOutput, addParserChunk, flushParserOutput, resetParserOutput] = useStringBuffer()
    
    let scriptRef = useRef<HTMLScriptElement | null>(null);

    const initializeWasmModule = useCallback(async () => {
        const basePath = '/wasm/dewy_old/dewy_parser_wrapper'
        const scriptPath = `${basePath}.js`;
        const wasmPath = `${basePath}.wasm`;

        try {
            // Check if the .js and .wasm files exist
            const scriptResponse = await fetch(scriptPath);
            const wasmResponse = await fetch(wasmPath);
            if (!scriptResponse.ok || !wasmResponse.ok) {
                throw new Error(`Failed to find script or WASM file at ${basePath}`);
            }

            // Create and append script element
            scriptRef.current = document.createElement('script');
            scriptRef.current.src = scriptPath;
            scriptRef.current.async = true;
            scriptRef.current.onload = () => {
                Module({
                    onRuntimeInitialized: () => {
                        console.log("onRuntimeInitialized");
                    },
                    print: addParserChunk
                }).then((module: WasmModule) => {
                    const dewy_parser = module.cwrap('dewy_parser', 'void', ['string', 'string'])
                    try {
                        dewy_parser(grammar_source, input_source);
                    } catch (err) {
                        console.error(err);
                    } finally {
                        flushParserOutput()
                    }
                });
            };
            document.body.appendChild(scriptRef.current);
        } catch (err) {
            console.error(err);
            flushParserOutput();
        }
    }, [grammar_source, input_source]);

    useEffect(() => {
        initializeWasmModule();

        return () => {
            // Cleanup script on unmount
            if (scriptRef.current) {
                document.body.removeChild(scriptRef.current);
                scriptRef.current = null;
            }
            resetParserOutput()
        }
    }, [grammar_source, input_source])


    const parserOutput = rawParserOutput ? splitParserOutput(rawParserOutput) : undefined

    return parserOutput
};



//delay updating a string so that the inputs can feel responsive to typing in them, and then when the user stops typing the process is run
export const useDelayed = <T,>(items: T[], delayMs: number = 200): T[] => {
    //text to emit after delay interval
    const [delayedItems, setDelayedItems] = useState<T[]>(items)

    //reference to the handle of the set timeout (so we can cancel if the text changes during the delay)
    const timeoutHandleRef = useRef<number>()

    useEffect(() => {
        //cancel the current timeout if on was in progress
        if (timeoutHandleRef.current !== undefined) {
            window.clearTimeout(timeoutHandleRef.current)
            timeoutHandleRef.current = undefined
        }

        //create a new timeout that sets the text at the end of the delay
        timeoutHandleRef.current = window.setTimeout(() => {
            setDelayedItems(items)
            timeoutHandleRef.current = undefined
        }, delayMs)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [delayMs, ...items])

    return delayedItems
}



export type DemoGrammar = {
    label: string,
    grammar: string,
    source: string,
}


const AutoHeightTextArea = ({text, setText, onFocus, className=''}:{text:string, setText:(s:string)=>void, className?:string, onFocus?:()=>void}): JSX.Element => {
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
            className={twMerge("hide-h-scrollbar overflow-y-hidden font-mono resize-none overflow-x-auto whitespace-pre outline outline-1 outline-[#808080] focus:outline-2 focus:outline-white px-0.5", className)}
            style={{ minHeight: '1em' }} // Minimum height of one line
            value={text}
            spellCheck={false}
            onChange={handleChange}
            onFocus={onFocus}
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
    const [demoStarted, setDemoStarted] = useState(false); //has the user clicked "try me"
    const [outputIdx, setOutputIdx] = useState(0); //which output tab from the parser to show
    const [sourceText, _setSourceText] = useState(grammars[initial_idx].source);
    const [grammarText, _setGrammarText] = useState(grammars[initial_idx].grammar);
    
    //any input to the source or grammar text boxes will start the demo
    const startDemo = () => { if (!demoStarted) { setDemoStarted(true) }}
    const setSourceText = (text:string) => { _setSourceText(text); if (!demoStarted) setDemoStarted(true); }
    const setGrammarText = (text:string) => { _setGrammarText(text); if (!demoStarted) setDemoStarted(true); }

    //run the input through the dewy parser. Put a delay on the input boxes so that the wasm code isn't run too frequently
    const [grammar, source] = useDelayed([grammarText, sourceText])
    const parserOutput = useDewyWasm(grammar, source)

    //determine if there was a parser/grammar error. Only show errors after the user starts the demo
    const parseError = demoStarted && parserOutput?.result === 'failure'
    const grammarError = demoStarted && parserOutput?.grammarError !== undefined
    
    const gap = demoStarted ? 'gap-x-[2%]' : 'gap-x-[5%]';
    const columns = demoStarted ? 'grid-cols-[4fr,0fr,5fr]' : 'grid-cols-[1fr,1fr]';
    return (
        <>
            {/* full desktop version */}
            <div className={twMerge("max-md:hidden grid w-full", gap, columns)}>
                <div className="flex flex-col justify-end">                
                    <H4 className="mt-0">Source Input</H4>
                </div>
                {demoStarted && (<H4 className="mt-0 select-none">&nbsp;</H4>)}
                <div className="flex flex-col justify-end">
                    <H4 className="mt-0">Grammar Specification</H4>
                </div>
                <AutoHeightTextArea className={twMerge("w-full bg-[#232323] text-xl", parseError ? 'outline-[#FF0000] focus:outline-[#FF0000]' : '')} text={sourceText} setText={setSourceText} onFocus={startDemo}/>
                {demoStarted && (
                    <div className="flex whitespace-nowrap font-mono h-min select-none">
                        <span className="text-xl pr-1">&lt;</span>
                        <span className="text-lg outline outline-1 outline-white px-1">edit me</span>
                        <span className="text-xl pl-1">&gt;</span>
                    </div>
                )}
                {/* <AutoHeightTextArea className={twMerge("w-full bg-[#232323] text-xl", grammarError ? 'outline-[#FF0000] focus:outline-[#FF0000]' : '')} text={grammarText} setText={setGrammarText} onFocus={startDemo}/> */}
                <CodeEditor 
                    className={twMerge("w-full bg-[#232323] text-xl hide-h-scrollbar overflow-y-hidden overflow-x-auto", grammarError ? 'outline outline-[#FF0000] focus:outline-[#FF0000]' : '')}
                    language={dewy_meta_lang()}
                    theme={dewy_meta_theme}
                    text={grammarText}
                    setText={setGrammarText}
                    onFocus={startDemo}
                />
            </div>
            
            {/* mobile version */}
            <div className="md:hidden flex flex-col">
                <H4 className="mt-0">Grammar Specification</H4>
                {/* <AutoHeightTextArea className={twMerge("w-full bg-[#232323] text-lg", grammarError ? 'outline-[#FF0000] focus:outline-[#FF0000]' : '')} text={grammarText} setText={setGrammarText} onFocus={startDemo}/> */}
                <CodeEditor 
                    className={twMerge("w-full bg-[#232323] text-lg hide-h-scrollbar overflow-y-hidden overflow-x-auto", grammarError ? 'outline outline-[#FF0000] focus:outline-[#FF0000]' : '')}
                    language={dewy_meta_lang()}
                    theme={dewy_meta_theme}
                    text={grammarText}
                    setText={setGrammarText}
                    onFocus={startDemo}
                />
                <H4>Source Input</H4>
                <AutoHeightTextArea className={twMerge("w-full bg-[#232323] text-lg", parseError ? 'outline-[#FF0000] focus:outline-[#FF0000]' : '')} text={sourceText} setText={setSourceText} onFocus={startDemo}/>
                <div>placeholder</div>
            </div>
            {
                !demoStarted && (
                    <div className="flex flex-col justify-center pt-6">
                        <button className="w-24 h-8 bg-[#232323] text-white rounded-md" onClick={() => setDemoStarted(!demoStarted)}>
                            Try Me
                        </button>
                    </div>
                )
            }
            { demoStarted && (
                <div className="w-full my-6">
                    <Accordion title="Examples">
                        {/* list of buttons, one for each example grammar */}
                        <div className="flex flex-row flex-wrap gap-2">
                            {grammars.map((grammar, idx) => (
                                <button key={idx} className="font-gentona text-2xl px-4 h-[3.5em] whitespace-pre bg-[#232323] hover:bg-[#404040] text-white rounded-md" onClick={() => {
                                    setGrammarText(grammar.grammar);
                                    setSourceText(grammar.source);
                                }}>
                                    {break_into_lines(grammar.label, 22)}
                                </button>
                            ))}
                        </div>
                    </Accordion>
                    <Accordion title="Output" defaultOpen>
                        <div className="flex flex-col w-full">
                            <div className="flex flex-row w-min max-w-full overflow-x-auto rounded-tl-md rounded-tr-md overflow-hidden border border-b-0 border-solid border-[#444444]">
                                {   //buttons across the top for each parser output
                                    parserOutputPrettyKeys.map((key, idx) => (
                                        <button 
                                            key={idx}
                                            className={`
                                                font-gentona text-2xl px-4 h-[3.5em] whitespace-pre 
                                                ${idx !== outputIdx ? 'bg-[#000000] hover:bg-[#232323]' : 'bg-[#232323]'}
                                                text-white 
                                                border border-b-0 border-solid border-[#444444]
                                            `}
                                            onClick={() => {
                                                setOutputIdx(idx);
                                            }}
                                        >
                                            {break_into_lines(key, 22)}
                                        </button>
                                    ))
                                }
                            </div>
                            <div className="w-full bg-[#232323] text-white  rounded-b-md rounded-tr-md overflow-hidden border border-t-0 border-solid border-[#444444]">
                                <div className="whitespace-pre w-full overflow-x-auto p-4 font-mono max-md:text-lg md:text-xl">
                                    {
                                        parserOutput ? parserOutput[parserOutputPrettyValues[outputIdx]] : 'Loading...'
                                    }
                                </div>
                            </div>

                        </div>
                    </Accordion>
                </div>
            )}
        </>
    );
}

const break_into_lines = (text:string, min_line_length:number):string => {
    //if the text is longer than min_line_length
    //break the text into 2 lines by replacing the center-most space with a \n 
    //else return the original text
    if (text.length <= min_line_length) {
        return text;
    
    }
    
    const mid = Math.floor(text.length/2);
    const left_idx = text.indexOf(' ', mid);
    const right_idx = text.lastIndexOf(' ', mid);
    if (left_idx === -1 && right_idx === -1) {
        return text.slice(0, mid) + '-\n-' + text.slice(mid);
    }
    if (left_idx === -1) {
        return text.slice(0, right_idx) + '\n' + text.slice(right_idx+1);
    }
    if (right_idx === -1) {
        return text.slice(0, left_idx) + '\n' + text.slice(left_idx+1);
    }
    const left_len = left_idx - mid;
    const right_len = mid - right_idx;
    if (left_len < right_len) {
        return text.slice(0, left_idx) + '\n' + text.slice(left_idx+1);
    } else {
        return text.slice(0, right_idx) + '\n' + text.slice(right_idx+1);
    }
}
