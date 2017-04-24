import React, { Component } from 'react'
import { compose } from 'redux'
import { updateGrid } from '../actions/grid'
import { connect } from 'react-redux'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

export class GridSpinner extends Component {
  constructor(props) {
    super(props);
    this.state = {rows: props.rows, cols: props.cols };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    if (event.target.name === "rows") {
      this.setState({ rows: event.target.value });
    }
    else if (event.target.name === "cols") {
      this.setState({ cols: event.target.value });
    }
  }

  handleSubmit(event) {
    this.props.handleSubmit(this.state.cols, this.state.rows);
    event.preventDefault();
  }

  render() {
    return(
      <div className='grid-size-form-container'>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="rows">Rows:</label>
          <input type="number" name="rows" min="1" max="15" step="1"
            value={this.state.rows} onChange={this.handleChange} />
          <label htmlFor="cols">Cols:</label>
          <input type="number" name="cols" min="1" max="15" step="1"
            value={this.state.cols} onChange={this.handleChange} />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default compose(
  DragDropContext(HTML5Backend),
  connect()
)(GridSpinner);