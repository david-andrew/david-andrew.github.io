import React, { useState, useEffect, useRef } from 'react'
import { Button, Accordion, Grid, Icon, Menu, TextArea, TextAreaProps } from 'semantic-ui-react'
import { useDewyWasm, useDelayed, ParserOutput, getScrollbarWidth, CodeBlock } from '../../utilities'

export interface ExampleGrammar {
    label: string
    grammar: string
    source: string
}

//handle updating the saved state for the body of text inputs
const onTextAreaChange = (
    setContentState: React.Dispatch<React.SetStateAction<string>>,
    setScrollState: React.Dispatch<React.SetStateAction<boolean>>,
    ref: React.MutableRefObject<null>
) => {
    return (event: React.ChangeEvent<HTMLTextAreaElement>, data: TextAreaProps): void => {
        //save the reference to the element
        // ref.current = event.target

        //set whether the scrollbar is visible
        updateTextAreaScroll(setScrollState, ref)

        //set the content of the text body
        const txt = data.value?.toString() ?? ''
        setContentState(txt)
    }
}

//determine/update whether a TextInput is displaying a scrollbar
const updateTextAreaScroll = (setScrollState: React.Dispatch<React.SetStateAction<boolean>>, ref: React.MutableRefObject<any>): void => {
    setScrollState((ref.current?.ref.current?.clientWidth ?? 0) < (ref.current?.ref.current?.scrollWidth ?? 0))
}

//count the number of lines in a string
const countLines = (txt: string): number => {
    return (txt.match(/\n/g) || '').length + 1
}

//size of 1 em in pixels for CodeBlocks / TextAreas
const emToPx = 14
const lineHeight = 1.15

interface Props {
    exampleGrammars: ExampleGrammar[]
    initialSample: ExampleGrammar
}

export const DewyLiveParser = ({ exampleGrammars, initialSample }: Props): JSX.Element => {
    //show the output from the parser demo
    const [showParserDemo, setShowParserDemo] = useState<boolean>(false)
    const [outputHidden, setOutputHidden] = useState<boolean>(false) //user collapsable option
    const [showPresets, setShowPresets] = useState<boolean>(false) //preset example grammars

    //menu for the different things to show in output
    const [parserDemoSelection, setParserDemoSelection] = useState<string>('Parse Forest')
    const getParserDemoMenuProps = (name: string): { name: string; active: boolean; onClick: () => void } => {
        return { name, active: parserDemoSelection === name, onClick: (): void => setParserDemoSelection(name) }
    }
    const getParserDemoSelectionKey = (name: string): keyof ParserOutput => {
        switch (name) {
            case 'Parse Forest':
                return 'forest'
            case 'RNGLR Table':
                return 'table'
            case 'Item Sets':
                return 'grammarItems'
            case 'Meta Scanner':
                return 'metascanner'
            case 'Meta AST':
                return 'metaast'
            case 'CFG':
                return 'metaparser'
            case 'First Sets':
                return 'grammarFirsts'
        }
        return 'forest'
    }

    //state for live parser demo inputs
    // React.LegacyRef<TextArea>
    const grammarRef = useRef(null)
    const [grammarInput, setGrammarInput] = useState<string>(initialSample.grammar)
    const [grammarHeight, setGrammarHeight] = useState<string>('25em')
    const [grammarScroll, setGrammarScroll] = useState<boolean>(false)

    const sourceRef = useRef(null)
    const [sourceInput, setSourceInput] = useState<string>(initialSample.source)
    const [sourceHeight, setSourceHeight] = useState<string>('3em')
    const [sourceScroll, setSourceScroll] = useState<boolean>(false)

    const onGrammarChange = onTextAreaChange(setGrammarInput, setGrammarScroll, grammarRef)
    const onSourceChange = onTextAreaChange(setSourceInput, setSourceScroll, sourceRef)

    //When the user selects a demo preset, recompute if the scroll bars need to be shown.
    useEffect(() => {
        updateTextAreaScroll(setGrammarScroll, grammarRef)
        updateTextAreaScroll(setSourceScroll, sourceRef)
    }, [grammarInput, sourceInput])

    //run the input through the dewy parser. Put a delay on the input boxes so that the wasm code isn't run too frequently
    const [grammar, source] = useDelayed([grammarInput, sourceInput])
    const parserOutput = useDewyWasm(grammar, source)

    //determine if there was a parser/grammar error. Only show errors after the user starts the demo
    const parseError = showParserDemo && parserOutput?.result === 'failure'
    const grammarError = showParserDemo && parserOutput?.grammarError !== undefined

    //on window resize/zoom, update the input scrollbars
    useEffect(() => {
        window.addEventListener('resize', () => {
            updateTextAreaScroll(setGrammarScroll, grammarRef)
            updateTextAreaScroll(setSourceScroll, sourceRef)
        })
    })

    //keep text areas large enough for their input. Handle when the horizontal scrollbar is visible, which adds extra height
    useEffect(() => {
        //determine how much extra height based on if horizontal scrollbar visible
        const extra = (grammarScroll ? getScrollbarWidth() : 0) + 4
        const height = countLines(grammarInput) * emToPx * lineHeight + extra

        //set the input height
        setGrammarHeight(`${height}px`)
    }, [grammarInput, grammarScroll])
    useEffect(() => {
        //determine how much extra height based on if horizontal scrollbar visible
        const extra = (sourceScroll ? getScrollbarWidth() : 0) + 4
        const height = countLines(sourceInput) * emToPx * lineHeight + extra

        //set the input height
        setSourceHeight(`${height}px`)
    }, [sourceInput, sourceScroll])

    return (
        <>
            <Grid columns={3}>
                <Grid.Row>
                    <Grid.Column width={showParserDemo ? 6 : 8}>
                        <h4>Source Input</h4>
                        <TextArea
                            className={parseError ? 'failure' : undefined}
                            onChange={onSourceChange}
                            style={{ width: '100%', height: sourceHeight }}
                            spellCheck="false"
                            value={sourceInput}
                            ref={sourceRef}
                        />
                    </Grid.Column>
                    {showParserDemo && (
                        <Grid.Column width={2}>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <div style={{ pointerEvents: 'none', userSelect: 'none' }}>
                                    <h4 style={{ color: 'black' }}>fake text</h4>

                                    <div style={{ whiteSpace: 'nowrap', alignItems: 'center' }}>
                                        <span style={{ fontSize: 20 }}>&lt; </span>
                                        <span style={{ outline: 'solid 1px white', padding: '0.25em', fontSize: 14 }}>edit me</span>
                                        <span style={{ fontSize: 20 }}> &gt;</span>
                                    </div>
                                </div>
                            </div>
                        </Grid.Column>
                    )}
                    <Grid.Column width={8}>
                        <h4>Grammar Specification</h4>
                        <TextArea
                            className={grammarError ? 'failure' : undefined}
                            onChange={onGrammarChange}
                            style={{ width: '100%', height: grammarHeight }}
                            spellCheck="false"
                            value={grammarInput}
                            ref={grammarRef}
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            {showParserDemo ? (
                <>
                    <Accordion inverted>
                        <Accordion.Title active={showPresets} onClick={(): void => setShowPresets((p) => !p)}>
                            <Icon name="dropdown" />
                            <span style={{ color: 'white', fontFamily: 'quadon', fontSize: '1.071em' }}>Samples</span>
                        </Accordion.Title>
                        <Accordion.Content active={showPresets}>
                            {exampleGrammars.map(({ grammar, source, label }: ExampleGrammar) => {
                                return (
                                    <Button
                                        style={{ margin: '0.1em 0.1em 0.1em 0.1em' }}
                                        key={label}
                                        onClick={(): void => {
                                            setGrammarInput(grammar)
                                            setSourceInput(source)
                                        }}
                                    >
                                        {label}
                                    </Button>
                                )
                            })}
                        </Accordion.Content>
                        <Accordion.Title active={!outputHidden} onClick={(): void => setOutputHidden((v) => !v)}>
                            <Icon name="dropdown" />
                            <span style={{ color: 'white', fontFamily: 'quadon', fontSize: '1.071em' }}>Output</span>
                        </Accordion.Title>
                        <Accordion.Content active={!outputHidden}>
                            <div style={{ overflowX: 'auto', overflowY: 'hidden', backgroundColor: '#283447' }}>
                                <Menu inverted style={{ marginBottom: '0', backgroundColor: '#283447' }}>
                                    <Menu.Item {...getParserDemoMenuProps('Parse Forest')} />
                                    <Menu.Item {...getParserDemoMenuProps('RNGLR Table')} />
                                    <Menu.Item {...getParserDemoMenuProps('Item Sets')} />
                                    <Menu.Item {...getParserDemoMenuProps('Meta Scanner')} />
                                    <Menu.Item {...getParserDemoMenuProps('Meta AST')} />
                                    <Menu.Item {...getParserDemoMenuProps('CFG')} />
                                    <Menu.Item {...getParserDemoMenuProps('First Sets')} />
                                </Menu>
                            </div>
                            <CodeBlock
                                flatten
                                text={
                                    parserOutput?.[getParserDemoSelectionKey(parserDemoSelection)] ??
                                    (parserOutput?.grammarError !== undefined ? `${parserOutput.grammarError}` : 'running parser...')
                                }
                            />
                        </Accordion.Content>
                    </Accordion>
                </>
            ) : (
                <Button onClick={(): void => setShowParserDemo(true)}>Try Me</Button>
            )}
        </>
    )
}
