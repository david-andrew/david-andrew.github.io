import React from 'react'
import { PageContainer, PageHeading } from '../../Components'
import { ExternalLink } from '../../utilities'
import { List, Icon } from 'semantic-ui-react'
import YouTube from 'react-youtube'

export const Rewind = (): JSX.Element => {
    return (
        <>
            <PageContainer>
                <PageHeading />
                <p>
                    Rewind was a video game I developed on a team of five as the capstone project to Video Game Design (EN.601.355). The game is a top down 2D
                    bullet-hell dungeon crawler, similar to{' '}
                    <ExternalLink href="https://store.steampowered.com/app/311690/Enter_the_Gungeon/">Enter the Gungeon</ExternalLink>, or{' '}
                    <ExternalLink href="https://store.steampowered.com/app/603960/Monolith/">Monolith</ExternalLink>, but with a time-travel twist. Every time
                    you enter a room, time resets to midnight, and all your past selves are running around and shooting, adding another obstacle that you have
                    to avoid (or cleverly use to your advantage).
                </p>
                <p>
                    For the most part, I focused on sound design, while also handling a bit of animation and general programming work, and the overall
                    narrative/story. I composed the entire soundtrack for the game, and sourced all sound effects. Additionally, I built the sound engine
                    responsible for playing sounds and music at the correct time. Other than sound and story, I, along with everyone else on the team, did a
                    large amount of play testing and bug fixing during development.
                </p>
                <p>
                    By the end of the class, we had a solid prototype that was maybe 80% of the way to a polished sellable game, but no work has been done
                    since.
                </p>
                <h3>Video</h3>
                <p>
                    This is a live stream playthrough my brother put together for the game. Some parts of the stream are a bit choppy, but overall, it&apos;s a
                    good demo for the game.
                </p>
                <YouTube videoId="KlFp6GHRjoU" opts={{ width: '100%' }} />
                <h3>Try It</h3>
                <p>
                    Controls: WASD to move, arrow keys to shoot. The Windows version historically has been the most stable, and works great with{' '}
                    <ExternalLink href="https://www.winehq.org/">Wine</ExternalLink>
                </p>
                <List>
                    <List.Item>
                        <span>
                            <Icon name="linux" size="big" />
                            <ExternalLink href="/docs/rewind/Rewind_Linux.zip">Rewind (Linux)</ExternalLink>
                        </span>
                    </List.Item>
                    <List.Item>
                        <span>
                            <Icon name="windows" size="big" />
                            <ExternalLink href="/docs/rewind/Rewind_Windows.zip">Rewind (Windows)</ExternalLink>
                        </span>
                    </List.Item>
                    <List.Item>
                        <span>
                            <Icon name="apple" size="big" />
                            <ExternalLink href="/docs/rewind/Rewind_Mac.zip">Rewind (Mac)</ExternalLink>
                        </span>
                    </List.Item>
                </List>
                <h3>Links</h3>
                <List>
                    <List.Item>
                        <span>
                            <Icon name="object group" size="big" />
                            <ExternalLink href="/docs/rewind/gooberz-gold.pdf">Final Presentation</ExternalLink>
                        </span>
                    </List.Item>
                </List>
            </PageContainer>
        </>
    )
}
