import React, { Component } from 'react'
import { connect } from 'react-redux'
import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'
import { getIsAuthenticated } from '../selectors/user'

class Navbar extends Component {
  render() {
    return (
      <nav className='navbar navbar-default'>
        <div className='container-fluid'>
          <a className="navbar-brand" href="#">Choir Master</a>
          <div className='navbar-form'>
            {this.props.isAuthenticated ? <LogoutButton /> : <LoginButton />}
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