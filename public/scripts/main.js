import React from 'react';
import 'fastclick';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router';

/**
 * Import components
 */
import App from './containers/App.jsx';
import configureStore from './store/configureStore.js';

const { store, history } = configureStore();

const rootElement = document.getElementById('app');
render(
  <Provider store={store}>

    <Router history={history}>
      <Route path='/' component={App} />
    </Router>
  </Provider>,
  rootElement
);
