import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { Button } from 'react-bootstrap'
import { fetchOrganizationsIfNeeded } from '../actions/organizations'
import { fetchGridIfNeeded, arrangeSingers, saveGrid, updateGrid } from '../actions/grid'
import { updatePerformanceGridSize } from '../actions/performances'
import { changePage } from '../actions/page'
import { isAuthenticated, getToken } from '../selectors/user'
import { getSelectedOrganization } from '../selectors/organizations'
import { getSelectedPerformance } from '../selectors/performances'
import { getChoirs } from '../selectors/choirs'
import { getGrid } from '../selectors/grid'
import GridSizeForm from './GridSizeForm'
import SingerSquare from './SingerSquare'
import SingerCard from './SingerCard'

function renderSquare(row, col, singer, performanceId) {
  if(performanceId === undefined) {
    return null;
  }
  return (
    <SingerSquare key={row + '-' + col} x={col} y={row} performanceId={performanceId} singerId={singer ? singer.singerId : -1}>
      <SingerCard x={col} y={row} singer={singer} performanceId={performanceId} />
    </SingerSquare>
  );
}

export class SingerArrangementPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      singerList: []
    };

    this.fetchDataIfNeeded = this.fetchDataIfNeeded.bind(this);
    this.placeSingers = this.placeSingers.bind(this);
    this.save = this.save.bind(this);
    this.updateGridSize = this.updateGridSize.bind(this);
  }

  fetchDataIfNeeded() {
    this.props.dispatch(fetchOrganizationsIfNeeded(this.props.token));
    this.props.dispatch(fetchGridIfNeeded(this.props.token, this.props.orgId, this.props.performanceId));
  }

  placeSingers() {
    // const cols = this.props.grid.cols;
    // let singerList = this.props.singers.map((singer, i) => {
    //   return { singerId: singer.singerId, x: i % cols, y: parseInt(Math.floor(i / cols)) };
    // });
    // this.props.dispatch(updateSingerList(singerList, this.props.selectedPerformance.performanceId));
    this.props.dispatch(arrangeSingers(this.props.token, this.props.orgId, this.props.selectedPerformance.performanceId));
  }

  save() {
    this.props.dispatch(saveGrid(this.props.token, this.props.orgId, this.props.selectedPerformance.performanceId, this.props.gridSingers));
  }

  updateGridSize(width, height) {
    this.props.dispatch(updateGrid({ rows: height, cols: width }));
    this.props.dispatch(updatePerformanceGridSize(this.props.token, this.props.orgId, this.props.selectedPerformance.performanceId, width, height));
  }

  componentWillMount() {
    if(this.state === null) {
      this.setState({ singerList: [] });
    }
    this.fetchDataIfNeeded();
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
    let rows = [];
    for (let row = 0; row < this.props.selectedPerformance.height; row++) {
      let squares = [];
      squares.push(<div className="performance-grid-box performance-grid-box-edge" key='begin'></div>);
      for (let col = 0; col < this.props.selectedPerformance.width; col++) {
        const gridSinger = this.props.gridSingers.find(gridSinger => {
          return gridSinger.x === col && gridSinger.y === row;
        });
        squares.push(renderSquare(row, col, gridSinger ? this.props.singers.find(singer => singer.singerId === gridSinger.singerId) : undefined, this.props.selectedPerformance.performanceId));
      }
      squares.push(<div className="performance-grid-box performance-grid-box-edge" key='end'></div>);
      rows.push(
        <div key={row} className='performance-grid-row'>
          {squares}
        </div>
      );
    }
    let singersQueue = [];
    if(this.props.singers && this.props.gridSingers && this.props.singers.length !== this.props.gridSingers.length) {
      if (this.props.gridSingers && this.props.singers && this.props.gridSingers.length !== this.props.singers.length) {
        singersQueue.push(<div className="performance-grid-box performance-grid-box-edge" key="begin"></div>);
        if (this.props.singers) {
          singersQueue.push(
            this.props.singers
              .filter(singer => !this.props.gridSingers.find(s => s.singerId === singer.singerId))
              .map((singer, i) => renderSquare(i, 0, singer, this.props.selectedPerformance.performanceId))
          );
        }
      }
      singersQueue.push(<div className="performance-grid-box performance-grid-box-edge" key="end"></div>);
    }
    return (
      <div className="container margined-container">
        <div className="center-container">
          <Button bsStyle="success" onClick={this.placeSingers}>Arrange Singers</Button>
        </div>
        <div className="performance-grid">
          <div className='performance-grid-row'>
            {singersQueue}
          </div>
        </div>
        <GridSizeForm rows={this.props.selectedPerformance.height} cols={this.props.selectedPerformance.width} handleSubmit={this.updateGridSize} />
        <div className="performance-grid">
          {rows}
        </div>
        <div className="center-container">
          <Button bsStyle="success" onClick={this.save}>Save Arrangement</Button>
        </div>
      </div>
    );
  }
}

export default compose(
  DragDropContext(HTML5Backend),
  connect(
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
  )
)(SingerArrangementPage);