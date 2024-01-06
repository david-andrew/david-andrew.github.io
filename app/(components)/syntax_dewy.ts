// import { LanguageSupport } from '@codemirror/language'
// import { StreamLanguage } from '@codemirror/language'
import { createTheme } from '@uiw/codemirror-themes'
import { tags as t } from '@lezer/highlight'
import { Token, get_lang_support, match_fn, parse_lang } from './syntax'

/*
Tokens todo:
- keyword
- identifier
- hashtag
- block
- type param
- escape (inside of strings)
- raw string
- string
- integer
- based number
- boolean
- operator
- shift operator
- comma
- dot dot
- (dot dot dot is a unary operator)
*/

// any (dewy) token that can span multiple lines
type Context =
    | {
          type: 'block_comment' | 'type_param'
      }
    | {
          type: 'block'
          block_opener: '(' | '[' | '{'
      }
    | {
          type: 'string' | 'raw_string'
          string_opener: '"' | "'"
          quote_count: number
      }

type TokenizerState = {
    tokens: Token[]
    index: number
    context_stack: Context[] // all elements except for current state (top)
}

const get_context = (state: TokenizerState): Context => {
    return state.context_stack.at(-1) ?? { type: 'block', block_opener: '{' }
}

const get_default_tokenizer_state: () => TokenizerState = () => {
    return { tokens: [], index: 0, context_stack: [] }
}

const keywords = new Set(['loop', 'lazy', 'do', 'if', 'return', 'express', 'let', 'const'])
const match_keyword = (s: string): Token | undefined => {
    if (keywords.has(s)) {
        return { type: 'keyword', start: 0, end: s.length }
    }
    return undefined
}

const digits = new Set('0123456789')
const alpha = new Set('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz')
const greek = new Set('ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρςστυφχψω')
const misc = new Set('_!$&°')

// start character is alpha, greek, or misc
const start_characters = new Set([...alpha, ...greek, ...misc])
const continue_characters = new Set([...alpha, ...digits, ...greek, ...misc])

const match_identifier = (s: string): Token | undefined => {
    if (start_characters.has(s[0])) {
        let i = 1
        while (i < s.length && continue_characters.has(s[i])) {
            i++
        }
        return { type: 'identifier', start: 0, end: i }
    }
    return undefined
}

const match_hashtag = (s: string): Token | undefined => {
    if (s.startsWith('#')) {
        let i = 1
        while (i < s.length && continue_characters.has(s[i])) {
            i++
        }
        if (i > 1) return { type: 'hashtag', start: 0, end: i }
    }
    return undefined
}

//raw string
const match_raw_string = (s: string, state: TokenizerState): Token | undefined => {
    const context = get_context(state)

    //start the raw string
    if (context.type === 'block') {
        if (s.startsWith('r"') || s.startsWith("r'")) {
            let quote = s[1] as '"' | "'"
            let num_quotes = 1
            while (num_quotes + 1 < s.length && s[num_quotes + 1] === quote) {
                num_quotes++
            }

            // if even number only take the opening quotes
            if (num_quotes % 2 === 0) {
                num_quotes /= 2
            }

            // push the current context onto the stack and set the new context
            state.context_stack.push({ type: 'raw_string', string_opener: quote, quote_count: num_quotes })
            return { type: 'raw_string_start', start: 0, end: 2 }
        }
    }

    // interior of the raw string
    if (context.type === 'raw_string') {
        const { string_opener, quote_count } = context
        const delimiter = string_opener.repeat(quote_count)
        let i = 0
        while (i < s.length && !s.slice(i).startsWith(delimiter)) {
            i++
        }

        //check if the string is closed
        if (s.slice(i).startsWith(delimiter)) {
            state.context_stack.pop()
            i += delimiter.length
        }

        return { type: 'raw_string', start: 0, end: i }
    }
    return undefined
}

//block
//type param
//string
//integer
//based number
//boolean

// unary operators, binary, shift operator, comma, dot dot
const operators = new Set([
    // unary_prefix_operators
    '+',
    '-',
    '*',
    '/',
    'not',
    '@',
    '...',

    // unary_postfix_operators
    '?',
    '`',
    ';',

    // binary_operators
    '+',
    '-',
    '*',
    '/',
    '%',
    '^',
    '=?',
    '>?',
    '<?',
    '>=?',
    '<=?',
    'in?',
    'is?',
    'isnt?',
    '<=>',
    '|',
    '&',
    'and',
    'or',
    'nand',
    'nor',
    'xor',
    'xnor',
    '??',
    'else',
    '=',
    ':=',
    'as',
    'in',
    'transmute',
    '@?',
    '|>',
    '<|',
    '=>',
    '->',
    '<->',
    '<-',
    '.',
    // ':', //handled by match_type_param

    // shift_operators
    '<<',
    '>>',
    '<<<',
    '>>>',
    '<<!',
    '!>>',

    // special operators
    ',',
    '..',
])

const match_operator = (s: string): Token | undefined => {
    if (operators.has(s)) {
        return { type: 'operator', start: 0, end: s.length }
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
const match_block_comment = (s: string, state: TokenizerState): Token | undefined => {
    //start the block comment
    if (s.startsWith('/{')) {
        state.context_stack.push({ type: 'block_comment' })
        return { type: 'comment', start: 0, end: 2 }
    }

    if (state.context_stack.at(-1)?.type !== 'block_comment') return undefined

    //interior and end of the block comment
    let i = 0
    while (state.context_stack.at(-1)?.type === 'block_comment' && i < s.length) {
        if (s.startsWith('/{', i)) {
            state.context_stack.push({ type: 'block_comment' })
            i += 2
            continue
        }
        if (s.startsWith('}/', i)) {
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
const match_escape = (s: string): Token | undefined => {
    if (s.startsWith('\\')) {
        if (s[1] == 'n' || s[1] == 'r' || s[1] == 't' || s[1] == 'v' || s[1] == 'b' || s[1] == 'f' || s[1] == 'a') {
            return { type: 'escape', start: 0, end: 2 }
        }
        return { type: 'escape', start: 0, end: 2 }
    }
    return undefined
}

//TODO: use match map:
const match_map: { [key in Context['type']]: match_fn<TokenizerState>[] } = {
    block_comment: [match_block_comment],
    string: [], //match_string
    block: [match_block_comment, match_line_comment, match_raw_string], //[match_keyword, match_identifier, match_hashtag, match_line_comment, match_block_comment, match_raw_string], //, match_string
    type_param: [], //[match_type_param]
    raw_string: [match_raw_string],
}
const get_matchers = (state: TokenizerState) => match_map[get_context(state).type]

const parse_dewy_lang = (code: string, state: TokenizerState): Token[] => parse_lang(code, state, get_matchers)
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
