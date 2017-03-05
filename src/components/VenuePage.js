import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchOrganizationsIfNeeded } from '../actions/organizations'
import { changePage } from '../actions/page'
import { isAuthenticated, getToken } from '../selectors/user'
import { getSelectedOrganization } from '../selectors/organizations'
import { getSelectedVenue } from '../selectors/venues'

export class ChoirPage extends Component {
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

    if(this.props.selectedVenue) {
      return (
        <div className="container">
          <h2>{this.props.selectedVenue.name}</h2>
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
      selectedVenue,
      orgId,
      venueId
    };
  }
)(ChoirPage);