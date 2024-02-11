import { Container } from '@/app/(components)/ui'
import { NavbarDummy } from '@/app/(components)/navbar'
import { GithubTimestampsFetcher } from '@/app/projects/context'
import { getProjects } from './fetch'
import { Heading } from './heading'

const ProjectsLayout = async ({ children }: { children: React.ReactNode }): Promise<JSX.Element> => {
    const projects = await getProjects()

    return (
        <>
            <GithubTimestampsFetcher projects={projects} />
            <Container>
                <Heading projects={projects} />
                {children}
                <NavbarDummy />
            </Container>
        </>
    )
}

export default ProjectsLayout
