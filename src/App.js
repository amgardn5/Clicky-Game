import React, { Component } from 'react';
import Nav from './components/nav/nav';
import Header from './components/header/header';
import Card from './components/card/card';
import players from './players.json';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.handleShufflePlayers = this.handleShufflePlayers.bind(this)
  }

  state = {
    score: 0,
    topScore: 0,
    maxScore: 12,
    message: 'Click an image to begin!',
    messageClass: '',
    players: players
  };

  shuffle = (array) => {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    // If still remaining option to shuffle
    while (0 !== currentIndex) {
      // Pick a remaining option
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // Swap with current option
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  handleCorrectSelection = () => {
    // Correct selection, score +1
    if (this.state.score+1 > this.state.topScore) {
      this.setState({topScore: this.state.topScore+1});
    }
    if (this.state.score+1 === this.state.maxScore) {
      this.setState({score: this.state.score+1, message: 'Congratulation! You Win!', messageClass: 'correct'});
    } else {
      this.setState({score: this.state.score+1, message: 'You guessed correctly!', messageClass: 'correct'});
    }
  }

  handleResetWin = (currentPlayers) => {
    // If current score is at max, reset score to 0 and top score to 0
    if (this.state.score+1 === this.state.maxScore) {
      this.setState({score: 0, topScore: 0});
      // Reset clicked state for 
      const updatedPlayers = currentPlayers.map(player => (true) ? { ...player, isClicked: false } : player);
      return updatedPlayers;
    } else {
      return currentPlayers;
    }
  }

  handleIncorrectSelection = () => {
    // Incorrect selection, reset score to 0
    this.setState({score: 0, message: 'You guessed incorrectly!'});
    // Reset clicked state for 
    const updatedPlayers = this.state.players.map(player => player.isClicked === true ? { ...player, isClicked: false } : player);

    return updatedPlayers;
  }

  handleShufflePlayers = (name) => {
    var resetNeeded = false;
    const players = this.state.players.map(player => {
      if (player.name === name) {
        if (player.isClicked === false) {
          this.handleCorrectSelection();
          return { ...player, isClicked: true };
        } else {
          resetNeeded = true;
          return { ...player, isClicked: false };
        }
      }
      return player;
    });

    if (resetNeeded) {
      this.setState({
        players: this.shuffle(this.handleIncorrectSelection()),
        messageClass: 'incorrect'
      })
    } else {
      this.setState({ players: this.shuffle(this.handleResetWin(players)) });
    }
  }

  handleRenderPlayers = () => {
    return this.state.players.map((player) =>
      <Card
        image={player.image}
        name={player.name}
        key={player.id}
        onClick={this.handleShufflePlayers}
      />
    );
  }

  render() {
    return (
      <div className='App'>
        <Nav
          score={this.state.score}
          topScore={this.state.topScore}
          message={this.state.message}
          messageClass={this.state.messageClass}
        />
        <Header />
        <div className='content'>
          {this.handleRenderPlayers()}
        </div>
      </div>
    );
  }
}

export default App;