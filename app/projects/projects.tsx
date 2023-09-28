import fs from 'fs';
import path from 'path';
import { StaticImageData } from 'next/image';
import { SortOption } from './sorttypes';

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

export type ProjectMeta = {
    title: string
    imgSrc: StaticImageData //image to display on summary card
    summary: string //blurb for this card
    tags?: string[] //notable things related to this project
} & (
    //either a github repo to pull timestamp from or a raw timestamp string
    { github: string, lastUpdated?: never } | { lastUpdated: string, github?: never }
) & (
    //either an internal page link or an external link for this card
    { internalLink: string, externalLink?: never } | { externalLink: string, internalLink?: never }
);

const isProjectContent = (obj: any): obj is ProjectMeta => {
    return obj.title !== undefined 
        && obj.imgSrc !== undefined 
        && obj.summary !== undefined 
        && (obj.github !== undefined || obj.lastUpdated !== undefined) 
        && (obj.internalLink !== undefined || obj.externalLink !== undefined);
}

export const getProjects = (sort:SortOption): Promise<{ name: string, content: ProjectMeta }[]> => {
    //find folders that contain a page.tsx file that exports a const value `meta` of type ProjectMetadata
    const root = 'app/projects';
    const folders = fs.readdirSync(root).filter(item => fs.statSync(path.join(root, item)).isDirectory());
    const projects = folders.filter((name) => {
        const files = fs.readdirSync(`app/projects/${name}`);
        return files.includes('page.tsx');
    });

    // sort projects by sort option
    if (sort === 'Recommended') {
        projects.sort((a, b) => {
            const aIndex = recommendedOrderIndices.get(a);
            const bIndex = recommendedOrderIndices.get(b);
            if (aIndex === undefined && bIndex === undefined) return 0;
            if (aIndex === undefined) return 1;
            if (bIndex === undefined) return -1;
            return aIndex - bIndex;
        });
    } else if (sort === 'Alphabetical (A-Z)') {
        projects.sort((a, b) => a.localeCompare(b));
    } else if (sort === 'Alphabetical (Z-A)') {
        projects.sort((a, b) => b.localeCompare(a));
    } else if (sort === 'Date (New-Old)') {
        //TODO
    } else if (sort === 'Date (Old-New)') {
        //TODO
    }

    const projectsPromises = projects.map(async (name) => {
        // Dynamically import the project's page.tsx
        const projectModule = await import(`./${name}/page`);
        if (!projectModule.meta || !isProjectContent(projectModule.meta)) return null;
        return { name, content: projectModule.meta };
        
    });

    return Promise.all(projectsPromises).then(results => results.filter(Boolean) as { name: string, content: ProjectMeta }[]);
}