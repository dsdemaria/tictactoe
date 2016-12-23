import React, { Component } from 'react';
import Cell from './Cell.jsx';
import './App.css';

const gameboardStyle = {
  width: '330px',
  height: '330px',
  display: 'flex',
  flexWrap: 'wrap',
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      board: ['', '', '', '', '', '', '', '', ''],
      currentPlayer: 'X',
    };
    this.setCell = this.setCell.bind(this)
    this.resetBoard = this.resetBoard.bind(this)
  }
  componentDidUpdate(prevProps, prevState) {
    this.checkVictory(prevState.currentPlayer);
  }
  resetBoard() {
    this.setState({
      board: ['', '', '', '', '', '', '', '', ''],
    });
  }
  checkVictory(symbol) {
    const victoryConditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [6, 4, 2]];
    for (let i = 0; i < victoryConditions.length; i++) {
      if (this.state.board[victoryConditions[i][0]] === symbol &&
      this.state.board[victoryConditions[i][1]] === symbol &&
      this.state.board[victoryConditions[i][2]] === symbol) {
        alert( symbol + ' wins!');
      }
    }
    for (let i=0; i<this.state.board.length; i++) {
      if (!this.state.board[i]) {
        return;
      }
    }
    alert('No Winner!');
  }
  setCell(currentPlayer, idx) {
    if (!this.state.board[idx]) {
      let updatePlayer = '';
      const newBoard = this.state.board.slice();
      newBoard.splice(idx, 1, currentPlayer)
      this.state.currentPlayer === 'X' ? updatePlayer = 'O' : updatePlayer = 'X';
      this.setState({
        board: newBoard,
        currentPlayer: updatePlayer,
      });
    }
  }
  render() {
    return (
      <div className="App">
        <Gameboard
          resetBoard={this.resetBoard}
          setCell={this.setCell}
          board={this.state.board}
          currentPlayer={this.state.currentPlayer}
        />
      </div>
    );
  }
}

class Gameboard extends Component {
  render() {
    const board = this.props.board.map((cellValue, idx) => {
      return (
        <Cell
          symbol={cellValue}
          idx={idx}
          key={idx}
          setCell={this.props.setCell}
          currentPlayer={this.props.currentPlayer}
        />
      );
    });
    return (
      <div style={gameboardStyle}>
        {board}
        <button onClick={() => this.props.resetBoard()}>
          Reset
        </button>
      </div>
    );
  }
}

export default App;
