import React from 'react'
import { PageContainer, PageHeading, Collage } from '../../Components'
import { ExternalLink } from '../../utilities'
import YouTube from 'react-youtube'
import { List, Icon } from 'semantic-ui-react'

export const Mehve = (): JSX.Element => {
    const r = require.context('../../images/mehve')
    const imageSrcs = r.keys().map((path: string) => r(path).default) as string[]

    return (
        <>
            <PageContainer>
                <PageHeading />
                <p>
                    Mehve is a game that I am making loosely inspired by the manga for Hayao Myazaki&apos;s Nausicaa of the Valley of the Wind. There&apos;s
                    actually a pretty good description of what a Nausicaa inspired game could look like by the youtuber{' '}
                    <ExternalLink href="https://www.youtube.com/channel/UCSdma21fnJzgmPodhC9SJ3g">NakeyJakey</ExternalLink>:
                </p>
                <YouTube videoId="czUCWFlBcmE" opts={{ width: '100%' }} />
                <br />
                <p>
                    A lot of the ideas discussed in the video are pretty close to what I imagine my game might have, but there are definitely some concepts I
                    want to explore that he doesn&apos;t focus on. Also, probably almost certainly, my game is planned to take place in a wholly distinct
                    universe, mainly to avoid any sort of IP infringement.
                </p>
                {/* <h3>Pitch</h3> */}
                <p>
                    At a high level, my game will be an open world third-person exploration sandbox. I&apos;m especially interested in making the world dynamic
                    and giving the player agency to effect changes in the world. For instance countries around the map will all have simulated interactions both
                    with each other, and their surrounding environment. Conflicts will evolve naturally based on situations where countries&apos; needs
                    aren&apos;t being met, e.g. if there are food or resource shortages, and conflicts can escalate into wars. You as the player are free to act
                    in the world&mdash;you can work to resolve conflict by helping countries secure their needs, or you could join the conflict yourself
                    supporting a specific side, or you could ignore the conflict entirely and adventure off into other parts of the world. There will often be
                    many conflicting interests and perspectives, with no single correct solution.
                </p>
                <h3>Systems/Mechanics</h3>
                <h4>Third-person</h4>
                <p>
                    Much of the player&apos;s interaction with the game will be through a third-person character. I imagine this to be reminiscent of the open
                    world from Zelda: Breath of the Wild, where there are many interesting locations to explore around the map, and the player is free to
                    traverse and climb any part of it. Additionally, the player will be able to interact with NPCs which will draw from, and feed back into the
                    country simulation mechanics, allowing your actions towards other characters in the game to affect the progression of local and world
                    events.
                </p>
                <p>
                    Another interesting piece for the third-person character is that I&apos;m planning to set up an AI based physical character controller. This
                    means, instead of having a set of pre-canned animations that the character uses, the character&apos;s joints will be affect by physics, and
                    the AI will command specific muscles to move such that the character does the desired action. A good example of this approach is explained
                    in this <ExternalLink href="https://www.youtube.com/c/K%C3%A1rolyZsolnai">Two Minute Papers</ExternalLink> video:
                </p>
                <YouTube videoId="o_DhNqHazKY" opts={{ width: '100%' }} />
                <h4>Flying</h4>
                <p>
                    To travel quickly across large sections of the map, the player will have access to a variety of flying vehicles, starting with a glider
                    similar to Nausicaa. Since flying will be an integral part of the game, it&apos;s the first component I set out to build. I wanted flying in
                    the game to feel both enjoyable, but also grounded in reality, so I opted for a realistic flight model over a more arcade approach. Craft
                    are subjected to a slightly idealized version of the real fluids equations governing flight, and then a simple flight controller algorithm
                    assists with stabilization.
                </p>
                <Collage imageSrcs={imageSrcs} />
                <p>
                    I&apos;m super happy with how it turned out so far, and have definitely spent longer than I&apos;d like to admit just soaring around the
                    simple test level I built&mdash;definitely a good sign for one of the core game mechanics.
                </p>
                <h4>Country/World Simulation</h4>
                <p>
                    To make the world feel more alive, and the player&apos;s actions more meaningful, I&apos;m planning to develop a world/country simulator for
                    managing NPCs in the game. The idea is that there will be many countries and communities of people spread out around the world, and they
                    will all have various needs and desires that they are trying to meet, including securing food and shelter, colonialism and political
                    exploits, etc. In trying to accomplish their goals, countries can cooperate, or they may also come into conflict with each other. The player
                    is then able to interact with characters under this system, and the results of the interaction then feed back into the simulation to produce
                    some outcome.
                </p>
                <h4>Gardening</h4>
                <p>
                    The last mechanic I&apos;m envisioning is a sandbox garden that the player can tend to. I love the concept of a player adventuring out into
                    the world, and bringing back different species of plants and flowers, which they then have the option to develop in their own garden, much
                    like Nausicaa. From a mechanical point of view, I imagine this might be something simple like{' '}
                    <ExternalLink href="https://en.wikipedia.org/wiki/L-system">L-systems</ExternalLink> where different varieties of plants are procedurally
                    generated, and seeded throughout the world for the player to find and collect.
                </p>
                <h3>Future Work</h3>
                <p>
                    For now, work on Mehve is on permanent hold due to lack of time. When I have more bandwidth for working on it, I&apos;ll start building out
                    more of the systems described above.
                </p>
                <h3>Try It</h3>
                <List>
                    <List.Item>
                        <span>
                            <Icon name="linux" size="big" />
                            <ExternalLink href="/docs/mehve/MehveGliderDemoLinux.zip">Glider Demo (Linux)</ExternalLink>
                        </span>
                    </List.Item>
                    <List.Item>
                        <span>
                            <Icon name="windows" size="big" />
                            <ExternalLink href="/docs/mehve/MehveGliderDemoWindows.zip">Glider Demo (Windows)</ExternalLink>
                        </span>
                    </List.Item>
                </List>
            </PageContainer>
        </>
    )
}
