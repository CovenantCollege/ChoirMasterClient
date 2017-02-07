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
import { fetchSingers } from './actions/singers'
import { selectOrganization } from './actions/organizations'
import jwtDecode from 'jwt-decode'
import { Router, Route, hashHistory } from 'react-router'

import LoginPage from './components/LoginPage'
import DashboardPage from './components/DashboardPage'
import OrganizationPage from './components/OrganizationPage'

const middleware = compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(
  rootReducer,
  middleware
);

const token = localStorage.getItem('token');
if(token) {
  store.dispatch(loginUser(token, jwtDecode(token).email));
  store.dispatch(fetchSingers());
  // store.dispatch(selectOrganization(5));
}

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Navbar />
      <Router history={hashHistory}>
        <Route path="/" component={App} />
        <Route path="/login" component={LoginPage} />
        <Route path="/dashboard" component={DashboardPage} />
        <Route path="/organizations/:orgId" component={OrganizationPage} />
      </Router>
    </div>
  </Provider>,
  document.getElementById('root')
);