import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Alert, Tabs, Tab } from 'react-bootstrap'
import SingersList from './SingersList'
import ChoirsGrid from './ChoirsGrid'
import { fetchOrganizationsIfNeeded } from '../actions/organizations'
import { changePage } from '../actions/page'
import { clearAddChoirFailed } from '../actions/choirs'
import { clearAddSingerFailed } from '../actions/singers'
import { isAuthenticated, getToken } from '../selectors/user'
import { getSelectedOrganization } from '../selectors/organizations'
import { addChoirFailed, addSingerFailed } from '../selectors/failedRequests'

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
        <h2>
          {this.props.selectedOrganization.name}
        </h2>
        <Tabs defaultActiveKey={1} animation={false} id="organization-tabs">
          <Tab eventKey={1} title="Choirs" onClick={() => this.props.dispatch(clearAddSingerFailed())}>
            <ChoirsGrid />
          </Tab>
          <Tab eventKey={2} title="Singers" onClick={() => this.props.dispatch(clearAddChoirFailed())}>
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
      orgId,
      addChoirFailed: addChoirFailed(state),
      addSingerFailed: addSingerFailed(state)
    };
  }
)(OrganizationPage);