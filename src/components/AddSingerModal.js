import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Modal, Form, FormGroup, FormControl, ControlLabel, Radio, Alert } from 'react-bootstrap'
import { addSinger, closeAddSingerModal } from '../actions/singers'
import { getToken } from '../selectors/user'

class AddSingerModal extends Component {
  constructor(props) {
    super(props);

    this.genders = {
      MALE: 0,
      FEMALE: 1
    };

    this.voiceTypes = {
      S1: {
        name: 'Soprano 1',
        gender: this.genders.FEMALE
      },
      S2: {
        name: 'Soprano 2',
        gender: this.genders.FEMALE
      },
      A1: {
        name: 'Alto 1',
        gender: this.genders.FEMALE
      },
      A2: {
        name: 'Alto 2',
        gender: this.genders.FEMALE
      },
      T1: {
        name: 'Tenor 1',
        gender: this.genders.MALE
      },
      T2: {
        name: 'Tenor 2',
        gender: this.genders.MALE
      },
      B1: {
        name: 'Bass 1',
        gender: this.genders.MALE
      },
      B2: {
        name: 'Bass 2',
        gender: this.genders.MALE
      }
    };

    this.state = {
      nameInput: '',
      heightInput: 0,
      voiceInput: 'S1',
      genderInput: this.genders.FEMALE,
      nameInputInvalid: false,
      heightInputInvalid: false
    };

    this.onKeyDown = this.onKeyDown.bind(this);
    this.submit = this.submit.bind(this);
  }

  onKeyDown(e) {
    if(e.which === 13) {
      this.submit();
    }
  }

  submit() {
    let nameInputInvalid = this.state.nameInput === undefined || this.state.nameInput.length === 0;
    let heightInputInvalid = this.state.heightInput % 1 !== 0 || this.state.heightInput <= 0;
    if(nameInputInvalid || heightInputInvalid) {
      this.setState({ nameInputInvalid, heightInputInvalid });
    } else {
      this.props.dispatch(addSinger(
        this.props.token,
        {
          name: this.state.nameInput,
          height: this.state.heightInput,
          voice: this.state.voiceInput,
          gender: Object.keys(this.genders).find(gender => this.genders[gender] === this.state.genderInput).toLowerCase()
        },
        this.props.orgId
      ));
    }
  }

  focusFirstInvalidInput() {
    let heightInputElement = document.getElementById('heightInput');
    if((this.state.nameInputInvalid || !this.state.heightInputInvalid) && !(heightInputElement === document.activeElement)) {
      document.getElementById('nameInput').focus();
    } else if (!(document.getElementById('nameInput') === document.activeElement)) {
      heightInputElement.focus();
    }
  }

  componentDidUpdate() {
    this.focusFirstInvalidInput();
  }

  render() {
    return (
      <Modal show={this.props.showModal}>
        <Modal.Header>
          <Modal.Title>Add Singer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            this.state.nameInputInvalid || this.state.heightInputInvalid ? (
              <Alert bsStyle="danger">
                <strong>Error!</strong> Some fields were not filled out correctly.
                <br />
                <ul>
                  {this.state.nameInputInvalid ? <li>Name must not be left blank.</li> : null}
                  {this.state.heightInputInvalid ? <li>Height must be a whole number.</li> : null}
                </ul>
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
            <FormGroup validationState={this.state.heightInputInvalid ? 'error' : null}>
              <ControlLabel>Height</ControlLabel>
              <FormControl
                type="text"
                placeholder="Enter height"
                onChange={e => this.setState({ heightInput: e.target.value })}
                onKeyDown={this.onKeyDown}
                id="heightInput"
              />
              <FormControl.Feedback />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Voice</ControlLabel>
              <FormControl
                componentClass="select"
                placeholder="S1"
                onChange={e => this.setState({ voiceInput: e.target.value, genderInput: this.voiceTypes[e.target.value].gender })}>
                  {
                    Object.keys(this.voiceTypes).map(voiceType =>
                      <option value={voiceType} key={voiceType}>
                        {this.voiceTypes[voiceType].name}
                      </option>
                    )
                  }
              </FormControl>
            </FormGroup>
            <FormGroup>
              <Radio inline checked={this.state.genderInput === this.genders.MALE} onChange={() => this.setState({ genderInput: this.genders.MALE })}>
                Male
              </Radio>
              {' '}
              <Radio inline checked={this.state.genderInput === this.genders.FEMALE} onChange={() => this.setState({ genderInput: this.genders.FEMALE })}>
                Female
              </Radio>
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="success" onClick={this.submit}>
            Submit
          </Button>
          <Button onClick={() => this.props.dispatch(closeAddSingerModal())}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default connect(
  state => ({
    token: getToken(state)
  })
)(AddSingerModal);