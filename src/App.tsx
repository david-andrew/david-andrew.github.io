import React, { useState } from 'react'
import { Navbar } from './Components/Navbar'
import { About, Contact, Home, Misc, Projects } from './Pages'
import { HashRouter as Router, Switch, Route, useHistory } from 'react-router-dom'

const App = (): JSX.Element => {
    //scale for high dpi displays
    const scale = window.devicePixelRatio

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
                // fontSize: `${scale}vmin`, //normally 1vmin
                // overflow: 'hidden',
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
                        <Route path="/projects">
                            <Projects />
                        </Route>
                        <Route path="/about">
                            <About />
                        </Route>
                        <Route path="/misc">
                            <Misc />
                        </Route>
                        <Route path="/contact">
                            <Contact />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </div>
    )
}

export default App
