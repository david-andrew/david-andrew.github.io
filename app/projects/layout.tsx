import { Container } from "../(components)/ui"
import { NavbarDummy } from "../(components)/navbar"

const ProjectsLayout = ({children}:{ children:React.ReactNode }): JSX.Element => {
    return (
        <Container>
            {children}
            <NavbarDummy />
        </Container>
    )
}

export default ProjectsLayout