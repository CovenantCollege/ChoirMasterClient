import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Button, Table, Glyphicon } from 'react-bootstrap'
import AddSingerModal from './AddSingerModal'
import { openAddSingerModal } from '../actions/singers'
import { getToken } from '../selectors/user'
import { getAddSingerModalOpen } from '../selectors/singers'
import { getOrganizations } from '../selectors/organizations'

class SingersList extends Component {
  constructor(props) {
    super(props);

    this.state = { numAddSingerButtonClicks: 0 };
  }
  
  render() {
    let singers = null;
    if(this.props.selectedOrganization.singers !== undefined) {
      singers = this.props.selectedOrganization.singers.map(singer => {
        return (
          <tr key={singer.singerId}>
            <td>{singer.name}</td>
            <td>{singer.height}</td>
            <td>{singer.voice}</td>
          </tr>
        );
      });
    }
    return (
      <div className="margined-children">
        <Button bsStyle="success" onClick={() => {
          this.props.dispatch(openAddSingerModal());
          this.setState({ numAddSingerButtonClicks: this.state.numAddSingerButtonClicks + 1 });
        }}><Glyphicon glyph="plus" /> Add Singer</Button>
        <AddSingerModal showModal={this.props.showModal} orgId={this.props.selectedOrganization.orgId} key={this.state.numAddSingerButtonClicks} />
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Height</th>
              <th>Voice</th>
            </tr>
          </thead>
          <tbody>
            {singers}
          </tbody>
        </Table>
      </div>
    );
  };
}

export default connect(
  state => ({
    token: getToken(state),
    organizations: getOrganizations(state),
    showModal: getAddSingerModalOpen(state)
  })
)(SingersList);
