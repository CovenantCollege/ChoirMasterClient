import React, { Component } from 'react'
import { connect } from 'react-redux'
import Login from './Login'
import Logout from './Logout'
import { authenticateUser, logoutUser } from '../actions/user'
import { getIsAuthenticated } from '../selectors/user'

class Navbar extends Component {
  render() {
    return (
      <nav className='navbar navbar-default'>
        <div className='container-fluid'>
          <a className="navbar-brand" href="#">Choir Master</a>
          <div className='navbar-form'>
            {this.props.isAuthenticated ? <Logout /> : <Login />}
          </div>
        </div>
      </nav>
    );
  }
}

export default connect(
  state => ({
    isAuthenticated: getIsAuthenticated(state)
  })
)(Navbar);