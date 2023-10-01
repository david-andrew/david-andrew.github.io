import { ProjectsList } from './projects';
import { getProjects } from './fetch'

const ProjectsPage = async (): Promise<JSX.Element> => {
    const projects = await getProjects();
    return <ProjectsList projects={projects} />;
}

export default ProjectsPage;



