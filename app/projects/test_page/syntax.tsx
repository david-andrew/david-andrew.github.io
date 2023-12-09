"use client";

import { useCodeMirror, Extension } from "@uiw/react-codemirror";
import { LanguageSupport } from "@codemirror/language";
import { useEffect, useRef } from "react";


export type Token = {
    type: string;
    start: number;
    end: number;
}

export type match_fn = (s:string) => Token|Token[]|undefined;


export type CodeEditorProps = {
    text: string;
    setText: (s: string) => void;
    theme:Extension
    language: LanguageSupport
    className?: string;
};


export const CodeEditor = ({text, setText, theme, language, className}:CodeEditorProps): JSX.Element => {
    const editor = useRef(null);
    const { setContainer } = useCodeMirror({
        container: editor.current,
        theme: theme,
        value: text,
        extensions: [language],
        onChange: (value: string) => {
            setText(value);
        },
        basicSetup: {
            lineNumbers: false,
            foldGutter: false,
            drawSelection: false,
            allowMultipleSelections: false,
            highlightActiveLine: true,
            highlightSelectionMatches: false,
            dropCursor: false,
            indentOnInput: false,
            rectangularSelection: false,
            tabSize: 4,
            closeBracketsKeymap: false,
            searchKeymap: false,
            foldKeymap: false,
            completionKeymap: false,
            lintKeymap: false,
            autocompletion: false,

            // bracketMatching?: boolean;
            // closeBrackets?: boolean;
            // crosshairCursor?: boolean;
        },
    });

    useEffect(() => {
        if (editor.current) {
            setContainer(editor.current);
        }
    });

    return (
        <div className={className}>
            <div ref={editor} />
        </div>
    );
};

