import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { Button } from 'react-bootstrap'
import { fetchOrganizationsIfNeeded } from '../actions/organizations'
import { fetchGridIfNeeded, updateGrid } from '../actions/grid'
import { changePage } from '../actions/page'
import { isAuthenticated, getToken } from '../selectors/user'
import { getSelectedOrganization } from '../selectors/organizations'
import { getSelectedPerformance } from '../selectors/performances'
import { getChoirs } from '../selectors/choirs'
import { getGrid } from '../selectors/grid'
import GridSizeForm from './GridSizeForm'
import SingerSquare from './SingerSquare'
import SingerCard from './SingerCard'

function renderSquare(row, col, singer) {
  return (
    <SingerSquare key={row + '-' + col} x={row} y={col}>
      <SingerCard x={row} y={col} singer={singer} />
    </SingerSquare>
  );
}

export class SingerArrangementPage extends Component {
  constructor(props) {
    super(props);

    this.state = { singerList: [] };

    this.fetchDataIfNeeded = this.fetchDataIfNeeded.bind(this);
    this.placeSingers = this.placeSingers.bind(this);
  }

  fetchDataIfNeeded() {
    this.props.dispatch(fetchOrganizationsIfNeeded(this.props.token));
    this.props.dispatch(fetchGridIfNeeded(this.props.token, this.props.orgId, this.props.performanceId));
  }

  placeSingers() {
      let singerList = this.props.singers.map((singer, i) => {
        return { singer, x: i % this.props.grid.columns, y: parseInt(Math.floor(i / this.props.grid.columns)) };
      });
      this.setState({ singerList });
  }

  componentWillMount() {
    if(this.state === null) {
      this.setState({ singerList: [] });
    }
    this.fetchDataIfNeeded();
    // this.placeSingersIfNeeded();
  }

  componentDidUpdate() {
    this.fetchDataIfNeeded();
    // this.placeSingersIfNeeded();
  }

  render() {
    if (!this.props.isAuthenticated) {
      this.props.dispatch(changePage(''));
      return null;
    }
    if (this.props.selectedOrganization === undefined) {
      return null;
    }
    const singers = this.state ? this.state.singerList : [];
    let rows = [];
    for (let row = 0; row < this.props.grid.rows; row++) {
      let squares = [];
      for (let col = 0; col < this.props.grid.cols; col++) {
        const singer = singers.find(singer => {
          return singer.x === col && singer.y === row;
        });
        squares.push(renderSquare(row, col, singer));
      }
      rows.push(
        <div key={row} className='performance-grid-row'>
          {squares}
        </div>
      );
    }
    return (
      <div className="container margined-container">
        <div className="center-container">
          <Button bsStyle="success">Place Singers</Button>
        </div>
        <div className="performance-grid">
          <div className='performance-grid-row'>
            {
              this.props.singers ? this.props.singers.map((singer, i) => renderSquare(i, 0, singer)) : null
            }
          </div>
        </div>
        <GridSizeForm rows={this.props.grid.rows} cols={this.props.grid.cols} />
        <div className="performance-grid">
          {rows}
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