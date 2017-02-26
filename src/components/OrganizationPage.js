import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Tabs, Tab } from 'react-bootstrap'
import SingersList from './SingersList'
import ChoirsGrid from './ChoirsGrid'
import { fetchOrganizationsIfNeeded } from '../actions/organizations'
import { changePage } from '../actions/page'
import { isAuthenticated, getToken } from '../selectors/user'
import { getSelectedOrganization } from '../selectors/organizations'

export class OrganizationPage extends Component {
  componentWillMount() {
    this.props.dispatch(fetchOrganizationsIfNeeded(this.props.token));
  }

  render() {
    if(!this.props.isAuthenticated) {
      this.props.dispatch(changePage(''));
      return null;
    }
    if(this.props.selectedOrganization === undefined) {
      return null;
    }
    return (
      <div className="container">
        <h2>
          {this.props.selectedOrganization.name}
        </h2>
        <Tabs defaultActiveKey={1} animation={false} id="organization-tabs">
          <Tab eventKey={1} title="Choirs">
            <ChoirsGrid />
          </Tab>
          <Tab eventKey={2} title="Singers">
            <SingersList selectedOrganization={this.props.selectedOrganization} />
          </Tab>
        </Tabs>
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
      orgId
    };
  }
)(OrganizationPage);