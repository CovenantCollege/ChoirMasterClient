import React, { Component } from 'react'
import { connect } from 'react-redux'
import './App.css'
import 'babel-polyfill'
import { isAuthenticated } from './selectors/user'
import { Jumbotron } from 'react-bootstrap'

export class App extends Component {
  render() {
    return (
      <div className="container">
        <Jumbotron>
          <h2>
            Welcome to Choir Master!
          </h2>
        </Jumbotron>
      </div>
    );
  }
}

export default connect(
  state => ({
    isAuthenticated: isAuthenticated(state)
  })
)(App);