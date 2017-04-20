import React, { Component, PropTypes } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { DropTarget } from 'react-dnd'
import * as draggableTypes from '../constants/draggableTypes'
import { moveSinger } from '../actions/grid'
import { STORE } from '../index'

function moveSingerCard(sourceX, sourceY, targetX, targetY, singerId, performanceId) {
  STORE.dispatch(moveSinger(sourceX, sourceY, targetX, targetY, singerId, performanceId));
}

const singerSquareTarget = {
  drop(props, monitor) {
    const item = monitor.getItem();
    moveSingerCard(item.x, item.y, props.x, props.y, item.singerId, item.performanceId);
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
    const { connectDropTarget, isOver } = this.props;
    return connectDropTarget(
      <div className={'performance-grid-box' + (isOver ? ' hover' : '')}>
        {this.props.children}
      </div>
    );
  }
}

SingerSquare.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  singerId: PropTypes.number.isRequired,
  performanceId: PropTypes.number.isRequired
};

export default compose(
  DropTarget(draggableTypes.SINGER_CARD, singerSquareTarget, collect),
  connect()
)(SingerSquare);