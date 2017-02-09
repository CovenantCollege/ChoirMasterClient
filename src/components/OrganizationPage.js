import React, { Component } from 'react'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import SingersList from './SingersList'
import { getIsAuthenticated } from '../selectors/user'
import { getOrganizations } from '../selectors/organizations'
import { fetchOrganizations } from '../actions/organizations'

class OrganizationPage extends Component {
  constructor(props) {
    super(props);

    this.getOrgId = this.getOrgId.bind(this);
  }

  getOrgId() {
    return parseInt(this.props.params.orgId, 10);
  }

  componentWillMount() {
    if(this.props.organizations.length === 0) {
      this.props.dispatch(fetchOrganizations(this.getOrgId()));
    }
  }

  render() {
    if(!this.props.isAuthenticated) {
      hashHistory.push('');
      return null;
    }
    let selectedOrganization = this.props.organizations[this.getOrgId()];
    let name = selectedOrganization ? selectedOrganization.name : null;
    return (
      <div className="container">
        <h2>
          {name}
        </h2>
        <SingersList orgId={this.getOrgId()} />
      </div>
    );
  }
}

export default connect(
  state => ({
    isAuthenticated: getIsAuthenticated(state),
    organizations: getOrganizations(state)
  })
)(OrganizationPage);