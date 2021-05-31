import React from 'react'
import { List, Icon, Container } from 'semantic-ui-react'
import { ExternalLink } from '../utilities'

export const Contact = (): JSX.Element => {
    return (
        <div id="ContactPage" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
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
                        }}
                    >
                        <div style={{ fontFamily: 'quadon', fontSize: '140%', display: 'flex', justifyContent: 'center' }}>
                            <div style={{ margin: '1em' }}>
                                <List>
                                    <List.Item>
                                        <span>
                                            <Icon name="mail" size="big" />
                                            <a href="mailto:david.andrew.engineer@gmail.com" style={{ whiteSpace: 'nowrap' }}>
                                                david.andrew.engineer@gmail.com
                                            </a>
                                        </span>
                                    </List.Item>
                                    <List.Item>
                                        <span>
                                            <Icon name="linkedin" size="big" />
                                            <ExternalLink href="https://www.linkedin.com/in/david-andrew-engineer/" style={{ whiteSpace: 'nowrap' }}>
                                                linkedin.com/in/david-andrew-engineer
                                            </ExternalLink>
                                        </span>
                                    </List.Item>
                                </List>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    )
}
