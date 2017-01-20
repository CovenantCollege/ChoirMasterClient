import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';

class App extends Component {
  render() {
    const popover = (
      <Popover
        id="popover-positioned-top"
        title="Popover top"
      >
        And here's some <strong>amazing</strong> content. It's very engaging. right?
      </Popover>
    );
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Button bsStyle="primary">hello world</Button>
        <div style={{ height: 120 }}>
        </div>
        <OverlayTrigger trigger="click" placement="top" overlay={popover}>
          <Button>Holy guacamole!</Button>
        </OverlayTrigger>
      </div>
    );
  }
}

export default App;
