import React, { useState } from 'react'
import { Navbar } from './Components/Navbar'
import { About, Contact, Home, Misc, Projects } from './Pages'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useHistory,
} from 'react-router-dom'

const App = (): JSX.Element => {
    return (
        <div
            style={{
                backgroundColor: 'black',
                width: '100vw',
                height: '100vh',
                color: 'white',
            }}
        >
            <Router basename="/website">
                <Navbar />
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
            </Router>
        </div>
    )
}

export default App
