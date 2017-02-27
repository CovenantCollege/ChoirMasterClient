import React, { Component } from 'react'
import { connect } from 'react-redux'
import DummySingersList from './DummySingersList'
import { fetchDummySingers } from '../actions/dummySingers'
import { getDummySingers, getFetchingDummySingers } from '../selectors/dummySingers'
import { isAuthenticated, getToken } from '../selectors/user'

/**
 * This page will demo the drag and drop choir
 * It pulls dummy data from the server and sends it to the DummySingersList component
 */
export class DummyChoirPage extends Component {

	// componentWillMount() {
	// 	if(this.props.dummySingers.length === 0 && !this.props.fetchingDummySingers) {
	// 		this.props.dispatch(fetchDummySingers());
	// 	}
	// }

	render() {
		console.log("Choir Page:");
		console.log(this.props.dummySingers);
		let choirName = "Covenant College Choir";
		let dummySingers = [];
		if (this.props.dummySingers !== undefined) {
			dummySingers = this.props.dummySingers;
		}
		return (
			<div className="container">
				<h2>
					{choirName}
				</h2>
				<DummySingersList dummySingers={dummySingers} />
			</div>
		);
	}
}


export default connect(
	state => ({
		isAuthenticated: isAuthenticated(state),
    token: getToken(state),
		dummySingers: getDummySingers(state),
		fetchingDummySingers: getFetchingDummySingers(state)
	})
)(DummyChoirPage);
