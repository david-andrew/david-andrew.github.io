import { LanguageSupport } from '@codemirror/language'
import { StreamLanguage } from '@codemirror/language'
import { createTheme } from '@uiw/codemirror-themes'
import { tags as t } from '@lezer/highlight'
import { Token, get_lang_support, match_fn, parse_lang } from './syntax'

// any (dewy) token that can span multiple lines
type Context = 'block_comment' | 'block' | 'string'

type TokenizerState = {
    tokens: Token[]
    index: number
    context_stack: Context[]
}

const get_default_tokenizer_state: () => TokenizerState = () => {
    return { tokens: [], index: 0, context_stack: ['block'] }
}

//#line_comment = '/\/' '\n'~* / '\n'~;                       // single line comment
const match_line_comment = (s: string, state: TokenizerState): Token | undefined => {
    if (s.startsWith('//')) {
        let i = 2
        while (i < s.length && s[i] != '\n') {
            i++
        }
        return { type: 'comment', start: 0, end: i }
    }
    return undefined
}

// block comment starts with /{ and ends with }/, and is allowed to contain nested block comments (all a single comment)
const match_block_comment = (s: string, state: TokenizerState): Token | undefined => {
    let i = 0
    if (s.startsWith('/{')) {
        state.context_stack.push('block_comment')
        i = 2
    }

    if (state.context_stack.at(-1) !== 'block_comment') {
        return undefined
    }

    while (state.context_stack.at(-1) === 'block_comment' && i < s.length) {
        if (s.startsWith('/{', i)) {
            // state.block_comment_open_depth++
            state.context_stack.push('block_comment')
            i += 2
            continue
        }
        if (s.startsWith('}/', i)) {
            // state.block_comment_open_depth--
            state.context_stack.pop()
            i += 2
            continue
        }
        i++
    }

    return { type: 'comment', start: 0, end: i }
}

//#escape = '\\' ξ;                                           // an escape character. Recognized escaped characters are \n \r \t \v \b \f \a.
//                                                            // all others just put the second character literally. Common literals include \\ \' \" \[ \] \-
const match_escape = (s: string, state: TokenizerState): Token | undefined => {
    if (s.startsWith('\\')) {
        if (s[1] == 'n' || s[1] == 'r' || s[1] == 't' || s[1] == 'v' || s[1] == 'b' || s[1] == 'f' || s[1] == 'a') {
            return { type: 'escape', start: 0, end: 2 }
        }
        return { type: 'escape', start: 0, end: 2 }
    }
    return undefined
}

const matchers: match_fn<TokenizerState>[] = [
    match_block_comment,
    match_line_comment,
    //add more
]

const parse_dewy_lang = (code: string, state: TokenizerState): Token[] => parse_lang(code, state, matchers)
export const dewy_lang = get_lang_support(parse_dewy_lang, get_default_tokenizer_state)

export const dewy_theme = createTheme({
    theme: 'light',
    settings: {
        background: '#232323',
        caret: '#AEAFAD',
        selection: '#356282',
        selectionMatch: '#00ff00', //'#00000000', //don't highlight matches
        lineHighlight: '#333333',
    },
    styles: [
        { tag: t.comment, color: '#787b80' }, //comments
        { tag: t.literal, color: '#ce9178' }, //string and charset characters
        { tag: t.bracket, color: '#179fff' }, //brackets
        { tag: t.escape, color: '#d7ba7d' }, //escape character
        { tag: t.number, color: '#b5cea8' }, //number
        { tag: t.tagName, color: '#9cdcfe' }, //hashtag

        //colors tbd
        { tag: t.null, color: '#00ff00' }, //epsilon
        { tag: t.unit, color: '#ff00ff' }, //anyset
        { tag: t.paren, color: '#ffd700' }, //parenthesis
        { tag: t.operator, color: '#ffffff' }, //binary operators (= + - / >)
        { tag: t.punctuation, color: '#ffffff' }, //semicolon
        { tag: t.logicOperator, color: '#d44c4c' }, //unary operators

        { tag: t.invalid, color: '#ff0000' }, //errors
    ],
})
