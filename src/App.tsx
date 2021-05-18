import React from 'react'
import { Navbar } from './Components/Navbar'
import { About, Contact, Home, Misc, NotFound, NotImplemented, Projects } from './Pages'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import { DewySpeak } from './Pages/Projects/DewySpeak'

const App = (): JSX.Element => {
    //list of all project pages
    interface PageProps {
        page: () => JSX.Element
        path: string
    }
    const projectPages: PageProps[] = [{ page: DewySpeak, path: '/projects/dewy' }]

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
                // fontSize: '200%', //TODO->see if we can have this globally?
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
