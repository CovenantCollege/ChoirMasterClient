import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Modal, Form, FormGroup, FormControl, ControlLabel, Alert } from 'react-bootstrap'
import { addVenue } from '../actions/venues'
import { getToken } from '../selectors/user'
import { shouldShowModal } from '../selectors/modal'
import { hideModal } from '../actions/modal'
import { getOrgId } from '../selectors/path'

export class AddVenueModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nameInput: '',
      nameInputInvalid: false
    };

    this.onKeyDown = this.onKeyDown.bind(this);
    this.submit = this.submit.bind(this);
    this.focusNameInput = this.focusNameInput.bind(this);
  }

  onKeyDown(e) {
    if(e.which === 13) {
      e.preventDefault();
      this.submit();
    }
  }

  submit() {
    let nameInputInvalid = this.state.nameInput === undefined || this.state.nameInput.length === 0;
    if(nameInputInvalid) {
      this.setState({ nameInputInvalid });
    } else {
      this.props.dispatch(hideModal());
      this.props.dispatch(addVenue(
        this.props.token,
        this.props.orgId,
        {
          name: this.state.nameInput
        }
      ));
    }
  }

  focusNameInput() {
    document.getElementById('nameInput').focus();
  }

  componentDidUpdate() {
    this.focusNameInput();
  }

  render() {
    return (
      <Modal show={this.props.showModal}>
        <Modal.Header>
          <Modal.Title>Add Venue</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            this.state.nameInputInvalid ? (
              <Alert bsStyle="danger">
                <strong>Error!</strong> Name cannot be left blank.
              </Alert>
            ): null
          }
          <Form>
            <FormGroup validationState={this.state.nameInputInvalid ? 'error' : null}>
              <ControlLabel>Name</ControlLabel>
              <FormControl
                type="text"
                placeholder="Enter name"
                onChange={e => this.setState({ nameInput: e.target.value })}
                onKeyDown={this.onKeyDown}
                id="nameInput"
                autoFocus
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
    showModal: shouldShowModal(state),
    orgId: getOrgId(state)
  })
)(AddVenueModal);