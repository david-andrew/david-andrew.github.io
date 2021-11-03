import React from 'react'
import { List, Icon } from 'semantic-ui-react'
import { PageContainer, PageHeading } from '../../Components'
import { ExternalLink, CodeBlock } from '../../utilities'
import HoverVideoPlayer from 'react-hover-video-player'
import v1 from '../../videos/TerminalRayTracer/v1.mp4'
import v2 from '../../videos/TerminalRayTracer/v2.mp4'
import v3 from '../../videos/TerminalRayTracer/v3.mp4'
import v4 from '../../videos/TerminalRayTracer/v4.mp4'
import v5 from '../../videos/TerminalRayTracer/v5.mp4'
import v6 from '../../videos/TerminalRayTracer/v6.mp4'

export const TerminalRayTracer = (): JSX.Element => {
    const videoCaptionPairs: [string, string][] = [
        [v1, 'Initial rendering of colored spheres'],
        [v2, 'Added reflections without lighting'],
        [v3, 'Added ground plane and sky color'],
        [v4, 'Added multiple rays per pixel for anti-aliasing. Also testing out higher resolution'],
        [v5, 'Added lighting (point lights and directional lights)'],
        [v6, 'Added image based lighting with skybox cube map'],
    ]

    return (
        <PageContainer>
            <PageHeading />
            <p>
                At the end of October 2021, I gained access to the beta for the{' '}
                <ExternalLink href="https://copilot.github.com/">AI GitHub Copilot</ExternalLink>, and wanted to test it out on something small in scope. I
                remembered a side project from 10th grade, I tried developing my own rendering engine from scratch. At the time, I lacked the math experience
                necessary to ultimately get it working. Though I&apos;d never heard of a ray tracer before, it turns out the design I came up was almost
                identical (at the time, I was less interested in the reflection aspect, and more interested in the prospect of arbitrarily detailed geometry at
                any scale level, à la SVGs). Long story short, I figured it would be a fun challenge to write a ray tracer, now that I had the math background
                from my linear algebra and robotics classes in college. And as an added challenge (technically to make things easier), I decided that it should
                run directly in the terminal without the need for any sort of window or display.
            </p>
            <p>
                As it turns out, Copilot isn&apos;t going to replace programmers any time soon (especially domain experts). I definitely was surprised by how
                well it &quot;understood&quot; what I wanted it to do, but in general, it tended to lack the high level view needed to get things working
                together, and also definitely had a hard time dealing with very specific domain problems. But it is still an incredible productivity
                booster&mdash;just about every situation where it was perfectly clear what the code needed to do, the copilot usually had the correct suggestion
                ready to go.
            </p>
            <h3>Development</h3>
            <p>
                All clips are in real time, and running directly on my cpu (Intel® Core™ i7-6700 CPU @ 3.40GHz × 8). Future work definitely includes converting
                to CUDA and other optimizations.
            </p>
            <div style={{ width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                {videoCaptionPairs.map(([src, caption], i: number) => (
                    <div key={i} style={{ width: '75%', margin: '1em' }}>
                        <p style={{ textAlign: 'center' }}>{caption}</p>
                        <HoverVideoPlayer videoSrc={src} />
                    </div>
                ))}
            </div>
            <h3>Try It</h3>
            <List>
                <List.Item>
                    <span>
                        <Icon name="github" size="big" />
                        <ExternalLink href="https://github.com/david-andrew/TerminalRayTracer">TerminalRayTracer</ExternalLink>
                    </span>
                </List.Item>
            </List>
            <CodeBlock
                language="bash"
                text={`$ git clone git@github.com:david-andrew/TerminalRayTracer.git
$ cd TerminalRayTracer
$ clang TerminalRayTracer.c -lm -O3 && ./a.out`}
            />
        </PageContainer>
    )
}
