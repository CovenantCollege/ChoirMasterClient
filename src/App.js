import React, { Component } from 'react'
import { connect } from 'react-redux'
import SingersList from './components/SingersList'
import './App.css'
import 'babel-polyfill'
import { getIsAuthenticated } from './selectors/user'
import { Jumbotron } from 'react-bootstrap'

class App extends Component {
  render() {
    const contents = this.props.isAuthenticated ? (
      <SingersList />
    ) : (
      <Jumbotron>
        <h2>
          Welcome to Choir Master!
        </h2>
      </Jumbotron>
    );
    return (
      <div className="container">
        {contents}
      </div>
    );
  }
}

export default connect(
  state => ({
    isAuthenticated: getIsAuthenticated(state)
  })
)(App);