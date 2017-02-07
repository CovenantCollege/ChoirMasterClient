import React, { Component } from 'react'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import { getIsAuthenticated } from '../selectors/user'
import { getSelectedOrganization } from '../selectors/organizations'
import { selectOrganization } from '../actions/organizations'

class OrganizationPage extends Component {
  componentWillMount() {
    // if(this.props.organization === undefined) {
    //   this.props.dispatch(selectOrganization(parseInt(this.props.params.orgId, 10)));
    // }
  }
  render() {
    if(!this.props.isAuthenticated) {
      hashHistory.push('');
      return null;
    }
    return (
      <div className="container">
        {this.props.organization ? this.props.organization.name : null}
      </div>
    );
  }
}

export default connect(
  state => ({
    isAuthenticated: getIsAuthenticated(state),
    organization: getSelectedOrganization(state)
  })
)(OrganizationPage);