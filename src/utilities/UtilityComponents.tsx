import React from 'react'
import { Link } from 'react-router-dom'
import { CodeBlock as AtlasCodeBlock, Code as AtlasCode, SupportedLanguages } from '@atlaskit/code'
import { AtlaskitThemeProvider } from '@atlaskit/theme/components'
import { Table } from 'semantic-ui-react'
import ReactAudioPlayer from 'react-audio-player'

//place this after any element that needs to be clearfixed
export const ClearFixAfter = (): JSX.Element => {
    return <div style={{ clear: 'both', display: 'table' }}></div>
}

export const ExternalLink = ({
    href,
    children,
    style,
    download,
}: {
    href: string
    children?: React.ReactNode
    style?: React.CSSProperties
    download?: boolean
}): JSX.Element => {
    return (
        <a href={href} target="_blank" rel="noreferrer noopener" style={style} download>
            {children}
        </a>
    )
}

//thin wrapper around react-dom <Link> which scrolls to the top when clicked
export const InternalLink = ({ to, children }: { to: string; children: React.ReactNode }): JSX.Element => {
    return (
        <Link
            to={to}
            onClick={(): void => {
                window.scrollTo(0, 0)
            }}
        >
            {children}
        </Link>
    )
}

//inline code
export const Code = ({ children }: { children: React.ReactNode }): JSX.Element => {
    //dark mode theme handled by css
    return (
        <span className="codeline">
            <AtlasCode>{children}</AtlasCode>
        </span>
    )
}

//full code block
export const CodeBlock = ({
    text,
    showLineNumbers = false,
    language,
    flatten = false,
}: {
    text: string
    showLineNumbers?: boolean
    language?: SupportedLanguages
    flatten?: boolean
}): JSX.Element => {
    return (
        <div className={`codeblock${flatten ? ' flatten' : ''}`}>
            <AtlaskitThemeProvider mode="dark">
                <AtlasCodeBlock language={language} text={text} showLineNumbers={showLineNumbers} />
            </AtlaskitThemeProvider>
            <br />
        </div>
    )
}

//Generate a react icon component for the given image
export const LogoIcon = (src: string, width: string = '30em'): JSX.Element => {
    return <img style={{ float: 'left' }} className="icon" width={width} src={src} />
}

interface AudioCell {
    label: string
    src: string
}
interface AudioPair {
    audio1: AudioCell
    audio2: AudioCell
}
export const AudioExamplePair = ({ title, pairs }: { title: string; pairs: AudioPair[] }): JSX.Element => {
    return (
        <Table inverted>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>
                        <h3>{title}</h3>
                    </Table.HeaderCell>
                    <Table.HeaderCell />
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {pairs.map(({ audio1, audio2 }: AudioPair) => (
                    <Table.Row key={`${audio1.label}${audio1.src}${audio2.label}${audio2.src}`}>
                        <Table.Cell>
                            <h4>{audio1.label}</h4>
                            <ReactAudioPlayer src={audio1.src} style={{ width: '100%' }} controls />
                        </Table.Cell>
                        <Table.Cell>
                            <h4>{audio2.label}</h4>
                            <ReactAudioPlayer src={audio2.src} style={{ width: '100%' }} controls />
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    )
}
