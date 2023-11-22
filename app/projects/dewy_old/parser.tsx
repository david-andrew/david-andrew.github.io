"use client";
import { H4 } from "@/app/(components)/ui";
import { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";
import { twMerge } from "tailwind-merge";

//get DewyParserWrapper from from public/wasm/dewy_parser_wrapper.js
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const DewyParserWrapper = require('./dewy_parser_wrapper.js').default



//hook for managing strings output from the dewy parser process
export const useStringBuffer = (): [string | undefined, (chunk: string) => void, () => void, () => void] => {
    // const [buffer, setBuffer] = useState<string | undefined>()
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

//hook for managing dewy parser web assembly
//normally you would be able to load the wasm once, and then call the cwrapped function over and over
//but that caused the parser to crash, so the hacky fix is to just reload the whole wasm module every time
export const useDewyWasm = (grammar_source: string, input_source: string): ParserOutput | undefined => {
    //promise to the wasm interface module
    const wasmPromiseRef = useRef<Promise<any>>()

    //handling of string output from the parser process
    const [parserOutput, addParserChunk, flushParserOutput, resetParserOutput] = useStringBuffer()

    //handle setting up the wasm module and the function for calling the parser
    useEffect(() => {
        //kick of the loading process for getting the functions, and then call the result
        // wasmPromiseRef.current = DewyParserWrapper({
        //     onRuntimeInitialized: async () => {
        //         //save the function for calling the parser
        //         console.log('wasm runtime initialized')
        //         const wasm: any = await wasmPromiseRef.current
        //         const dewyParser = wasm.cwrap('dewy_parser', 'void', ['string', 'string'])
        //         try {
        //             dewyParser(grammar_source, input_source)
        //         } catch {
        //         } finally {
        //             flushParserOutput()
        //         }
        //     },
        //     //override the module's code for locating the wasm binary
        //     /* eslint-disable @typescript-eslint/no-var-requires */
        //     locateFile: () => require('./dewy_parser_wrapper.wasm').default,
        //     //override the print function to write to our custom buffer
        //     print: (text: string) => {
        //         addParserChunk(text)
        //         // console.log(`pushing chunk: ${text}`)
        //     },
        // })

        //clean up at the end of every render
        return (): void => {
            resetParserOutput()
        }
    }, [grammar_source, input_source])

    //return the parser output as a single string
    return splitParserOutput(parserOutput)
}

//delay updating a string so that the inputs can feel responsive to typing in them, and then when the user stops typing the process is run
export const useDelayed = <T,>(items: T[], delayMs: number = 200): T[] => {
    //text to emit after delay interval
    const [delayedItem, setDelayedItem] = useState<T[]>(items)

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
            console.log('setting item', items)
            setDelayedItem(items)
            timeoutHandleRef.current = undefined
        }, delayMs)
    }, [...items])

    return delayedItem
}



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
            className={twMerge("hide-h-scrollbar overflow-y-hidden font-mono resize-none overflow-x-auto whitespace-pre outline outline-1 outline-[#808080] focus:outline-2 focus:outline-white px-0.5", className)}
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
    const [outputIdx, setOutputIdx] = useState(0);


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
                                <div className="whitespace-pre w-full overflow-x-auto p-4 font-mono text-xl">
                                    {
`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ac faucibus nisi. Aliquam tempus augue ut leo mattis posuere. Ut ac nunc nec massa efficitur tincidunt. Sed sed eros a metus gravida hendrerit at in arcu. Nullam at felis ac risus venenatis tempor. Duis mollis turpis quis tortor aliquam, non hendrerit ligula ornare. Mauris eu elit nisi. Phasellus ut venenatis nunc. Etiam condimentum interdum justo, sed efficitur risus lobortis at. Morbi eget erat erat. Aliquam tempus non metus at sodales. Fusce non aliquet lacus. Aliquam accumsan sed turpis sed pellentesque.

Suspendisse potenti. Aliquam erat volutpat. Duis nec mi eget lacus consequat euismod. Praesent vel libero a massa vehicula congue. Curabitur in felis ullamcorper, varius urna vel, efficitur nulla. Proin tempus volutpat lacus, in vulputate eros pellentesque eget. Ut tincidunt ante eget augue iaculis suscipit. Pellentesque sagittis, erat at varius aliquet, mi nisl cursus ex, vitae hendrerit massa lorem et diam. Sed euismod feugiat risus, a fermentum augue luctus sed. Morbi viverra, quam in mattis iaculis, dolor ligula mattis dui, a aliquet purus sem eu nisi. Duis aliquet mi dolor, vestibulum rhoncus lorem viverra sed. Nam mollis id velit at sollicitudin. Donec non luctus magna, non fermentum velit. Aenean orci leo, fermentum sit amet tincidunt eget, finibus sed orci. Integer nec malesuada sem. Nulla eget nisi orci.

Aliquam erat volutpat. Praesent tincidunt est sit amet vehicula maximus. Nam eu mattis sem, in tempus risus. Nullam laoreet, sapien accumsan suscipit mattis, sapien nulla laoreet nisi, ac ornare leo risus ac leo. Nunc elit ante, vestibulum in eros et, gravida ornare diam. Praesent tempus tincidunt mauris eget commodo. Nam consequat orci arcu, vel lobortis mi viverra venenatis. Integer tempor dui vitae nibh sodales, quis ultricies lectus hendrerit. Nam eget pharetra libero. Sed finibus lorem id erat hendrerit, ornare laoreet nunc facilisis. Pellentesque porttitor, purus at maximus consectetur, turpis enim luctus turpis, eget mattis nisl ligula placerat ex. Pellentesque mauris est, cursus vel libero quis, consectetur eleifend massa. Pellentesque condimentum, nisi et facilisis convallis, ipsum ex consequat eros, non feugiat odio felis sollicitudin tortor. Quisque ut odio volutpat, ullamcorper ante et, pellentesque eros. Donec ultrices metus ut libero blandit lacinia.

Donec sit amet dictum dui. In eget molestie mi, viverra pellentesque nibh. Donec maximus scelerisque orci non interdum. Maecenas vestibulum tempus metus ut auctor. Aliquam quam ex, ullamcorper nec bibendum hendrerit, dignissim vitae justo. Donec tempus at tortor vel auctor. Curabitur sit amet egestas arcu, in dapibus erat. Sed nibh ex, ultrices eget porta id, pharetra et ipsum. Proin tellus elit, pellentesque eu faucibus eleifend, aliquet placerat elit. Cras vestibulum dignissim risus, non semper velit.

Curabitur vel sem vel leo auctor blandit at at mauris. Vivamus ullamcorper dui tempus, mollis eros eu, efficitur velit. Fusce quis congue justo. Suspendisse vitae orci nec eros efficitur placerat eu ac lectus. Morbi aliquam pharetra arcu interdum tempus. Aliquam imperdiet finibus aliquet. Maecenas scelerisque vehicula tellus, quis fermentum nisl cursus pharetra. Mauris eu lobortis sapien. Mauris ac bibendum sem, sed egestas elit. Morbi auctor nec diam ac pretium. Sed sodales vel turpis nec malesuada.`
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
