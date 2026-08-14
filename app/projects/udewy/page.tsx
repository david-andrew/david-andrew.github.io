import { Link, H2, H3, P, UL } from '@/app/(components)/ui'
import { IconBullet, IconBulletList } from '@/app/(components)/icon_bullet'
import { Code, CodeBlock } from '@/app/(components)/syntax'

const page = (): JSX.Element => {
    return (
        <>
            <P>
                μDewy (udewy or &quot;micro-dewy&quot;) is a strict subset of the{' '}
                <Link href="/projects/dewy">Dewy Programming Language</Link> I developed while taking a break from
                working on the full Dewy compiler. The main idea was to strip out features from Dewy until basically the
                simplest useful subset remained. The μDewy compiler is relatively small, and a bootstraped version
                written in μDewy is maintained in parallel to the python implementation of the compiler. Well-formed
                μDewy programs can be compiled by the full Dewy compiler, and will have the same behavior.
            </P>
            <P>
                From a semantic perspective, μDewy is pretty similar to the B programming language:
                <UL>
                    <li>No type system. Everything is just 64-bit int</li>
                    <li>Minimal runtime and compiler footprint</li>
                    <li>Very close to the underlying machine language</li>
                </UL>
            </P>
            <P>
                μDewy&quot;s main quirks stem from aiming to be a strict subset of the full Dewy language:
                <UL>
                    <li>Required type annotations which are ignored</li>
                    <li>
                        no-op <Code code="transmute" /> operator (in Dewy <Code code="transmute" /> converts a type
                        without modifying the underlying bits. Since μDewy doesn&quot;t have types, transmute is pure
                        documentation that helps bridge low level μDewy behavior to higher level Dewy)
                    </li>
                    <li>
                        boolean machine representation <Code code="true=-1" />, <Code code="false=0" /> (needed so
                        <Code code="and" />/<Code code="or" /> support both bitwise and logical modes without tracking
                        types)
                    </li>
                    <li>
                        Extensive documentation of cases where μDewy behavior would diverge from Dewy (necessary due to
                        the simplicity of the μDewy compiler making it hard to catch certain cases of divergence)
                    </li>
                </UL>
            </P>

            <P>
                The current reference implementation lives in the dewy-lang repo and can target Linux x86_64, wasm32 (a
                single HTML page with embedded WASM), RISC-V, and AArch64. There is also a{' '}
                <Link href="https://marketplace.visualstudio.com/items?itemName=RedFoxLabs.udewy">
                    VS Code extension
                </Link>{' '}
                for syntax highlighting.
            </P>
            <P>A hello world using the stdlib looks like this:</P>
            <CodeBlock
                code={`\
import p"../stdlib/core.udewy"
import p"../stdlib/capabilities/host.udewy"
import p"../stdlib/io.udewy"

let main = ():>void => {
    printl("Hello, world!")
    return void
}
`}
            />
            <P>
                Without the stdlib you are talking to the host more directly. On Linux that is a write syscall; in the
                browser playground the same idea uses a host log builtin:
            </P>
            <CodeBlock
                code={`\
# SYS_WRITE and STDOUT are builtin constants provided by the x86_64 backend
let main = ():>int => {
    let msg:int = "Hello from udewy!\\n"
    let len:int = __load__(msg - 8)
    __syscall3__(SYS_WRITE STDOUT msg len)
    return 0
}
`}
            />
            <P>FizzBuzz is a bit more of the language at once — loops, conditionals, and a tiny helper:</P>
            <CodeBlock
                code={`\
let printed:bool = false
let print = (s:string):>void => {
    printed = true
    __host_log__(s __load__(s - 8))
    return void
}

let main = ():>int => {
    let i:int = 1
    loop i <=? 20 {
        printed = false
        if i % 3 =? 0 { print("Fizz") }
        if i % 5 =? 0 { print("Buzz") }
        if not printed { __log_int__(i) }
        print("\\n")
        i = i + 1
    }
    return 0
}
`}
            />
            <P>And a Fibonacci loop, one of the examples shipped with the playground:</P>
            <CodeBlock
                code={`\
let puts = (s:string):>void => {
    __host_log__(s __load__(s - 8))
    return void
}
let puti = (i:int):>void => {
    __log_int__(i)
    return void
}

let main = ():>int => {
    let i:int = 0
    let i0:int = 0
    let i1:int = 1
    loop i <? 100 {
        puts("fib(")
        puti(i)
        puts(") = ")
        puti(i0)
        puts("\\n")
        i = i + 1
        i1 = i0 + i1
        i0 = i1 - i0
    }
    return 0
}
`}
            />
            <H2>Web Demos</H2>
            <P>
                The really awesome thing about μDewy is that it supports targeting wasm32 (spitting out a single{' '}
                <Code code=".html" /> file containing the entire program). This makes it extremely simple to build
                applications that run directly in the users&quot;s browser. Having the bootstrapped version of the
                compiler written in μDewy also made it trivial to build a web hosted version of the compiler (powering
                the playground below)
            </P>
            <H2>Web Compiler</H2>
            <P>
                An in-browser playground that compiles udewy to WebAssembly and runs it. You can edit the source, pick
                from a few built-in examples, and press Run. The compiler itself is a udewy program compiled to WASM.{' '}
                <Link href="https://david-andrew.github.io/udewy_web_compiler/">Open the full page demo</Link>.
            </P>
            <div className="w-full h-[40em] outline overflow-hidden mb-6">
                <iframe
                    src="https://david-andrew.github.io/udewy_web_compiler/"
                    className="w-full h-full border-0"
                    title="μDewy web compiler"
                    scrolling="no"
                />
            </div>
            <H2>μZero2</H2>
            <P>
                In order to showcase μDewy&quot;s capabilities (and also as a hard case for stress testing new LLMs as
                they came out), I would periodically have LLMs try to build a clone of the 3D F-Zero games from scratch
                in μDewy. In general all models fail this task pretty consistently. Only with much hand holding and
                refinement was Claude-Fable able to produce this current version. Same source compiles natively (SDL) or
                to WASM for the browser.{' '}
                <Link href="https://david-andrew.github.io/uzero2/">Open the full page demo</Link>.
            </P>
            <P>
                <iframe
                    src="https://david-andrew.github.io/uzero2/"
                    className="w-full h-[35em] outline"
                    title="uzero2"
                />
            </P>
            <H2>Slime Volley</H2>
            <P>
                Slime volleyball, the classic game from primary school. Implemented completely in μDewy play against the
                CPU or add a second player. switch stages to change the gravity{' '}
                <Link href="https://david-andrew.github.io/slime-volley/">Open the full page demo</Link>.
            </P>
            <P>
                <iframe
                    src="https://david-andrew.github.io/slime-volley/"
                    className="w-full h-[35em] outline"
                    title="slime-volley"
                />
            </P>
            <H3>Links</H3>
            <IconBulletList>
                <IconBullet icon="github">
                    <Link href="https://github.com/david-andrew/dewy-lang/tree/master/udewy">
                        Github (dewy-lang/udewy)
                    </Link>
                </IconBullet>
                <IconBullet icon="code">
                    <Link href="https://marketplace.visualstudio.com/items?itemName=RedFoxLabs.udewy">
                        VS Code Extension
                    </Link>
                </IconBullet>
            </IconBulletList>
        </>
    )
}

export default page
