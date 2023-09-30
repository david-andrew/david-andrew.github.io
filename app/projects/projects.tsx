"use client"
import React, { useState } from "react"
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link';
import { ProjectMeta } from "./types";
import { SortOption, sortOptionsList } from "./types";
import { Dropdown } from "../(components)/dropdown";

const recommendedOrder: string[] = [
    'dewy',
    'website',
    'so_voice',
    'terminal_ray_tracer',
    'timelapse',
    'musical_dl',
    'ensemble_peabody',
    'blob_opera',
    'composer',
    'compositions',
    'foxing_animatronic',
    'mechatronics',
    'prs19',
    'wse18',
    'drawbot',
    'pongbot',
    'robojay',
    'escort_mission',
    'rewind',
    'boat_simulator',
    'ziggy_v',
    'mehve',
    'rocketry',
    'uskipspoilers',
    'bueller_board',
];
const recommendedOrderIndices = new Map(recommendedOrder.map((route, index) => [route, index]));


type CardProps = {
    imgSrc: StaticImageData;
    title: string;
    lastUpdated: string;
    description: string;
    tags: string[];
    onClick?: () => void;
};

const Card = ({ imgSrc, title, lastUpdated, description, tags, onClick }: CardProps) => {
    return (
        <div 
            className="
                flex flex-col md:flex-row items-center md:space-x-6 p-4 
                border-solid border-black hover:border-white border-2
                cursor-pointer select-none
                "
            onClick={onClick}
        >
            {/* Image */}
            <Image src={imgSrc} alt={title} className="w-1/2 md:w-1/6 object-cover mb-4 md:mb-0" draggable={false}/>
    
            {/* Content */}
            <div className="w-full md:w-3/4">
            <h2 className="text-2xl font-quadon">{title}</h2>
            <p className="text-lg text-gray-500 mb-1 font-gentona">Last Updated: {lastUpdated}</p>
            <p className="text-lg mb-1 font-gentona">{description}</p>
            <p className="text-md text-gray-400 font-gentona">Tags: {tags.join(', ')}</p>
            </div>
        </div>
    );
};


export const ProjectsList = (props:{projects:{ name: string, content: ProjectMeta }[]}): JSX.Element => {
    const {projects} = props;
    const [selectedSortOption, setSelectedSortOption] = useState<SortOption>(sortOptionsList[0])
    
    // sort projects by sort option
    if (selectedSortOption === 'Recommended') {
        projects.sort((a, b) => {
            const aIndex = recommendedOrderIndices.get(a.name);
            const bIndex = recommendedOrderIndices.get(b.name);
            if (aIndex === undefined && bIndex === undefined) return 0;
            if (aIndex === undefined) return 1;
            if (bIndex === undefined) return -1;
            return aIndex - bIndex;
        });
    } else if (selectedSortOption === 'Alphabetical (A-Z)') {
        projects.sort((a, b) => a.name.localeCompare(b.name));
    } else if (selectedSortOption === 'Alphabetical (Z-A)') {
        projects.sort((a, b) => b.name.localeCompare(a.name));
    } else if (selectedSortOption === 'Date (New-Old)') {
        //TODO
    } else if (selectedSortOption === 'Date (Old-New)') {
        //TODO
    }
    
    return (
        <>
            {/* Only show dropdown on /projects, but not */}
            <Dropdown
                className="pb-4"
                text="Sort By"
                selected={selectedSortOption}
                options={sortOptionsList} 
                onClick={(selectedOption) => setSelectedSortOption(selectedOption)}
            />
            {projects.map(({name:route, content:project}) => (
                <Link href={`/projects/${route}`} key={project.title}>
                    <Card
                        imgSrc={project.imgSrc}
                        title={project.title}
                        lastUpdated={project.lastUpdated ?? 'unknown'}
                        description={project.summary}
                        tags={project.tags ?? []}
                    />
                </Link>
            ))}
        </>
    ); 
}
