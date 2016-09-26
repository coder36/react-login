import React from 'react'
import { Router, Route, Link, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import SignIn from './pages/signin'
import LoggedIn from './pages/logged_in'

export default function(props) {

    const history = syncHistoryWithStore(browserHistory, props.store);

    return (
        <Router history={history}>
            <Route path="/signin" component={SignIn}/>
            <Route path="/loggedin" component={LoggedIn}/>
            <Route path="/" component={SignIn}/>
        </Router>
    )
}