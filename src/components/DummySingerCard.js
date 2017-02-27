import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, ListGroup, ListGroupItem } from 'react-bootstrap'

/**
 * This component shows a single dummy singer
 */
export class DummySingerCard extends Component {

	render() {
		if (this.props.singer == null) {
			return null;
		}
		return(
			<ListGroup className="list-group-shadow">
				<ListGroupItem className="list-item-centered">
					<div>
						<Image src={this.props.singer.img} circle />
					</div>
				</ListGroupItem>

				<ListGroupItem header={this.props.singer.name} className="list-item-centered"></ListGroupItem>
				<ListGroupItem className="list-item-centered">Height: {this.props.singer.height}</ListGroupItem>
				<ListGroupItem className="list-item-centered">Voice Type: {this.props.singer.voice}</ListGroupItem>

			</ListGroup>
		);
	}

}

export default connect()(DummySingerCard);