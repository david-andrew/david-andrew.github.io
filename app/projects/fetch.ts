import fs from 'fs';
import path from 'path';
import { FetchedProjectMeta, isProjectContent } from './types';
import { StaticImageData } from 'next/image';

//TODO: probably move to utilities
// used to type-correctly filter (T|undefined)[] to T[]
const isDefined = <T,>(value: T | undefined): value is T => value !== undefined;


export const getProjects = async (): Promise<FetchedProjectMeta[]> => {
    //find folders that contain a page.tsx file that exports a const value `meta` of type ProjectMetadata
    const root = 'app/projects';
    const folders = fs.readdirSync(root).filter(item => fs.statSync(path.join(root, item)).isDirectory());
    const projectPaths = folders.filter((route) => {
        const files = fs.readdirSync(`app/projects/${route}`);
        return files.includes('meta.ts');
    });

    const projectPromises = projectPaths.map(
        async (route): Promise<FetchedProjectMeta|undefined> => {
            // Dynamically import the project's page.tsx
            const projectModule = await import(`./${route}/meta`);
            const meta = projectModule.meta;
            if (!isProjectContent(meta)) { return undefined }

            // fetch the last updated time base on github api
            let timestamp: Date | undefined = await (async () => {
                if (meta.github === undefined){
                    const date = new Date(meta.lastUpdated);
                    if (isNaN(date.getTime())) return;
                    return date;
                } 
                const res = await fetch(`https://api.github.com/repos/david-andrew/${meta.github}/commits`);
                if (!res.ok) return
                const commits = await res.json();
                if (!Array.isArray(commits)) return
                const latestCommit = commits[0];
                if (!latestCommit) return
                const timestamp = new Date(latestCommit.commit.author.date);
                return timestamp;
            }
            )();

            return {...meta, route, timestamp};
        }
    )
    
    const projects = (await Promise.all(projectPromises)).filter(isDefined);
    return projects;
}


//Note: path is relative to app/(images)/
export const getImages = async (route: string): Promise<StaticImageData[]> => {
    const root = `app/(images)/${route}`;
    const images = fs.readdirSync(root)
        .filter(item => fs.statSync(path.join(root, item)).isFile())
        .filter(item => item.endsWith('.jpg') || item.endsWith('.png'));
    const imagePromises = images.map(
        async (image): Promise<StaticImageData|undefined> => {
            const imageModule = await import(`app/(images)/${route}/${image}`);
            return imageModule.default as StaticImageData;
        }
    )
    return (await Promise.all(imagePromises)).filter(isDefined);
}