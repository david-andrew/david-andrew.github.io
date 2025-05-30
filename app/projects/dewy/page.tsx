import { H3, P, Link, UL } from '@/app/(components)/ui'
import { IconBullet, IconBulletList } from '@/app/(components)/icon_bullet'
import { DewyCodeBlock } from './code_block'
import { DewyDemo } from './dewy'

import { fetch_dewy_interpreter_source, fetch_dewy_examples } from './fetch_dewy'

const Page = async (): Promise<JSX.Element> => {
    const dewy_interpreter_source = await fetch_dewy_interpreter_source()
    const dewy_examples = await fetch_dewy_examples()

    return (
        <>
            <DewyDemo {...{ dewy_interpreter_source, dewy_examples }} />
            <H3>About</H3>
            <P>
                Dewy is a programming language I have been developing off and on since 2016. It is a general purpose
                language, designed with engineering applications in mind. Think the functionality and ease of use of
                matlab or python combined with the speed of a compiled language like C or Rust, but with its own unique
                flare.
            </P>
            <P className="mb-2">Some key planned features include:</P>
            <UL>
                <li>
                    <strong>Functional and Imperative</strong> - Dewy is an imperative language with strong support for
                    functional programming. This allows for a very flexible programming style, where you can use the
                    best tool for the job.
                </li>

                <li>
                    <strong>Expression based syntax</strong> - Dewy uses an expression based syntax, meaning that
                    everything is an expression. This allows for a very simple yet powerful syntax, where common
                    language features often are just a free consequence of the syntax
                </li>

                <li>
                    <strong>Garbage-collector-free memory management</strong> - Dewy uses a unique memory management
                    system, allowing for fast and efficient memory management without the need for a garbage collector.
                </li>

                <li>
                    <strong>Strong type system</strong> - Dewy has a powerful static type system with inference,
                    reminiscent of those in Typescript and Julia.
                </li>

                <li>
                    <strong>Built in unit system</strong> - Dewy has a built in unit system, allowing you to easily work
                    with units and convert between them. This is especially useful for engineering applications.
                </li>

                <li>
                    <strong>Strong math support</strong> - Dewy has strong support many math features, including complex
                    numbers, quaternions, vectors, matrices, and more. This is especially useful for engineering
                    applications.
                </li>
            </UL>
            <P>An example of the common FizzBuzz program implemented in Dewy might look like this:</P>
            <DewyCodeBlock
                src={`multiples = [3 -> 'Fizz' 5 -> 'Buzz' %{7 -> 'Bazz' 11 -> 'Bar'}%]
loop i in [0..100)
{
    printed_words = false
    loop [multiple word] in multiples 
    {
        if i mod multiple =? 0 
        { 
            print(multiple)
            printed_words = true
        }
    }
    if not printed_words print(i)
    printl()
}`}
            />
            <P>Or a more functional style implementation might look like this:</P>
            <DewyCodeBlock
                src={`multiples = [3 -> 'Fizz' 5 -> 'Buzz' %{7 -> 'Bazz' 11 -> 'Bar'}%]
range = [0..100)

% indexing at [new ..] and [.. new] adds singleton dimensions wherever there is new
word_bools = range[new ..] .mod multiples.keys[.. new] .=? 0

% \` means transpose, which behaves like python's zip()
word_grid = [multiples.values word_bools]\`.map(
    [word bools] => bools.map(b => if b word else '')
)

raw_lines = word_grid\`.map(line_words => line_words.join(''))

lines = [raw_lines range]\`.map(
    (raw_line i) => if raw_line.length =? 0 '{i}' else raw_line
)

lines.join'\\n' |> printl`}
            />
            <P>For clarity, the variables at each step look like so:</P>
            <DewyCodeBlock
                src={`word_bools = [[true false false true false false true false ...]
             [true false false false false true false false ...]]

word_grid = [['Fizz' '' '' 'Fizz' '' '' 'Fizz' '' '' 'Fizz' '' '' ...]
            ['Buzz' '' '' '' '' 'Buzz' '' '' '' '' 'Buzz' '' '' ...]]

raw_lines = ['FizzBuzz' '' '' 'Fizz' '' 'Buzz' 'Fizz' '' '' 'Fizz' 'Buzz' '' ...]

lines = ['FizzBuzz' '1' '2' 'Fizz' '4' 'Buzz' 'Fizz' '7' '8' 'Fizz' 'Buzz' '11' ...]`}
            />
            <H3>Current Status</H3>
            <P>
                Currently I&apos;m working through a simple interpreter for the language (powering the demo above).
                I&apos;ve got a tokenizer, a basic interpreter backend, and handling of a few basic types of syntaxes
                via the parser. But much of the syntax is still unimplemented, hence the long list of &quot;Broken
                Examples&quot;. Thus the current focus is finishing parser support for the rest of the syntax features.
            </P>
            <P>
                Previously I had been doing a lot of development on bleeding edge{' '}
                <Link href="/projects/dewy_old">parser generators</Link>, but that ended up being too big of a time sink
                for not much visible progress. Instead, for the time being, I ended up just hand rolling a parser in
                python, which has led to actually runnable code! I&apos;ll definitely revisit parser generators in the
                future when the language is further along.
            </P>
            <P>
                After the parser is complete, the next steps will be working on compiling to different backends.
                Initially I was planning to target{' '}
                <Link href="https://en.wikipedia.org/wiki/LLVM#Intermediate_representation">LLVM</Link> as the primary
                backend, however I recently discovered <Link href="https://c9x.me/compile/">QBE</Link>, which is a much
                lighter alternative that supposedly gets 70% of the performance of LLVM for only 10% of the code. Longer
                term I&apos;m interested in supporting a wider range of backend targets, like C, a universal{' '}
                <Link href="https://en.wikipedia.org/wiki/Polyglot_(computing)">polyglot</Link> targeting many scripting
                languages simultaneously (sh, bash, windows cmd, powershell, javascript, python, etc.), and eventually
                LLVM too. At some point I&apos;ll start building out the standard library, and bootstrapping the
                compiler to be able to compile itself&mdash;at which point we might be ready for a version 0 release!
            </P>
            <H3>About the Demo</H3>
            <P>
                The demo above was actually pretty complex to put together. The current interpreter is written in
                python, and this website is statically hosted, which meant the demo required some way to statically run
                python code without a server. For this, I used <Link href="https://pyodide.org/">Pyodide</Link>, which
                is basically <Link href="https://github.com/python/cpython">CPython</Link> compiled to{' '}
                <Link href="https://webassembly.org/">WebAssembly</Link> via{' '}
                <Link href="https://emscripten.org/">Emscripten.</Link>
            </P>
            <P>
                Pyodide itself isn&apos;t too difficult to use, except for the fact that it doesn&apos;t have good
                support for asynchronous standard input&mdash;it really wants to halt the entire UI while you type input
                into a stock browser popup prompt. To get around this, I found a{' '}
                <Link href="https://www.npmjs.com/package/sync-message">handy library</Link> where you run pyodide in a
                web worker, and then any time it wants to read input, the worker makes a synchronous XHR request to a
                service worker, blocking the pyodide web worker until the service worker receives a response from the
                main thread with the input, which the service worker can then pass back to the pyodide worker. Suffice
                it to say, I don&apos;t think I ever want to deal with service workers again.
            </P>
            <P>
                Now that python is handled, the next aspect is getting the Dewy interpreter itself to run. For this, I
                fetch (at website build time) the source code directly from{' '}
                <Link href="https://github.com/david-andrew/dewy-lang/tree/master/src/compiler">github</Link>. I then
                abuse the python import lib to allow loading &quot;modules&quot; directly from strings, and then pass
                all of the dewy source in as string modules. Then I have a little wrapper function for the entry point
                which receives a dewy source code string, and runs the program. The entry point can then be called from
                the browser via a javascript wrapper function.
            </P>
            <P>
                The final piece of the puzzle is the text entry, and terminal emulator. For text input, I&apos;m using
                the <Link href="https://codemirror.net/">Code Mirror Library</Link> with a custom syntax highlighter.
                For the terminal, I use the <Link href="https://xtermjs.org/">xterm.js</Link> library. I then hooked up
                stdin and stdout from pyodide to interact with the terminal, and voila! A Dewy interpreter running in
                the browser.
            </P>
            <P>
                There are definitely some rough edges, and the parser only supports a small handful of features, but it
                runs! It&apos;s probably the easiest way to try out the language, and I&apos;m looking forward to
                getting all of the broken example programs working!
            </P>

            <H3>Links</H3>
            <IconBulletList>
                <IconBullet icon="github">
                    <Link href="https://github.com/david-andrew/dewy-lang">Github Repo</Link>
                </IconBullet>
                {/* <IconBullet icon="trello">
                    <Link href="https://trello.com/b/YYsedENy/dewyspeak">Project Trello Board</Link>
                </IconBullet> */}
                <IconBullet icon="docs">
                    <Link href="https://david-andrew.github.io/dewy-lang/">Language Docs</Link>
                </IconBullet>
            </IconBulletList>
        </>
    )
}

export default Page
