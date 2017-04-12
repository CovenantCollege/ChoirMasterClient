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
import DummyChoirPage from './components/DummyChoirPage'
import SingerArrangementPage from './components/SingerArrangementPage'

const middleware = compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

// Initial state for users... This is just for demo
const initialState = {
  dummySingers:
    { dummySingersList:
      [
        [
          { name: 'Josh Foster', height: "5' 9\"", voice: 'bass', id: 12, img: 'https://randomuser.me/api/portraits/med/men/' + 12 + '.jpg' },
          { name: 'Jonathan Austin', height: "6' 0\"", voice: 'baritone', id: 32, img: 'https://randomuser.me/api/portraits/med/men/' + 32 + '.jpg' },
          { name: 'Josh Humphries', height: "6' 1\"", voice: 'tenor', id: 33, img: 'https://randomuser.me/api/portraits/med/men/' + 33 + '.jpg' },
          { name: 'Abby Hynson', height: "6' 2\"", voice: 'alto', id: 34, img: 'https://randomuser.me/api/portraits/med/women/' + 7 + '.jpg' },
          { name: 'Ben Jobson', height: "6' 3\"", voice: 'soprano', id: 35, img: 'https://randomuser.me/api/portraits/med/men/' + 35 + '.jpg' }
        ],
        [
          { name: 'Marc Bohler', height: "6' 4\"", voice: 'bass', id: 36, img: 'https://randomuser.me/api/portraits/med/men/' + 34 + '.jpg' },
          { name: 'David Reed', height: "6' 5\"", voice: 'baritone', id: 37, img: 'https://randomuser.me/api/portraits/med/men/' + 37 + '.jpg' },
          { name: 'Spencer Dent', height: "6' 6\"", voice: 'tenor', id: 38, img: 'https://randomuser.me/api/portraits/med/men/' + 38 + '.jpg' },
          { name: 'Nick Gilbert', height: "6' 7\"", voice: 'alto', id: 39, img: 'https://randomuser.me/api/portraits/med/men/' + 39 + '.jpg' },
          { name: 'Jesse Clinton', height: "6' 8\"", voice: 'soprano', id: 40, img: 'https://randomuser.me/api/portraits/med/men/' + 40 + '.jpg' }
        ],
        [
          { name: 'Jay Epperson', height: "6' 9\"", voice: 'bass', id: 41, img: 'https://randomuser.me/api/portraits/med/men/' + 41 + '.jpg' },
          { name: 'Jared Daniel', height: "6' 10\"", voice: 'baritone', id: 42, img: 'https://randomuser.me/api/portraits/med/men/' + 42 + '.jpg' },
          { name: 'Ben Copeland', height: "6' 11\"", voice: 'tenor', id: 43, img: 'https://randomuser.me/api/portraits/med/men/' + 43 + '.jpg' },
          { name: 'Drew Osborn', height: "6' 12\"", voice: 'alto', id: 44, img: 'https://randomuser.me/api/portraits/med/men/' + 44 + '.jpg' },
          { name: 'Eddie Sunder', height: "7' 0\"", voice: 'soprano', id: 45, img: 'https://randomuser.me/api/portraits/med/men/' + 45 + '.jpg' }
        ]
      ]
    },
  grid:{rows:2, cols:2}
};

const store = createStore(
  rootReducer,
  initialState,
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
        <Route path="/dummy-choir" component={DummyChoirPage} />
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
