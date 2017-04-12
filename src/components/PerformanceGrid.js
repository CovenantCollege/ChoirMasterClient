import React, { Component } from 'react'
import { compose } from 'redux'
import { updateGrid } from '../actions/grid'
import { connect } from 'react-redux'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { getGrid } from '../selectors/grid'

function renderSquare(row, col, width) {
	return (
		// <GridSquare width={width} row={row} col={col} />
		<div key={row + " " + col} className="performance-grid-box" style={{width:width}}></div>
	);
}

/**
 * This class will eventually be the drag and drop demo
 * It will get passed a list of dummy singers from the DummyChoirPage component
 */
export class PerformanceGrid extends Component {

	render() {
		let squares = [];
		let width = (1.0/this.props.cols)*100.0
		console.log("Width: " + width);
		for (var row = 0; row < this.props.rows; row++) {
			for (var col = 0; col < this.props.cols; col++) {
				squares.push(renderSquare(row, col, width+'%'));
			}
		}
		return (
			<div className="performance-grid">
					{squares}
			</div>
		);
	}
}

export default compose(
	DragDropContext(HTML5Backend),
	connect()
)(PerformanceGrid);