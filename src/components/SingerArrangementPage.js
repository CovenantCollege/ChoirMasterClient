import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchOrganizationsIfNeeded } from '../actions/organizations'
import { changePage } from '../actions/page'
import { isAuthenticated, getToken } from '../selectors/user'
import { getSelectedOrganization } from '../selectors/organizations'
import { getSelectedPerformance } from '../selectors/performances'
import { getChoirs } from '../selectors/choirs'
import { getGrid } from '../selectors/grid'
import SingerGutter from './SingerGutter'
import PerformanceGrid from './PerformanceGrid'
import GridSpinner from './GridSpinner'
import { updateGrid } from '../actions/grid'

export class SingerArrangementPage extends Component {
  fetchDataIfNeeded() {
    this.props.dispatch(fetchOrganizationsIfNeeded(this.props.token));
  }

  componentWillMount() {
    this.fetchDataIfNeeded();

    // console.log("This: " + this.props.grid.rows + ' and ' + this.props.singers);
    // if ((this.props.grid.rows === undefined || this.props.grid.cols === undefined)) {
    //   console.log("In: " + this.props.singers);
    //   let sideLength = Math.ceil(Math.sqrt(this.props.singers.length));
    //   this.props.dispatch(updateGrid({rows:sideLength, cols:sideLength}));
    // }
  }

  componentDidUpdate() {
    this.fetchDataIfNeeded();
  }

  render() {
    if (!this.props.isAuthenticated) {
      this.props.dispatch(changePage(''));
      return null;
    }
    if (this.props.selectedOrganization === undefined) {
      return null;
    }
    return (
        <div className="container">
          <GridSpinner rows={this.props.grid.rows} cols={this.props.grid.cols} />
          <div className="drag-container">
            <SingerGutter singers={this.props.singers} />
            <PerformanceGrid rows={this.props.grid.rows} cols={this.props.grid.cols} />
          </div>
        </div>
    );
  }
}

export default connect(
  (state, props) => {
    const orgId = parseInt(props.params.orgId, 10);
    const performanceId = parseInt(props.params.performanceId, 10);
    const selectedPerformance = getSelectedPerformance(state, orgId, performanceId);
    let choirsInOrganization = getChoirs(state, orgId);
    let singers = [];
    console.log("OK... " + state.grid.rows);
    if(choirsInOrganization !== undefined) {
      choirsInOrganization.forEach(choir => {
        if(selectedPerformance.choirs.findIndex(c => c === choir.choirId) !== -1) {
          if(choir.singers !== undefined) {
            choir.singers.forEach(singer => {
              singers.push(singer);
            });
          }
        }
      });
    }
    console.log("Stuff: " + singers)
    return {
      isAuthenticated: isAuthenticated(state),
      token: getToken(state),
      selectedOrganization: getSelectedOrganization(state, orgId),
      grid: getGrid(state),
      singers,
      selectedPerformance,
      orgId
    };
  }
)(SingerArrangementPage);