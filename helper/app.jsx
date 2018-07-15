import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Switch } from 'react-router';
import { renderRoutes } from 'react-router-config';
import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import createHistory from "history/createBrowserHistory";
import { Route } from "react-router";
import thunk from 'redux-thunk';
import {
    ConnectedRouter,
    routerReducer,
    routerMiddleware,
    push
  } from "react-router-redux";
//import { BrowserRouter } from 'react-router-dom'

import reducers from './reducers.jsx';
import Dashboard from './components/dashboard/dashboard.jsx';
import routes from './routes.jsx';


// Create an enhanced history that syncs navigation events with the store
const history = createHistory();
const routeMiddleware = routerMiddleware(history);

const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(thunk, routeMiddleware))
);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
                {renderRoutes(routes)}
            </Switch>    
        </ConnectedRouter>
    </Provider>
    ,document.getElementById('dashboard')
)




