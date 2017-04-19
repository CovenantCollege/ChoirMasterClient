import React, { Component } from 'react'
import { compose } from 'redux'
import { updateGrid } from '../actions/grid'
import { connect } from 'react-redux'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { getGrid } from '../selectors/grid'

function renderSquare(row, col) {
  return (
    <div key={row + '-' + col} className='performance-grid-box'></div>
  );
}

export class PerformanceGrid extends Component {
  render() {
    let rows = [];
    for (let row = 0; row < this.props.rows; row++) {
      let squares = [];
      for (let col = 0; col < this.props.cols; col++) {
        squares.push(renderSquare(row, col));
      }
      rows.push(
        <div key={row} className='performance-grid-row'>
          {squares}
        </div>
      );
    }
    return (
      <div className="performance-grid">
          {rows}
      </div>
    );
  }
}

export default compose(
  DragDropContext(HTML5Backend),
  connect()
)(PerformanceGrid);