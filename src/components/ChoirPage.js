import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Table } from 'react-bootstrap'
import { fetchOrganizationsIfNeeded } from '../actions/organizations'
import { fetchSingersIfNeeded } from '../actions/singers'
import { changePage } from '../actions/page'
import { isAuthenticated, getToken } from '../selectors/user'
import { getSelectedOrganization } from '../selectors/organizations'
import { getSelectedChoir } from '../selectors/choirs'

export class ChoirPage extends Component {
  constructor(props) {
    super(props);

    this.fetchDataIfNeeded = this.fetchDataIfNeeded.bind(this);
  }

  fetchDataIfNeeded() {
    this.props.dispatch(fetchOrganizationsIfNeeded(this.props.token));
    if(!(this.props.selectedChoir === undefined)) {
      this.props.dispatch(fetchSingersIfNeeded(this.props.token, this.props.orgId, this.props.choirId))
    }
  }

  componentWillMount() {
    this.fetchDataIfNeeded();
  }

  componentDidUpdate() {
    this.fetchDataIfNeeded();
  }

  render() {
    if(!this.props.isAuthenticated) {
      this.props.dispatch(changePage(''));
      return null;
    }
    if(this.props.selectedOrganization === undefined || this.props.selectedChoir === undefined) {
      return null;
    }

    let singers = [];
    if(this.props.selectedChoir.singers) {
      singers = this.props.selectedChoir.singers.map(singer => {
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
      <div className="container margined-children">
        <h2>
          {this.props.selectedChoir.name}
        </h2>
        <Button onClick={() => changePage('/organizations/' + this.props.selectedOrganization.orgId)}>
          {this.props.selectedOrganization.name}
        </Button>
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
  }
}

export default connect(
  (state, props) => {
    const orgId = parseInt(props.params.orgId, 10);
    const choirId = parseInt(props.params.choirId, 10);
    return {
      isAuthenticated: isAuthenticated(state),
      token: getToken(state),
      selectedOrganization: getSelectedOrganization(state, orgId),
      selectedChoir: getSelectedChoir(state, orgId, choirId),
      orgId,
      choirId
    };
  }
)(ChoirPage);