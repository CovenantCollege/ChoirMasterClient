import React, { Component, PropTypes } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { DropTarget } from 'react-dnd'
import * as draggableTypes from '../constants/draggableTypes'
// import { STORE } from '../index'

function moveSingerCard(sourceX, sourceY, targetX, targetY) {
  console.log('TODO move singer');
  // let current_state = Object.assign([], STORE.getState().singers.singersList);
  // let temp = current_state[sourceX][sourceY];
  // current_state[sourceX][sourceY] = current_state[targetX][targetY];
  // current_state[targetX][targetY] = temp;
  // STORE.dispatch(loadDummySingers(current_state));
}

const singerSquareTarget = {
  drop(props, monitor) {
    moveSingerCard(monitor.getItem().x, monitor.getItem().y, props.x, props.y);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }
}

export class SingerSquare extends Component {
  render() {
    const { x, y, connectDropTarget, isOver } = this.props;
    return connectDropTarget(
      <div className='performance-grid-box'>
        {this.props.children}
      </div>
    );
  }
}

SingerSquare.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired
};

export default compose(
  DropTarget(draggableTypes.SINGER_CARD, singerSquareTarget, collect),
  connect()
)(SingerSquare);