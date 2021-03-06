import React, { useEffect } from 'react'
import { DummyNavBar, ProjectItem } from '../Components'
import { Container, Item, Pagination, PaginationProps } from 'semantic-ui-react'
import { projects, ProjectContent } from './Projects/ProjectSummaries'
import { ClearFixAfter, useQuery } from '../utilities'

//Number of elements on a page
const pageSize: number = 10

//Get a page of elements from an array. pages start at 1
function getPageSlice<T>(arr: T[], page: number | string | undefined): T[] {
    //if page is undefined, assume page 1
    page = page ?? 1

    //convert the page number from a possibly string to definitely number
    const pageNumber: number = typeof page === 'string' ? parseInt(page) : page

    //get the slice (ensuring to remain in bounds)
    const start = (pageNumber - 1) * pageSize
    const stop = Math.min(arr.length, pageNumber * pageSize)
    return arr.slice(start, stop)
}

//handle the pagination menu
interface ProjectPaginationProps {
    activePage: number | string | undefined
    setActivePage: (activePage: number | string | undefined) => void
}
const ProjectPagination = ({ activePage, setActivePage }: ProjectPaginationProps): JSX.Element => {
    //handle when pagination changes the page
    const handlePageChange = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, data: PaginationProps): void => {
        setActivePage(data.activePage)
    }

    //don't paginate if a single page is large enough
    if (projects.length <= pageSize) {
        return <></>
    }

    //number of pages in pagination menu
    const numPages: number = Math.ceil(projects.length / pageSize)

    //render pagination menu
    return (
        <div style={{ position: 'fixed', width: '100vw', bottom: 0, backgroundColor: 'black', zIndex: 100 }}>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '0.5% 0% 0.5% 0%' }}>
                <Pagination
                    inverted
                    style={{ backgroundColor: 'black', fontFamily: 'quadon', fontSize: '100%' }}
                    firstItem={null}
                    lastItem={null}
                    totalPages={numPages}
                    activePage={activePage}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    )
}
const DummyProjectPagination = (): JSX.Element => {
    //don't paginate if a single page is large enough
    if (projects.length <= pageSize) {
        return <></>
    }

    return (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', paddingBottom: '10px', visibility: 'hidden' }}>
            <Pagination style={{ fontFamily: 'quadon', fontSize: '100%' }} firstItem={null} lastItem={null} totalPages={3} activePage={1} />
        </div>
    )
}

//projects page
export const Projects = (): JSX.Element => {
    //get/set page number with url params
    const { params, setParam } = useQuery()
    const activePage = params.page ?? '1'
    const setActivePage = (page: string | number | undefined): void => {
        setParam('page', (page ?? '1').toString())
    }

    //scroll to the top of the page if activePage changes
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [activePage])

    //slice the list of projects based on current page. no-op if not paginating
    const pageProjects = getPageSlice(projects, activePage)

    return (
        <div style={{ backgroundColor: 'black' }}>
            <DummyNavBar />
            <Container style={{ marginBottom: '1em' }}>
                <div style={{ fontSize: '100%', fontFamily: 'gentona', backgroundColor: 'black', marginTop: '1em' }}>
                    <Item.Group style={{ color: 'white' }}>
                        {pageProjects.map((project: ProjectContent, i: number) => (
                            <ProjectItem {...project} key={i} />
                        ))}
                    </Item.Group>
                </div>
            </Container>
            <ProjectPagination {...{ activePage, setActivePage }} />
            <DummyProjectPagination />
            <ClearFixAfter />
        </div>
    )
}
