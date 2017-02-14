import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Alert, Grid, Row, Col, Button, Glyphicon } from 'react-bootstrap'
import AddOrganizationModal from './AddOrganizationModal'
import { fetchOrganizations, selectOrganization, openAddOrganizationModal, clearAddOrganizationFailed } from '../actions/organizations'
import { changePage } from '../actions/page'
import { getOrganizations, getAddOrganizationModalOpen } from '../selectors/organizations'
import { getIsAuthenticated, getToken } from '../selectors/user'
import { getAddOrganizationFailed } from '../selectors/failedRequests'

class DashboardPage extends Component {
  constructor(props) {
    super(props);

    this.state = { numAddOrganizationButtonClicks: 0 };
  }

  selectOrganization(orgId) {
    this.props.dispatch(selectOrganization(orgId));
  }

  componentDidMount() {
    if(this.props.organizations.length === 0) {
      this.props.dispatch(fetchOrganizations(this.props.token));
    }
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
            <Button bsClass="btn btn-default organization-btn" onClick={() => this.selectOrganization(this.props.organizations[j + i * 3].orgId)}>
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
          this.props.dispatch(openAddOrganizationModal());
          this.setState({ numAddOrganizationButtonClicks: this.state.numAddOrganizationButtonClicks + 1 });
          this.props.dispatch(clearAddOrganizationFailed());
        }}><Glyphicon glyph="plus" /> Add Organization</Button>
        <AddOrganizationModal showModal={this.props.showModal} key={this.state.numAddOrganizationButtonClicks} />
        <Grid bsClass="">
          {organizationsGrid}
        </Grid>
      </div>
    );
  }
}

export default connect(
  state => ({
    isAuthenticated: getIsAuthenticated(state),
    token: getToken(state),
    organizations: getOrganizations(state),
    showModal: getAddOrganizationModalOpen(state),
    addOrganizationFailed: getAddOrganizationFailed(state)
  })
)(DashboardPage);