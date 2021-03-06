import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Navbar from './components/Navbar'
import './index.css';
import { Provider } from 'react-redux'
import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers/index'
import { loginUser } from './actions/user'
import jwtDecode from 'jwt-decode'
import { Router, Route, hashHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import ModalContainer from './components/ModalContainer'
import LoginPage from './components/LoginPage'
import DashboardPage from './components/DashboardPage'
import OrganizationPage from './components/OrganizationPage'
import ChoirPage from './components/ChoirPage'
import VenuePage from './components/VenuePage'
import SettingsPage from './components/SettingsPage'
import SingerArrangementPage from './components/SingerArrangementPage'

const middleware = compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(
  rootReducer,
  middleware
);

const history = syncHistoryWithStore(hashHistory, store);

const token = localStorage.getItem('token');
if(token) {
  store.dispatch(loginUser(token, jwtDecode(token).email));
}

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Navbar />
      <ModalContainer />
      <Router history={history}>
        <Route path="/" component={App} />
        <Route path="/login" component={LoginPage} />
        <Route path="/dashboard" component={DashboardPage} />
        <Route path="/organizations/:orgId" component={OrganizationPage} />
        <Route path="/organizations/:orgId/choirs/:choirId" component={ChoirPage} />
        <Route path="/organizations/:orgId/venues/:venueId" component={VenuePage} />
        <Route path="/organizations/:orgId/performances/:performanceId" component={SingerArrangementPage} />
        <Route path="/settings" component={SettingsPage} />
      </Router>
    </div>
  </Provider>,
  document.getElementById('root')
);

export const STORE = store;
