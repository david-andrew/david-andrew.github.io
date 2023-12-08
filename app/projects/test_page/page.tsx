"use client";
import { useState } from "react";
import { dewy_meta_lang, dewy_meta_theme, CodeEditor } from './syntax'


const Page = (): JSX.Element => {
    const [text, setText] = useState('');
    return (
        <>
            <div>
                {/* <CodeMirror
                    theme={dewy_meta_theme}
                    value={text}
                    onChange={(value:string, viewUpdate:ViewUpdate)=>{setText(value)}}
                    extensions={[dewy_meta_lang]}
                    basicSetup={{lineNumbers: false, foldGutter: false, drawSelection:false}}
                /> */}
                <CodeEditor 
                    theme={dewy_meta_theme}
                    text={text}
                    setText={setText}
                    language={dewy_meta_lang()}
                    // basicSetup={{lineNumbers: false, foldGutter: false, drawSelection:false}}
                />
            </div>
        </>
    );
}



// const myTheme = createTheme({
//     theme: 'light',
//     settings: {
//       background: '#232323',
//     //   backgroundImage: '', //unused?
//     //   foreground: '#4D4D4C', //unused?
//       caret: '#AEAFAD',
//       selection: '#000000',
//       selectionMatch: '#00000000',
//     //   gutterBackground: '#FFFFFF', //unused?
//     //   gutterForeground: '#4D4D4C', //unused?
//     //   gutterBorder: '#dddddd', //unused?
//     //   gutterActiveForeground: '', //unused?
//       lineHighlight: '#333333',
//     },
//     styles: [
//       { tag: t.comment, color: '#787b80' },
//       { tag: t.definition(t.typeName), color: '#194a7b' },
//       { tag: t.typeName, color: '#194a7b' },
//       { tag: t.tagName, color: '#008a02' },
//       { tag: t.variableName, color: '#1a00db' },
//       { tag: t.keyword, color: '#ff0000' },
//     ],
//   });

// const myTheme = createTheme({
//     theme: 'dark',
//     settings: {
//       background: '#ffffff',
//       backgroundImage: '',
//       foreground: '#4d4d4c',
//       caret: '#aeafad',
//       selection: '#d6d6d6',
//       selectionMatch: '#d6d6d6',
//       gutterBackground: '#ffffff',
//       gutterForeground: '#4d4d4c',
//       gutterBorder: '#dddddd',
//       gutterActiveForeground: '#000000',
//       lineHighlight: '#efefef',
//     },
//     styles: [
//       { tag: t.comment, color: '#787b80' },
//       { tag: t.lineComment, color: '#000000' },
//       { tag: t.blockComment, color: '#000000' },
//       { tag: t.docComment, color: '#000000' },
//       { tag: t.name, color: '#000000' },
//       { tag: t.definition(t.typeName), color: '#194a7b' },
//       { tag: t.typeName, color: '#194a7b' },
//       { tag: t.standard(t.typeName), color: '#194a7b' },
//       { tag: t.tagName, color: '#008a02' },
//       { tag: t.standard(t.tagName), color: '#000000' },
//       { tag: t.variableName, color: '#1a00db' },
//       { tag: t.definition(t.variableName), color: '#000000' },
//       { tag: t.function(t.variableName), color: '#000000' },
//       { tag: t.propertyName, color: '#000000' },
//       { tag: t.function(t.propertyName), color: '#000000' },
//       { tag: t.definition(t.propertyName), color: '#000000' },
//       { tag: t.special(t.propertyName), color: '#000000' },
//       { tag: t.attributeName, color: '#000000' },
//       { tag: t.className, color: '#000000' },
//       { tag: t.constant(t.className), color: '#000000' },
//       { tag: t.labelName, color: '#000000' },
//       { tag: t.namespace, color: '#000000' },
//       { tag: t.macroName, color: '#000000' },
//       { tag: t.literal, color: '#000000' },
//       { tag: t.string, color: '#000000' },
//       { tag: t.special(t.string), color: '#000000' },
//       { tag: t.docString, color: '#000000' },
//       { tag: t.character, color: '#000000' },
//       { tag: t.attributeValue, color: '#000000' },
//       { tag: t.number, color: '#000000' },
//       { tag: t.integer, color: '#000000' },
//       { tag: t.float, color: '#000000' },
//       { tag: t.bool, color: '#000000' },
//       { tag: t.regexp, color: '#000000' },
//       { tag: t.escape, color: '#000000' },
//       { tag: t.color, color: '#000000' },
//       { tag: t.url, color: '#000000' },
//       { tag: t.keyword, color: '#00FF00' },
//       { tag: t.self, color: '#000000' },
//       { tag: t.null, color: '#000000' },
//       { tag: t.atom, color: '#000000' },
//       { tag: t.unit, color: '#000000' },
//       { tag: t.modifier, color: '#000000' },
//       { tag: t.operatorKeyword, color: '#000000' },
//       { tag: t.controlKeyword, color: '#000000' },
//       { tag: t.definitionKeyword, color: '#000000' },
//       { tag: t.moduleKeyword, color: '#000000' },
//       { tag: t.operator, color: '#000000' },
//       { tag: t.derefOperator, color: '#000000' },
//       { tag: t.arithmeticOperator, color: '#000000' },
//       { tag: t.logicOperator, color: '#000000' },
//       { tag: t.bitwiseOperator, color: '#000000' },
//       { tag: t.compareOperator, color: '#000000' },
//       { tag: t.updateOperator, color: '#000000' },
//       { tag: t.definitionOperator, color: '#000000' },
//       { tag: t.typeOperator, color: '#000000' },
//       { tag: t.controlOperator, color: '#000000' },
//       { tag: t.punctuation, color: '#000000' },
//       { tag: t.separator, color: '#000000' },
//       { tag: t.bracket, color: '#000000' },
//       { tag: t.angleBracket, color: '#000000' },
//       { tag: t.squareBracket, color: '#000000' },
//       { tag: t.paren, color: '#000000' },
//       { tag: t.brace, color: '#000000' },
//       { tag: t.content, color: '#000000' },
//       { tag: t.heading, color: '#000000' },
//       { tag: t.heading1, color: '#000000' },
//       { tag: t.heading2, color: '#000000' },
//       { tag: t.heading3, color: '#000000' },
//       { tag: t.heading4, color: '#000000' },
//       { tag: t.heading5, color: '#000000' },
//       { tag: t.heading6, color: '#000000' },
//       { tag: t.contentSeparator, color: '#000000' },
//       { tag: t.list, color: '#000000' },
//       { tag: t.quote, color: '#000000' },
//       { tag: t.emphasis, color: '#000000' },
//       { tag: t.strong, color: '#000000' },
//       { tag: t.link, color: '#000000' },
//       { tag: t.monospace, color: '#000000' },
//       { tag: t.strikethrough, color: '#000000' },
//       { tag: t.inserted, color: '#000000' },
//       { tag: t.deleted, color: '#000000' },
//       { tag: t.changed, color: '#000000' },
//       { tag: t.invalid, color: '#000000' },
//       { tag: t.meta, color: '#000000' },
//       { tag: t.documentMeta, color: '#000000' },
//       { tag: t.annotation, color: '#000000' },
//       { tag: t.processingInstruction, color: '#000000' },
//     ],
//   });




export default Page;