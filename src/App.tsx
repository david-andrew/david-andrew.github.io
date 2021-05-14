import React, { useState } from 'react'
import { Navbar } from './Components/Navbar'
import { About, Contact, Home, Misc, Projects } from './Pages'
import { HashRouter as Router, Switch, Route, useHistory } from 'react-router-dom'

const App = (): JSX.Element => {
    return (
        <div
            id="View"
            style={{
                backgroundColor: 'black',
                width: '100vw',
                height: '100vh',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                // overflow: 'hidden',
            }}
        >
            <Router basename="/website">
                <div id="PageNav" style={{ flexGrow: 0 }}>
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
