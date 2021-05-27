import React from 'react'
// import ReactDomServer from 'react-dom/server'
import { Navbar } from './Components/Navbar'
import { About, Contact, Home, Clovers, NotFound, NotImplemented, Projects } from './Pages'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import {
    BlobOpera,
    BoatSimulator,
    Composer,
    Compositions,
    DewySpeak,
    DrawRobot,
    Ensemble,
    EnsemblePeabody,
    EscortMision,
    FoxingAnimatronic,
    LordsOfSola,
    Mechatronics,
    Mehve,
    MusicalDL,
    PongBot,
    PRS19,
    RebelScum,
    Rewind,
    RoboJay,
    SpaceportAmericaCup,
    uSkipSpoilers,
    WSE18,
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
        { page: Compositions, path: '/projects/compositions' },
        { page: DewySpeak, path: '/projects/dewy' },
        { page: DrawRobot, path: '/projects/drawbot' },
        { page: Ensemble, path: '/projects/ensemble' },
        { page: EnsemblePeabody, path: '/projects/ensemble_peabody' },
        { page: EscortMision, path: '/projects/escort_mission' },
        { page: FoxingAnimatronic, path: '/projects/foxing_animatronic' },
        { page: LordsOfSola, path: '/projects/lords_of_sola' },
        { page: Mechatronics, path: '/projects/mechatronics' },
        { page: Mehve, path: '/projects/mehve' },
        { page: MusicalDL, path: '/projects/musical_dl' },
        { page: PongBot, path: '/projects/pongbot' },
        { page: PRS19, path: '/projects/prs19' },
        { page: RebelScum, path: '/projects/rebel_scum' },
        { page: Rewind, path: '/projects/rewind' },
        { page: RoboJay, path: '/projects/robojay' },
        { page: SpaceportAmericaCup, path: '/projects/spaceport_america_cup' },
        { page: uSkipSpoilers, path: '/projects/uskipspoilers' },
        { page: WSE18, path: '/projects/wse18' },
    ]

    return (
        <div
            id="View"
            style={{
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
                        <Route exact path="/clovers">
                            <Clovers />
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
