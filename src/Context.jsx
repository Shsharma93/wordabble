import React, { Component } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import apiUrl from './config/config';
import letterValues from './utils/letter-values.json';
import wordLists from './utils/words.json';

export const Context = React.createContext();

export class Provider extends Component {
  state = {
    hand: [],
    word: [],
    myWords: [],
    myGame: { hand: '', words: [], score: 0 },
    letterValues: letterValues,
    totalScore: 0,
    currentScore: 0,
    wordLists: wordLists.words,
    isStart: false,
    duplicateHand: [],
    prevHand: [],
    isMatch: null,
    isWarning: false,
    isLogin: false,
    user: null,
    game: null,
    getHandValue: () => {
      return Array.from({ length: 7 }, (v, k) => k).map(k => {
        const random = Math.floor(Math.random() * 26) + 0;
        const letter = Object.keys(letterValues)[random];
        const value = letterValues[letter];
        return {
          id: `letter-${k}`,
          letter,
          value
        };
      });
    },
    getMyGame: async () => {
      const apiEndPoint = apiUrl + '/game';
      try {
        const response = await axios.get(
          `${apiEndPoint}/?id=${this.state.user.username}`
        );
        console.log(response);
        this.setState({ game: response.data.games });
      } catch (error) {
        console.log(error.message);
      }
    },
    getAllGame: async () => {
      const apiEndPoint = apiUrl + '/game';
      try {
        const response = await axios.get(apiEndPoint);
        this.setState({ game: response.data.games });
      } catch (error) {
        console.log(error.message);
      }
    },
    getUserGame: async id => {
      const apiEndPoint = apiUrl + '/game/' + id;
      try {
        const response = await axios.get(apiEndPoint);
        console.log(response);
        this.setState({ game: response.data.games });
      } catch (error) {
        console.log(error.message);
      }
    },
    checkAuth: () => {
      try {
        const jwt = localStorage.getItem('token');
        const user = jwtDecode(jwt);
        this.setState({ isLogin: true, user });
      } catch (error) {}
    },
    logout: () => {
      this.setState({ isLogin: false, user: null });
    },
    saveGame: async () => {
      const { user, myGame } = this.state;
      console.log(user);
      const apiEndPoint = apiUrl + '/game';
      let body = user
        ? {
            user: user.username,
            game: myGame
          }
        : {
            game: myGame
          };

      try {
        await axios.post(apiEndPoint, body);
      } catch (error) {
        console.log(error.message);
      }
    },
    handleStartGame: () => {
      const {
        letterValues,
        duplicateHand,
        prevHand,
        getHandValue
      } = this.state;
      if (!letterValues) return;

      const hand = getHandValue();
      let duplicate = prevHand.length === 0 ? hand : duplicateHand;

      this.setState({
        hand,
        word: [],
        myWords: [],
        isStart: true,
        totalScore: 0,
        currentScore: 0,
        duplicateHand: hand,
        prevHand: duplicate
      });
    },
    onSubmit: async () => {
      const { word, wordLists } = this.state;
      const submittedWord = word.map(letter => letter.letter);
      if (wordLists.includes(submittedWord.join('').toUpperCase())) {
        await this.state.calculateScore();
        this.setState({ isMatch: true });
        this.state.dismissToast(5000);
      } else {
        this.setState({ isMatch: false });
        this.state.dismissToast(5000);
      }
    },
    handleEndGame: async () => {
      const { duplicateHand, myWords, totalScore } = this.state;
      const letterArray = duplicateHand.map(letter => letter.letter);
      let handLetter = letterArray.reduce((a, b) => a + b);
      const myGame = { hand: handLetter, words: myWords, score: totalScore };
      await this.setState({
        hand: [],
        word: [],
        myWords: [],
        myGame,
        isStart: false,
        prevHand: duplicateHand,
        duplicateHand: []
      });
      this.state.saveGame();
    },
    handleReplayGame: () => {
      const { prevHand } = this.state;
      this.setState({
        hand: prevHand,
        word: [],
        myWords: [],
        totalScore: 0,
        currentScore: 0,
        isStart: true,
        duplicateHand: prevHand
      });
    },
    handleReset: () => {
      const { duplicateHand } = this.state;
      this.setState({
        hand: duplicateHand,
        word: [],
        currentScore: 0,
        totalScore: 0
      });
    },
    calculateScore: () => {
      const { word, totalScore, duplicateHand, myWords } = this.state;
      const valueArray = word.map(letter => letter.value);
      let currentScore = valueArray.reduce((a, b) => a + b, 0);
      currentScore = currentScore * valueArray.length;
      currentScore =
        word.length === duplicateHand.length ? currentScore + 50 : currentScore;

      const letterArray = word.map(letter => letter.letter);
      let wordString = letterArray.reduce((a, b) => a + b);
      myWords.push(wordString);
      this.setState({
        totalScore: totalScore + currentScore,
        currentScore,
        word: [],
        myWords
      });
    },
    onDragEnd: async result => {
      const { destination, source } = result;

      if (!destination) return;

      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return;
      }

      const start = this.state[source.droppableId];
      const finish = this.state[destination.droppableId];

      if (start === finish) {
        const newHands = [...start];
        const draggableItem = newHands[source.index];
        newHands.splice(source.index, 1);
        newHands.splice(destination.index, 0, draggableItem);
        const newState = { ...this.state, [source.droppableId]: newHands };
        this.setState(newState);
      }

      if (start !== finish) {
        const startHands = [...start];
        const draggableItem = startHands[source.index];
        startHands.splice(source.index, 1);

        const finishHands = [...finish];
        finishHands.splice(destination.index, 0, draggableItem);
        const newState = {
          ...this.state,
          [source.droppableId]: startHands,
          [destination.droppableId]: finishHands
        };
        await this.setState(newState);
        const { hand } = this.state;
        if (hand.length < 4) {
          this.setState({ isWarning: true });
          this.state.dismissWarning(5000);
        }
      }
    },
    dismissToast: time => {
      setTimeout(() => {
        this.setState({
          isMatch: null
        });
      }, time);
    },
    dismissWarning: time => {
      setTimeout(() => {
        this.setState({
          isWarning: false
        });
      }, time);
    }
  };

  componentDidMount() {
    this.state.checkAuth();
  }

  render() {
    return (
      <Context.Provider value={{ state: this.state }}>
        {this.props.children}
      </Context.Provider>
    );
  }
}
