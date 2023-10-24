import { AudioGrid } from "@/app/(components)/audio";

const Page = (): JSX.Element => {
    return (
        <>
            <AudioGrid
                title="Audio Resynthesis (16000 Hz)"
                clips={[
                    {label: 'Mother and Child (Real)', src: '/audio/so_voice/atma16000.wav'},
                    {label: 'Mother and Child (Resynthesized)', src: '/audio/so_voice/atma16000resynth.wav'},
                    
                    {label: 'When David Heard (1) (Real)', src: '/audio/so_voice/david1.wav'},
                    {label: 'When David Heard (1) (Resynthesized)', src: '/audio/so_voice/david1_hat.wav'},
                    
                    {label: 'When David Heard (2) (Real)', src: '/audio/so_voice/david2.wav'},
                    {label: 'When David Heard (2) (Resynthesized)', src: '/audio/so_voice/david2_hat.wav'},
                    
                    {label: 'Nox Arumque (Real)', src: '/audio/so_voice/nox.wav'},
                    {label: 'Nox Arumque (Resynthesized)', src: '/audio/so_voice/nox_hat.wav'},
                ]}
            />
        </>
    )
}

export default Page;
