import { H3, P, Link } from '@/app/(components)/ui'
import { CodeBlock, CodeEditor } from '@/app/(components)/syntax'
import { IconBullet, IconBulletList } from '@/app/(components)/icon_bullet'
import { DewyDemo } from './dewy'
// import { MyComponent } from './test_pyodide'

import { fetch_dewy_interpreter_source, fetch_dewy_examples } from './fetch_dewy'

const Page = async (): Promise<JSX.Element> => {
    const dewy_interpreter_source = await fetch_dewy_interpreter_source()
    const dewy_examples = await fetch_dewy_examples()

    return (
        <>
            <DewyDemo {...{ dewy_interpreter_source, dewy_examples }} />
            <H3>About</H3>
            <P>
                Dewy is a programming language I have been developing off and on since 2016. The main goal is to build a
                language with all the features I&apos;ve always wished existed in a single language. Dewy is a general
                purpose language with a focus on scientific and engineering applications. At a high level, Dewy is sort
                of like an amalgamation of the best aspects of Matlab, Python, TypeScript, and Rust, but with its own
                unique flare.
            </P>
            <P>An example of the common FizzBuzz program implemented in Dewy might look like this:</P>
            <CodeBlock
                // flatten
                code={`multiples = [3 -> 'Fizz' 5 -> 'Buzz' /{7 -> 'Bazz' 11 -> 'Bar'}/]
loop i in [0..100)
{
    printed_words = false
    loop [multiple word] in multiples 
    {
        if i % multiple =? 0 
        { 
            print(multiple)
            printed_words = true
        }
    }
    if not? printed_words print(i)
    printl()
}`}
            />
            <P>Or a more functional style implementation might look like this:</P>
            <CodeBlock
                // flatten
                code={`multiples = [3 -> 'Fizz' 5 -> 'Buzz' /{7 -> 'Bazz' 11 -> 'Bar'}/]
range = [0..100)

//indexing at [, ..] and [..,] adds singleton dimensions
word_bools = range[, ..] .% multiples.keys[..,] .=? 0

// #\` means transpose, which behaves like python's zip()
word_grid = [multiples.values word_bools]\`.map(
[word bools] => bools.map(b => if b word else '')
)

raw_lines = word_grid\`.map(line_words => line_words.join(''))

lines = [raw_lines range]\`.map(
    (raw_line, i) => if raw_line.length =? 0 '{i}' else raw_line
)

lines.join('\\n') |> printl
`}
            />
            <P>For clarity, the variables at each step look like so:</P>
            <CodeBlock
                // flatten
                code={`word_bools = [[true false false true false false true false ...]
             [true false false false false true false false ...]]

word_grid = [['Fizz' '' '' 'Fizz' '' '' 'Fizz' '' '' 'Fizz' '' '' ...]
            ['Buzz' '' '' '' '' 'Buzz' '' '' '' '' 'Buzz' '' '' ...]]

raw_lines = ['FizzBuzz' '' '' 'Fizz' '' 'Buzz' 'Fizz' '' '' 'Fizz' 'Buzz' '' ...]

lines = ['FizzBuzz' '1' '2' 'Fizz' '4' 'Buzz' 'Fizz' '7' '8' 'Fizz' 'Buzz' '11' ...]
`}
            />
            <P>
                Currently, I am learning LLVM, in order to build a compiler back-end to connect with the aforementioned
                parser front-end. Further steps will involve adding some missing features to the parser, writing out the
                full language Context Free Grammar (CFG) in the meta-language, building out the standard library, and
                then compiling the language in itself.
            </P>
            <H3>Semantic Analysis &amp; Code Generation</H3>
            <P>
                The next steps involve implementing the semantic analysis, and code generation pieces of the compiler.
                With a suitable CFG specification for the language, the CNP will output parse trees for given input
                source text. The parse trees need to be analyzed to ensure that they follow the languages semantics,
                e.g. variables may only be referenced when in scope, function calls have the same number of arguments as
                their definitions, type safety checks, etc.
            </P>
            <P>
                After semantic analysis, the last step of the compiler is code generation. For dewy, I plan to leverage
                the <Link href="https://llvm.org/">LLVM compiler toolchain</Link>, meaning I convert the parse tree into{' '}
                <Link href="https://en.wikipedia.org/wiki/LLVM#Intermediate_representation">LLVM IR</Link> (read LLVM
                assembly), which is then optimized and compiled down to a binary executable. I&apos;m also considering
                having an optional C code generator, which would allow for extreme levels of portability in the
                compiler&mdash;most systems could build and run the Dewy compiler, as a C99 compiler would be the only
                dependency.
            </P>
            <P>
                In the future, I&apos;ll have plenty of updates for integrating the CNP front-end with the LLVM back
                end.
            </P>

            <H3>Links</H3>
            <IconBulletList>
                <IconBullet icon="github">
                    <Link href="https://github.com/david-andrew/dewy-lang">Github Repo</Link>
                </IconBullet>
                <IconBullet icon="trello">
                    <Link href="https://trello.com/b/YYsedENy/dewyspeak">Project Trello Board</Link>
                </IconBullet>
                <IconBullet icon="docs">
                    <Link href="https://david-andrew.github.io/dewy-lang/">Language Documentation</Link>
                </IconBullet>
            </IconBulletList>
        </>
    )
}

export default Page
