import React from 'react';
import ReactDOM from 'react-dom';
import { App } from '../App';
import { AddOrganizationModal } from '../components/AddOrganizationModal'
import { AddSingerModal } from '../components/AddSingerModal'
import { DashboardPage } from '../components/DashboardPage'
import { LoginButton } from '../components/LoginButton'
import { LoginPage } from '../components/LoginPage'
import { LogoutButton } from '../components/LogoutButton'
import { Navbar } from '../components/Navbar'
import { OrganizationPage } from '../components/OrganizationPage'
import { SingersList } from '../components/SingersList'

import { loginUser } from '../actions/user'

import { Provider } from 'react-redux'
import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers/index'

const middleware = compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(
  rootReducer,
  middleware
);

describe('components', function() {
  describe('<App />', function () {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<App />, div);
    });
  });

  describe('<AddOrganizationModal />', function () {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<AddOrganizationModal />, div);
    });
  });

  describe('<AddSingerModal />', function () {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<AddSingerModal />, div);
    });
  });

  // TODO fix this test
  /*
  describe('<DashboardPage />', function () {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(
        <Provider store={store}>
          <DashboardPage />
        </Provider>, div);
    });
  });
  */

  describe('<LoginButton />', function () {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<LoginButton />, div);
    });
  });

  describe('<LoginPage />', function () {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<LoginPage />, div);
    });
  });

  describe('<LogoutButton />', function () {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<LogoutButton />, div);
    });
  });

  describe('<Navbar />', function () {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(
        <Provider store={store}>
          <Navbar />
        </Provider>, div);
    });

    // TODO figure out if this is the right way to test
    /*
    store.dispatch(loginUser());
    
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(
        <Provider store={store}>
          <Navbar />
        </Provider>, div);
      console.log(store);
    });
    */
  });

  // TODO fix this test
  /*
  describe('<OrganizationPage />', function () {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(
        <Provider store={store}>
          <OrganizationPage />
        </Provider>, div);
    });
  });
  */

  describe('<SingersList />', function () {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(
        <Provider store={store}>
          <SingersList selectedOrganization={{ orgId: 0, name: '', singers: [] }} />
        </Provider>, div);
    });
  });
});