import fs from 'fs';
import path from 'path';
import { FetchedProjectMeta, isProjectContent } from './types';
import { StaticImageData } from 'next/image';
import { isDefined } from '@/app/utils';

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

            return {...meta, route};
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
        .filter(item => item.toLowerCase().endsWith('.jpg') || item.toLowerCase().endsWith('.png') || item.toLowerCase().endsWith('.jpeg') || item.toLowerCase().endsWith('.gif'));
    const imagePromises = images.map(
        async (image): Promise<StaticImageData|undefined> => {
            const imageModule = await import(`app/(images)/${route}/${image}`);
            return imageModule.default as StaticImageData;
        }
    )
    return (await Promise.all(imagePromises)).filter(isDefined);
}