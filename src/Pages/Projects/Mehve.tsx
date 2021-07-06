import React from 'react'
import { PageContainer, PageHeading } from '../../Components'
import { ExternalLink } from '../../utilities'
import YouTube from 'react-youtube'

export const Mehve = (): JSX.Element => {
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
                    want to explore that he doesn&apos;t touch on. Also, probably almost certainly, my game is planned to take place in a wholly distinct
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
                <h3>Mechanics</h3>
                <p>Initially, the main aspects I am focusing on are third-person mode, flying, and country simulation.</p>
                <h3>Flying</h3>
                <p></p>
                <h3>Country Simulation</h3>
                <p>the bulk of the content filling the world will derive from this</p>
                <h3>Third Person</h3>
                <p>think botw</p>
                <h3>Misc. Mechanics</h3>
                <p>Gardening</p>
                <p>
                    <ul>
                        <li>Flying</li>
                        <li>third-person</li>
                        <li>Simulated country interaction + conflict</li>
                        <li>Personal garden (less for crafting, and more just for enjoyment. think fishing minigames in zelda)</li>
                    </ul>
                </p>
                <h3>Gliding Demo</h3>
                <p>
                    Since flying will be an integral part of the game, the first thing I set out to build was a flight simulator for any of the in game
                    aircraft. I wanted flying in the game to feel both enjoyable, but also grounded in reality, so I opted for a realistic flight model over a
                    more arcade approach. Craft are subjected to a slightly idealized version of the fluids equations governing flight, and then a simple flight
                    controller algorithm helps with stabilization. I&apos;m super happy with how it turned out so far, and have definitely spent longer than
                    I&apos;d like to admit just soaring around the simple test level I built&mdash;definitely a good sign for one of the core game mechanics.
                </p>
                <p>Todo: insert video/demo</p>
            </PageContainer>
        </>
    )
}
