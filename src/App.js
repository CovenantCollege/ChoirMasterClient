import React, { Component } from 'react';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
import SingersList from './components/SingersList';
import './App.css';

const middleware = compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(
  rootReducer,
  middleware
);

class App extends Component {
  render() {
    return (
      <div className="container">
        <Provider store={store}>
          <SingersList />
        </Provider>
      </div>
    );
  }
}

export default App;
