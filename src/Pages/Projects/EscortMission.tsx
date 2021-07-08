import React from 'react'
import YouTube from 'react-youtube'
import { Icon, List } from 'semantic-ui-react'
import { Collage, PageContainer, PageHeading } from '../../Components'
import { ExternalLink, getImageSources, InternalLink } from '../../utilities'

export const EscortMission = (): JSX.Element => {
    //image objects for photo collage
    const imageSrcs = getImageSources(require.context('../../images/escort_mission'))

    return (
        <>
            <PageContainer>
                <PageHeading />
                <p>
                    Escort Mission was my and my brother&apos;s submission for the{' '}
                    <ExternalLink href="https://itch.io/jam/gmtk-2020">GMTK Game Jam 2020</ExternalLink>. The theme of the jam was &quot;Out of Control&quot;,
                    as fun play on the out of control feeling present in the thick of the worldwide pandemic. The entire game was created from scratch during
                    the 48 hour-long game jam.
                </p>
                <p>
                    For our game, we wanted it to feel like the player was managing too many things leading to that feeling of out of control. After much
                    brainstorming, we landed on the concept of sheep herding, where you control sheep dogs, and have to guide non-cooperative sheep away from
                    danger, and towards the goal. And to make it feel extra <em>out of control</em>, we gave the player simultaneous control of 4 dogs. As the
                    player progresses, obstacles become more difficult to manuever around, and adversarial wolves show up and attempt to eat the sheep.
                </p>
                <p>
                    Early on, I decided that we would make the game in the Godot game engine&mdash;I was turned off of Unity3D from{' '}
                    <InternalLink to="/projects/boat_simulator">past</InternalLink> <InternalLink to="/projects/rewind">experiences</InternalLink> with it, and
                    had been hearing only good things about the new Godot engine. For the game jam, my brother handled all art related aspects (sprites,
                    backgrounds, music, sound effects, etc.), while I handled coding the game itself. Mechanically the game is super simple: sheep use the{' '}
                    <ExternalLink href="https://eater.net/boids">Boids Algorithm</ExternalLink> to wander around the screen, while each of the player controlled
                    dogs exert a repulsive force on nearby sheep. The enemy wolf AI is literally just{' '}
                    <em>walk in a circle until a sheep is nearby, and then chase/attempt to eat it</em>. The player also applies a repulsive force to the
                    wolves, which allows them to protect sheep in danger.
                </p>
                <h3>Photos</h3>
                <Collage imageSrcs={imageSrcs} />
                <h3>Gameplay Video</h3>
                <p>After submissions were closed, we were lucky enough to have a streamer feature our game</p>
                <YouTube videoId="NSteCRVER3A" opts={{ width: '100%', playerVars: { start: 10, end: 125 } }} />
                <h3>Try It</h3>
                <List>
                    <List.Item>
                        <span>
                            <Icon name="linux" size="big" />
                            <ExternalLink href="https://github.com/david-andrew/escort_mission_2020/releases/download/0.5.0/linux_0_5_0.zip">
                                escort mission 0.5.0 (linux)
                            </ExternalLink>
                        </span>
                    </List.Item>
                    <List.Item>
                        <span>
                            <Icon name="windows" size="big" />
                            <ExternalLink href="https://github.com/david-andrew/escort_mission_2020/releases/download/0.5.0/windows_0_5_0.zip">
                                escort mission 0.5.0 (windows)
                            </ExternalLink>
                        </span>
                    </List.Item>
                    <List.Item>
                        <span>
                            <Icon name="apple" size="big" />
                            <ExternalLink href="https://github.com/david-andrew/escort_mission_2020/releases/download/0.5.0/mac_0_5_0.zip">
                                escort mission 0.5.0 (mac)
                            </ExternalLink>
                        </span>
                    </List.Item>
                </List>

                <h3>Links</h3>
                <List>
                    <List.Item>
                        <span>
                            <Icon name="gamepad" size="big" />
                            <ExternalLink href="https://itch.io/jam/gmtk-2020/rate/696988"> GMTK Submission Page </ExternalLink>
                        </span>
                    </List.Item>
                    <List.Item>
                        <span>
                            <Icon name="gamepad" size="big" />
                            <ExternalLink href="https://dsamson.itch.io/escort-mission-2020"> Itch.io Game Page</ExternalLink>
                        </span>
                    </List.Item>
                    <List.Item>
                        <span>
                            <Icon name="github" size="big" />
                            <ExternalLink href="https://github.com/david-andrew/escort_mission_2020"> Github Repo</ExternalLink>
                        </span>
                    </List.Item>
                </List>
            </PageContainer>
        </>
    )
}
