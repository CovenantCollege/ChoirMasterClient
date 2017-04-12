import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

/**
 * This class will eventually be the drag and drop demo
 * It will get passed a list of dummy singers from the DummyChoirPage component
 */
export class SingerGutter extends Component {

	render() {
		let singers = [{singerId: "test", name: "test"}];
		if (this.props.singers.length !== 0) {
			singers = this.props.singers;
    	}

		console.log('gutter: ' + singers);
		return <div className="container" style={{width:'25%', height:'75vw', float:'left'}}>
		  <h3 style={{margin:'0'}}>Singers:</h3>
		  <hr />
		  {
			singers.map(singer => {
				console.log(singer);
				return <div id={singer.singerId}>
					{singer.name}
					<ul>
						<li>{singer.height}</li>
						<li>{singer.voice}</li>
					</ul>
				</div>
			})
		  }
		</div>
	}
}

export default compose(
	DragDropContext(HTML5Backend),
	connect()
)(SingerGutter);