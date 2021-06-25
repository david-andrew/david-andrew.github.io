import React, { useRef, CSSProperties, ReactNode, MutableRefObject } from 'react'
import { List, Icon, Container } from 'semantic-ui-react'
import { ExternalLink } from '../utilities'
import { useOverflow } from 'use-overflow'

const ContactItems = ({ small = false }: { small?: boolean }): JSX.Element => {
    const anchorStyle: CSSProperties = { whiteSpace: 'nowrap', fontSize: small ? '50%' : '100%' }

    return (
        <List>
            <List.Item>
                <span style={{ whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center' }}>
                    <Icon name="mail" size={small ? 'small' : 'big'} />
                    <a href="mailto:david.andrew.engineer@gmail.com" style={anchorStyle}>
                        david.andrew.engineer@gmail.com
                    </a>
                </span>
            </List.Item>
            <List.Item>
                <span style={{ whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center' }}>
                    <Icon name="linkedin" size={small ? 'small' : 'big'} />
                    <ExternalLink href="https://www.linkedin.com/in/dewy/" style={anchorStyle}>
                        https://www.linkedin.com/in/dewy
                    </ExternalLink>
                </span>
            </List.Item>
        </List>
    )
}

const ContactContainer = ({
    id = 'ContactPage',
    zIndex = 0,
    children,
    horizontalRef,
}: {
    id?: string
    zIndex?: number
    children: ReactNode
    horizontalRef?: MutableRefObject<null>
}): JSX.Element => {
    return (
        <div
            id={id}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                backgroundColor: 'black',
                zIndex: zIndex,
            }}
        >
            <div style={{ width: '100%', height: '40%', display: 'flex', justifyContent: 'center' }}>
                <Container>
                    <div
                        style={{
                            height: '100%',
                            backgroundColor: 'black',
                            border: '0.08em solid #000000',
                            borderColor: 'white',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            overflow: 'hidden',
                        }}
                    >
                        <div style={{ fontFamily: 'quadon', fontSize: '140%', display: 'flex', justifyContent: 'center' }} ref={horizontalRef}>
                            <div style={{ margin: '1em' }}>{children}</div>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    )
}

export const Contact = (): JSX.Element => {
    const horizontalRef = useRef(null)
    const { refXOverflowing } = useOverflow(horizontalRef)
    // console.log('overflow', refXOverflowing)

    return (
        <>
            <ContactContainer horizontalRef={horizontalRef}>
                <ContactItems />
            </ContactContainer>
            {refXOverflowing && (
                <ContactContainer>
                    <ContactItems small />
                </ContactContainer>
            )}
        </>
    )
}
