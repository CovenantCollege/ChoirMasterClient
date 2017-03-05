import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Button, Glyphicon, Row, Col, Alert, Grid } from 'react-bootstrap'
import { clearAllFailedRequests } from '../actions/failedRequests'
import { showModal } from '../actions/modal'
import { selectVenue } from '../actions/venues'
import { getVenues } from '../selectors/venues'
import { getOrgId } from '../selectors/path'
import * as modalTypes from '../constants/modalTypes'

export class VenuesGrid extends Component {
  constructor(props) {
    super(props);

    this.selectVenue = this.selectVenue.bind(this);
  }

  selectVenue(venueId) {
    this.props.dispatch(selectVenue(this.props.orgId, venueId));
  }
  render() {
    let venuesGrid = [];
    if(!(this.props.venues === undefined)) {
      for (let i = 0; i * 3 < this.props.venues.length; i++) {
        let venuesRowArray = [];
        for (let j = 0; j < Math.min(this.props.venues.length - i * 3, 3); j++) {
          venuesRowArray[j] = (
            <Col xs={6} md={4} key={j + i * 3}>
              <Button bsClass="btn btn-default grid-btn"
                      onClick={() => this.selectVenue(this.props.venues[j + i * 3].venueId)}>
                {this.props.venues[j + i * 3].name}
              </Button>
            </Col>
          );
        }
        venuesGrid[i] = (
          <Row className="show-grid" key={i}>
            {venuesRowArray}
          </Row>
        );
      }
    }
    return (
      <div className="margined-children">
        {
          this.props.addVenueFailed ?
            (
              <Alert bsStyle="danger">
                <strong>Error!</strong> We were unable to add the venue.
              </Alert>
            ) : null
        }
        <Button bsStyle="success" onClick={() => {
          this.props.dispatch(showModal(modalTypes.ADD_VENUE_MODAL));
          this.props.dispatch(clearAllFailedRequests());
        }}><Glyphicon glyph="plus" /> Add Venue</Button>
        <Grid bsClass="">
          {venuesGrid}
        </Grid>
      </div>
    );
  };
}

export default connect(
  state => ({
    orgId: getOrgId(state),
    venues: getVenues(state)
  })
)(VenuesGrid);
