import { Link, H3, P } from '@/app/(components)/ui'
import { IconBullet, IconBulletList } from '@/app/(components)/icon_bullet'
import { CodeBlock, Code } from '@/app/(components)/syntax'

const page = (): JSX.Element => {
    return (
        <>
            <P>
                Parsing is a big hobby of mine (<Link href="/projects/dewy_old">generalized parsing</Link>,{' '}
                <Link href="/projects/udewy">μDewy</Link>, etc.), and at some point I got curious if a better
                regex+parsing API could exist in python; something really intuitive and simple. My big complaint with
                all of the existing python offerings is that they typically require you to separately specify the shape
                of what is being parsed and the shape the result gets put into. Or they fall back on expecting you to be
                familiar with all of the nuances and jargon of parsing, grammars, lexers, etc. Or they are not strongly
                typed.
            </P>
            <P>
                My idea was to hack around the dataclass syntax and basically let you write parser grammar as a set of
                dataclass-looking objects. These would also double as the specification of the result dataclasses
                returned from a successful parse. It ended up being some of the most cursed python black magic I&apos;ve
                ever written, but it mostly works.
            </P>
            <P>
                <Link href="https://pypi.org/project/turtles">Turtles</Link> is a library that lets you define a grammar
                as a collection of <Code code="Rule" /> classes, parse some input, and get back a strongly-typed
                hydrated object you can inspect, transform, or serialize.
            </P>
            <H3>Getting Started</H3>
            <P>Install the package from PyPI (Python 3.12+):</P>
            <CodeBlock
                language="bash"
                code={`\
pip install turtles
`}
            />
            <P>A tiny key-value grammar looks like this:</P>
            <CodeBlock
                language="python"
                code={`\
from turtles import Rule, char, repeat, at_least, separator

class Int(Rule, int):
    value: repeat[char["0-9"], at_least[1]]

class Float(Rule, float):
    whole: Int
    "."
    frac: Int

Number = Float | Int

class KV(Rule):
    key: repeat[char["a-zA-Z_"], at_least[1]]
    "="
    value: Number

class Row(Rule):
    items: repeat[KV, separator[" "], at_least[1]]

src = "temp=21.5 humidity=45 retries=0"
row = Row(src)
assert row.items[0].key == "temp"
assert row.items[0].value == 21.5

# Convert the whole parse result to plain Python containers
data = row.as_dict()
assert data == {
    "items": [
        {"key": "temp", "value": 21.5},
        {"key": "humidity", "value": 45},
        {"key": "retries", "value": 0},
    ]
}

# # Helpful while iterating on a grammar
print(repr(row))
# Row
# └── items: [3 items]
#     ├── [0]: KV
#     │   ├── key: temp
#     │   └── value: Float(float)
#     │       ├── whole: Int(int)
#     │       │   └── value: 21
#     │       └── frac: Int(int)
#     │           └── value: 5
#     ├── [1]: KV
#     │   ├── key: humidity
#     │   └── value: Int(int)
#     │       └── value: 45
#     └── [2]: KV
#         ├── key: retries
#         └── value: Int(int)
#             └── value: 0
`}
            />

            <H3>Links</H3>
            <IconBulletList>
                <IconBullet icon="pypi logo">
                    <Link href="https://pypi.org/project/turtles">PyPI Package</Link>
                </IconBullet>
                <IconBullet icon="github">
                    <Link href="https://github.com/david-andrew/turtles">Github Repo</Link>
                </IconBullet>
            </IconBulletList>
        </>
    )
}

export default page
