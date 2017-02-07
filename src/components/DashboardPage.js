import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col, Button } from 'react-bootstrap'
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
    let organizationsGrid = [];
    for(let i = 0; i * 3 < this.props.organizations.length; i++) {
      let organizationsRowArray = [];
      for(let j = 0; j < Math.min(this.props.organizations.length - i * 3, 3); j++) {
        organizationsRowArray[j] = (
          <Col xs={6} md={4}>
            <Button bsClass="btn btn-default organization-btn">
              {this.props.organizations[j + i * 3].name}
            </Button>
          </Col>
        );
      }
      organizationsGrid[i] = (
        <Row className="show-grid">
          {organizationsRowArray}
        </Row>
      );
    }
    return (
      <div className="container">
        <Grid>
          {organizationsGrid}
        </Grid>
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