import fs from 'fs';
import path from 'path';
import { FetchedProjectMeta, isProjectContent } from './types';
import { ProjectsList } from './projects';

//TODO: probably move to utilities
// used to type-correctly filter (T|undefined)[] to T[]
const isDefined = <T,>(value: T | undefined): value is T => value !== undefined;


export const getProjects = async (): Promise<FetchedProjectMeta[]> => {
    //find folders that contain a page.tsx file that exports a const value `meta` of type ProjectMetadata
    const root = 'app/projects';
    const folders = fs.readdirSync(root).filter(item => fs.statSync(path.join(root, item)).isDirectory());
    const projectPaths = folders.filter((name) => {
        const files = fs.readdirSync(`app/projects/${name}`);
        return files.includes('page.tsx');
    });

    const projectPromises = projectPaths.map(
        async (name): Promise<FetchedProjectMeta|undefined> => {
            // Dynamically import the project's page.tsx
            const projectModule = await import(`./${name}/page`);
            const meta = projectModule.meta;
            if (!isProjectContent(meta)) { return undefined }

            //TODO: fetch the last updated time base on github api

            return {...meta, route:name, timestamp:new Date()};
        }
    )
    
    const projects = (await Promise.all(projectPromises)).filter(isDefined);
    return projects;
}



const ProjectsPage = async (): Promise<JSX.Element> => {
    const projects = await getProjects();
    return <ProjectsList projects={projects} />;
}

export default ProjectsPage;



