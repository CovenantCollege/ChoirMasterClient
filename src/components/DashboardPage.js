import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col, Button, Glyphicon, Modal, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'
import { hashHistory } from 'react-router'
import AddOrganizationModal from './AddOrganizationModal'
import { getIsAuthenticated, getToken } from '../selectors/user'
import { getOrganizations } from '../selectors/organizations'
import { fetchOrganizations } from '../actions/organizations'
import { selectOrganization } from '../actions/organizations'
import { openAddOrganizationModal } from '../actions/organizations'
import { getAddOrganizationModalOpen } from '../selectors/organizations'

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
      hashHistory.push('');
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
        <Button bsStyle="success" onClick={() => {
          this.props.dispatch(openAddOrganizationModal());
          this.setState({ numAddOrganizationButtonClicks: this.state.numAddOrganizationButtonClicks + 1 })
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
    showModal: getAddOrganizationModalOpen(state)
  })
)(DashboardPage);