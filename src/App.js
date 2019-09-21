import React, { Component } from 'react';
import LetterBox from './components/LetterBox/LetterBox';
import Button from './components/Button/Button';
import Score from './components/Score/Score';
import classes from './app.module.scss';
import { DragDropContext } from 'react-beautiful-dnd';
import letterValues from './utils/letter-values.json';
import wordLists from './utils/words.json';
import Toast from './components/Toast/Toast';
import {
  FaHistory,
  FaPlayCircle,
  FaStopCircle,
  FaPaperPlane,
  FaTrashAlt,
  FaTimes,
  FaCheckCircle
} from 'react-icons/fa';

class App extends Component {
  state = {
    hand: [],
    word: [],
    words: [],
    letterValues: letterValues,
    totalScore: 0,
    currentScore: 0,
    wordLists: wordLists.words,
    isStart: false,
    duplicateHand: [],
    prevHand: [],
    isMatch: null
  };

  handleEndGame = () => {
    const { duplicateHand } = this.state;
    this.setState({
      hand: [],
      word: [],
      isStart: false,
      prevHand: duplicateHand,
      duplicateHand: []
    });
  };

  handleStartGame = () => {
    const { letterValues, duplicateHand, prevHand } = this.state;
    if (!letterValues) return;

    const hand = Array.from({ length: 7 }, (v, k) => k).map(k => {
      const random = Math.floor(Math.random() * 26) + 0;
      const letter = Object.keys(letterValues)[random];
      const value = letterValues[letter];
      return {
        id: `letter-${k}`,
        letter,
        value
      };
    });

    let duplicate = prevHand.length === 0 ? hand : duplicateHand;

    this.setState({
      hand,
      word: [],
      isStart: true,
      totalScore: 0,
      currentScore: 0,
      duplicateHand: hand,
      prevHand: duplicate
    });
  };

  handleReplayGame = () => {
    const { prevHand } = this.state;
    this.setState({
      hand: prevHand,
      word: [],
      totalScore: 0,
      currentScore: 0,
      isStart: true,
      duplicateHand: prevHand
    });
  };

  handleReset = () => {
    const { duplicateHand } = this.state;
    this.setState({
      hand: duplicateHand,
      word: [],
      totalScore: 0,
      currentScore: 0
    });
  };

  calculateScore = () => {
    const { word, totalScore } = this.state;
    const valueArray = word.map(letter => letter.value);
    const currentScore = valueArray.reduce((a, b) => a + b, 0);
    this.setState({
      totalScore: totalScore + currentScore,
      currentScore,
      word: []
    });
  };

  dismissToast = time => {
    setTimeout(() => {
      this.setState({
        isMatch: null
      });
    }, time);
  };

  onSubmit = () => {
    const { word, wordLists } = this.state;
    const submittedWord = word.map(letter => letter.letter);
    if (wordLists.includes(submittedWord.join('').toUpperCase())) {
      this.calculateScore();
      this.setState({ isMatch: true });
      this.dismissToast(5000);
    } else {
      this.setState({ isMatch: false });
      this.dismissToast(5000);
    }
  };

  onDragEnd = result => {
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
      this.setState(newState);
    }
  };

  render() {
    const {
      hand,
      totalScore,
      word,
      currentScore,
      isStart,
      isMatch
    } = this.state;

    let toast;

    if (isMatch === true) {
      toast = (
        <Toast
          type='success'
          icon={<FaCheckCircle className={classes.success} />}
          text='Awesome! Correct Guess'
          onClick={() => this.dismissToast(100)}
        />
      );
    } else if (isMatch === false) {
      toast = (
        <Toast
          type='error'
          icon={<FaTimes className={classes.error} />}
          text='Wrong Guess, Try Again!'
          onClick={() => this.dismissToast(100)}
        />
      );
    }

    return (
      <div className={classes.app}>
        <div className={classes.container}>
          <Button
            text='start'
            onClick={this.handleStartGame}
            icon={<FaPlayCircle className={classes.icon} />}
          />
          <Button
            text='replay'
            onClick={this.handleReplayGame}
            icon={<FaHistory className={classes.icon} />}
          />
          <Score score={totalScore} text='total score' />
          <Score score={currentScore} text='current score' />
          <Button
            text='reset'
            onClick={this.handleReset}
            active={isStart ? false : true}
            icon={<FaTrashAlt className={classes.icon} />}
          />
          <Button
            text='end'
            onClick={this.handleEndGame}
            active={isStart ? false : true}
            icon={<FaStopCircle className={classes.icon} />}
          />
        </div>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <LetterBox letters={hand} id='hand' label='Letter hands' />
          <LetterBox
            letters={word}
            id='word'
            label='Drag n drop letters in thix box to make words.'
          />
        </DragDropContext>
        <Button
          text='submit'
          onClick={this.onSubmit}
          active={word.length > 0 ? false : true}
          icon={<FaPaperPlane className={classes.icon} />}
        />
        {toast}
      </div>
    );
  }
}

export default App;
