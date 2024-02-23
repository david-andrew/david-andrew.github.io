import { Link, H3, P } from '@/app/(components)/ui'
import { IconBullet, IconBulletList } from '@/app/(components)/icon_bullet'
import { CodeBlock } from '@/app/(components)/syntax'
import Image from 'next/image'
import pdf_chatter_demo from '@/app/(images)/pdf_chatter/pdf-chatter-demo.gif'

const Page = (): JSX.Element => {
    return (
        <>
            <P>
                This is a pretty quick CLI program I threw together leveraging LLMs to perform Q&A over extracted PDF
                text. It uses <Link href="https://facebookresearch.github.io/nougat/">Nougat-OCR</Link> to extract the
                text from the PDF, and then uses <Link href="https://openai.com/gpt-4">GPT-4</Link> to answer questions
                about the text. The entire interface is run via a <Link href="/projects/easyrepl">simple REPL</Link> in
                the terminal.
            </P>
            <H3>Example</H3>
            <Image src={pdf_chatter_demo} alt="PDF Chatter Demo" className="w-full" />
            <H3>Getting Started</H3>
            <P>To get started, you can install the package from PyPI:</P>
            <CodeBlock
                language="bash"
                code={`\
pip install pdf-chatter
`}
            />
            <P>Then you can run the program with the following command:</P>
            <CodeBlock
                language="bash"
                code={`\
pdf-chatter path/to/pdf
`}
            />
            <P>Which will drop you into a REPL where you can ask questions about your PDF.</P>
            <H3>Links</H3>
            <IconBulletList>
                <IconBullet icon="pypi logo">
                    <Link href="https://pypi.org/project/pdf-chatter">PyPI Package</Link>
                </IconBullet>
                <IconBullet icon="github">
                    <Link href="https://github.com/david-andrew/pdf-chatter">Github Repo</Link>
                </IconBullet>
            </IconBulletList>
        </>
    )
}

export default Page
