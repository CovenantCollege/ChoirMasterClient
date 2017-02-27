import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Image, ListGroup, ListGroupItem } from 'react-bootstrap'
import { DragSource } from 'react-dnd'
import * as draggableTypes from '../constants/draggableTypes'

const dummySingerCardSource = {
  beginDrag(props) {
    return {x: props.x, y: props.y};
  },
};

function collect(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	}
}

/**
 * This component shows a single dummy singer
 */
export class DummySingerCard extends Component {

	render() {
		const { connectDragSource, isDragging } = this.props;
		if (this.props.singer == null) {
			return null;
		}
		return connectDragSource(
			<div className="list-group-shadow">
				<ListGroup key={this.props.singer.row} style={{
					opacity: isDragging ? 0.5 : 1
				}}>
					<ListGroupItem className="list-item-centered">
						<div>
							<Image src={this.props.singer.img} circle />
						</div>
					</ListGroupItem>

					<ListGroupItem header={this.props.singer.name} className="list-item-centered"></ListGroupItem>
					<ListGroupItem className="list-item-centered">Height: {this.props.singer.height}</ListGroupItem>
					<ListGroupItem className="list-item-centered">Voice Type: {this.props.singer.voice}</ListGroupItem>

				</ListGroup>
			</div>
		);
	}

}

export default compose(
	DragSource(draggableTypes.DUMMY_SINGER_CARD, dummySingerCardSource, collect),
	connect()
)(DummySingerCard);