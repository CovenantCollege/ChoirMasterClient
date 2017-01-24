import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import { logoutUser } from '../actions/user'

class Logout extends Component {
  render() {
    return (
      <Button bsStyle="primary" onClick={() => this.props.dispatch(logoutUser())}>
        Logout
      </Button>
    );
  }
}

export default connect(
  state => ({})
)(Logout);