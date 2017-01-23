import { connect } from 'react-redux';
import { Component } from 'react';
import React from 'react';
import { Button, Modal, FormGroup, FormControl, ControlLabel, Table } from 'react-bootstrap';
import { addSinger, openAddSingerModal, closeAddSingerModal } from '../actions/singers';
import { getSingers, getAddSingerModalOpen } from '../selectors/singers';

class SingersList extends Component {
  render() {
    return (
      <div>
        <Button bsStyle="success" onClick={() => this.props.dispatch(openAddSingerModal())}>Add Singer</Button>
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
                />
                <br />
                <ControlLabel>Height</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Enter height"
                  onChange={e => this.setState({ heightInput: e.target.value })}
                />
              </FormGroup>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="success" onClick={() => this.props.dispatch(addSinger({ name: this.state.nameInput, height: this.state.heightInput }))}>
              Submit
            </Button>
            <Button onClick={() => this.props.dispatch(closeAddSingerModal())}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
        <Table striped borderer condensed hover>
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
                  <tr>
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
