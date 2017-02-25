import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Alert, Button, Table, Glyphicon } from 'react-bootstrap'
import { clearAddSingerFailed } from '../actions/singers'
import { getToken } from '../selectors/user'
import { getAddSingerFailed } from '../selectors/failedRequests'
import { showModal } from '../actions/modal'
import * as modalTypes from '../constants/modalTypes'

export class SingersList extends Component {
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
          this.props.dispatch(showModal(modalTypes.ADD_SINGER_MODAL));
          this.props.dispatch(clearAddSingerFailed());
        }}><Glyphicon glyph="plus" /> Add Singer</Button>
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
    addSingerFailed: getAddSingerFailed(state)
  })
)(SingersList);
