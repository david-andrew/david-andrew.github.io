import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Navbar } from '@/app/(components)/navbar'
import { ColorPicker } from '@/app/(components)/color'
import { GithubTimestampsProvider, ProjectsContextProvider, GithubTimestampsFetcher } from '@/app/projects/context'
import { getProjects } from '@/app/projects/fetch'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'David Samson',
    description: 'Generated by create next app',
}

const RootLayout = async ({ children }: { children: React.ReactNode }): Promise<JSX.Element> => {
    const projects = await getProjects()

    return (
        <html lang="en">
            <head>
                <script src="/pyodideCommsService.js" async />
            </head>
            <body className={inter.className}>
                <div className="w-screen h-screen">
                    <Navbar />
                    <div style={{ height: 'calc(100vh - var(--navbar-height))' }} className="overflow-x-hidden">
                        <GithubTimestampsProvider>
                            <GithubTimestampsFetcher projects={projects} />
                            <ProjectsContextProvider>{children}</ProjectsContextProvider>
                        </GithubTimestampsProvider>
                    </div>
                    <ColorPicker />
                </div>
            </body>
        </html>
    )
}

export default RootLayout
