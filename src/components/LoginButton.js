import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import { changePage } from '../actions/page'

export class LoginButton extends Component {
  render() {
    return (
      <Button bsStyle="primary" onClick={() => changePage('login')}>
        Login
      </Button>
    );
  }
}

export default connect(
  state => ({})
)(LoginButton);