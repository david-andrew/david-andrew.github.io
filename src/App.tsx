import React from 'react'
import { Navbar } from './Components/Navbar'
import { About, Contact, Home, Consulting, Clovers, NotFound, NotImplemented, Projects } from './Pages'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import {
    AstroJays,
    BlobOpera,
    BoatSimulator,
    BuellerBoard,
    Composer,
    Compositions,
    DewySpeak,
    DrawRobot,
    EnsemblePeabody,
    EscortMission,
    FoxingAnimatronic,
    Mechatronics,
    Mehve,
    MusicalDL,
    PongBot,
    PRS19,
    Rewind,
    RoboJay,
    SkipSpoilers,
    SoVoice,
    SpaceportAmericaCup,
    WSE18,
    Timelapse,
    ZiggyV,
} from './Pages'
import { useLoadClovers, useProjectDates, usePageViews } from './utilities'
import './App.css'

import ReactGA from 'react-ga'
ReactGA.initialize('UA-210009030-1')

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
    const projectDates = useProjectDates()

    //report page views to google analytics
    usePageViews()

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
                            <Projects projectDates={projectDates} />
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
                        {ProjectPage(ZiggyV, 'ziggy_v')}
                        {ProjectPage(Mechatronics, 'mechatronics')}
                        {ProjectPage(Mehve, 'mehve')}
                        {ProjectPage(MusicalDL, 'musical_dl')}
                        {ProjectPage(PongBot, 'pongbot')}
                        {ProjectPage(PRS19, 'prs19')}
                        {ProjectPage(AstroJays, 'rocketry')}
                        {ProjectPage(Rewind, 'rewind')}
                        {ProjectPage(RoboJay, 'robojay')}
                        {ProjectPage(SpaceportAmericaCup, 'spaceport_america_cup')}
                        {ProjectPage(SkipSpoilers, 'uskipspoilers')}
                        {ProjectPage(Timelapse, 'timelapse')}
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
