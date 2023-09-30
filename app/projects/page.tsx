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
    const projectPaths = folders.filter((route) => {
        const files = fs.readdirSync(`app/projects/${route}`);
        return files.includes('page.tsx');
    });

    const projectPromises = projectPaths.map(
        async (route): Promise<FetchedProjectMeta|undefined> => {
            // Dynamically import the project's page.tsx
            const projectModule = await import(`./${route}/page`);
            const meta = projectModule.meta;
            if (!isProjectContent(meta)) { return undefined }

            // fetch the last updated time base on github api
            let timestamp: Date | string | undefined = await (async () => {
                if (meta.github === undefined) return meta.lastUpdated
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



const ProjectsPage = async (): Promise<JSX.Element> => {
    const projects = await getProjects();
    return <ProjectsList projects={projects} />;
}

export default ProjectsPage;



