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

import LoginPage from './components/LoginPage'
import DashboardPage from './components/DashboardPage'
import OrganizationPage from './components/OrganizationPage'
import DummyChoirPage from './components/DummyChoirPage'

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
          { name: 'Marc Bohler', height: "5' 9\"", voice: 'tenor', id: 12, img: 'https://randomuser.me/api/portraits/med/men/' + 12 + '.jpg' }, 
          { name: 'Jonathan Austin', height: "6' 0\"", voice: 'alto', id: 32, img: 'https://randomuser.me/api/portraits/med/men/' + 32 + '.jpg' },
          { name: 'Josh Humphries', height: "6' 0\"", voice: 'alto', id: 33, img: 'https://randomuser.me/api/portraits/med/men/' + 33 + '.jpg' },
          { name: 'Josh Foster', height: "6' 0\"", voice: 'alto', id: 34, img: 'https://randomuser.me/api/portraits/med/men/' + 34 + '.jpg' },
          { name: 'Ben Jobson', height: "6' 0\"", voice: 'alto', id: 35, img: 'https://randomuser.me/api/portraits/med/men/' + 35 + '.jpg' }
        ],
        [
          { name: 'Abby Hynson', height: "6' 0\"", voice: 'alto', id: 36, img: 'https://randomuser.me/api/portraits/med/women/' + 7 + '.jpg' },
          { name: 'David Reed', height: "6' 0\"", voice: 'alto', id: 37, img: 'https://randomuser.me/api/portraits/med/men/' + 37 + '.jpg' },
          { name: 'Spencer Dent', height: "6' 0\"", voice: 'alto', id: 38, img: 'https://randomuser.me/api/portraits/med/men/' + 38 + '.jpg' },
          { name: 'Nick Gilbert', height: "6' 0\"", voice: 'alto', id: 39, img: 'https://randomuser.me/api/portraits/med/men/' + 39 + '.jpg' },
          { name: 'Jonathan Austin', height: "6' 0\"", voice: 'alto', id: 40, img: 'https://randomuser.me/api/portraits/med/men/' + 40 + '.jpg' }
        ],
        [
          { name: 'Jonathan Austin', height: "6' 0\"", voice: 'alto', id: 41, img: 'https://randomuser.me/api/portraits/med/men/' + 41 + '.jpg' },
          { name: 'Jonathan Austin', height: "6' 0\"", voice: 'alto', id: 42, img: 'https://randomuser.me/api/portraits/med/men/' + 42 + '.jpg' },
          { name: 'Jonathan Austin', height: "6' 0\"", voice: 'alto', id: 43, img: 'https://randomuser.me/api/portraits/med/men/' + 43 + '.jpg' },
          { name: 'Jonathan Austin', height: "6' 0\"", voice: 'alto', id: 44, img: 'https://randomuser.me/api/portraits/med/men/' + 44 + '.jpg' },
          { name: 'Jonathan Austin', height: "6' 0\"", voice: 'alto', id: 45, img: 'https://randomuser.me/api/portraits/med/men/' + 45 + '.jpg' }
        ]
      ]
    }
};

const store = createStore(
  rootReducer,
  initialState,
  middleware
);

const token = localStorage.getItem('token');
if(token) {
  store.dispatch(loginUser(token, jwtDecode(token).email));
}

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Navbar />
      <Router history={hashHistory}>
        <Route path="/" component={App} />
        <Route path="/dummy-choir" component={DummyChoirPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/dashboard" component={DashboardPage} />
        <Route path="/organizations/:orgId" component={OrganizationPage} />
      </Router>
    </div>
  </Provider>,
  document.getElementById('root')
);

export const STORE = store;