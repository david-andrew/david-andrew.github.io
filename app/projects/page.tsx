import fs from 'fs';
import path from 'path';
import { RoutedProjectMeta, isProjectContent } from './types';
import { ProjectsList } from './projects';



export const getProjects = async (): Promise<RoutedProjectMeta[]> => {
    //find folders that contain a page.tsx file that exports a const value `meta` of type ProjectMetadata
    const root = 'app/projects';
    const folders = fs.readdirSync(root).filter(item => fs.statSync(path.join(root, item)).isDirectory());
    const projectPaths = folders.filter((name) => {
        const files = fs.readdirSync(`app/projects/${name}`);
        return files.includes('page.tsx');
    });

    const projectsPromises = await Promise.all(projectPaths.map(async (name) => {
        // Dynamically import the project's page.tsx
        const projectModule = await import(`./${name}/page`);
        if (projectModule.meta && isProjectContent(projectModule.meta)) {
            return {...projectModule.meta, route:name} as RoutedProjectMeta;
        }
    }))

    return projectsPromises.filter(Boolean) as RoutedProjectMeta[];
}



const ProjectsPage = async (): Promise<JSX.Element> => {
    const projects = await getProjects();
    return <ProjectsList projects={projects} />;
}

export default ProjectsPage;



