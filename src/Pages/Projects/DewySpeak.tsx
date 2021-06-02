import React from 'react'
import { PageContainer, PageHeading } from '../../Components'
import { useGithubTimestamp, Code, CodeBlock } from '../../utilities'

/*
Layout

Abstract:
- basic summary
--> what
--> why
--> how
- important links
--> github
--> documentation
--> trello

Work so far
- RNGLR parser


*/

export const DewySpeak = (): JSX.Element => {
    const subtitle = useGithubTimestamp('dewy')

    return (
        <>
            <PageContainer>
                <PageHeading title="Dewy Programming Language" subtitle={subtitle} />
                <p>
                    Dewy is a programming language I have been personally developing since 2016. The main goal is to build a language that has the exact feature
                    set that I&apos;ve always wished existed. Dewy is a general purpose language with a focus on scientific and engineering applications. At a
                    high level, Dewy is sort of like an amalgam of the best aspects of Matlab, Python, TypeScript, and Rust, but it certainly has it&apos;s own
                    unique flare.
                </p>
                <p>
                    So far in development, I have developed the syntax for the language (and meta-language), and have built a prototype SRNGLR parser[1][2] from
                    scratch in C. The next steps are to write out the language Context Free Grammar (CFG) in the meta-language, implement the parser back ends
                    (LLVM and C) for generating code from the parse tree, and then build out the standard library.
                </p>
                <h3>Parsing</h3>
                <p>
                    All programming languages start with a compiler, which itself is made of several parts, namely: lexing, parsing, semantic analysis, and code
                    generation. Dewy makes use of a SRNGLR parser which allows the lexing and parsing phases be combined into a single step.
                </p>
                <p>
                    To parse a mathematical expression like <Code>1 + 2 * 3</Code> we first have to define the grammar for how raw text gets converted to a
                    parse tree. For this, I&apos;ve developed the Dewy Meta Language which allows for the specification of any Context Free Grammar (CFG), as
                    well as some context sensitive grammars which can be parsed by SRNGLR
                </p>
                <p>
                    Normally a grammar must be unambiguous to work with standard LR, LALR, etc. parsers. This complicates the process of writing the grammar.
                    For the math expression <Code>1 + 2 * 3</Code>, or any other math expression, the unambiguous version of the grammar might look like this:
                </p>
                <CodeBlock
                    text={`//addition/subtraction (left associative)
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

#start = (#w* #S)+ #w*;`}
                />
                <p>However, because SRNGLR can handle ambiguities, the grammar can be simplified to something like this:</p>
                <CodeBlock
                    text={`#E = '(' #ws* #E #ws* ')';  //parenthesis
#E = #E #ws* [+\\-] #ws* #E; //addition/subtraction
#E = #E #ws* [*/] #ws* #E;  //multiplication/division
#E = #E #ws* '^' #ws* #E;   //exponentiation
#E = #N | #I;               //terms (numbers/identifiers)
#N = [0-9]+;
#I = [A-Za-z_] [A-Za-z0-9!@%&_?]*;

#ws = [\\n\\x20];             // whitespace

#start = (#ws* #E)+;`}
                />
                <p>
                    Note that for the ambiguous grammar, precedence and associativity still need to be handled at some point in the process. SRNGLR just
                    provides the flexibility to handle them more conveniently.
                </p>
                <p>
                    Running the first grammar on <Code>1 + 2 * 3</Code> we get the following parse tree
                </p>
                <CodeBlock
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
                <p>while parsing the same input with the ambiguous grammar returns the following parse forests:</p>
                <CodeBlock
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
                    Notice the ambiguity nodes on for <Code>#E</Code> on lines 4 and 35, representing the two options for parsing the expression, namely{' '}
                    <Code>(1 + 2) * 3</Code> vs <Code>1 + (2 * 3)</Code> respectively
                </p>
                <h3>Semantic Analysis</h3>
                <p>Using the parse forest generated by the SRNGLR parser, </p>
                <h3>Code Generation</h3>
                <p>LLVM and potentially C</p>
                <br />
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas efficitur mi a blandit faucibus. Praesent vitae dapibus lorem, eget
                    egestas nisl. Suspendisse condimentum vulputate turpis id sagittis. Nunc sodales augue velit, et porta ante scelerisque ut. Phasellus
                    dapibus suscipit nulla, quis elementum lectus consectetur ut. Pellentesque eu lacus eget libero lacinia posuere. Morbi a arcu ut diam
                    feugiat rutrum. Donec tristique, lacus id mollis ullamcorper, nibh elit ultrices metus, at tincidunt nibh metus ac quam. Donec convallis
                    consequat magna eu ultricies. Pellentesque id libero et lectus venenatis tincidunt. Phasellus vestibulum risus at lorem dignissim sodales.
                    Nam ac varius eros.
                    <br />
                    <br />
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras viverra posuere velit et maximus. Proin laoreet dolor quis sapien pharetra, in
                    faucibus lorem bibendum. Praesent sagittis et nunc non vulputate. Vestibulum sit amet enim in massa feugiat fringilla. In a leo posuere,
                    dictum eros nec, posuere augue. Sed iaculis sit amet nisl sed sollicitudin. Morbi consequat augue non porta porta. Sed maximus ac lorem sed
                    mattis. Maecenas luctus blandit semper. Integer vestibulum ullamcorper nulla, eu accumsan tellus feugiat sed. Vestibulum tempor, risus et
                    condimentum bibendum, ante massa molestie nibh, a mollis diam metus sit amet leo. Sed odio neque, pulvinar vel lacinia ac, facilisis eget
                    massa. Donec tempor lectus justo, at luctus mauris vehicula id. Nullam dictum, nisi in vehicula semper, erat mi aliquet dolor, sit amet
                    sagittis velit dolor at dui. Donec rutrum est et porttitor vulputate. Vestibulum maximus, mi ac tempor posuere, enim ligula condimentum
                    lectus, sed ullamcorper metus felis quis ligula. Proin sit amet tincidunt mauris. Sed gravida velit at lacus lobortis, vel dignissim elit
                    finibus. In consectetur tortor ut odio auctor venenatis. Maecenas et cursus tellus, non mollis dolor. Phasellus molestie porttitor nisl, nec
                    semper diam mollis a. Aliquam nec nibh eget massa scelerisque ultrices. Vestibulum justo libero, accumsan vitae ex id, lacinia mattis massa.
                    Sed eu dui dolor. Suspendisse ac nunc blandit, sagittis lorem ut, ornare neque. Vestibulum arcu urna, elementum in justo eget, sodales
                    tristique elit. Cras condimentum semper tortor, non tristique sem scelerisque eget. Pellentesque habitant morbi tristique senectus et netus
                    et malesuada fames ac turpis egestas. In scelerisque ligula est, ut pharetra tellus egestas non. Aliquam erat volutpat. Maecenas rutrum,
                    erat sit amet volutpat ultrices, risus lacus lacinia purus, aliquet blandit sem tellus in neque. Donec id ipsum neque. Vestibulum imperdiet,
                    quam sed consectetur vulputate, nisi lectus tristique tortor, vitae rutrum dui est sit amet tellus. Praesent gravida consectetur augue, ac
                    ullamcorper enim euismod ac. Ut bibendum mi varius enim laoreet scelerisque. Fusce ut enim eget justo convallis fermentum. Class aptent
                    taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Pellentesque fermentum ultrices elit, vel porttitor libero
                    cursus vel. Integer sit amet mollis lacus. Sed sit amet mauris aliquam, vehicula quam vitae, feugiat orci. Fusce congue dictum massa. Sed
                    bibendum auctor enim ac cursus. Nunc sed diam quis mi congue volutpat. Pellentesque habitant morbi tristique senectus et netus et malesuada
                    fames ac turpis egestas. Sed nec tellus magna. Nullam et velit dignissim, ornare nunc a, scelerisque nisl. Quisque rhoncus magna sed nibh
                    tincidunt, nec pretium arcu ultrices. Vivamus condimentum magna ante, eget faucibus diam blandit ac.
                </p>
            </PageContainer>
        </>
    )
}
