import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Alert, Grid, Row, Col, Button, Glyphicon } from 'react-bootstrap'
import { selectChoir, clearAddChoirFailed } from '../actions/choirs'
import { changePage } from '../actions/page'
import { getChoirs } from '../selectors/choirs'
import { isAuthenticated, getToken } from '../selectors/user'
import { addChoirFailed } from '../selectors/failedRequests'
import { showModal } from '../actions/modal'
import { getOrgId } from '../selectors/path'
import * as modalTypes from '../constants/modalTypes'

export class ChoirsGrid extends Component {
  constructor(props) {
    super(props);

    this.selectChoir = this.selectChoir.bind(this);
  }

  selectChoir(choirId) {
    this.props.dispatch(selectChoir(this.props.orgId, choirId));
  }

  render() {
    if(!this.props.isAuthenticated) {
      this.props.dispatch(changePage(''));
      return null;
    }
    let choirsGrid = [];
    if(!(this.props.choirs === undefined)) {
      for (let i = 0; i * 3 < this.props.choirs.length; i++) {
        let choirsRowArray = [];
        for (let j = 0; j < Math.min(this.props.choirs.length - i * 3, 3); j++) {
          choirsRowArray[j] = (
            <Col xs={6} md={4} key={j + i * 3}>
              <Button bsClass="btn btn-default grid-btn"
                      onClick={() => this.selectChoir(this.props.choirs[j + i * 3].choirId)}>
                {this.props.choirs[j + i * 3].name}
              </Button>
            </Col>
          );
        }
        choirsGrid[i] = (
          <Row className="show-grid" key={i}>
            {choirsRowArray}
          </Row>
        );
      }
    }
    return (
      <div className="margined-children">
        {
          this.props.addOrganizationFailed ?
            (
              <Alert bsStyle="danger">
                <strong>Error!</strong> We were unable to add the organization.
              </Alert>
            ) : null
        }
        <Button bsStyle="success" onClick={() => {
          this.props.dispatch(showModal(modalTypes.ADD_CHOIR_MODAL));
          this.props.dispatch(clearAddChoirFailed());
        }}><Glyphicon glyph="plus" /> Add Choir</Button>
        <Grid bsClass="">
          {choirsGrid}
        </Grid>
      </div>
    );
  }
}

export default connect(
  state => ({
    isAuthenticated: isAuthenticated(state),
    token: getToken(state),
    orgId: getOrgId(state),
    choirs: getChoirs(state),
    addChoirFailed: addChoirFailed(state)
  })
)(ChoirsGrid);