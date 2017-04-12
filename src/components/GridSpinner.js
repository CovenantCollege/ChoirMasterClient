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
export class GridSpinner extends Component {

	constructor(props) {
		super(props);
		this.state = {rows: 2, cols: 2 };

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		if (event.target.name === "rows") {
			this.setState({rows:event.target.value, cols:this.state.cols});
		}
		else if (event.target.name === "cols") {
			this.setState({cols:event.target.value, rows:this.state.rows});
		}
	}

	handleSubmit(event) {
		this.props.dispatch(updateGrid({rows:parseInt(this.state.rows), cols:parseInt(this.state.cols)}));
		event.preventDefault();
	}

	render() {
		return(
			<div className="container" style={{float:'right', width:'75%'}}>
				<form onSubmit={this.handleSubmit}>
					<label htmlFor="rows">Rows:</label>
					<input type="number" name="rows"
		   				min="1" max="15" step="1" value={this.state.rows} style={{width:'10%', margin:'5px'}} onChange={this.handleChange} />
		   			<label htmlFor="cols">Cols:</label>
		  			<input type="number" name="cols"
		   				min="1" max="15" step="1" value={this.state.cols} style={{width:'10%', margin:'5px'}} onChange={this.handleChange} />
		  			<input type="submit" style={{width:'10%', margin:'5px'}}/>
		  		</form>
	  		</div>
  		);
	}
}

export default compose(
	DragDropContext(HTML5Backend),
	connect()
)(GridSpinner);