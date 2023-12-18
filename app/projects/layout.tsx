import { Container } from '@/app/(components)/ui'
import { NavbarDummy } from '@/app/(components)/navbar'
import { getProjects } from './fetch'
import { Heading } from './heading'

const ProjectsLayout = async ({ children }: { children: React.ReactNode }): Promise<JSX.Element> => {
    const projects = await getProjects()

    return (
        <Container>
            <Heading projects={projects} />
            {children}
            <NavbarDummy />
        </Container>
    )
}

export default ProjectsLayout
