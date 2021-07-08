import React from 'react'
import { PageContainer, PageHeading, Collage } from '../../Components'
import { ExternalLink } from '../../utilities'
import { List, Icon } from 'semantic-ui-react'

export const ZiggyV = (): JSX.Element => {
    const r = require.context('../../images/rewind')
    const imageSrcs = r.keys().map((path: string) => r(path).default) as string[]

    return (
        <>
            <PageContainer>
                <PageHeading />
                <p>
                    For a long time, my brother was been wanting to make a game that merges the First Person Shooter (FPS) genre with Real Time Strategy (RTS).
                    Ziggy V is our initial attempt to build a simple prototype meant to demonstrate the viability of the concept.
                </p>
                <h3>Concept</h3>
                <p>
                    The concept is basically a RTS game where the player commands units around a map to perform objectives against an opponent, but instead of
                    AI controlled units (like normal RTS games) each unit is controlled by a real player, playing in FPS mode. This is meant to create more
                    strategy and tactical elements in the first person shooter play, overall giving battles more depth.
                </p>
                <h3>Prototype</h3>
                <p>
                    So far, as we were starting to build out a rudimentary first person shooter game to scaffold off of, I noticed a couple interesting features
                    that pointed towards fun gameplay concepts. Players play as a physically simulated cube that can run around the map and shoot a rifle. The
                    player physics are much less realistic and more akin to the floaty jumping and movement one might find in a Mario game&mdash;this actually
                    felt surprisingly fun to play on the test level. Additionally the other interesting feature is that of slow bouncing bullets. Each bullet
                    the characters shoot is physically simulated, flies at a relatively slow (but visibly fast) velocity, and has a highly visible mesh. This
                    gives a really interesting style to them, and makes them almost feel like tracer rounds as they fly across the map. While implementing the
                    bullet physics, I happened to set them to bounce off of surfaces, which introduced the very fun concept of bouncing bullets.
                </p>
                <Collage imageSrcs={imageSrcs} />
                <p>
                    With just these few mechanics on a test level, the demo is still quite fun to mess around with (especially bouncing bullets off of various
                    surfaces). But for now the project is on hold until we both have more time to devote to it.
                </p>
                <h3>Try It</h3>
                <List>
                    <List.Item>
                        <span>
                            <Icon name="linux" size="big" />
                            <ExternalLink href="/docs/ziggy_v/ziggy_v_linux.zip">Ziggy V (Linux)</ExternalLink>
                        </span>
                    </List.Item>
                    <List.Item>
                        <span>
                            <Icon name="windows" size="big" />
                            <ExternalLink href="/docs/ziggy_v/ziggy_v_windows.zip">Ziggy V (Windows)</ExternalLink>
                        </span>
                    </List.Item>
                    <List.Item>
                        <span>
                            <Icon name="apple" size="big" />
                            <ExternalLink href="/docs/ziggy_v/ziggy_v_mac.zip">Ziggy V (Mac)</ExternalLink>
                        </span>
                    </List.Item>
                </List>
            </PageContainer>
        </>
    )
}
