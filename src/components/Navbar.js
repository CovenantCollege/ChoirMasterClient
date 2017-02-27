import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Nav, NavItem } from 'react-bootstrap'
import { Navbar as NavbarReactBootstrap } from 'react-bootstrap'
import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'
import { changePage } from '../actions/page'
import { isAuthenticated } from '../selectors/user'

export class Navbar extends Component {
  render() {
    let links = this.props.isAuthenticated ? [
      <NavItem key="1" eventKey={1} onClick={() => this.props.dispatch(changePage('dashboard'))}>Organizations</NavItem>,
      <NavItem key="2" eventKey={2} onClick={() => this.props.dispatch(changePage('dummy-choir'))}>Dummy Choir</NavItem>,
      <NavItem key="3" eventKey={3} onClick={() => this.props.dispatch(changePage('settings'))}>Settings</NavItem>
    ] : null;
    return (
      <NavbarReactBootstrap>
        <NavbarReactBootstrap.Header>
          <NavbarReactBootstrap.Brand>
            <a onClick={() => this.props.dispatch(changePage(''))}>Choir Master</a>
          </NavbarReactBootstrap.Brand>
        </NavbarReactBootstrap.Header>
        <Nav>
          {links}
        </Nav>
        <NavbarReactBootstrap.Collapse>
          <NavbarReactBootstrap.Form pullRight>
            {this.props.isAuthenticated ? <LogoutButton /> : <LoginButton />}
          </NavbarReactBootstrap.Form>
        </NavbarReactBootstrap.Collapse>
      </NavbarReactBootstrap>
    );
  }
}

export default connect(
  state => ({
    isAuthenticated: isAuthenticated(state)
  })
)(Navbar);
