import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table } from 'react-bootstrap'
import DummySingerCard from './DummySingerCard'

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
		let dummySingers = null;
	  if(this.props.dummySingers !== undefined) {
	    dummySingers = this.props.dummySingers.map(dummySinger => {
	      return (
	      	<div style={{width: '20%', padding: '20px'}}>
	      		<DummySingerCard singer={dummySinger} />
	      	</div>
	      );
	    });
	  }
	  return (
	  	    <div className="margined-children dummy-singers-list">
						{dummySingers}
	  	    </div>
	  	  );
	  	};
}

export default connect()(DummySingersList);