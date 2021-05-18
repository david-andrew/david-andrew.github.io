import React, { useState } from 'react'
import { Navbar, DummyNavBar } from '../Components/Navbar'
import { Container, Divider, Item, Pagination, PaginationProps } from 'semantic-ui-react'
import { ProjectItem } from '../Components/ProjectItem'
import { projects, ProjectContent } from './Projects/ProjectSummaries'

//pages start at 1
function getPageSlice<T>(arr: T[], pageSize: number, page: number | string | undefined): T[] {
    if (page === undefined) return arr
    const pageNumber: number = typeof page === 'string' ? parseInt(page) : page
    return arr.slice((pageNumber - 1) * pageSize, Math.min(pageNumber * pageSize, arr.length))
}

export const Projects = (): JSX.Element => {
    //pagination control
    const [activePage, setActivePage] = useState<string | number | undefined>(1)
    const pageSize: number = 2
    const paginate: boolean = projects.length > pageSize
    const numPages: number = Math.ceil(projects.length / pageSize)

    const pageProjects = paginate ? getPageSlice(projects, pageSize, activePage) : projects

    //when pagination changes the page
    const handlePageChange = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, data: PaginationProps) => {
        setActivePage(data.activePage)
    }

    return (
        <div style={{ backgroundColor: 'black' }}>
            <DummyNavBar />
            <Container>
                <div style={{ fontSize: '200%', fontFamily: 'gentona', backgroundColor: 'black', marginTop: '1em' }}>
                    <Item.Group style={{ color: 'white' }}>
                        {pageProjects.map((project: ProjectContent, i: number) => (
                            <ProjectItem {...project} key={i} />
                        ))}
                    </Item.Group>
                </div>
            </Container>
            {paginate && (
                <>
                    <Divider />
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <Pagination
                            inverted
                            size="massive"
                            style={{
                                backgroundColor: 'black',
                                fontFamily: 'quadon',
                                fontSize: '200%',
                            }}
                            firstItem={null}
                            lastItem={null}
                            totalPages={numPages}
                            activePage={activePage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </>
            )}
        </div>
    )
}
