import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import './app.css';
import Routes from './routes'
import store from './store'

function AppRoutes() {
    return (
        <Provider store={store}>
            <Routes store={store}/>
        </Provider>
    )
}

ReactDOM.render(<AppRoutes/>, document.getElementById('root'))


