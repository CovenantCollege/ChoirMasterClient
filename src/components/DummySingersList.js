import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table } from 'react-bootstrap'
import { getToken } from '../selectors/user'

/**
 * This class will eventually be the drag and drop demo
 * It will get passed a list of dummy singers from the DummyChoirPage component
 */
export class DummySingersList extends Component {

	render() {
		let dummySingers = null;
	  if(this.props.dummySingers !== undefined) {
	    dummySingers = this.props.dummySingers.map(dummySinger => {
	      return (
	        <tr key={dummySinger.id}>
	          <td>{dummySinger.name}</td>
	          <td>{dummySinger.height}</td>
	          <td>{dummySinger.voice}</td>
	        </tr>
	      );
	    });
	  }
	  return (
	  	    <div className="margined-children">
	  	      <Table striped bordered condensed hover>
	  	        <thead>
	  	          <tr>
	  	            <th>Name</th>
	  	            <th>Height</th>
	  	            <th>Voice</th>
	  	          </tr>
	  	        </thead>
	  	        <tbody>
	  	          {dummySingers}
	  	        </tbody>
	  	      </Table>
	  	    </div>
	  	  );
	  	};
}

export default connect()(DummySingersList);