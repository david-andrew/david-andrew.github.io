import React from 'react'
import { Navbar } from '../Components/Navbar'
import { Item } from 'semantic-ui-react'
import logo from '../images/logo.png'
import { ProjectItem } from '../Components/ProjectItem'
import { projects, ProjectContent } from './Projects/ProjectSummaries'

export const Projects = (): JSX.Element => {
    const currentDate = new Date()

    return (
        <>
            <div id="DummyPageNav">
                <Navbar />
            </div>

            <div style={{ fontSize: /*`${scale}vmin`*/ '200%', backgroundColor: 'black', marginTop: '1em' }}>
                <Item.Group style={{ color: 'white' }}>
                    {projects.map((project: ProjectContent, i: number) => (
                        <ProjectItem {...project} key={i} />
                    ))}
                </Item.Group>
            </div>
        </>
    )
}
