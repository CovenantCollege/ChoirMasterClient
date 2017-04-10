import React, { Component } from 'react'
import { compose } from 'redux'
import { updateGrid } from '../actions/grid'
import { connect } from 'react-redux'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { getGrid } from '../selectors/grid'

/**
 * This class will eventually be the drag and drop demo
 * It will get passed a list of dummy singers from the DummyChoirPage component
 */
export class PerformanceGrid extends Component {

	/**
	 * Eventually, I want the layout to be like this:
	 * <div  style={{ width: '12.5%', height: '12.5%' }}>
	 * 	<DummySingerSquare>
	 *  	<DummySingerCard singerData={dummySinger} />
	 * 	</DummySingerSquare>
	 * </div>
	 * @return {[type]} [description]
	 */
	render() {
		return(
			<div>{this.props.rows} {this.props.cols}</div>
		);
	}
}

export default compose(
	DragDropContext(HTML5Backend),
	connect()
)(PerformanceGrid);