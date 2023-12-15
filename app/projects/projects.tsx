"use client"
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link';
import { FetchedProjectMeta, sortOptionsList } from "./types";
import { useGithubTimestampsContext, useProjectsContext } from "./context";
import { Dropdown } from "@/app/(components)/dropdown";
import { convertToDate, isDefined } from "@/app/utils";
import { useEffect } from 'react';

const recommendedOrder: string[] = [
    'dewy',
    'dewy_old',
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
    timestamp: Date | undefined;
    description: string;
    tags: string[];
    onClick?: () => void;
};

const Card = ({ imgSrc, title, timestamp, description, tags, onClick }: CardProps) => {
    
    // convert the timestamp to a string
    const lastUpdated: string = timestamp === undefined ? 
        'Unknown' : timestamp.toLocaleDateString('en-US', {year: 'numeric', month: 'long'});

    return (
        <div 
            className="
                flex flex-col md:flex-row items-center md:space-x-6 p-4 
                border-solid border-black hover:border-white border-2
                cursor-pointer select-none
                "
            onClick={onClick}
            draggable={false}
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




export const ProjectsList = ({projects}:{projects:FetchedProjectMeta[]}): JSX.Element => {
    const { sortOption, setSortOption } = useProjectsContext();
    const timestampContext = useGithubTimestampsContext();

    const timestamps = timestampContext?.timestamps ?? new Map();

    // fetch the timestamps from github and store them in the context
    useEffect(() => {
        if (timestampContext === undefined) return;
        if (timestampContext.timestamps.size !== 0) return;
        (async () => {
            const { setTimestamps } = timestampContext;

            // fetch the last updated time based on github api (or hardcoded value)
            const timestampPromises: Promise<[string, Date]|undefined>[] = projects.map(async (project) => {
                if (project.github === undefined) {
                    const date = convertToDate(project.lastUpdated);
                    if (isNaN(date.getTime())) { console.log('bad time', project, date); return undefined; }
                    return [project.route, date] as [string, Date];
                }
                const res = await fetch(`https://api.github.com/repos/david-andrew/${project.github}/commits`);
                if (!res.ok) { console.log('bad fetch', project, res); return undefined; }
                const commits = await res.json();
                if (!Array.isArray(commits)) { console.log('not an array', project, commits); return undefined; }
                const latestCommit = commits[0];
                if (!latestCommit) { console.log('no latest commit', project, commits); return undefined; }
                const timestamp = new Date(latestCommit.commit.author.date);
                return [project.route, timestamp] as [string, Date];
            });

        // set the timestamps in the context
        const timestamps = new Map((await Promise.all(timestampPromises)).filter(isDefined));
        console.log(projects)
        console.log(timestamps);
        setTimestamps(timestamps);
        })();

    }, [timestampContext])
    
    // sort projects by sort option
    if (sortOption === 'Recommended') {
        projects.sort((a, b) => {
            const aIndex = recommendedOrderIndices.get(a.route);
            const bIndex = recommendedOrderIndices.get(b.route);
            if (aIndex === undefined && bIndex === undefined) return 0;
            if (aIndex === undefined) return 1;
            if (bIndex === undefined) return -1;
            return aIndex - bIndex;
        });
    } else if (sortOption === 'Alphabetical (A-Z)') {
        projects.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === 'Alphabetical (Z-A)') {
        projects.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortOption === 'Date (New-Old)') {
        projects.sort((a, b) => {
            let aTimestamp = timestamps.get(a.route);
            let bTimestamp = timestamps.get(b.route);
            if (aTimestamp === undefined && bTimestamp === undefined) return 0;
            if (aTimestamp === undefined) return 1;
            if (bTimestamp === undefined) return -1;
            return bTimestamp.getTime() - aTimestamp.getTime();
        });
    } else if (sortOption === 'Date (Old-New)') {
        projects.sort((a, b) => {
            let aTimestamp = timestamps.get(a.route);
            let bTimestamp = timestamps.get(b.route);
            if (aTimestamp === undefined && bTimestamp === undefined) return 0;
            if (aTimestamp === undefined) return 1;
            if (bTimestamp === undefined) return -1;
            return aTimestamp.getTime() - bTimestamp.getTime();
        });
    }
    
    return (
        <>
            <Dropdown
                className="pb-4 font-gentona"
                inverted
                text="Sort By"
                selected={sortOption}
                options={sortOptionsList} 
                onClick={(selectedOption) => setSortOption(selectedOption)}
            />
            {projects.map(({route, imgSrc, title, summary, tags}) => (
                //TODO: this could be an internal link or an external link
                <Link href={`/projects/${route}`} key={route} draggable={false}>
                    <Card
                        imgSrc={imgSrc}
                        title={title}
                        timestamp={timestamps.get(route)}
                        description={summary}
                        tags={tags ?? []}
                    />
                </Link>
            ))}
        </>
    ); 
}
