'use client';
import { createContext, useContext, useState } from "react";
import { SortOption, sortOptionsList } from "./types";


// global state for keeping track of the sort option for projects
const ProjectsContext = createContext<{sortOption:SortOption, setSortOption:(sortOption:SortOption)=>void}>({
    sortOption: sortOptionsList[0],
    setSortOption: (sortOption:SortOption) => {},
})

export const ProjectsContextProvider = ({ children }:{ children: React.ReactNode }) => {
    const [sortOption, setSortOption] = useState<SortOption>(sortOptionsList[0])

    return (
        <ProjectsContext.Provider value={{ sortOption, setSortOption }}>
            {children}
        </ProjectsContext.Provider>
    )
};

export const useProjectsContext = () => useContext(ProjectsContext);




// global state for keeping track of the last updated time of each project
type GithubTimestampsContextType = {
    timestamps: Map<string, Date>;
    setTimestamps: (timestamps: Map<string, Date>) => void;
};

export const GithubTimestampsContext = createContext<GithubTimestampsContextType | undefined>(undefined);
  
export const GithubTimestampsProvider = ({ children }: {children: React.ReactNode}): JSX.Element => {
    const [timestamps, setTimestamps] = useState<Map<string, Date>>(new Map());

    return (
        <GithubTimestampsContext.Provider value={{ timestamps, setTimestamps }}>
            {children}
        </GithubTimestampsContext.Provider>
    );
};

export const useGithubTimestampsContext = () => useContext(GithubTimestampsContext);