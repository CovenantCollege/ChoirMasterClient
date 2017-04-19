import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import SingerSquare from './SingerSquare'
import SingerCard from './SingerCard'

function renderSquare(row, col, singer) {
  return (
    <SingerSquare key={row + '-' + col} x={row} y={col}>
      <SingerCard x={row} y={col} singer={singer} />
    </SingerSquare>
  );
}

export class PerformanceGrid extends Component {
  render() {
    console.log(this.props.singers);
    let singersIndex = 0;
    let rows = [];
    for (let row = 0; row < this.props.rows; row++) {
      let squares = [];
      for (let col = 0; col < this.props.cols; col++) {
        const singer = singersIndex < this.props.singers.length ? this.props.singers[singersIndex] : null;
        squares.push(renderSquare(row, col, singer));
        singersIndex++;
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