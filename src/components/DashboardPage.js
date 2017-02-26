import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Alert, Grid, Row, Col, Button, Glyphicon } from 'react-bootstrap'
import { fetchOrganizationsIfNeeded, selectOrganization, clearAddOrganizationFailed } from '../actions/organizations'
import { changePage } from '../actions/page'
import { getOrganizations } from '../selectors/organizations'
import { isAuthenticated, getToken } from '../selectors/user'
import { addOrganizationFailed } from '../selectors/failedRequests'
import { showModal } from '../actions/modal'
import * as modalTypes from '../constants/modalTypes'

export class DashboardPage extends Component {
  selectOrganization(orgId) {
    this.props.dispatch(selectOrganization(orgId));
  }

  componentDidMount() {
    this.props.dispatch(fetchOrganizationsIfNeeded(this.props.token));
  }

  render() {
    if(!this.props.isAuthenticated) {
      this.props.dispatch(changePage(''));
      return null;
    }
    let organizationsGrid = [];
    for(let i = 0; i * 3 < this.props.organizations.length; i++) {
      let organizationsRowArray = [];
      for(let j = 0; j < Math.min(this.props.organizations.length - i * 3, 3); j++) {
        organizationsRowArray[j] = (
          <Col xs={6} md={4} key={j + i * 3}>
            <Button bsClass="btn btn-default grid-btn" onClick={() => this.selectOrganization(this.props.organizations[j + i * 3].orgId)}>
              {this.props.organizations[j + i * 3].name}
            </Button>
          </Col>
        );
      }
      organizationsGrid[i] = (
        <Row className="show-grid" key={i}>
          {organizationsRowArray}
        </Row>
      );
    }
    return (
      <div className="container fixed-width-container margined-children">
        {
          this.props.addOrganizationFailed ?
            (
              <Alert bsStyle="danger">
                <strong>Error!</strong> We were unable to add the organization.
              </Alert>
            ) : null
        }
        <Button bsStyle="success" onClick={() => {
          this.props.dispatch(showModal(modalTypes.ADD_ORGANIZATION_MODAL));
          this.props.dispatch(clearAddOrganizationFailed());
        }}><Glyphicon glyph="plus" /> Add Organization</Button>
        <Grid bsClass="">
          {organizationsGrid}
        </Grid>
      </div>
    );
  }
}

export default connect(
  state => ({
    isAuthenticated: isAuthenticated(state),
    token: getToken(state),
    organizations: getOrganizations(state),
    addOrganizationFailed: addOrganizationFailed(state)
  })
)(DashboardPage);