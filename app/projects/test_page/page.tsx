"use client";
import { useState } from "react";
import { CodeEditor } from './syntax'
import { dewy_meta_lang, dewy_meta_theme } from "./dewy_meta";

const Page = (): JSX.Element => {
    const [text, setText] = useState('');
    return (
        <>
            <div>
                <CodeEditor 
                    theme={dewy_meta_theme}
                    text={text}
                    setText={setText}
                    language={dewy_meta_lang()}
                />
            </div>
        </>
    );
}


export default Page;