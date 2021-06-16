import React, { useEffect, useRef, useState } from 'react'
import { Button, Accordion, Grid, Icon, List, Menu, TextArea, TextAreaProps } from 'semantic-ui-react'
import { PageContainer, PageHeading /*DewyLiveParser*/ } from '../../Components'
import { useGithubTimestamp, useDewyWasm, useDelayed, Code, CodeBlock, ExternalLink, getScrollbarWidth, ParserOutput } from '../../utilities'

interface ExampleGrammar {
    label: string
    grammar: string
    source: string
}

//example grammars the user can prepopulate the demo with
const exampleGrammars: ExampleGrammar[] = [
    {
        label: "Even # of A's",
        grammar: "#S = 'AA'*;",
        source: 'AAAAAAAA',
    },
    {
        label: 'Binary Palindromes',
        grammar: "#S = ('0' #S '0' | '0' | '1' #S '1' | '1')?;",
        source: '000100111001000',
    },
    {
        label: 'Lowercase Palindromes',
        grammar: `//ascii palindromes
#S = 'a' #S 'a' | 'a';
#S = 'b' #S 'b' | 'b';
#S = 'c' #S 'c' | 'c';
#S = 'd' #S 'd' | 'd';
#S = 'e' #S 'e' | 'e';
#S = 'f' #S 'f' | 'f';
#S = 'g' #S 'g' | 'g';
#S = 'h' #S 'h' | 'h';
#S = 'i' #S 'i' | 'i';
#S = 'j' #S 'j' | 'j';
#S = 'k' #S 'k' | 'k';
#S = 'l' #S 'l' | 'l';
#S = 'm' #S 'm' | 'm';
#S = 'n' #S 'n' | 'n';
#S = 'o' #S 'o' | 'o';
#S = 'p' #S 'p' | 'p';
#S = 'q' #S 'q' | 'q';
#S = 'r' #S 'r' | 'r';
#S = 's' #S 's' | 's';
#S = 't' #S 't' | 't';
#S = 'u' #S 'u' | 'u';
#S = 'v' #S 'v' | 'v';
#S = 'w' #S 'w' | 'w';
#S = 'x' #S 'x' | 'x';
#S = 'y' #S 'y' | 'y';
#S = 'z' #S 'z' | 'z';
#S = ϵ;`,
        source: 'racecar',
    },
    {
        label: 'Case Insensitive',
        grammar: `#S = {coding isn't very hard. αβγδξπσω};`,
        source: "CoDiNg IsN't VeRy HaRd. ΑβΓδΞπΣω",
    },
    {
        label: 'Math Expressions (Ambiguous)',
        grammar: `#E = '(' #w* #E #w* ')';    //parenthesis
#E = #E #w* [+\\-] #w* #E;   //addition/subtraction
#E = #E #w* [*/] #w* #E;    //multiplication/division
#E = #E #w* '^' #w* #E;     //exponentiation
#E = #N | #I;               //terms (numbers/identifiers)
#N = [0-9]+;
#I = [A-Za-z_] [A-Za-z0-9!@%&_?]*;

#w = [\\n\\x20];              // whitespace

#start = #w* #E (#w+ #E)* #w*;`,
        source: '1+2*3',
    },
    {
        label: 'Math Expressions (Unambiguous)',
        grammar: `//addition/subtraction (left associative)
#S = #S #w* '+' #w* #A | #S #w* '-' #w* #A | #A;

//multiplication/division (left associative)
#A = #A #w* '*' #w* #E | #A #w* '/' #w* #E | #E;

//exponentiation (right associative)
#E = #T #w* '^' #w* #E | #T;

//terms (numbers/identifiers/groups)
#T = #N | #I | #G;
#N = [0-9]+;
#I = [A-Za-z_] [A-Za-z0-9!@%&_?]*;
#G = '(' #w* #S #w* ')';

//whitespace
#w = [\\x20\\n];

#start = #w* #S (#w+ #S)* #w*;`,
        source: '1+2*3',
    },
    {
        label: 'Semantic Versions',
        grammar: `//Semantic Versioning 2.0.0 CFG. https://semver.org/spec/v2.0.0.html
#semver = #core ('-' #pre_release)? ('+' #build)?;

#core = #major '.' #minor '.' #patch;
#major = #num;
#minor = #num;
#patch = #num;

#pre_release = #pre_release_id ('.' #pre_release)?;
#pre_release_id = #id | #num;

#build = #build_id ('.' #build)?;
#build_id = #id | [0-9]+;

#id = [0-9A-Za-z\\-]* [A-Za-z\\-] [0-9A-Za-z\\-]*;     //must contain at least 1 non-digit
#num = '0' | [1-9] [0-9]*;                          //may only start with 0 if no following digits

//allow multiple semvars separated by newlines to be parsed
#start = #semver ('\\n' #semver)*;`,
        source: '18.4.5-beta+exp.sha.5114f85',
    },
    {
        label: 'C FizzBuzz',
        grammar: `//example subset C grammar. Perhaps not exactly correct, but good enough for demo purposes
#s = [\\x20\\t];                  //space or tab (i.e. no newlines)
#ws = [\\x20\\t\\n\\r];             //whitespace characters
#w = #ws | #comment;            //any text ignored by compiler
#comment = #line_comment | #block_comment;
#line_comment = '/' '/' (ξ - '\\n')* '\\n';

//block comments have a bit of a wonky definition here b/c the reject filter from the SRNGLR parser is not complete
//eventually you'd be able to declare it like so: #block_comment = '/*' (ξ* - ξ* '*/') '*/';
#block_comment = '/*' ((ξ - '*') | ('*' (ξ - '/')))* '*/';


#id = [a-zA-Z_] [a-zA-Z0-9_]*;  //identifiers
#int = [0-9]+;
#bool = 'true' | 'false';
#str = '"' #str_inner '"';
#str_inner = ((ξ - [\\\\"]) | #esc)*;   //any character (except for \`"\` and \`\\\`), or an escape character
#esc = '\\\\' ξ;

//types are just identifiers with optional \`*\`s after them. Too lazy to handle spaces between \`#id\` and \`*\`
#type = #id '*'*;

#typed_id = #type #w+ #id ('[' (#int)? ']')?;    //e.g. \`int main\`, \`char* strings[]\`, etc.

#fn_decl = #fn_head #w* #block;
#fn_head = #typed_id #w* '(' #w* (#typed_id #w* (',' #w* #typed_id #w*)*)? ')';
#block = '{' (#w* #stmnt)* #w* '}';
#fn_call = #id #w* '(' #w* (#expr #w* (',' #w* #expr #w*)*)? ')';

#struct = '{' #w* (#expr #w* (',' #w* #expr #w*)*)? '}';

#sizeof = 'sizeof' #w* '(' #w* #type #w* ')';

#bin_op = '+' | '-' | '*' | '/' | '%' | '&&' | '||' | '^' | '|' | '&' | '<' | '>' | '<=' '>=' | '!=' | '==';
#bin_expr = #expr #w* #bin_op #w* #expr;

#prefix_op = '!' | '&' | '*'; 
#prefix_expr = #prefix_op #w* #expr;
#postfix_op = '++' | '--';
#postfix_expr = #expr #w* #postfix_op;

#access_expr = #id #w* '[' #w* #expr #w* ']';

#expr = #fn_call | #id | #str | #int | #bool | #struct | #sizeof | #bin_expr | #prefix_expr | #postfix_expr | #access_expr;
#expr = '(' #w* #expr #w* ')';

#stmnt = #expr_stmnt | #assign_stmnt | #for_stmnt | #if_stmnt | #return_stmnt;

#expr_stmnt = #expr #w* ';';
#assign_expr = (#typed_id | #id) #w* '=' #w* #expr;
#assign_stmnt = #assign_expr #w* ';';
#for_stmnt = 'for' #w* '(' #w* (#assign_expr #w*)? ';' #w* (#expr #w*)? ';' #w* (#expr #w*)? ')' #w* (#block | #stmnt);
#if_stmnt = 'if' #w* '(' #w* #expr #w* ')' #w* (#block | #stmnt);
#return_stmnt = 'return' #w* (#expr)? ';'; 

#include = '#include' #s* #include_path '\\n';
#include_path = '"' #path '"' | '<' #path '>';
#path = ('/' | [a-zA-Z0-9_]+ | '.')*;


#program = (#w* (#include | #fn_decl))* #w*;
#start = #program;`,
        source: `//clean C fizzbuzz implementation

#include <stdio.h>
#include <stdbool.h>
#include <assert.h>


int main()
{
    int taps[] = {3, 5/*, 7, 11*/};
    char* strings[] = {"Fizz", "Buzz"/*, "Bazz", "Bar"*/};
    assert(sizeof(taps) / sizeof(int) == sizeof(strings) / sizeof(char*));
    

    for (int i = 0; i < 100; i++)
    {
        bool printed_words = false;
        for (int j = 0; j < sizeof(taps) / sizeof(int); j++)
        {
            if (i % taps[j] == 0)
            {
                printf("%s", strings[j]);
                printed_words = true;
            }
        }
        if (!printed_words)
        {
            printf("%d", i);
        }
        printf("\\n");
    }
    return 0;
}`,
    },
]

//used for discussing specific grammars later
const ambiguousExpressionGrammar = exampleGrammars[4]
const unambiguousExpressionGrammar = exampleGrammars[5]

//handle updating the saved state for the body of text inputs
const onTextAreaChange = (
    setContentState: React.Dispatch<React.SetStateAction<string>>,
    setScrollState: React.Dispatch<React.SetStateAction<boolean>>,
    ref: React.MutableRefObject<null>
) => {
    return (event: React.ChangeEvent<HTMLTextAreaElement>, data: TextAreaProps): void => {
        //save the reference to the element
        // ref.current = event.target

        //set whether the scrollbar is visible
        updateTextAreaScroll(setScrollState, ref)

        //set the content of the text body
        const txt = data.value?.toString() ?? ''
        setContentState(txt)
    }
}

//determine/update whether a TextInput is displaying a scrollbar
const updateTextAreaScroll = (setScrollState: React.Dispatch<React.SetStateAction<boolean>>, ref: React.MutableRefObject<any>): void => {
    setScrollState((ref.current?.ref.current?.clientWidth ?? 0) < (ref.current?.ref.current?.scrollWidth ?? 0))
}

//count the number of lines in a string
const countLines = (txt: string): number => {
    return (txt.match(/\n/g) || '').length + 1
}

//size of 1 em in pixels for CodeBlocks / TextAreas
const emToPx = 12
const lineHeight = 1.15

export const DewySpeak = (): JSX.Element => {
    const subtitle = useGithubTimestamp('dewy')

    //show the output from the parser demo
    const [showParserDemo, setShowParserDemo] = useState<boolean>(false)
    const [outputHidden, setOutputHidden] = useState<boolean>(false) //user collapsable option
    const [showPresets, setShowPresets] = useState<boolean>(false) //preset example grammars

    //menu for the different things to show in output
    const [parserDemoSelection, setParserDemoSelection] = useState<string>('Parse Forest')
    const getParserDemoMenuProps = (name: string): { name: string; active: boolean; onClick: () => void } => {
        return { name, active: parserDemoSelection === name, onClick: () => setParserDemoSelection(name) }
    }
    const getParserDemoSelectionKey = (name: string): keyof ParserOutput => {
        switch (name) {
            case 'Parse Forest':
                return 'forest'
            case 'RNGLR Table':
                return 'table'
            case 'Item Sets':
                return 'grammarItems'
            case 'Meta Scanner':
                return 'metascanner'
            case 'Meta AST':
                return 'metaast'
            case 'CFG':
                return 'metaparser'
            case 'First Sets':
                return 'grammarFirsts'
        }
        return 'forest'
    }

    //state for live parser demo inputs
    // React.LegacyRef<TextArea>
    const grammarRef = useRef(null)
    const [grammarInput, setGrammarInput] = useState<string>(ambiguousExpressionGrammar.grammar)
    const [grammarHeight, setGrammarHeight] = useState<string>('25em')
    const [grammarScroll, setGrammarScroll] = useState<boolean>(false)

    const sourceRef = useRef(null)
    const [sourceInput, setSourceInput] = useState<string>('1+2*3')
    const [sourceHeight, setSourceHeight] = useState<string>('3em')
    const [sourceScroll, setSourceScroll] = useState<boolean>(false)

    const onGrammarChange = onTextAreaChange(setGrammarInput, setGrammarScroll, grammarRef)
    const onSourceChange = onTextAreaChange(setSourceInput, setSourceScroll, sourceRef)

    //When the user selects a demo preset, recompute if the scroll bars need to be shown.
    useEffect(() => {
        updateTextAreaScroll(setGrammarScroll, grammarRef)
        updateTextAreaScroll(setSourceScroll, sourceRef)
    }, [grammarInput, sourceInput])

    //run the input through the dewy parser. Put a delay on the input boxes so that the wasm code isn't run too frequently
    const [grammar, source] = useDelayed([grammarInput, sourceInput])
    const parserOutput = useDewyWasm(grammar, source)

    //determine if there was a parser/grammar error. Only show errors after the user starts the demo
    const parseError = showParserDemo && parserOutput?.result === 'failure'
    const grammarError = showParserDemo && parserOutput?.grammarError !== undefined

    //on window resize/zoom, update the input scrollbars
    useEffect(() => {
        window.addEventListener('resize', () => {
            updateTextAreaScroll(setGrammarScroll, grammarRef)
            updateTextAreaScroll(setSourceScroll, sourceRef)
        })
    })

    //keep text areas large enough for their input. Handle when the horizontal scrollbar is visible, which adds extra height
    useEffect(() => {
        //determine how much extra height based on if horizontal scrollbar visible
        const extra = (grammarScroll ? getScrollbarWidth() : 0) + 4
        const height = countLines(grammarInput) * emToPx * lineHeight + extra

        //set the input height
        setGrammarHeight(`${height}px`)
    }, [grammarInput, grammarScroll])
    useEffect(() => {
        //determine how much extra height based on if horizontal scrollbar visible
        const extra = (sourceScroll ? getScrollbarWidth() : 0) + 4
        const height = countLines(sourceInput) * emToPx * lineHeight + extra

        //set the input height
        setSourceHeight(`${height}px`)
    }, [sourceInput, sourceScroll])

    return (
        <>
            <PageContainer>
                <PageHeading title="Dewy Programming Language" subtitle={subtitle} />
                <Grid columns={3}>
                    <Grid.Row>
                        <Grid.Column width={showParserDemo ? 6 : 8}>
                            <h4>Source Input</h4>
                            <TextArea
                                className={parseError ? 'failure' : undefined}
                                onChange={onSourceChange}
                                style={{ width: '100%', height: sourceHeight }}
                                spellCheck="false"
                                value={sourceInput}
                                ref={sourceRef}
                            />
                        </Grid.Column>
                        {showParserDemo && (
                            <Grid.Column width={2}>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <div style={{ pointerEvents: 'none', userSelect: 'none' }}>
                                        <h4 style={{ color: 'black' }}>fake text</h4>

                                        <div style={{ whiteSpace: 'nowrap', alignItems: 'center' }}>
                                            <span style={{ fontSize: 20 }}>&lt; </span>
                                            <span style={{ outline: 'solid 1px white', padding: '0.25em' }}>edit me</span>
                                            <span style={{ fontSize: 20 }}> &gt;</span>
                                        </div>
                                    </div>
                                </div>
                            </Grid.Column>
                        )}
                        <Grid.Column width={8}>
                            <h4>Grammar Specification</h4>
                            <TextArea
                                className={grammarError ? 'failure' : undefined}
                                onChange={onGrammarChange}
                                style={{ width: '100%', height: grammarHeight }}
                                spellCheck="false"
                                value={grammarInput}
                                ref={grammarRef}
                            />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                {showParserDemo ? (
                    <>
                        <Accordion inverted>
                            <Accordion.Title active={showPresets} onClick={() => setShowPresets((p) => !p)}>
                                <Icon name="dropdown" />
                                <span style={{ color: 'white', fontFamily: 'quadon', fontSize: '1.071em' }}>Presets</span>
                            </Accordion.Title>
                            <Accordion.Content active={showPresets}>
                                {exampleGrammars.map(({ grammar, source, label }: ExampleGrammar, i) => {
                                    return (
                                        <Button
                                            style={{ margin: '0.1em 0.1em 0.1em 0.1em' }}
                                            key={label}
                                            onClick={() => {
                                                setGrammarInput(grammar)
                                                setSourceInput(source)
                                            }}
                                        >
                                            {label}
                                        </Button>
                                    )
                                })}
                            </Accordion.Content>
                            <Accordion.Title active={!outputHidden} onClick={() => setOutputHidden((v) => !v)}>
                                <Icon name="dropdown" />
                                <span style={{ color: 'white', fontFamily: 'quadon', fontSize: '1.071em' }}>Output{outputHidden ? ' (hidden)' : ''}</span>
                            </Accordion.Title>
                            <Accordion.Content active={!outputHidden}>
                                <div style={{ overflowX: 'auto', overflowY: 'hidden', backgroundColor: '#283447' }}>
                                    <Menu inverted style={{ marginBottom: '0', backgroundColor: '#283447' }}>
                                        <Menu.Item {...getParserDemoMenuProps('Parse Forest')} />
                                        <Menu.Item {...getParserDemoMenuProps('RNGLR Table')} />
                                        <Menu.Item {...getParserDemoMenuProps('Item Sets')} />
                                        <Menu.Item {...getParserDemoMenuProps('Meta Scanner')} />
                                        <Menu.Item {...getParserDemoMenuProps('Meta AST')} />
                                        <Menu.Item {...getParserDemoMenuProps('CFG')} />
                                        <Menu.Item {...getParserDemoMenuProps('First Sets')} />
                                    </Menu>
                                </div>
                                <CodeBlock
                                    flatten
                                    text={
                                        parserOutput?.[getParserDemoSelectionKey(parserDemoSelection)] ??
                                        (parserOutput?.grammarError !== undefined ? `${parserOutput.grammarError}` : 'running parser...')
                                    }
                                />
                            </Accordion.Content>
                        </Accordion>
                    </>
                ) : (
                    <Button onClick={() => setShowParserDemo(true)}>Try Me</Button>
                )}
                <h3>About</h3>
                <p>
                    Dewy is a programming language I have been personally developing since 2016. The main goal is to build a language that has the exact feature
                    set that I&apos;ve always wished existed. Dewy is a general purpose language with a focus on scientific and engineering applications. At a
                    high level, Dewy is sort of like an amalgamation of the best aspects of Matlab, Python, TypeScript, and Rust, but with its own unique flare.
                </p>
                <p>An example of the common FizzBuzz program implemented in Dewy might look like this:</p>
                <CodeBlock
                    flatten
                    text={`taps = [3 -> 'Fizz' 5 -> 'Buzz' /{7 -> 'Bazz' 11 -> 'Bar'}/]
loop i in [0:100)
{
    printed_words = false
    loop [tap string] in taps 
    {
        if i % tap =? 0 
        { 
            print(tap)
            printed_words = true
        }
    }
    if not? printed_words print(i)
    printl()
}`}
                />
                <p>Or a more functional style implementation might look like this:</p>
                <CodeBlock
                    flatten
                    text={`taps = [3 -> 'Fizz' 5 -> 'Buzz' /{7 -> 'Bazz' 11 -> 'Bar'}/]
range = [0:100)

//indexing at [, :] and [:,] adds singleton dimensions
word_bools = range[, :] .% taps.keys[:,] .=? 0

// \` means transpose, which behaves like python's zip()
words_grid = [taps.values word_bools]\`.map(
    [word bools] => bools.map(b => if b word else '')
)

raw_lines = word_grid\`.map(line_words => line_words.join(''))

lines = [raw_lines range]\`.map(
    (raw_line, i) => if raw_line.length =? 0 '{i}' else raw_line
)

lines.join('\\n') |> printl
`}
                />
                <p>For clarity, the variables at each step look like so:</p>
                <CodeBlock
                    flatten
                    text={`word_bools = [[true false false true false false true false ...]
              [true false false false false true false false ...]]

word_grid = [['Fizz' '' '' 'Fizz' '' '' 'Fizz' '' '' 'Fizz' '' '' ...]
             ['Buzz' '' '' '' '' 'Buzz' '' '' '' '' 'Buzz' '' '' ...]]

raw_lines = ['FizzBuzz' '' '' 'Fizz' '' 'Buzz' 'Fizz' '' '' 'Fizz' 'Buzz' '' ...]

lines = ['FizzBuzz' '1' '2' 'Fizz' '4' 'Buzz' 'Fizz' '7' '8' 'Fizz' 'Buzz' '11' ...]
`}
                />
                <p>
                    So far in development, I have developed the syntax for the language (and meta-language), and have built a prototype{' '}
                    <ExternalLink href="https://raw.githubusercontent.com/david-andrew/dewy/master/resources/Right_Nulled_GLR_Parsers.pdf">RNGLR</ExternalLink>{' '}
                    \{' '}
                    <ExternalLink href="https://raw.githubusercontent.com/david-andrew/dewy/master/resources/Faster_Scannerless_Parsing.pdf">
                        SRNGLR
                    </ExternalLink>{' '}
                    parser from scratch in C (which you can try above). The next steps are to add some missing features to the parser, write out the language
                    Context Free Grammar (CFG) in the meta-language, implement the parser back ends (LLVM and C) for generating code from the parse tree, and
                    then build out the standard library.
                </p>
                <h3>Parsing</h3>
                <p>
                    All programming languages start with a compiler, which itself is made of several parts, namely: lexing, parsing, semantic analysis, and code
                    generation. Dewy makes use of a SRNGLR parser which allows the lexing and parsing phases be combined into a single step.
                </p>
                <p>
                    To parse a mathematical expression like <Code>1 + 2 * 3</Code> we first have to define the grammar for how raw text gets converted to a
                    parse tree. For this, I&apos;ve developed the Dewy Meta Language which allows for the specification of any Context Free Grammar (CFG), as
                    well as some context sensitive grammars which can be parsed by SRNGLR. Additionally, the meta-language / parser are optimized to allow for
                    arbitrary unicode characters as part of the language alphabet, whereas parsers are often limited a much smaller alphabet, e.g. ASCII.
                </p>
                <p>
                    Normally a grammar must be unambiguous to work with standard LR, LALR, etc. parsers. This complicates the process of writing the grammar, as
                    often times, the natural way to express a language will be ambiguous, and require careful work to disambiguate. For the math expression{' '}
                    <Code>1 + 2 * 3</Code>, or any other math expression, the unambiguous version of the grammar might look like this:
                </p>
                <CodeBlock flatten text={unambiguousExpressionGrammar.grammar} />
                <p>
                    Precedence is handled by restricting which expressions can be subexpressions, using different grammar symbols. Associativity is also handled
                    in a similar fashion, namely the left or right hand side is restricted to specific subexpression types that generate the correct
                    associativity. Ultimately though, because SRNGLR can handle ambiguities, the grammar can be simplified to something like this:
                </p>
                <CodeBlock flatten text={ambiguousExpressionGrammar.grammar} />
                <p>
                    Note that for the ambiguous grammar, precedence and associativity still need to be handled at some point in the process. SRNGLR just
                    provides the flexibility to handle them later in the parsing process, when it is much more convenient.
                </p>
                <p>
                    Running the first grammar on <Code>1 + 2 * 3</Code> we get the following parse tree
                </p>
                <CodeBlock
                    flatten
                    text={`#start:0
├── #__4:0
│   ├── #__5:0
│   │   ├── ϵ
│   │   └── #S:0
│   │       ├── #S:2
│   │       │   └── #A:2
│   │       │       └── #E:1
│   │       │           └── #T:0
│   │       │               └── #N:0
│   │       │                   ├── 1
│   │       │                   └── ϵ: #__2
│   │       ├── #__1:0
│   │       │   ├── #w:0
│   │       │   │   └── \\x20
│   │       │   └── ϵ: #__1
│   │       ├── +
│   │       ├── #__1:0
│   │       │   ├── #w:0
│   │       │   │   └── \\x20
│   │       │   └── ϵ: #__1
│   │       └── #A:0
│   │           ├── #A:2
│   │           │   └── #E:1
│   │           │       └── #T:0
│   │           │           └── #N:0
│   │           │               ├── 2
│   │           │               └── ϵ: #__2
│   │           ├── #__1:0
│   │           │   ├── #w:0
│   │           │   │   └── \\x20
│   │           │   └── ϵ: #__1
│   │           ├── *
│   │           ├── #__1:0
│   │           │   ├── #w:0
│   │           │   │   └── \\x20
│   │           │   └── ϵ: #__1
│   │           └── #E:1
│   │               └── #T:0
│   │                   └── #N:0
│   │                       ├── 3
│   │                       └── ϵ: #__2
│   └── ϵ: #__6
└── ϵ: #__1`}
                />
                <p>while parsing the same input with the ambiguous grammar returns the following parse forest:</p>
                <CodeBlock
                    flatten
                    text={` 0 #start:0
 1 ├── #__4:0
 2 │   ├── ϵ
 3 │   └── [#E:2]
 4 │       ├───┬── #E:1
 5 │       │   │   ├── #E:4
 6 │       │   │   │   └── #N:0
 7 │       │   │   │       ├── 1
 8 │       │   │   │       └── ϵ: #__2
 9 │       │   │   ├── #__1:0
10 │       │   │   │   ├── #ws:0
11 │       │   │   │   │   └── \\x20
12 │       │   │   │   └── ϵ: #__1
13 │       │   │   ├── +
14 │       │   │   ├── #__1:0
15 │       │   │   │   ├── #ws:0
16 │       │   │   │   │   └── \\x20
17 │       │   │   │   └── ϵ: #__1
18 │       │   │   └── #E:4
19 │       │   │       └── #N:0
20 │       │   │           ├── 2
21 │       │   │           └── ϵ: #__2
22 │       │   ├── #__1:0
23 │       │   │   ├── #ws:0
24 │       │   │   │   └── \\x20
25 │       │   │   └── ϵ: #__1
26 │       │   ├── *
27 │       │   ├── #__1:0
28 │       │   │   ├── #ws:0
29 │       │   │   │   └── \\x20
30 │       │   │   └── ϵ: #__1
31 │       │   └── #E:4
32 │       │       └── #N:0
33 │       │           ├── 3
34 │       │           └── ϵ: #__2
35 │       └───┬── @5
36 │           ├── @9
37 │           ├── +
38 │           ├── @14
39 │           └── #E:2
40 │               ├── @18
41 │               ├── @22
42 │               ├── *
43 │               ├── @27
44 │               └── @31
45 └── ϵ: #__5`}
                />
                <p>
                    Notice the ambiguity nodes for <Code>#E</Code> on lines 4 and 35, representing the two options for parsing the expression, namely{' '}
                    <Code>(1 + 2) * 3</Code> vs <Code>1 + (2 * 3)</Code> respectively
                </p>
                <h3>Semantic Analysis &amp; Code Generation</h3>
                <p>
                    The next steps involve implementing the semantic analysis, and code generation pieces of the compiler. With a suitable CFG specification for
                    the language, the SRNGLR parser will output parse trees for given input source text. The parse trees need to be analyzed to ensure that they
                    follow the languages semantics, e.g. variables may only be referenced when in scope, function calls have the same number of arguments as
                    their definitions, type safety checks, etc.
                </p>
                <p>
                    After semantic analysis, the last step of the compiler is code generation. For dewy, I plan to leverage the{' '}
                    <ExternalLink href="https://llvm.org/">LLVM compiler toolchain</ExternalLink>, meaning I convert the parse tree into{' '}
                    <ExternalLink href="https://en.wikipedia.org/wiki/LLVM#Intermediate_representation">LLVM IR</ExternalLink> (read LLVM assembly), which is
                    then optimized and compiled down to a binary executable. I&apos;m also planning to have an optional C code generator, which would allow for
                    extreme levels of portability in the compiler&mdash;most systems could build and run the Dewy compiler, as a C99 compiler would be the only
                    dependency.
                </p>
                <h3>Build It Yourself</h3>
                <p>
                    Since the language is far from complete, the most you can build right now is the SRNGLR parser. The git repo includes several example
                    grammar and source code pairs that can be run by the current parser.
                </p>
                <CodeBlock
                    language="bash"
                    text={`$ git clone git@github.com:david-andrew/dewy.git
$ cd dewy/src/compiler
$ make dewy
$ ./dewy path/to/grammar/file path/to/source/file`}
                />
                <p>
                    The project includes several test grammar/source file pairs in the tests/ directory. e.g. the simple expression grammar from above could be
                    run like so:
                </p>
                <CodeBlock
                    language="bash"
                    text={`$ ./dewy ../../tests/grammar8.dewy ../../tests/source8.dewy #ambiguous version
$ ./dewy ../../tests/grammar3.dewy ../../tests/source8.dewy #unambiguous version`}
                />
                <h3>Links</h3>
                <List>
                    <List.Item>
                        <span>
                            <Icon name="github" size="big" />
                            <ExternalLink href="https://github.com/david-andrew/dewy">Github Repo</ExternalLink>
                        </span>
                    </List.Item>
                    <List.Item>
                        <span>
                            <Icon name="trello" size="big" />
                            <ExternalLink href="https://trello.com/b/YYsedENy/dewyspeak">Project Trello Board</ExternalLink>
                        </span>
                    </List.Item>
                    <List.Item>
                        <span>
                            <Icon name="file alternate" size="big" />
                            <ExternalLink href="https://david-andrew.github.io/dewy/">Language Documentation</ExternalLink>
                        </span>
                    </List.Item>
                </List>
            </PageContainer>
        </>
    )
}
