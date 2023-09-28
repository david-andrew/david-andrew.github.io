import fs from 'fs';
import path from 'path';
import { StaticImageData } from 'next/image';
import { SortOption } from './sorttypes';



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
    const projectsPromises = projects.map(async (name) => {
        // Dynamically import the project's page.tsx
        const projectModule = await import(`./${name}/page`);
        if (!projectModule.meta || !isProjectContent(projectModule.meta)) return null;
        return { name, content: projectModule.meta };
        
    });

    return Promise.all(projectsPromises).then(results => results.filter(Boolean) as { name: string, content: ProjectMeta }[]);
}