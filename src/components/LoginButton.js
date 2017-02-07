import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import { hashHistory } from 'react-router'

class Login extends Component {
  render() {
    return (
      <Button bsStyle="primary" onClick={() => hashHistory.push('login')}>
        Login
      </Button>
    );
  }
}

export default connect(
  state => ({})
)(Login);