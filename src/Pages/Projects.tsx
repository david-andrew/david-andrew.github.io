import React, { useState } from 'react'
import { Navbar, DummyNavBar } from '../Components/Navbar'
import { Container, Item } from 'semantic-ui-react'
import { ProjectItem } from '../Components/ProjectItem'
import { projects, ProjectContent } from './Projects/ProjectSummaries'

export const Projects = (): JSX.Element => {
    //pagination control
    const pageSize: number = 10
    const paginate: boolean = projects.length > pageSize
    const [page, setPage] = useState<number>(0)

    return (
        <div style={{ backgroundColor: 'black' }}>
            <DummyNavBar />
            <Container>
                <div style={{ fontSize: '200%', fontFamily: 'gentona', backgroundColor: 'black', marginTop: '1em' }}>
                    <Item.Group style={{ color: 'white' }}>
                        {projects.map((project: ProjectContent, i: number) => (
                            <ProjectItem {...project} key={i} />
                        ))}
                    </Item.Group>
                </div>
            </Container>
        </div>
    )
}
