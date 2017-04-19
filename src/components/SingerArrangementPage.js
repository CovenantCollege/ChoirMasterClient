import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchOrganizationsIfNeeded } from '../actions/organizations'
import { fetchGridIfNeeded, updateGrid } from '../actions/grid'
import { changePage } from '../actions/page'
import { isAuthenticated, getToken } from '../selectors/user'
import { getSelectedOrganization } from '../selectors/organizations'
import { getSelectedPerformance } from '../selectors/performances'
import { getChoirs } from '../selectors/choirs'
import { getGrid } from '../selectors/grid'
import PerformanceGrid from './PerformanceGrid'
import GridSizeForm from './GridSizeForm'

export class SingerArrangementPage extends Component {
  constructor(props) {
    super(props);

    this.setState({ singerList: [] });

    this.fetchDataIfNeeded = this.fetchDataIfNeeded.bind(this);
    this.placeSingersIfNeeded = this.placeSingersIfNeeded.bind(this);
  }

  fetchDataIfNeeded() {
    this.props.dispatch(fetchOrganizationsIfNeeded(this.props.token));
    this.props.dispatch(fetchGridIfNeeded(this.props.token, this.props.orgId, this.props.performanceId));
  }

  placeSingersIfNeeded() {
    // console.log(this.props.gridSingers);
    // if(this.props.gridSingers.length === 0) {
    //   let singerList = [];
    //   this.props.singers.forEach((singer, i) => {
    //     singerList = singerList.concat({ singer, x: i % this.props.grid.columns, y: parseInt(Math.floor(i / this.props.grid.columns)) });
    //   });
    //   let grid = JSON.parse(JSON.stringify(this.props.grid));
    //   grid.singerLists[this.props.selectedPerformance.performanceId] = singerList;
    //   this.props.dispatch(updateGrid(grid));
    // }
    if(this.state !== null && this.state.singerList.length === 0) {
      let singerList = [];
      this.props.singers.forEach((singer, i) => {
        singerList = singerList.concat({ singer, x: i % this.props.grid.columns, y: parseInt(Math.floor(i / this.props.grid.columns)) });
      });
      this.setState({ singerList });
    }
  }

  componentWillMount() {
    if(this.state === null) {
      this.setState({ singerList: [] });
    }
    this.fetchDataIfNeeded();
    this.placeSingersIfNeeded();
  }

  componentDidUpdate() {
    this.fetchDataIfNeeded();
    this.placeSingersIfNeeded();
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
          <GridSizeForm rows={this.props.grid.rows} cols={this.props.grid.cols} />
          {/*<div className="drag-container">
            <SingerGutter singers={this.props.singers} />*/}
            <PerformanceGrid
              rows={this.props.grid.rows}
              cols={this.props.grid.cols}
              singers={this.state ? this.state.singerList : []}
              orgId={this.props.orgId}
              performanceId={this.props.selectedPerformance.performanceId} />
          {/*</div>*/}
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
    const grid = getGrid(state);
    const gridSingers = grid.singerLists[performanceId];
    return {
      isAuthenticated: isAuthenticated(state),
      token: getToken(state),
      selectedOrganization: getSelectedOrganization(state, orgId),
      grid,
      gridSingers: gridSingers || [],
      singers,
      selectedPerformance,
      orgId
    };
  }
)(SingerArrangementPage);