import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Switch } from 'react-router';
import { renderRoutes } from 'react-router-config';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import createHistory from 'history/createBrowserHistory';
import thunk from 'redux-thunk';

import reducers from './reducers';
import routes from './routes';


// Create an enhanced history that syncs navigation events with the store
const history = createHistory();
const routeMiddleware = routerMiddleware(history);

// Add the reducer to your store on the `routing` key
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
  , document.getElementById('root')
);
