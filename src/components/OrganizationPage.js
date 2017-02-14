import React, { Component } from 'react'
import { connect } from 'react-redux'
import SingersList from './SingersList'
import { fetchOrganizations } from '../actions/organizations'
import { changePage } from '../actions/page'
import { getIsAuthenticated, getToken } from '../selectors/user'
import { getOrganizations, getFetchingOrganizations } from '../selectors/organizations'

class OrganizationPage extends Component {
  constructor(props) {
    super(props);

    this.getOrgId = this.getOrgId.bind(this);
    this.getSelectedOrganization = this.getSelectedOrganization.bind(this);
  }

  getOrgId() {
    return parseInt(this.props.params.orgId, 10);
  }

  getSelectedOrganization() {
    return this.props.organizations.filter(organization => organization.orgId === this.getOrgId())[0];
  }

  componentWillMount() {
    if (this.props.organizations.length === 0 && !this.props.fetchingOrganizations) {
      this.props.dispatch(fetchOrganizations(this.props.token, this.getOrgId()));
    }
  }

  render() {
    if(!this.props.isAuthenticated) {
      this.props.dispatch(changePage(''));
      return null;
    }
    let selectedOrganization = this.getSelectedOrganization();
    if(selectedOrganization === undefined) {
      if(this.props.organizations.length > 0) {
        // TODO redirect to dashboard or show that organization does not exist
        // hashHistory.push('dashboard');
        return null;
      } else {
        return null;
      }
    }
    return (
      <div className="container">
        <h2>
          {selectedOrganization.name}
        </h2>
        <SingersList selectedOrganization={selectedOrganization} />
      </div>
    );
  }
}

export default connect(
  state => ({
    isAuthenticated: getIsAuthenticated(state),
    token: getToken(state),
    organizations: getOrganizations(state),
    fetchingOrganizations: getFetchingOrganizations(state)
  })
)(OrganizationPage);