import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Alert, Button, Table, Glyphicon } from 'react-bootstrap'
import AddSingerModal from './AddSingerModal'
import { openAddSingerModal, clearAddSingerFailed } from '../actions/singers'
import { getToken } from '../selectors/user'
import { getAddSingerModalOpen } from '../selectors/singers'
import { getOrganizations } from '../selectors/organizations'
import { getAddSingerFailed } from '../selectors/failedRequests'

export class SingersList extends Component {
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
        {
          this.props.addSingerFailed ?
          (
            <Alert bsStyle="danger">
              <strong>Error!</strong> We were unable to add the singer.
            </Alert>
          ) : null
        }
        <Button bsStyle="success" onClick={() => {
          this.props.dispatch(openAddSingerModal());
          this.props.dispatch(clearAddSingerFailed());
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
    showModal: getAddSingerModalOpen(state),
    addSingerFailed: getAddSingerFailed(state)
  })
)(SingersList);
