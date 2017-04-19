import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { DragSource } from 'react-dnd'
import * as draggableTypes from '../constants/draggableTypes'

const singerCardSource = {
  beginDrag(props) {
    return {x: props.x, y: props.y};
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

export class SingerCard extends Component {
  render() {
    const { connectDragSource, isDragging } = this.props;
    if (this.props.singer == null) {
      return null;
    }
    let voiceTypeClass = '';
    switch(this.props.singer.voice.charAt(0)) {
      case 'S':
        voiceTypeClass = 'voice-soprano';
        break;
      case 'A':
        voiceTypeClass = 'voice-alto';
        break;
      case 'T':
        voiceTypeClass = 'voice-tenor';
        break;
      case 'B':
        voiceTypeClass = 'voice-bass';
        break;
    }
    return connectDragSource(
      <div className={'singer-card' + (isDragging ? ' dragging' : '')}>
        <div className='name-container'>
          <div className={'name-cell ' + voiceTypeClass}>
            {this.props.singer.name}
          </div>
        </div>
        <div>{this.props.singer.height}</div>
        <div>{this.props.singer.voice}</div>
      </div>
    );
  }

}

export default compose(
  DragSource(draggableTypes.SINGER_CARD, singerCardSource, collect),
  connect()
)(SingerCard);