import React, { Component } from 'react';

const buttonStyle = {
  width: '100px',
  height: '100px',
  margin: '5px',
  border: 'none',
}

export default class Cell extends Component {
  render() {
    return (
      <button
        style={buttonStyle}
        onClick={() => this.props.setCell(this.props.currentPlayer, this.props.idx)}
      >
        {this.props.symbol}
      </button>
    );
  }
}
