import { connect } from 'react-redux';
import { Component } from 'react';
import React from 'react';
import { Button } from 'react-bootstrap';
import { addSinger } from '../actions/singers';
import { getSingers } from '../selectors/singers';

class SingersList extends Component {
  render() {
    return (
      <div>
        <Button bsStyle="primary" onClick={() => this.props.dispatch(addSinger({ name: 'Josh Humpherys', height: '6\'4"'}))}>Add Singer</Button>
        <p>{this.props.singersList.map(singer => <div>{singer.name + ', ' + singer.height}</div>)}</p>
      </div>
    );
  };
}

export default connect(
  state => ({
    singersList: getSingers(state)
  })
)(SingersList);
