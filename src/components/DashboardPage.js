import React, { Component } from 'react'
import { connect } from 'react-redux'
import {  } from 'react-bootstrap'
import { hashHistory } from 'react-router'
import { getIsAuthenticated } from '../selectors/user'
// import { selectOrganization } from '../actions/organizations'

class DashboardPage extends Component {

  selectOrganization(organization) {
    // this.props.dispatch(selectOrganization(organization));
  }

  render() {
    if(!this.props.isAuthenticated) {
      hashHistory.push('');
      return null;
    }
    return (
      <div className="container">
        select organization!
      </div>
    );
  }
}

export default connect(
  state => ({
    isAuthenticated: getIsAuthenticated(state)
  })
)(DashboardPage);