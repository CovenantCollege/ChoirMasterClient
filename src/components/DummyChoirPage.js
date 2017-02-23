import React, { Component } from 'react'
import { connect } from 'react-redux'
import DummySingersList from './DummySingersList'
import { fetchDummySingers } from '../actions/dummySingers'
import { getDummySingers, getFetchingDummySingers } from '../selectors/dummySingers'
import { getIsAuthenticated, getToken } from '../selectors/user'

export class DummyChoirPage extends Component {

	componentWillMount() {
		if(this.props.dummySingers.length === 0 && !this.props.fetchingDummySingers) {
			this.props.dispatch(fetchDummySingers());
		}
	}

	render() {
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
		isAuthenticated: getIsAuthenticated(state),
    token: getToken(state),
		dummySingers: getDummySingers(state),
		fetchingDummySingers: getFetchingDummySingers(state)
	})
)(DummyChoirPage);