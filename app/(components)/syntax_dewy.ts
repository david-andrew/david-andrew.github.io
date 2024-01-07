import { createTheme } from '@uiw/codemirror-themes'
import { tags as t } from '@lezer/highlight'
import { Token, get_lang_support, match_fn, parse_lang } from './syntax'

// Quick and dirty Dewy syntax highlighting. possibly not 100% correct

type BlockOpener = '(' | '[' | '{' | '<'
type BlockCloser = ')' | ']' | '}' | '>'
type Context =
    | {
          type: 'block_comment' | 'type_param'
      }
    | {
          type: 'block'
          block_opener: BlockOpener
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
    for (let keyword of keywords) {
        if (s.startsWith(keyword) && !alpha.has(s[keyword.length])) {
            return { type: 'keyword', start: 0, end: keyword.length }
        }
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
        return { type: 'name', start: 0, end: i }
    }
    return undefined
}

const match_hashtag = (s: string): Token | undefined => {
    if (s.startsWith('#')) {
        let i = 1
        while (i < s.length && continue_characters.has(s[i])) {
            i++
        }
        if (i > 1) return { type: 'tagName', start: 0, end: i }
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
            return { type: 'literal', start: 0, end: 2 }
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

        return { type: 'literal', start: 0, end: i }
    }
    return undefined
}

//integer
const match_integer = (s: string): Token | undefined => {
    if (s.length == 0 || !digits.has(s[0])) return undefined

    let i = 1
    while (i < s.length && (digits.has(s[i]) || s[i] == '_')) {
        i++
    }
    if (i == 0) return undefined
    return { type: 'number', start: 0, end: i }
}

const match_float = (s: string): Token | undefined => {
    if (s.length == 0 || !digits.has(s[0])) return undefined
    let i = 1
    while (i < s.length && (digits.has(s[i]) || s[i] == '_')) {
        i++
    }
    if (i == 0) return undefined
    if (s[i] != '.') return undefined
    i++
    if (i == s.length || !digits.has(s[i])) return undefined
    let j = 1
    while ((i + j < s.length && digits.has(s[i + j])) || s[i + j] == '_') {
        j++
    }
    if (j == 0) return undefined
    return { type: 'number', start: 0, end: i + j }
}

//based number
// const bases = new Set(['0b', '0t', '0q', '0s', '0o', '0d', '0z', '0x', '0u', '0r', '0y'])
const number_bases = new Map([
    ['0b', new Set('01')], //binary
    ['0t', new Set('012')], //ternary
    ['0q', new Set('0123')], //quaternary
    ['0s', new Set('012345')], //seximal
    ['0o', new Set('01234567')], //octal
    ['0d', new Set('0123456789')], //decimal
    ['0z', new Set('0123456789xeXE')], //dozenal
    ['0x', new Set('0123456789abcdefABCDEF')], //hexadecimal
    ['0u', new Set('0123456789abcdefghijklmnopqrstuvABCDEFGHIJKLMNOPQRSTUV')], //base 32 (duotrigesimal)
    ['0r', new Set('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')], //base 36 (hexatrigesimal)
    ['0y', new Set('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!$')], //base 64 (tetrasexagesimal)
])

const match_based_integer = (s: string): Token | undefined => {
    for (let [base, digits] of number_bases) {
        if (s.toLowerCase().startsWith(base)) {
            let i = base.length
            while (i < s.length && (digits.has(s[i]) || s[i] == '_')) {
                i++
            }
            if (i == base.length) return undefined
            return { type: 'number', start: 0, end: i }
        }
    }
    return undefined
}

const match_based_float = (s: string): Token | undefined => {
    for (let [base, digits] of number_bases) {
        if (s.toLowerCase().startsWith(base)) {
            let i = base.length
            while (i < s.length && (digits.has(s[i]) || s[i] == '_')) {
                i++
            }
            if (i == base.length) return undefined
            if (s[i] != '.') return undefined
            i++
            let j = 0
            while (i + j < s.length && (digits.has(s[i + j]) || s[i + j] == '_')) {
                j++
            }
            if (j == 0) return undefined
            return { type: 'number', start: 0, end: i + j }
        }
    }
    return undefined
}

//boolean
const match_boolean = (s: string): Token | undefined => {
    if (s.startsWith('true') && !alpha.has(s[4])) return { type: 'bool', start: 0, end: 4 }
    if (s.startsWith('false') && !alpha.has(s[5])) return { type: 'bool', start: 0, end: 5 }
    return undefined
}

// unary operators, binary, shift operator, comma, dot dot
const operators = new Set(
    [
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
        ':',

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
    ].sort((a, b) => b.length - a.length),
)

const match_operator = (s: string): Token | undefined => {
    for (let operator of operators) {
        if (s.startsWith(operator)) {
            //ensure either the last character is not a letter or the operator is not followed by a letter
            if (alpha.has(s[operator.length - 1]) && s[operator.length] && alpha.has(s[operator.length])) continue

            return { type: 'operator', start: 0, end: operator.length }
        }
    }
    return undefined
}

const whitespace = new Set(' \t\n\r\v\f')
const match_whitespace = (s: string): Token | undefined => {
    let i = 0
    while (i < s.length && whitespace.has(s[i])) {
        i++
    }
    if (i == 0) return undefined
    return { type: 'comment', start: 0, end: i }
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
    const context = get_context(state)
    if (context.type === 'block') {
        if (s.startsWith('/{')) {
            state.context_stack.push({ type: 'block_comment' })
            return { type: 'comment', start: 0, end: 2 }
        } else {
            return undefined
        }
    }

    // //shouldn't be necessary...
    // if (context.type !== 'block_comment') return undefined

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

const valid_delim_closers: Map<BlockOpener, Set<BlockCloser>> = new Map([
    ['{', new Set<BlockCloser>(['}'])],
    ['(', new Set<BlockCloser>([')', ']'])],
    ['[', new Set<BlockCloser>([']', ')'])],
    ['<', new Set<BlockCloser>(['>'])],
])

const isBlockOpener = (s: string): s is BlockOpener => {
    return valid_delim_closers.has(s as BlockOpener)
}

const match_block = (s: string, state: TokenizerState): Token | undefined => {
    if (isBlockOpener(s[0])) {
        state.context_stack.push({ type: 'block', block_opener: s[0] })
        return { type: 'bracket', start: 0, end: 1 }
    }

    const context = get_context(state)
    if (context.type !== 'block') return undefined

    const { block_opener } = context
    const block_closers = valid_delim_closers.get(block_opener)!
    for (let closer of block_closers) {
        if (s.startsWith(closer)) {
            state.context_stack.pop()
            return { type: 'bracket', start: 0, end: 1 }
        }
    }
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

const match_string = (s: string, state: TokenizerState): Token | undefined => {
    const context = get_context(state)

    //start the string
    if (context.type === 'block') {
        if (s.startsWith('"') || s.startsWith("'")) {
            let quote = s[0] as '"' | "'"
            let num_quotes = 1
            while (num_quotes + 1 < s.length && s[num_quotes + 1] === quote) {
                num_quotes++
            }

            // if even number only take the opening quotes
            if (num_quotes % 2 === 0) {
                num_quotes /= 2
            }

            // push the current context onto the stack and set the new context
            state.context_stack.push({ type: 'string', string_opener: quote, quote_count: num_quotes })
            return { type: 'literal', start: 0, end: 1 }
        }
    }

    // interior of the string
    if (context.type === 'string') {
        const escape = match_escape(s)
        if (escape) return escape

        if (s[0] === '{') {
            const block = match_block(s, state)
            if (block) return block
        }

        const { string_opener, quote_count } = context
        const delimiter = string_opener.repeat(quote_count)
        let i = 0
        while (i < s.length && !s.slice(i).startsWith(delimiter) && s[i] !== '{' && s[i] !== '\\') {
            i++
        }

        //check if the string is closed
        if (s.slice(i).startsWith(delimiter)) {
            state.context_stack.pop()
            i += delimiter.length
        }

        return { type: 'literal', start: 0, end: i }
    }
    return undefined
}

//TODO: use match map:
const match_map: { [key in Context['type']]: match_fn<TokenizerState>[] } = {
    block_comment: [match_block_comment],
    string: [match_string], //match_string
    block: [
        match_block_comment,
        match_line_comment,
        match_whitespace,
        match_raw_string,
        match_keyword,
        match_operator,
        match_boolean,
        match_hashtag,
        match_identifier,
        match_based_float,
        match_based_integer,
        match_float,
        match_integer,
        match_block,
        match_string,
    ],
    type_param: [], //[match_type_param]
    raw_string: [match_raw_string],
}
const get_matchers = (state: TokenizerState) => match_map[get_context(state).type]

const parse_dewy_lang = (code: string, state: TokenizerState): Token[] => parse_lang(code, state, get_matchers)
export const dewy_lang = get_lang_support(parse_dewy_lang, get_default_tokenizer_state)

/* 
comment: Tag
    A comment.
lineComment: Tag
    A line comment.
blockComment: Tag
    A block comment.
docComment: Tag
    A documentation comment.
name: Tag
    Any kind of identifier.
variableName: Tag
    The name of a variable.
typeName: Tag
    A type name.
tagName: Tag
    A tag name (subtag of typeName).
propertyName: Tag
    A property or field name.
attributeName: Tag
    An attribute name (subtag of propertyName).
className: Tag
    The name of a class.
labelName: Tag
    A label name.
namespace: Tag
    A namespace name.
macroName: Tag
    The name of a macro.
literal: Tag
    A literal value.
string: Tag
    A string literal.
docString: Tag
    A documentation string.
character: Tag
    A character literal (subtag of string).
attributeValue: Tag
    An attribute value (subtag of string).
number: Tag
    A number literal.
integer: Tag
    An integer number literal.
float: Tag
    A floating-point number literal.
bool: Tag
    A boolean literal.
regexp: Tag
    Regular expression literal.
escape: Tag
    An escape literal, for example a backslash escape in a string.
color: Tag
    A color literal.
url: Tag
    A URL literal.
keyword: Tag
    A language keyword.
self: Tag
    The keyword for the self or this object.
null: Tag
    The keyword for null.
atom: Tag
    A keyword denoting some atomic value.
unit: Tag
    A keyword that represents a unit.
modifier: Tag
    A modifier keyword.
operatorKeyword: Tag
    A keyword that acts as an operator.
controlKeyword: Tag
    A control-flow related keyword.
definitionKeyword: Tag
    A keyword that defines something.
moduleKeyword: Tag
    A keyword related to defining or interfacing with modules.
operator: Tag
    An operator.
derefOperator: Tag
    An operator that dereferences something.
arithmeticOperator: Tag
    Arithmetic-related operator.
logicOperator: Tag
    Logical operator.
bitwiseOperator: Tag
    Bit operator.
compareOperator: Tag
    Comparison operator.
updateOperator: Tag
    Operator that updates its operand.
definitionOperator: Tag
    Operator that defines something.
typeOperator: Tag
    Type-related operator.
controlOperator: Tag
    Control-flow operator.
punctuation: Tag
    Program or markup punctuation.
separator: Tag
    Punctuation that separates things.
bracket: Tag
    Bracket-style punctuation.
angleBracket: Tag
    Angle brackets (usually < and > tokens).
squareBracket: Tag
    Square brackets (usually [ and ] tokens).
paren: Tag
    Parentheses (usually ( and ) tokens). Subtag of bracket.
brace: Tag
    Braces (usually { and } tokens). Subtag of bracket.
content: Tag
    Content, for example plain text in XML or markup documents.
heading: Tag
    Content that represents a heading.
heading1: Tag
    A level 1 heading.
heading2: Tag
    A level 2 heading.
heading3: Tag
    A level 3 heading.
heading4: Tag
    A level 4 heading.
heading5: Tag
    A level 5 heading.
heading6: Tag
    A level 6 heading.
contentSeparator: Tag
    A prose separator (such as a horizontal rule).
list: Tag
    Content that represents a list.
quote: Tag
    Content that represents a quote.
emphasis: Tag
    Content that is emphasized.
strong: Tag
    Content that is styled strong.
link: Tag
    Content that is part of a link.
monospace: Tag
    Content that is styled as code or monospace.
strikethrough: Tag
    Content that has a strike-through style.
inserted: Tag
    Inserted text in a change-tracking format.
deleted: Tag
    Deleted text.
changed: Tag
    Changed text.
invalid: Tag
    An invalid or unsyntactic element.
meta: Tag
    Metadata or meta-instruction.
documentMeta: Tag
    Metadata that applies to the entire document.
annotation: Tag
    Metadata that annotates or adds attributes to a given syntactic element.
processingInstruction: Tag
    Processing instruction or preprocessor directive. Subtag of meta.
definition(tag: Tag) → Tag
    Modifier that indicates that a given element is being defined. Expected to be used with the various name tags.
constant(tag: Tag) → Tag
    Modifier that indicates that something is constant. Mostly expected to be used with variable names.
function(tag: Tag) → Tag
    Modifier used to indicate that a variable or property name is being called or defined as a function.
standard(tag: Tag) → Tag
    Modifier that can be applied to names to indicate that they belong to the language's standard environment.
local(tag: Tag) → Tag
    Modifier that indicates a given names is local to some scope.
special(tag: Tag) → Tag
    A generic variant modifier that can be used to tag language-specific alternative variants of some common tag. It is recommended for themes to define special forms of at least the string and variable name tags, since those come up a lot.

*/

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
        { tag: t.keyword, color: '#569cd6' }, //keywords
        { tag: t.name, color: '#4ec9b0' }, //identifiers
        { tag: t.bool, color: '#569cd6' }, //boolean

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
