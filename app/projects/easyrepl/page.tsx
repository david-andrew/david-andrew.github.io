import { Link, H3, P } from '@/app/(components)/ui'
import { IconBullet, IconBulletList } from '@/app/(components)/icon_bullet'
import { CodeBlock, Code } from '@/app/(components)/syntax'

const page = (): JSX.Element => {
    return (
        <>
            <P>
                For work, I often found myself interacting with a Large Language Model (LLM) in a terminal environment.
                Writing a python loop to capture input and feed it to the LLM is pretty simple, basically just:
            </P>
            <CodeBlock
                language="python"
                code={`\
while True:
    user_input = input('>>> ')
    response = llm(user_input)
    print(response)
`}
            />
            <P>
                However this actually lacks a lot of the conveniences and functionality of more full fledged REPLs. For
                example, you cannot move the cursor, use the up/down arrows to navigate history, use common keyboard
                shortcuts like ctrl-l to clear the screen, etc. Python itself does actually support rich input with
                support these in the <Code code="cmd" /> and <Code code="readline" /> modules, but it&apos;s not quite
                as plug and play as I&apos;d have liked.
            </P>
            <P>
                So I created a super simple library, <Link href="https://pypi.org/project/easyrepl">easyrepl</Link>,
                that allows you to quickly throw together a REPL through a flexible API. It really is just providing a
                nice interface around the <Code code="readline" /> module, but It&apos;s been a great quality of life
                improvement for me. Feel free to check it out!
            </P>
            <H3>Getting Started</H3>
            <P>Install the package from PyPI:</P>
            <CodeBlock
                language="bash"
                code={`\
pip install easyrepl
`}
            />
            <P>Then you can use it in your python code like so:</P>
            <CodeBlock
                language="python"
                code={`\
from easyrepl import REPL

for user_input in REPL():
    response = llm(user_input)
    print(response)
`}
            />
            <H3>Links</H3>
            <IconBulletList>
                <IconBullet icon="pypi logo">
                    <Link href="https://pypi.org/project/easyrepl">PyPI Package</Link>
                </IconBullet>
                <IconBullet icon="github">
                    <Link href="https://github.com/david-andrew/easyrepl">Github Repo</Link>
                </IconBullet>
            </IconBulletList>
        </>
    )
}

export default page
