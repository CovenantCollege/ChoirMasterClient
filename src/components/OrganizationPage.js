import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Alert, Tabs, Tab } from 'react-bootstrap'
import SingersList from './SingersList'
import VenuesGrid from './VenuesGrid'
import ChoirsGrid from './ChoirsGrid'
import { fetchOrganizationsIfNeeded, selectOrganizationTab } from '../actions/organizations'
import { changePage } from '../actions/page'
import { clearAllFailedRequests } from '../actions/failedRequests'
import { isAuthenticated, getToken } from '../selectors/user'
import { getSelectedOrganization, getOrganizationTabSelected } from '../selectors/organizations'
import { addChoirFailed, addSingerFailed, addVenueFailed } from '../selectors/failedRequests'

export class OrganizationPage extends Component {
  constructor(props) {
    super(props);

    this.selectTab = this.selectTab.bind(this);
  }

  selectTab(eventKey) {
    let selectedTab = 'choirs';
    switch(eventKey) {
      case 1:
        selectedTab = 'choirs';
        break;
      case 2:
        selectedTab = 'singers';
        break;
      case 3:
        selectedTab = 'venues';
        break;
    }
    this.props.dispatch(selectOrganizationTab(selectedTab));
  }

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
    let activeTabKey = 'choirs';
    switch(this.props.organizationTabSelected) {
      case 'choirs':
        activeTabKey = 1;
        break;
      case 'singers':
        activeTabKey = 2;
        break;
      case 'venues':
        activeTabKey = 3;
        break;
    }
    return (
      <div className="container">
        {
          this.props.addChoirFailed ?
            (
              <Alert bsStyle="danger">
                <strong>Error!</strong> We were unable to add the choir.
              </Alert>
            ) : null
        }
        {
          this.props.addSingerFailed ?
            (
              <Alert bsStyle="danger">
                <strong>Error!</strong> We were unable to add the singer.
              </Alert>
            ) : null
        }
        {
          this.props.addVenueFailed ?
            (
              <Alert bsStyle="danger">
                <strong>Error!</strong> We were unable to add the venue.
              </Alert>
            ) : null
        }
        <h2>
          {this.props.selectedOrganization.name}
        </h2>
        <Tabs activeKey={activeTabKey} animation={false} id="organization-tabs" onSelect={(eventKey, event) => this.selectTab(eventKey)}>
          <Tab eventKey={1} title="Choirs" onClick={() => this.props.dispatch(clearAllFailedRequests())}>
            <ChoirsGrid />
          </Tab>
          <Tab eventKey={2} title="Singers" onClick={() => this.props.dispatch(clearAllFailedRequests())}>
            <SingersList selectedOrganization={this.props.selectedOrganization} />
          </Tab>
          <Tab eventKey={3} title="Venues" onClick={() => this.props.dispatch(clearAllFailedRequests())}>
            <VenuesGrid />
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
      orgId,
      organizationTabSelected: getOrganizationTabSelected(state),
      addChoirFailed: addChoirFailed(state),
      addSingerFailed: addSingerFailed(state),
      addVenueFailed: addVenueFailed(state)
    };
  }
)(OrganizationPage);