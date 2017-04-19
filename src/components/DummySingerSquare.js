import React, { Component, PropTypes } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { loadDummySingers } from '../actions/dummySingers'
import { DropTarget } from 'react-dnd'
import * as draggableTypes from '../constants/draggableTypes'
import { STORE } from '../index'

function moveDummySingerCard(sourceX, sourceY, targetX, targetY) {
	console.log(STORE);
	let current_state = Object.assign([], STORE.getState().dummySingers.dummySingersList);
	let temp = current_state[sourceX][sourceY];
	current_state[sourceX][sourceY] = current_state[targetX][targetY];
	current_state[targetX][targetY] = temp;
	STORE.dispatch(loadDummySingers(current_state));
}

const dummySingerSquareTarget = {
	drop(props, monitor) {
		moveDummySingerCard(monitor.getItem().x, monitor.getItem().y, props.x, props.y);
	}
};

function collect(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver()
	}
}

export class DummySingerSquare extends Component {
	render() {
		const { x, y, connectDropTarget, isOver } = this.props;
		return connectDropTarget(
			<div key={x + " " + y} style={{width: '20%', padding: '20px'}}>
				{this.props.children}
			</div>
		);
	}
}

DummySingerSquare.propTypes = {
	x: PropTypes.number.isRequired,
	y: PropTypes.number.isRequired
};

export default compose(
	DropTarget(draggableTypes.DUMMY_SINGER_CARD, dummySingerSquareTarget, collect),
	connect()
)(DummySingerSquare);