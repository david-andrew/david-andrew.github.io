import { P, H3, Link, UL } from "@/app/(components)/ui";
import { CodeBlock, Code, PlaintextBlock } from "@/app/(components)/syntax";
// import { dewy_meta_lang, dewy_meta_theme } from "@/app/(components)/syntax_dewy_meta";
import { IconBullet, IconBulletList } from "@/app/(components)/icon_bullet";
import { DemoGrammar, DewyLiveParser, GrammarCodeBlock } from "./parser";



//example grammars the user can prepopulate the demo with
const exampleGrammars: DemoGrammar[] = [
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
    {
        label: 'Physical Numbers',
        grammar: `//example grammar for parsing numbers with units

// rules for floating point numbers
#digits = [0-9];
#int = #digits+;
#dec = #int | ('.' #int) | (#int '.') | (#int '.' #int);
#float = #dec ([eE] [+\\-]? #int)?;

// rules for physical units
#yotta_symbol = 'Y'; #yotta_name = {yotta};
#zetta_symbol = 'Z'; #zetta_name = {zetta};
#exa_symbol   = 'E'; #exa_name   = {exa};
#peta_symbol  = 'P'; #peta_name  = {peta};
#tera_symbol  = 'T'; #tera_name  = {tera};
#giga_symbol  = 'G'; #giga_name  = {giga};
#mega_symbol  = 'M'; #mega_name  = {mega}; 
#kilo_symbol  = 'k'; #kilo_name  = {kilo};
#centi_symbol = 'c'; #centi_name = {centi};
#milli_symbol = 'm'; #milli_name = {milli};
#micro_symbol = 'u' | 'μ'; #micro_name = {micro};
#nano_symbol  = 'n'; #nano_name  = {nano};
#pico_symbol  = 'p'; #pico_name  = {pico};
#femto_symbol = 'f'; #femto_name = {femto};
#atto_symbol  = 'a'; #atto_name  = {atto};
#zepto_symbol = 'z'; #zepto_name = {zepto};
#yocto_symbol = 'y'; #yocto_name = {yocto};
#prefix_symbol = #yotta_symbol | #zetta_symbol | #exa_symbol | #peta_symbol | #tera_symbol | #giga_symbol | #mega_symbol | #kilo_symbol | #centi_symbol | #milli_symbol | #micro_symbol | #nano_symbol | #pico_symbol | #femto_symbol | #atto_symbol | #zepto_symbol | #yocto_symbol;
#prefix_name = #yotta_name | #zetta_name | #exa_name | #peta_name | #tera_name | #giga_name | #mega_name | #kilo_name | #centi_name | #milli_name | #micro_name | #nano_name | #pico_name | #femto_name | #atto_name | #zepto_name | #yocto_name;
#gram_symbol    = 'g';   #gram_name    = {gram};             #gram_plural    = {grams};
#metre_symbol   = 'm';   #metre_name   = {meter} | {metre};  #metre_plural   = {meters} | {metres};
#second_symbol  = 's';   #second_name  = {second};           #second_plural  = {seconds};
#ampere_symbol  = 'A';   #ampere_name  = {ampere} | {amp};   #ampere_plural  = {amperes} | {amps};
#kelvin_symbol  = 'K';   #kelvin_name  = {kelvin};           //kelvin is the plural of kelvin. (may include anyways though...)
#mole_symbol    = 'mol'; #mole_name    = {mole} | {mol};     #mole_plural    = {moles} | {mols}; //mol is weird because it's symbol can also be it's written out name, i.e. Gmol gigamol, gigamols, gigamole, gigamoles   
#candela_symbol = 'cd';  #candela_name = {candela};          #candela_plural = {candelas}; 
#unit_symbol = #gram_symbol | #metre_symbol | #second_symbol | #ampere_symbol | #kelvin_symbol | #mole_symbol | #candela_symbol;
#unit_name = #gram_name | #metre_name | #second_name | #ampere_name | #kelvin_name | #mole_name | #candela_name;
#unit_plural = #gram_plural | #metre_plural | #second_plural | #ampere_plural | #mole_plural | #candela_plural; //kelvin does not have a plural form
#unit = (#prefix_symbol ? #unit_symbol) | (#prefix_name ? (#unit_name | #unit_plural));

// expressions for units
#unit_expr = #A;
#A = #A ' '* '*' ' '* #B | #A ' '* '/' ' '* #B | #B | #A ' '* #B | #B;
#B = #C ' '* '^' ' '* #int | #C;
#C = #unit | '(' ' '* #unit_expr ' '* ')';

#physical_number = #float (' '? #unit_expr)?;

#start = (#physical_number | #unit) '\\n'?;

//multiline version
//#start = '\\n'? ((#physical_number | #unit) '\\n'?)*;`,
        source: `9.81 m/s`,
    },
]

//used for discussing specific grammars later
const ambiguousExpressionGrammar = exampleGrammars[4]
const unambiguousExpressionGrammar = exampleGrammars[5]


const Page = (): JSX.Element => {
    return (
        <>
            <DewyLiveParser grammars={exampleGrammars} initial_idx={4} />
            <H3>About</H3>
            <P>
                This is mostly old work experimenting with different parser-generator technologies for <Link href='/projects/dewy'>dewy</Link>.
                The above demo is a C implementation of a Scannerless Right-Nulled Generalized Left-Right (SRNGLR) parser-generator. You can specify
                a grammar using my context-free grammar syntax, and provide an input string which will be parsed according to that grammar. You can
                then view parse forest and other various outputs from the parser in the results table. There are also several example grammars you
                can choose from to get started.
            </P>
            <P>
                Some interesting features of SRNGLR parsers:
            </P>
            <UL>
                <li>scannerless means tokenizing and parsing are combined into a single step. This complicates handling whitespace, but provides much more flexibility in identifying structure</li>
                <li>GLR is a generalized approach to LR parsing that is able to parse multiple paths in parallel, and handle ambiguous grammars</li>
                <li>Right-Nulled is a fix applied to GLR parser tables as the original GLR specification had a bug for some right recursion cases</li>
            </UL>
            <P>
                The main papers on on implementing SRNGLR parsers are{' '}
                <Link href="https://raw.githubusercontent.com/david-andrew/dewy-lang/master/resources/Right_Nulled_GLR_Parsers.pdf">Right-Nulled GLR Parsers</Link>{' '}
                and{' '}
                <Link href="https://raw.githubusercontent.com/david-andrew/dewy-lang/master/resources/Faster_Scannerless_Parsing.pdf">Faster Scannerless GLR Parsing</Link>
            </P>
            <P>
                In addition to the C SRNGLR parser, I also worked on C and Python implementations of{' '}
                <Link href="https://raw.githubusercontent.com/david-andrew/dewy-lang/master/resources/gll/2019_derivation_representation_using_binary_subtree_sets.pdf">Clustered Nonterminal Parsing (CNP)</Link>{' '}
                and a Python implementation of{' '}
                <Link href="https://raw.githubusercontent.com/david-andrew/dewy-lang/master/resources/gll/2020_purely_function_gll_parsing.pdf">Functional GLL Parsing</Link>{' '}
            </P>
            <P>    
                I am quite convinced that GLL parsing is the future, due to the ease of implementation, and the versatility afforded by generalized
                parsing techniques. It will be a killer feature in dewy when I finally am able to get it working. The main issue I had with all of 
                these generalized parser generators is the data structure they produce&mdash;SRNGLR produces a{' '}
                <Link href="https://lark-parser.readthedocs.io/en/latest/_static/sppf/sppf.html">parse forest</Link>, and CNP and GLL produce a 
                Binary Subtree Representation (see:{' '}
                <Link href="https://raw.githubusercontent.com/david-andrew/dewy-lang/master/resources/gll/2019_derivation_representation_using_binary_subtree_sets.pdf">Clustered Nonterminal Parsing</Link>).
                Selecting from ambiguities and converting to the more standard Abstract Syntax Trees (AST) structure is non-trivial.
                Working on these had become a time sink, so for now, development on parser-generators has been put on hold in lieu of hand crafting a parser. 
            </P>
            <H3>Parsing Theory</H3>
            <P>
                All programming languages start with a compiler, which itself is made of several parts, namely: lexing, parsing, semantic analysis, and code
                generation. Eventually, dewy will make use of some sort of scannerless generalized parser-generator (likely GLL) which allows the lexing and
                parsing phases be combined into a single step, as well as allowing for an extremely simple parser implementation (a particularly useful
                property for bootstrapping the language).
            </P>
            <P>
                To parse a mathematical expression like <Code code='1 + 2 * 3'/> we first have to define the grammar for how raw text gets converted to a
                parse tree. For this, I&apos;ve developed the Dewy Meta Language which allows for the specification of any Context Free Grammar (CFG), as
                well as some context sensitive grammars. Additionally, the meta-language / parser are optimized to allow for arbitrary unicode characters
                as part of the language alphabet, whereas parsers are often limited a much smaller alphabet, e.g. ASCII.
            </P>
            <P>
                Normally a grammar must be unambiguous to work with standard LR, LALR, etc. parsers. This complicates the process of writing the grammar, as
                often times, the natural way to express a language will be ambiguous, and require careful work to disambiguate. For the math expression{' '}
                <Code code='1 + 2 * 3'/>, or any other math expression, the unambiguous version of the grammar might look like this:
            </P>
            <GrammarCodeBlock code={unambiguousExpressionGrammar.grammar} />
            <br/>            
            <P>
                Precedence is handled by restricting which expressions can be subexpressions of the different expressions in the grammar.
                Associativity is also handled in a similar fashion, namely the left or right hand side is restricted to specific subexpression
                types that generate the correct associativity. Ultimately though, because generalized parsers can handle ambiguities, the
                grammar can be simplified to something like this:
            </P>
            <GrammarCodeBlock code={ambiguousExpressionGrammar.grammar} />
            <br/>
            <P>
                Note that for the ambiguous grammar, precedence and associativity still need to be handled at some point in the process. Generalized parsers
                just provide the flexibility to handle them later in the parsing process, when it is much more convenient.
            </P>
            <P>
                Running the first grammar on <Code code='1 + 2 * 3'/> we get the following parse tree
            </P>
            <PlaintextBlock
                className="text-lg md:text-xl bg-[#232323]"
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
            <P>while parsing the same input with the ambiguous grammar returns the following parse forest:</P>
            <PlaintextBlock
                className="text-lg md:text-xl bg-[#232323]"
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
            <P>
                Notice the ambiguity nodes for <Code code='#E'/> on lines 4 and 35, representing the two options for parsing the expression, namely{' '}
                <Code code='(1 + 2) * 3'/> vs <Code code='1 + (2 * 3)'/> respectively
            </P>
            <H3>Build It Yourself</H3>
            <P>Each of the parser implementations is on its own branch of the <Link href="github.com/david-andrew/dewy-lang">dewy github repo</Link>:</P>
            <IconBulletList className="ml-6">
                <IconBullet icon="github">
                    <Link href="https://github.com/david-andrew/dewy-lang/tree/C_SRNGLR_Parser">C SRNGLR Parser branch</Link>
                </IconBullet>
                <IconBullet icon="github">
                <Link href="https://github.com/david-andrew/dewy-lang/tree/C_Clustered_Nonterminal_Parser">C Clustered Nonterminal Parser branch</Link>
                </IconBullet>
                <IconBullet icon="github">
                <Link href="https://github.com/david-andrew/dewy-lang/tree/Python_GLL_Parser">Python GLL Parser branch</Link>
                </IconBullet>
            </IconBulletList>
            <br/>
            <P>
                Clone the repo and checkout the branch you want to see:
            </P>
            <CodeBlock
                language="bash"
                code={
`git clone git@github.com:david-andrew/dewy-lang.git
cd dewy-lang
git checkout C_SRNGLR_Parser #or C_Clustered_Nonterminal_Parser or Python_GLL_Parser
cd src`}
            />
            <P>
                The two C parsers can be built and run with:                
            </P>
            <CodeBlock
                language="bash"
                code={
`make dewy
./dewy path/to/grammar/file path/to/source/file`}
            />
            <P>
                The project includes several test grammar/source file pairs in the <Code code='dewy-lang/tests/'/> directory. e.g.
                the simple expression grammars from above could be run like so:
            </P>
            <CodeBlock
                language="bash"
                code={
`./dewy ../tests/8.grammar ../tests/8.source #ambiguous version
./dewy ../tests/3.grammar ../tests/3.source #unambiguous version`}
            />
            <P>
                The Python parser (which only operates on internal data) can be run directly with:
            </P>
            <CodeBlock
                language="bash"
                code="python fungll.py"
            />
        </>
    )
}

export default Page;