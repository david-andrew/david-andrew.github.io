"use client";
import ReactAudioPlayer from "react-audio-player";
import { Divider, H3, H4 } from "./ui";

type AudioGridProps = {
    title: string;
    clips: {
        label: string;
        src: string;
    }[];
}

export const AudioGrid = ({ title, clips }: AudioGridProps) => {
    return (
        <div className="bg-gray-800 text-white p-4 my-4 rounded-md">
            <H3>{title}</H3>
            <Divider/>
            <div className="grid grid-cols-2 gap-6">
                {clips.map(({ label, src }, index) => (
                    <div key={index} className="flex flex-col items-start h-full">
                        <H4 className="mt-0 whitespace-nowrap overflow-scroll w-full">{label}</H4>
                        <ReactAudioPlayer
                            src={src}
                            controls
                            className="w-full"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
