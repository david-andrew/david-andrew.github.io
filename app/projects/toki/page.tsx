import { Link, H3, P } from '@/app/(components)/ui'
import { IconBullet, IconBulletList } from '@/app/(components)/icon_bullet'
import { CodeBlock, Code } from '@/app/(components)/syntax'

const page = (): JSX.Element => {
    return (
        <>
            <P>
                At work it was extremely common to need to spin up small LLM agents/systems and point them at problems.
                It was also extremely common to need to be able to switch between all the major model providers to see
                how different models performed on the same task. Every provider does things slightly differently, so it
                was a frequent point of friction. There are certainly larger libraries that can handle this, but I
                wanted something really lightweight since most of the time I was sticking with simple chat-style
                interactions.
            </P>
            <P>
                I ended up building <Link href="https://pypi.org/project/toki">toki</Link> which is a strongly typed
                library that is about as small as you can make it while providing a uniform interface across all the
                major model providers. It works with Ollama, OpenRouter, OpenAI, Anthropic, Google, and local
                HuggingFace models.
            </P>
            <P>
                It&apos;s designed to consist of a few key orthogonal features that provide functionality for most use
                cases one would want while still maintaining a minimal API footprint. Care was taken to ensure a minimal
                set of dependencies, and each backend (model provider) can be installed independently. It has a lot of
                nice conveniences like iterators for streaming LLM responses in idiomatic Python, automatic conversation
                recording, uniform cache handling, thought capturing, async support, and more.
            </P>
            <H3>Getting Started</H3>
            <P>Install the package from PyPI, plus whichever backend extra you need:</P>
            <CodeBlock
                language="bash"
                code={`\
pip install 'toki[ollama]'
# pip install 'toki[openrouter]'
# pip install 'toki[openai]'
# pip install 'toki[anthropic]'
# pip install 'toki[google]'
# pip install 'toki[local]'
`}
            />
            <P>Then a minimal agent looks like this:</P>
            <CodeBlock
                language="python"
                code={`\
from toki import Agent, OllamaModel

model = OllamaModel("gemma4:e2b")
agent = Agent(model)

agent.add_user_message("Hello there!")
response = agent.execute()
print(response)
`}
            />
            <P>
                Typically I like to pair toki with <Link href="/projects/easyrepl">easyrepl</Link> for quickly spinning
                up a chat agent in a terminal
            </P>
            <CodeBlock
                language="python"
                code={`\
from easyrepl import REPL
from toki import Agent, OllamaModel

model = OllamaModel("gemma4:e2b")
agent = Agent(model)

for query in REPL():
    agent.add_user_message(query)
    response = agent.execute()
    print(response)
`}
            />
            <H3>Links</H3>
            <IconBulletList>
                <IconBullet icon="pypi logo">
                    <Link href="https://pypi.org/project/toki">PyPI Package</Link>
                </IconBullet>
                <IconBullet icon="github">
                    <Link href="https://github.com/jataware/toki">Github Repo</Link>
                </IconBullet>
                <IconBullet icon="jataware logo">
                    <Link href="https://github.com/jataware">Jataware</Link>
                </IconBullet>
            </IconBulletList>
        </>
    )
}

export default page
