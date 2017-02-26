import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import { fetchOrganizationsIfNeeded } from '../actions/organizations'
import { changePage } from '../actions/page'
import { isAuthenticated, getToken } from '../selectors/user'
import { getSelectedOrganization } from '../selectors/organizations'
import { getSelectedChoir } from '../selectors/choirs'
import { getOrgId, getChoirId } from '../selectors/path'

export class ChoirPage extends Component {
  componentWillMount() {
    this.props.dispatch(fetchOrganizationsIfNeeded(this.props.token));
  }

  render() {
    if(!this.props.isAuthenticated) {
      this.props.dispatch(changePage(''));
      return null;
    }
    if(this.props.selectedOrganization === undefined || this.props.selectedChoir === undefined) {
      return null;
    }
    return (
      <div className="container">
        <h2>
          {this.props.selectedChoir.name}
        </h2>
        <Button onClick={() => changePage('/organizations/' + this.props.selectedOrganization.orgId)}>
          {this.props.selectedOrganization.name}
        </Button>
      </div>
    );
  }
}

export default connect(
  (state, props) => {
    const orgId = getOrgId(state);
    const choirId = getChoirId(state);
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