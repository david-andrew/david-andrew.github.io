import React from 'react'
import { Navbar } from './Components/Navbar'
import { About, Contact, Home, Misc, Projects } from './Pages'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import { DewySpeak } from './Pages/Projects/DewySpeak'

const App = (): JSX.Element => {
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
                        <Route exact path="/projects/dewy">
                            <DewySpeak />
                        </Route>
                        <Route exact path="/about">
                            <About />
                        </Route>
                        <Route exact path="/misc">
                            <Misc />
                        </Route>
                        <Route exact path="/contact">
                            <Contact />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </div>
    )
}

export default App
