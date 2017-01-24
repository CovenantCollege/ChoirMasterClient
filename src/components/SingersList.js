import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Button, Modal, FormGroup, FormControl, ControlLabel, Table, Glyphicon } from 'react-bootstrap';
import { addSinger, openAddSingerModal, closeAddSingerModal } from '../actions/singers';
import { getSingers, getAddSingerModalOpen } from '../selectors/singers';

class SingersList extends Component {

  constructor(props) {
    super(props);

    this.onKeyDown = this.onKeyDown.bind(this);
    this.submit = this.submit.bind(this);
  }

  onKeyDown(e) {
    if(e.which === 13) {
      this.submit();
    }
  }

  submit() {
    this.props.dispatch(addSinger({ name: this.state.nameInput, height: this.state.heightInput }));
  }

  render() {
    return (
      <div>
        <Button bsStyle="success" onClick={() => this.props.dispatch(openAddSingerModal())}><Glyphicon glyph="plus" /> Add Singer</Button>
        <Modal show={this.props.showModal}>
          <Modal.Header>
            <Modal.Title>Add Singer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <FormGroup>
                <ControlLabel>Name</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Enter name"
                  onChange={e => this.setState({ nameInput: e.target.value })}
                  onKeyDown={this.onKeyDown}
                />
                <br />
                <ControlLabel>Height</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Enter height"
                  onChange={e => this.setState({ heightInput: e.target.value })}
                  onKeyDown={this.onKeyDown}
                />
              </FormGroup>
            </form>
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
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Height</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.singersList.map(singer => {
                return (
                  <tr key={singer.id}>
                    <td>{singer.name}</td>
                    <td>{singer.height}</td>
                  </tr>
                );
              })
            }
          </tbody>
        </Table>
      </div>
    );
  };
}

export default connect(
  state => ({
    singersList: getSingers(state),
    showModal: getAddSingerModalOpen(state)
  })
)(SingersList);
