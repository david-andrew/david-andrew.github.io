import React from 'react'
// import ReactDomServer from 'react-dom/server'
import { Navbar } from './Components/Navbar'
import { About, Contact, Home, Misc, NotFound, NotImplemented, Projects } from './Pages'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import {
    BlobOpera,
    BoatSimulator,
    Composer,
    DewySpeak,
    DrawRobot,
    EnsemblePeabody,
    EscortMision,
    LordsOfSola,
    Mechatronics,
    Mehve,
    MusicalDL,
    PRS2019,
    Rewind,
    uSkipSpoilers,
} from './Pages'

const App = (): JSX.Element => {
    //list of all project pages
    interface PageProps {
        page: () => JSX.Element
        path: string
    }
    const projectPages: PageProps[] = [
        { page: BlobOpera, path: '/projects/blob_opera' },
        { page: BoatSimulator, path: '/projects/boat_simulator' },
        { page: Composer, path: '/projects/composer' },
        { page: DewySpeak, path: '/projects/dewy' },
        { page: DrawRobot, path: '/projects/drawbot' },
        { page: EnsemblePeabody, path: '/projects/ensemble_peabody' },
        { page: EscortMision, path: '/projects/escort_mission' },
        { page: LordsOfSola, path: '/projects/lords_of_sola' },
        { page: Mechatronics, path: '/projects/mechatronics' },
        { page: Mehve, path: '/projects/mehve' },
        { page: MusicalDL, path: '/projects/musical_dl' },
        { page: PRS2019, path: '/projects/prs2019' },
        { page: Rewind, path: '/projects/rewind' },
        { page: uSkipSpoilers, path: '/projects/uskipspoilers' },
    ]

    return (
        <div
            id="View"
            style={{
                // backgroundColor: 'purple',
                // color: 'orange',
                backgroundColor: 'black',
                color: 'white',
                width: '100vw',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                fontFamily: 'gentona',
            }}
        >
            <Router>
                <div id="PageNav" style={{ position: 'fixed', width: '100wv', backgroundColor: 'red', zIndex: 100 }}>
                    <Navbar />
                </div>
                <div id="PageBody" style={{ flexGrow: 1 }}>
                    <Switch>
                        <Route exact path={['/', '/home']}>
                            <Home />
                        </Route>
                        <Route exact path="/projects">
                            <Projects />
                        </Route>
                        {projectPages.map(({ page, path }: PageProps, i: number) => (
                            <Route exact path={path} key={i}>
                                {page()}
                            </Route>
                        ))}
                        <Route exact path="/about">
                            <About />
                        </Route>
                        <Route exact path="/misc">
                            <Misc />
                        </Route>
                        <Route exact path="/contact">
                            <Contact />
                        </Route>
                        <Route exact path="/wip">
                            <NotImplemented />
                        </Route>
                        <Route path="*">
                            <NotFound />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </div>
    )
}

export default App
