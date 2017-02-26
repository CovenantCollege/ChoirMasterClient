import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Modal, Form, FormGroup, FormControl, ControlLabel, Alert } from 'react-bootstrap'
import { getToken, getEmail } from '../selectors/user'
import { shouldShowModal } from '../selectors/modal'
import { hideModal } from '../actions/modal'
import { changePassword } from '../actions/user'

export class ChangePasswordModal extends Component {
  constructor(props) {
    super(props);

    this.state = this.initialState = {
      oldPasswordInput: '',
      newPasswordInput: '',
      oldPasswordInvalid: false,
      newPasswordInvalid: false
    };

    this.onKeyDown = this.onKeyDown.bind(this);
    this.submit = this.submit.bind(this);
  }

  onKeyDown(e) {
    if(e.which === 13) {
      e.preventDefault();
      this.submit();
    }
  }

  submit() {
    let oldPasswordInvalid = this.state.oldPasswordInput === undefined || this.state.oldPasswordInput.length === 0;
    let newPasswordInvalid = this.state.newPasswordInput === undefined || this.state.newPasswordInput.length === 0;
    if(oldPasswordInvalid || newPasswordInvalid) {
      this.setState({ oldPasswordInvalid, newPasswordInvalid });
    } else {
      this.props.dispatch(hideModal());
      this.props.dispatch(changePassword(
        this.props.token,
        this.props.email,
        this.state.oldPasswordInput,
        this.state.newPasswordInput
      ));
    }
  }

  render() {
    return (
      <Modal show={this.props.showModal} onExited={() => this.setState(this.initialState)}>
        <Modal.Header>
          <Modal.Title>Add Organization</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            this.state.oldPasswordInvalid || this.state.newPasswordInvalid ? (
              <Alert bsStyle="danger">
                <strong>Error!</strong> Some fields were not filled out correctly.
                <br />
                <ul>
                  {this.state.oldPasswordInvalid ? <li>Old password must not be left blank.</li> : null}
                  {this.state.newPasswordInvalid ? <li>New password must not be left blank.</li> : null}
                </ul>
              </Alert>
            ): null
          }
          <Form>
            <FormGroup validationState={this.state.oldPasswordInvalid ? 'error' : null}>
              <ControlLabel>Old password</ControlLabel>
              <FormControl
                type="password"
                placeholder="Enter old password"
                onChange={e => this.setState({ oldPasswordInput: e.target.value })}
                onKeyDown={this.onKeyDown}
                id="oldPasswordInput"
                autoFocus
              />
              <FormControl.Feedback />
            </FormGroup>
          </Form>
          <Form>
            <FormGroup validationState={this.state.newPasswordInvalid ? 'error' : null}>
              <ControlLabel>New password</ControlLabel>
              <FormControl
                type="password"
                placeholder="Enter new password"
                onChange={e => this.setState({ newPasswordInput: e.target.value })}
                onKeyDown={this.onKeyDown}
                id="newPasswordInput"
              />
              <FormControl.Feedback />
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="success" onClick={this.submit}>
            Submit
          </Button>
          <Button onClick={() => this.props.dispatch(hideModal())}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default connect(
  state => ({
    token: getToken(state),
    email: getEmail(state),
    showModal: shouldShowModal(state)
  })
)(ChangePasswordModal);