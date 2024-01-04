'use client'
import { createContext, useContext, useState, useEffect } from 'react'
import { SortOption, sortOptionsList, FetchedProjectMeta } from './types'
import { convertToDate, isDefined } from '@/app/utils'

// global state for keeping track of the sort option for projects
const ProjectsContext = createContext<{ sortOption: SortOption; setSortOption: (sortOption: SortOption) => void }>({
    sortOption: sortOptionsList[0],
    setSortOption: (sortOption: SortOption) => {},
})

export const ProjectsContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [sortOption, setSortOption] = useState<SortOption>(sortOptionsList[0])

    return <ProjectsContext.Provider value={{ sortOption, setSortOption }}>{children}</ProjectsContext.Provider>
}

export const useProjectsContext = () => useContext(ProjectsContext)

// global state for keeping track of the last updated time of each project
type GithubTimestampsContextType = {
    timestamps: Map<string, Date>
    setTimestamps: (timestamps: Map<string, Date>) => void
}

export const GithubTimestampsContext = createContext<GithubTimestampsContextType | undefined>(undefined)

export const GithubTimestampsProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
    const [timestamps, setTimestamps] = useState<Map<string, Date>>(new Map())

    return (
        <GithubTimestampsContext.Provider value={{ timestamps, setTimestamps }}>
            {children}
        </GithubTimestampsContext.Provider>
    )
}

export const useGithubTimestampsContext = () => useContext(GithubTimestampsContext)

export const useFetchGithubTimestamps = (projects: FetchedProjectMeta[]) => {
    const timestampContext = useGithubTimestampsContext()

    // fetch the timestamps from github and store them in the context
    useEffect(() => {
        if (timestampContext === undefined) return
        if (timestampContext.timestamps.size !== 0) return
        ;(async () => {
            const { setTimestamps } = timestampContext

            // fetch the last updated time based on github api (or hardcoded value)
            const timestampPromises: Promise<[string, Date] | undefined>[] = projects.map(async (project) => {
                if (project.github === undefined) {
                    const date = convertToDate(project.lastUpdated)
                    if (isNaN(date.getTime())) {
                        console.error('bad time', project, date)
                        return undefined
                    }
                    return [project.route, date] as [string, Date]
                }
                const res = await fetch(`https://api.github.com/repos/david-andrew/${project.github}/commits`)
                if (!res.ok) {
                    console.error('bad fetch', project, res)
                    return undefined
                }
                const commits = await res.json()
                if (!Array.isArray(commits)) {
                    console.error('not an array', project, commits)
                    return undefined
                }
                const latestCommit = commits[0]
                if (!latestCommit) {
                    console.error('no latest commit', project, commits)
                    return undefined
                }
                const timestamp = new Date(latestCommit.commit.author.date)
                return [project.route, timestamp] as [string, Date]
            })

            // set the timestamps in the context
            const timestamps = new Map((await Promise.all(timestampPromises)).filter(isDefined))
            setTimestamps(timestamps)
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timestampContext])
}

export const GithubTimestampsFetcher = ({ projects }: { projects: FetchedProjectMeta[] }): JSX.Element => {
    useFetchGithubTimestamps(projects)
    return <></>
}
