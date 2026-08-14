import { Link, H3, P } from '@/app/(components)/ui'
import { IconBullet, IconBulletList } from '@/app/(components)/icon_bullet'
import { CodeBlock, PlaintextBlock } from '@/app/(components)/syntax'

const page = (): JSX.Element => {
    return (
        <>
            <P>
                While working on <Link href="/projects/dewy">Dewy</Link>, I wanted to include a pretty error reporting
                system, so I ended up building a pretty robust error reporting library reminiscent of Nushell&apos;s
                error reporting. It turned out quite well, so I broke it out into it&apos;s own package:
                <Link href="https://pypi.org/project/prettyerr">prettyerr</Link>
            </P>
            <H3>Getting Started</H3>
            <P>Install the package from PyPI:</P>
            <CodeBlock
                language="bash"
                code={`\
pip install prettyerr
`}
            />
            <P>Then you can point at the relevant bits of source and print a report:</P>
            <CodeBlock
                language="python"
                code={`\
from prettyerr import Error, Pointer, Span, SrcFile

src = """\\
const repeat = (message:string, times:int) :> string => {
    return message * times
}
result = repeat("hello", "3")
printl(result)
"""

repeat_start = src.index('repeat(')
bad_arg_start = src.index('"3"')

report = Error(
    SrcFile.from_text(src, "path/to/example.lang"),
    title="type mismatch for argument \`times\`",
    pointer_messages=[
        Pointer(span=Span(repeat_start, repeat_start + len('repeat')), message="\`repeat\` function's second argument \`times\` expects an 'int'"),
        Pointer(span=Span(bad_arg_start, bad_arg_start + len('"3"')), message="argument given is type 'string'"),
    ],
    hint='Consider changing string literal "3" to integer 3',
)
print(report)
`}
            />
            <P>Which prints something like:</P>
            <PlaintextBlock
                text={`\
Error: type mismatch for argument \`times\`

    ╭─[path/to/example.lang:4:10]
  4 | result = repeat("hello", "3")
    ·          ──┬───          ─┬─
    ·            │              ╰─ argument given is type 'string'
    ·            ╰─ \`repeat\` function's second argument \`times\` expects an 'int'
    ╰───
  help: Consider changing string literal "3" to integer 3
`}
            />
            <H3>Links</H3>
            <IconBulletList>
                <IconBullet icon="pypi logo">
                    <Link href="https://pypi.org/project/prettyerr">PyPI Package</Link>
                </IconBullet>
                <IconBullet icon="github">
                    <Link href="https://github.com/david-andrew/prettyerr">Github Repo</Link>
                </IconBullet>
            </IconBulletList>
        </>
    )
}

export default page
