import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Form, FormGroup, FormControl, ControlLabel, Col, Checkbox, Alert } from 'react-bootstrap'
import { authenticateUser } from '../actions/user'
import { getIsAuthenticationFailed } from '../selectors/user'

export class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = { checkboxInput: true };

    this.onKeyDown = this.onKeyDown.bind(this);
    this.login = this.login.bind(this);
  }

  onKeyDown(e) {
    if(e.which === 13) {
      this.login();
    }
  }

  login() {
    this.props.dispatch(authenticateUser(this.state.emailInput, this.state.passwordInput, this.state.checkboxInput));
  }

  render() {
    return (
      <div className="container">
        {
          this.props.isAuthenticationFailed ? (
            <Alert bsStyle="danger">
              <strong>Error!</strong> Invalid username and/or password.
            </Alert>
          ): null
        }
        <Form horizontal>
          <FormGroup controlId="email">
            <Col componentClass={ControlLabel} sm={2}>
              Email
            </Col>
            <Col sm={10}>
              <FormControl
                type="email"
                placeholder="Email"
                onChange={e => this.setState({ emailInput: e.target.value })}
                onKeyDown={this.onKeyDown}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="password">
            <Col componentClass={ControlLabel} sm={2}>
              Password
            </Col>
            <Col sm={10}>
              <FormControl
                type="password"
                placeholder="Password"
                onChange={e => this.setState({ passwordInput: e.target.value })}
                onKeyDown={this.onKeyDown}
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Checkbox checked={this.state.checkboxInput} onChange={() => this.setState({ checkboxInput: !this.state.checkboxInput })}>Remember me</Checkbox>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button bsStyle="primary" onClick={this.login}>
                Login
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default connect(
  state => ({
    isAuthenticationFailed: getIsAuthenticationFailed(state)
  })
)(LoginPage);