import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, FormGroup, FormControl } from 'react-bootstrap'
import { authenticateUser } from '../actions/user'

class Login extends Component {
  render() {
    return (
      <div>
        <form>
          <FormGroup>
            <FormControl
              type="email"
              placeholder="Email"
              onChange={e => this.setState({ emailInput: e.target.value })}
            />
            <FormControl
              type="password"
              placeholder="Password"
              onChange={e => this.setState({ passwordInput: e.target.value })}
            />
            <Button bsStyle="primary" onClick={() => this.props.dispatch(authenticateUser(this.state.emailInput, this.state.passwordInput))}>
              Login
            </Button>
          </FormGroup>
        </form>
      </div>
    );
  }
}

export default connect(
  state => ({})
)(Login);