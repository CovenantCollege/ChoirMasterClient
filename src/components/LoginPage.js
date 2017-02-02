import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import { authenticateUser } from '../actions/user'

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.onKeyDown = this.onKeyDown.bind(this);
    this.login = this.login.bind(this);
  }

  onKeyDown(e) {
    if(e.which === 13) {
      this.login();
    }
  }

  login() {
    this.props.dispatch(authenticateUser(this.state.emailInput, this.state.passwordInput));
  }

  render() {
    return (
      <div className="container">
        <form>
          <FormGroup>
            <ControlLabel>Email:</ControlLabel>
            <FormControl
              type="email"
              placeholder="Email"
              onChange={e => this.setState({ emailInput: e.target.value })}
              onKeyDown={this.onKeyDown}
            />
            <ControlLabel>Password:</ControlLabel>
            <FormControl
              type="password"
              placeholder="Password"
              onChange={e => this.setState({ passwordInput: e.target.value })}
              onKeyDown={this.onKeyDown}
            />
            <Button bsStyle="primary" onClick={this.login}>
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
)(LoginPage);