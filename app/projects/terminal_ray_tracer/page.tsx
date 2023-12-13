"use client";
import { useRef } from 'react';
import { P, Link, H3, Caption, Divider } from '@/app/(components)/ui'
import { IconBullet, IconBulletList } from '@/app/(components)/icon_bullet'
import { CodeBlock } from '@/app/(components)/syntax';
import v1 from '@/app/(images)/terminal_ray_tracer/v1.mp4'
import v2 from '@/app/(images)/terminal_ray_tracer/v2.mp4'
import v3 from '@/app/(images)/terminal_ray_tracer/v3.mp4'
import v4 from '@/app/(images)/terminal_ray_tracer/v4.mp4'
import v5 from '@/app/(images)/terminal_ray_tracer/v5.mp4'
import v6 from '@/app/(images)/terminal_ray_tracer/v6.mp4'



const HoverVideoPlayer = ({ videoSrc }:{videoSrc:string}) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleMouseEnter = () => {
        if (videoRef.current) {
            videoRef.current.play();
        }
    };

    const handleMouseLeave = () => {
        if (videoRef.current) {
            videoRef.current.pause();
        }
    };

    return (
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="w-full h-full">
            <video ref={videoRef} src={videoSrc} muted loop className="w-full h-full object-cover">
                Your browser does not support the video tag.
            </video>
        </div>
    );
};



const Page = (): JSX.Element => {
    const videoCaptionPairs: [string, string][] = [
        [v1, 'Initial rendering of colored spheres'],
        [v2, 'Added reflections without lighting'],
        [v3, 'Added ground plane and sky color'],
        [v4, 'Added multiple rays per pixel for anti-aliasing. Also testing out higher resolution'],
        [v5, 'Added lighting (point lights and directional lights)'],
        [v6, 'Added image based lighting with skybox cube map'],
    ]
    
    return (
        <>
            <P>
                At the end of October 2021, I gained access to the beta for the{' '}
                <Link href="https://copilot.github.com/">AI GitHub Copilot</Link>, and wanted to test it out on something small in scope. I
                remembered a side project from 10th grade, I tried developing my own rendering engine from scratch. At the time, I lacked the math experience
                necessary to ultimately get it working. Though I&apos;d never heard of a ray tracer before, it turns out the design I came up was almost
                identical (at the time, I was less interested in the reflection aspect, and more interested in the prospect of arbitrarily detailed geometry at
                any scale level, à la SVGs). Long story short, I figured it would be a fun challenge to write a ray tracer, now that I had the math background
                from my linear algebra and robotics classes in college. And as an added challenge (technically to make things easier), I decided that it should
                run directly in the terminal without the need for any sort of window or display.
            </P>
            <P>
                As it turns out, Copilot isn&apos;t going to replace programmers any time soon (especially domain experts). I definitely was surprised by how
                well it &quot;understood&quot; what I wanted it to do, but in general, it tended to lack the high level view needed to get things working
                together, and also definitely had a hard time dealing with very specific domain problems. But it is still an incredible productivity
                booster&mdash;just about every situation where it was perfectly clear what the code needed to do, the copilot usually had the correct suggestion
                ready to go.
            </P>
            <H3>Development</H3>
            <P>
                All clips are in real time, and running directly on my cpu (Intel® Core™ i7-6700 CPU @ 3.40GHz × 8). Future work definitely includes converting
                to CUDA and other optimizations.
            </P>
            <div className='w-full flex flex-col items-center'>
                {videoCaptionPairs.map(([src, caption], i: number) => (
                    <div key={i} className='w-[75%] m-4'>
                        <Divider/>
                        <Caption className='text-center'>{caption}</Caption>
                        <HoverVideoPlayer videoSrc={src} />
                    </div>
                ))}

            </div>
            <H3>Try It</H3>
            <IconBulletList>
                <IconBullet icon='github'>
                    <Link href="https://github.com/david-andrew/TerminalRayTracer">TerminalRayTracer</Link>
                </IconBullet>
            </IconBulletList>
            <br/>
            <CodeBlock
                language="bash"
                code={`git clone git@github.com:david-andrew/TerminalRayTracer.git
cd TerminalRayTracer
clang TerminalRayTracer.c -lm -O3 && ./a.out`}
            />
        </>
    )
}

export default Page;