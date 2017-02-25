import React, { Component } from 'react'
import { connect } from 'react-redux'
import SingersList from './SingersList'
import { fetchOrganizationsIfNeeded } from '../actions/organizations'
import { changePage } from '../actions/page'
import { isAuthenticated, getToken } from '../selectors/user'
import { getSelectedOrganization, isFetchingOrganizations } from '../selectors/organizations'

export class OrganizationPage extends Component {
  componentWillMount() {
    this.props.dispatch(fetchOrganizationsIfNeeded(this.props.token));
  }

  render() {
    if(!this.props.isAuthenticated) {
      this.props.dispatch(changePage(''));
      return null;
    }
    // TODO redirect to dashboard is selected organization does not exist
    // if(this.props.selectedOrganization === undefined && !this.props.isFetchingOrganizations) {
    //   console.log('selected organization is null');
    //   this.props.dispatch(changePage('dashboard'));
    //   return null;
    // }
    if(this.props.selectedOrganization === undefined) {
      return null;
    }
    return (
      <div className="container">
        <h2>
          {this.props.selectedOrganization.name}
        </h2>
        <SingersList selectedOrganization={this.props.selectedOrganization} />
      </div>
    );
  }
}

export default connect(
  (state, props) => {
    const orgId = parseInt(props.params.orgId, 10);
    return {
      isAuthenticated: isAuthenticated(state),
      token: getToken(state),
      selectedOrganization: getSelectedOrganization(state, orgId),
      orgId,
      isFetchingOrganizations: isFetchingOrganizations(state)
    };
  }
)(OrganizationPage);