"use client";
import ReactAudioPlayer from "react-audio-player";
import { Divider } from "./ui";

type AudioGridProps = {
    title: string;
    clips: {
        label: string;
        src: string;
    }[];
}

export const AudioGrid = ({ title, clips }: AudioGridProps) => {
    return (
        <div className="bg-gray-800 text-white p-6 rounded-md">
            <h1 className="text-2xl mb-2 font-quadon">{title}</h1>
            <Divider/>
            <div className="grid grid-cols-2 gap-6">
                {clips.map(({ label: name, src }, index) => (
                    <div key={index} className="flex flex-col items-start">
                        <p className="mb-2 text-xl font-quadon">{name}</p>
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
