import fs from 'fs';
import path from 'path';
import { ProjectMeta, isProjectContent } from './types';
import { ProjectsList } from './projects';



export const getProjects = (): Promise<{ name: string, content: ProjectMeta }[]> => {
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



const ProjectsPage = async (): Promise<JSX.Element> => {
    const projects = await getProjects();
    return <ProjectsList projects={projects} />;
}

export default ProjectsPage;



