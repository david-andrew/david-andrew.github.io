import React from 'react'
import { List, Icon, Container } from 'semantic-ui-react'

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
                            <List>
                                <List.Item>
                                    <span>
                                        <Icon name="mail" size="big" />
                                        <a href="mailto:david.andrew.engineer@gmail.com">david.andrew.engineer@gmail.com</a>
                                    </span>
                                </List.Item>
                                <List.Item>
                                    <span>
                                        <Icon name="linkedin" size="big" />
                                        <a href="https://www.linkedin.com/in/david-andrew-engineer/" target="_blank" rel="noreferrer noopener">
                                            linkedin.com/in/david-andrew-engineer
                                        </a>
                                    </span>
                                </List.Item>
                            </List>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    )
}
