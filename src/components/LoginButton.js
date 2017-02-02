import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'

class Login extends Component {
  render() {
    return (
      <Button bsStyle="primary" onClick={() => alert("TODO link to login page")}>
        Login
      </Button>
    );
  }
}

export default connect(
  state => ({})
)(Login);