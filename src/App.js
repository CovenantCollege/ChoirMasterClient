import React, { Component } from 'react'
import { connect } from 'react-redux'
import SingersList from './components/SingersList'
import './App.css'
import 'babel-polyfill'
import Navbar from './components/Navbar'
import { getIsAuthenticated } from './selectors/user'

class App extends Component {
  render() {
    const container = !this.props.isAuthenticated ? null : (
      <div className="container">
        <SingersList />
      </div>
    );
    return (
      <div>
        <Navbar />
        {container}
      </div>
    );
  }
}

export default connect(
  state => ({
    isAuthenticated: getIsAuthenticated(state)
  })
)(App);