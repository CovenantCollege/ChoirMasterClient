import React, { Component } from 'react'
import { compose } from 'redux'
import { updateDummySingers } from '../actions/dummySingers'
import { connect } from 'react-redux'
import DummySingerCard from './DummySingerCard'
import DummySingerSquare from './DummySingerSquare'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { getDummySingers } from '../selectors/dummySingers'

/**
 * This class will eventually be the drag and drop demo
 * It will get passed a list of dummy singers from the DummyChoirPage component
 */
export class DummySingersList extends Component {

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
		// If we have no local dummySinger data yet, add it
		// Otherwise, load server dummySinger data and add it to local state

		let dummySingers = [];
	  if(this.props.dummySingers !== undefined) {
	  	console.log("Entered");
	  	for (let row = 0; row < this.props.dummySingers.length; row++) {
	  		for (let col = 0; col < this.props.dummySingers[0].length; col++) {
	  			dummySingers.push(
						<DummySingerSquare x={row} y={col} key={row + " " + col}>
	      			<DummySingerCard x={row} y={col} singer={this.props.dummySingers[row][col]} />
	      		</DummySingerSquare>
	  			);
	  		}
	  	}
	  }
	  console.log("Dummy Singers:");
	  console.log(dummySingers);
	  return (
	  	    <div className="margined-children dummy-singers-list">
						{dummySingers}
	  	    </div>
	  	  );
	  	};
}

export default compose(
	DragDropContext(HTML5Backend),
	connect()
)(DummySingersList);