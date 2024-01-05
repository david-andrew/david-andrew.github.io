import { LanguageSupport } from '@codemirror/language'
import { StreamLanguage } from '@codemirror/language'
import { createTheme } from '@uiw/codemirror-themes'
import { tags as t } from '@lezer/highlight'
import { Token, get_lang_support, match_fn, parse_lang } from './syntax'

type TokenizerState = {
    tokens: Token[]
    index: number
    block_comment_open_depth: number // = 0 //external state to allow parsing multiline comments in a line-by-line fashion
    //TODO: other state
}

const get_default_tokenizer_state: () => TokenizerState = () => {
    return { tokens: [], index: 0, block_comment_open_depth: 0 }
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
        state.block_comment_open_depth += 1
        i = 2
    }

    if (state.block_comment_open_depth == 0) {
        return undefined
    }

    while (state.block_comment_open_depth > 0 && i < s.length) {
        if (s.startsWith('/{', i)) {
            state.block_comment_open_depth++
            i += 2
            continue
        }
        if (s.startsWith('}/', i)) {
            state.block_comment_open_depth--
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
