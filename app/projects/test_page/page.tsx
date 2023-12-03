"use client";
import { useState } from "react";
import CodeMirror, { ViewUpdate } from '@uiw/react-codemirror';
import { createTheme } from '@uiw/codemirror-themes';
import { tags as t } from '@lezer/highlight';


const Page = (): JSX.Element => {
    const [text, setText] = useState('');
    return (
        <>
            <div>
                <CodeMirror
                    theme={myTheme}
                    value={text}
                    onChange={(value:string, viewUpdate:ViewUpdate)=>{setText(value)}}
                    extensions={[myLanguage]}
                />
            </div>
        </>
    );
}


import { StreamLanguage, StringStream } from "@codemirror/language";

const myLanguageParser = {
  token: (stream:StringStream) => {
    if (stream.match("keyword")) {
      return "keyword"; // Token type for the keyword
    }

    while (!stream.eol() && !stream.match("keyword", false)) {
      stream.next(); // Move to the next character
    }

    return "comment"; // Token type for comments
  }
};

export const myLanguage = StreamLanguage.define(myLanguageParser);


const myTheme = createTheme({
    theme: 'light',
    settings: {
      background: '#ffffff',
      backgroundImage: '',
      foreground: '#4D4D4C',
      caret: '#AEAFAD',
      selection: '#D6D6D6',
      selectionMatch: '#D6D6D6',
      gutterBackground: '#FFFFFF',
      gutterForeground: '#4D4D4C',
      gutterBorder: '#dddddd',
      gutterActiveForeground: '',
      lineHighlight: '#EFEFEF',
    },
    styles: [
      { tag: t.comment, color: '#787b80' },
      { tag: t.definition(t.typeName), color: '#194a7b' },
      { tag: t.typeName, color: '#194a7b' },
      { tag: t.tagName, color: '#008a02' },
      { tag: t.variableName, color: '#1a00db' },
      { tag: t.keyword, color: '#ff0000' },
    ],
  });
  




export default Page;