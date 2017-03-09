import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Table } from 'react-bootstrap'
import { fetchOrganizationsIfNeeded } from '../actions/organizations'
import { changePage } from '../actions/page'
import { isAuthenticated, getToken } from '../selectors/user'
import { getSelectedOrganization } from '../selectors/organizations'
import { getSelectedVenue } from '../selectors/venues'
import { getPerformances } from '../selectors/performances'

export class VenuePage extends Component {
  constructor(props) {
    super(props);

    this.fetchDataIfNeeded = this.fetchDataIfNeeded.bind(this);
  }

  fetchDataIfNeeded() {
    this.props.dispatch(fetchOrganizationsIfNeeded(this.props.token));
  }

  componentWillMount() {
    this.fetchDataIfNeeded();
  }

  componentDidUpdate() {
    this.fetchDataIfNeeded();
  }

  render() {
    if (!this.props.isAuthenticated) {
      this.props.dispatch(changePage(''));
      return null;
    }
    if (this.props.selectedOrganization === undefined || this.props.selectedVenue === undefined) {
      return null;
    }

    let performances = [];
    let header = null;
    if(this.props.performances) {
      performances = this.props.performances.map(performance => {
        return (
          <tr key={performance.performanceId}>
            <td>{performance.date}</td>
            <td>{performance.description}</td>
          </tr>
        );
      });
      header = (
        <tr>
          <th>Date</th>
          <th>Description</th>
        </tr>
      );
    }

    if(this.props.selectedVenue) {
      return (
        <div className="container margined-children">
          <h2>
            {this.props.selectedVenue.name}
          </h2>
          <Button onClick={() => changePage('/organizations/' + this.props.selectedOrganization.orgId)}>
            {this.props.selectedOrganization.name}
          </Button>
          <h3>Performances</h3>
          <form>
            <Table striped bordered condensed hover>
              <thead>
                {header}
              </thead>
              <tbody>
                {performances}
              </tbody>
            </Table>
          </form>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default connect(
  (state, props) => {
    const orgId = parseInt(props.params.orgId, 10);
    const venueId = parseInt(props.params.venueId, 10);
    const selectedVenue = getSelectedVenue(state, orgId, venueId);
    return {
      isAuthenticated: isAuthenticated(state),
      token: getToken(state),
      selectedOrganization: getSelectedOrganization(state, orgId),
      performances: getPerformances(state, orgId, venueId),
      selectedVenue,
      orgId,
      venueId
    };
  }
)(VenuePage);