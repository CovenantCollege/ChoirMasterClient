import React, { Component } from 'react'
import { connect } from 'react-redux'
import {  } from 'react-bootstrap'
import { hashHistory } from 'react-router'
import { getIsAuthenticated } from '../selectors/user'
import { getOrganizations } from '../selectors/organizations'
import { fetchOrganizations } from '../actions/organizations'
// import { selectOrganization } from '../actions/organizations'

class DashboardPage extends Component {

  selectOrganization(organization) {
    // this.props.dispatch(selectOrganization(organization));
  }

  componentDidMount() {
    console.log(this.props.organizations);
    if(this.props.organizations.length === 0) {
      this.props.dispatch(fetchOrganizations());
    }
  }

  render() {
    if(!this.props.isAuthenticated) {
      hashHistory.push('');
      return null;
    }
    return (
      <div className="container">
        select organization!
        {this.props.organizations.toString()}
      </div>
    );
  }
}

export default connect(
  state => ({
    isAuthenticated: getIsAuthenticated(state),
    organizations: getOrganizations(state)
  })
)(DashboardPage);