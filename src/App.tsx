import React from 'react'
import { Navbar } from './Components/Navbar'
import { About, Contact, Home, Consulting, Clovers, NotFound, NotImplemented, Projects } from './Pages'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import {
    BlobOpera,
    BoatSimulator,
    BuellerBoard,
    Composer,
    Compositions,
    DewySpeak,
    DrawRobot,
    SoVoice,
    EnsemblePeabody,
    EscortMission,
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
    SkipSpoilers,
    WSE18,
} from './Pages'
import { useLoadClovers } from './utilities'
import './App.css'

const ProjectPage = (Page: () => JSX.Element, name: string): JSX.Element => {
    return (
        <Route exact path={`/projects/${name}`}>
            <Page />
        </Route>
    )
}

const App = (): JSX.Element => {
    //preload clover images so that they load quickly when you go to that page
    useLoadClovers()

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

                        {/* Project specific pages */}
                        {ProjectPage(BlobOpera, 'blob_opera')}
                        {ProjectPage(BoatSimulator, 'boat_simulator')}
                        {ProjectPage(BuellerBoard, 'bueller_board')}
                        {ProjectPage(Composer, 'composer')}
                        {ProjectPage(Compositions, 'compositions')}
                        {ProjectPage(DewySpeak, 'dewy')}
                        {ProjectPage(DrawRobot, 'drawbot')}
                        {ProjectPage(SoVoice, 'so_voice')}
                        {ProjectPage(EnsemblePeabody, 'ensemble_peabody')}
                        {ProjectPage(EscortMission, 'escort_mission')}
                        {ProjectPage(FoxingAnimatronic, 'foxing_animatronic')}
                        {ProjectPage(LordsOfSola, 'lords_of_sola')}
                        {ProjectPage(Mechatronics, 'mechatronics')}
                        {ProjectPage(Mehve, 'mehve')}
                        {ProjectPage(MusicalDL, 'musical_dl')}
                        {ProjectPage(PongBot, 'pongbot')}
                        {ProjectPage(PRS19, 'prs19')}
                        {ProjectPage(RebelScum, 'rebel_scum')}
                        {ProjectPage(Rewind, 'rewind')}
                        {ProjectPage(RoboJay, 'robojay')}
                        {ProjectPage(SpaceportAmericaCup, 'spaceport_america_cup')}
                        {ProjectPage(SkipSpoilers, 'uskipspoilers')}
                        {ProjectPage(WSE18, 'wse18')}

                        <Route exact path="/about">
                            <About />
                        </Route>
                        <Route exact path="/consulting">
                            <Consulting />
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
