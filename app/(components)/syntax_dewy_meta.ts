import { LanguageSupport } from '@codemirror/language'
import { StreamLanguage } from '@codemirror/language'
import { createTheme } from '@uiw/codemirror-themes'
import { tags as t } from '@lezer/highlight'
import { Token, match_fn } from './syntax'

//#eps = 'ϵ' | '\\e' | "''" | '""' | "{}";                    // ϵ, \e, '', "", or {} indicates empty element, i.e. nullable
const match_eps = (s: string): Token | undefined => {
    //determine if s starts with an eps token
    if (s.startsWith('ϵ')) {
        return { type: 'null', start: 0, end: 1 }
    } else if (s.startsWith('\\e') || s.startsWith("''") || s.startsWith('""') || s.startsWith('{}')) {
        return { type: 'null', start: 0, end: 2 }
    }
    return undefined
}

//#anyset = '\\' [uUxX] | [VUξ];                              // V, U, ξ, \U, \u, \X, or \x used to indicate any unicode character
const match_anyset = (s: string): Token | undefined => {
    //determine if s starts with an anyset token
    if (s.startsWith('\\u') || s.startsWith('\\U') || s.startsWith('\\x') || s.startsWith('\\X')) {
        return { type: 'unit', start: 0, end: 2 }
    }
    if (s.startsWith('V') || s.startsWith('U') || s.startsWith('ξ')) {
        return { type: 'unit', start: 0, end: 1 }
    }
    return undefined
}

//#line_comment = '/\/' '\n'~* / '\n'~;                       // single line comment
const match_line_comment = (s: string): Token | undefined => {
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
let block_comment_open_depth: number = 0 //external state to allow parsing multiline comments in a line-by-line fashion
const match_block_comment = (s: string): Token | undefined => {
    let i = 0
    if (s.startsWith('/{')) {
        block_comment_open_depth += 1
        i = 2
    }

    if (block_comment_open_depth == 0) {
        return undefined
    }

    while (block_comment_open_depth > 0 && i < s.length) {
        if (s.startsWith('/{', i)) {
            block_comment_open_depth++
            i += 2
            continue
        }
        if (s.startsWith('}/', i)) {
            block_comment_open_depth--
            i += 2
            continue
        }
        i++
    }

    return { type: 'comment', start: 0, end: i }
}

//#number = [0-9]+ / [0-9];                                   // decimal number literal. Used to indicate # of repetitions
const match_number = (s: string): Token | undefined => {
    let i = 0
    while (i < s.length && /[0-9]/.test(s[i])) {
        i++
    }

    if (i > 0) {
        return { type: 'number', start: 0, end: i }
    }

    return undefined
}

//#hex = '\\' [uUxX] [0-9a-fA-F]+ / [0-9a-fA-F];              // hex number literal. Basically skipping the number part makes it #any
const match_hex = (s: string): Token | undefined => {
    if (s.startsWith('\\u') || s.startsWith('\\U') || s.startsWith('\\x') || s.startsWith('\\X')) {
        let i = 2
        while (i < s.length && /[0-9a-fA-F]/.test(s[i])) {
            i++
        }
        return { type: 'number', start: 0, end: i }
    }
    return undefined
}

//#escape = '\\' ξ;                                           // an escape character. Recognized escaped characters are \n \r \t \v \b \f \a.
//                                                            // all others just put the second character literally. Common literals include \\ \' \" \[ \] \-
const match_escape = (s: string): Token | undefined => {
    if (s.startsWith('\\')) {
        if (s[1] == 'n' || s[1] == 'r' || s[1] == 't' || s[1] == 'v' || s[1] == 'b' || s[1] == 'f' || s[1] == 'a') {
            return { type: 'escape', start: 0, end: 2 }
        }
        return { type: 'escape', start: 0, end: 2 }
    }
    return undefined
}

//#charsetchar = ξ - [\-\[\]] - #wschar;                      // characters allowed in a set are any unicode excluding '-', '[', or ']', and whitespace
//#item = #charsetchar | #escape | #hex;                      // items that make up character sets, i.e. raw chars, escape chars, or hex chars
//#charset = '[' (#ws #item (#ws '-' #ws #item)? #ws)+ ']';   // set of chars specified literally. Whitespace is ignored, and must be escaped.
const match_charset = (s: string): Token[] | undefined => {
    if (s.startsWith('[')) {
        let tokens: Token[] = [{ type: 'bracket', start: 0, end: 1 }]
        let i = 1
        while (i < s.length) {
            let token

            if (s[i] == '\n' || s[i] == '\x20') {
                i++
                continue
            }

            token = match_hex(s.slice(i))
            if (token) {
                token.start += i
                token.end += i
                tokens.push(token)
                i = token.end
                continue
            }

            token = match_escape(s.slice(i))
            if (token) {
                token.start += i
                token.end += i
                tokens.push(token)
                i = token.end
                continue
            }

            if (s[i] == '-') {
                tokens.push({ type: 'operator', start: i, end: i + 1 })
                i++
                continue
            }

            if (s[i] == '[') {
                tokens.push({ type: 'invalid', start: i, end: i + 1 })
                i++
            }

            if (s[i] == ']') {
                tokens.push({ type: 'bracket', start: i, end: i + 1 })
                return tokens
            }

            tokens.push({ type: 'literal', start: i, end: i + 1 })
            i++
        }
        return undefined
    }

    return undefined
}

// #char = '"' (ξ - '"' | #escape | #hex) '"';                 // "" single character
// #char = "'" (ξ - "'" | #escape | #hex) "'";                 // '' single character
// #caseless_char = "{" (ξ - [{}] | #escape | #hex) "}";       // {} single character where case is ignored
// #string = '"' (ξ - '"' | #escape | #hex)2+ '"';             // "" string of 2+ characters
// #string = "'" (ξ - "'" | #escape | #hex)2+ "'";             // '' string of 2+ characters
// #caseless_string = "{" (ξ - [{}] | #escape | #hex)2+ "}";   // {} string of 2+ characters where case is ignored for each character
const string_delimiter_pair_map = { '"': '"', "'": "'", '{': '}' }
const match_string = (s: string): Token[] | undefined => {
    if (s.length <= 2) {
        return undefined
    }

    let initial = s[0]
    if (!(initial == '"' || initial == "'" || initial == '{')) {
        return undefined
    }

    let closer = string_delimiter_pair_map[initial]
    // if (s[1] == closer) {
    //     return [{type: "eps", start: 0, end: 2}];
    // }

    let i = 1
    let tokens: Token[] = [{ type: 'literal', start: 0, end: 1 }]
    let token: Token | undefined
    while (i < s.length) {
        // hex literal in string
        token = match_hex(s.slice(i))
        if (token) {
            token.start += i
            token.end += i
            tokens.push(token)
            i = token.end
            continue
        }

        // escape character in string
        token = match_escape(s.slice(i))
        if (token) {
            token.start += i
            token.end += i
            tokens.push(token)
            i = token.end
            continue
        }

        // end of string
        if (s[i] == closer) {
            return [...tokens, { type: 'literal', start: i, end: i + 1 }]
        }

        // regular character
        tokens.push({ type: 'literal', start: i, end: i + 1 })
        i++
    }

    return undefined
}

const match_parentheses = (s: string): Token | undefined => {
    if (s.startsWith('(')) {
        return { type: 'paren', start: 0, end: 1 }
    }
    if (s.startsWith(')')) {
        return { type: 'paren', start: 0, end: 1 }
    }
    return undefined
}

//#hashtag = '#' [a-zA-Z] [a-zA-Z0-9_]* / [a-zA-Z0-9_];
const match_hashtag = (s: string): Token | undefined => {
    if (s.startsWith('#')) {
        let i = 1
        while (i < s.length && /[a-zA-Z0-9_]/.test(s[i])) {
            i++
        }
        return { type: 'tagName', start: 0, end: i }
    }
    return undefined
}

// #operator = [|\-/>]
const match_binary_operator = (s: string): Token | undefined => {
    if ('=|-/>'.includes(s[0])) {
        return { type: 'operator', start: 0, end: 1 }
    }
    return undefined
}

// #operator = [.*+?~]
const match_unary_operator = (s: string): Token | undefined => {
    if ('.*+?~'.includes(s[0])) {
        return { type: 'logicOperator', start: 0, end: 1 }
    }
    return undefined
}

// #punctuation = [;]
const match_punctuation = (s: string): Token | undefined => {
    if (s[0] == ';') {
        return { type: 'punctuation', start: 0, end: 1 }
    }
    return undefined
}

const matchers: match_fn[] = [
    match_block_comment, //TODO: broken. can't deal with multi-line comments
    match_line_comment,
    match_eps,
    match_anyset,
    match_hex,
    match_number,
    match_hashtag,
    match_charset,
    match_string,
    match_parentheses,
    match_unary_operator,
    match_binary_operator,
    match_punctuation,
]

const parse_dewy_meta_lang = (code: string): Token[] => {
    // console.log('parsing:', code)
    let tokens: Token[] = []
    let index = 0

    while (index < code.length) {
        let token = matchers.reduce<Token | Token[] | undefined>(
            (token, matcher) => (token ? token : matcher(code.slice(index))),
            undefined,
        )
        if (token) {
            // console.log('matched token(s):', token)
            if (Array.isArray(token)) {
                tokens.push(
                    ...token.map((t) => {
                        t.start += index
                        t.end += index
                        return t
                    }),
                )
                index = token[token.length - 1].end
            } else {
                token.start += index
                token.end += index
                tokens.push(token)
                index = token.end
            }
        } else {
            // console.log('no match, skipping character:', code[index])
            tokens.push({ type: 'invalid', start: index, end: index + 1 })
            index++
        }
    }

    return tokens
}

export const dewy_meta_lang = (): LanguageSupport => {
    const parser = {
        token: (stream: any, state: any) => {
            if (state.index >= state.tokens.length) {
                state.tokens = parse_dewy_meta_lang(stream.string)
                state.index = 0
            }

            if (state.index < state.tokens.length) {
                const token = state.tokens[state.index++]
                stream.pos = token.end
                return token.type
            }

            stream.skipToEnd()
            return null
        },
        startState() {
            return { tokens: [], index: 0 }
        },
    }

    return new LanguageSupport(StreamLanguage.define(parser))
}

export const dewy_meta_theme = createTheme({
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
