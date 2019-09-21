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
  FaCheckCircle,
  FaExclamationTriangle
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
    isMatch: null,
    isWarning: false
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

    const hand = this.getHandValue();
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

  continueGame = () => {
    const { duplicateHand } = this.state;
    const newHand = this.getHandValue();

    this.setState({
      hand: newHand,
      duplicateHand: newHand,
      prevHand: duplicateHand
    });
  };

  // getHandValue = () => {
  //   const random = Math.floor(Math.random() * 3) + 0;
  //   const handList = [
  //     [
  //       { id: 'item-1', letter: 'i', value: 1 },
  //       { id: 'item-2', letter: 'n', value: 2 },
  //       { id: 'item-3', letter: 'e', value: 3 },
  //       { id: 'item-4', letter: 'r', value: 4 },
  //       { id: 'item-5', letter: 't', value: 5 },
  //       { id: 'item-6', letter: 'i', value: 6 },
  //       { id: 'item-7', letter: 'a', value: 7 }
  //     ],
  //     [
  //       { id: 'item-1', letter: 'a', value: 1 },
  //       { id: 'item-2', letter: 'n', value: 2 },
  //       { id: 'item-3', letter: 'i', value: 3 },
  //       { id: 'item-4', letter: 'm', value: 4 },
  //       { id: 'item-5', letter: 'a', value: 5 },
  //       { id: 'item-6', letter: 't', value: 6 },
  //       { id: 'item-7', letter: 'e', value: 7 }
  //     ],
  //     [
  //       { id: 'item-1', letter: 'a', value: 1 },
  //       { id: 'item-2', letter: 's', value: 2 },
  //       { id: 'item-3', letter: 'o', value: 3 },
  //       { id: 'item-4', letter: 'c', value: 4 },
  //       { id: 'item-5', letter: 'i', value: 5 },
  //       { id: 'item-6', letter: 'a', value: 6 },
  //       { id: 'item-7', letter: 'l', value: 7 }
  //     ]
  //   ];
  //   return handList[random];
  // };

  getHandValue = () => {
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
    const { word, totalScore, duplicateHand } = this.state;
    const valueArray = word.map(letter => letter.value);
    let currentScore = valueArray.reduce((a, b) => a + b, 0);
    currentScore = currentScore * valueArray.length;
    currentScore =
      word.length === duplicateHand.length ? currentScore + 50 : currentScore;
    console.log(currentScore);

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
    const { word, wordLists, hand } = this.state;
    const submittedWord = word.map(letter => letter.letter);
    if (wordLists.includes(submittedWord.join('').toUpperCase())) {
      this.calculateScore();
      this.setState({ isMatch: true });
      this.dismissToast(5000);
      if (hand.length === 0) this.continueGame();
    } else {
      this.setState({ isMatch: false });
      this.dismissToast(5000);
    }
  };

  onDragEnd = async result => {
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
        this.dismissWarning(5000);
      }
    }
  };

  dismissWarning = time => {
    setTimeout(() => {
      this.setState({
        isWarning: false
      });
    }, time);
  };

  render() {
    const {
      hand,
      totalScore,
      word,
      currentScore,
      isStart,
      isMatch,
      isWarning
    } = this.state;

    let notification;

    if (isMatch === true) {
      notification = (
        <Toast
          type='success'
          icon={<FaCheckCircle className={classes.success} />}
          text='Awesome! Correct Guess'
          onClick={() => this.dismissToast(100)}
        />
      );
    } else if (isMatch === false) {
      notification = (
        <Toast
          type='error'
          icon={<FaTimes className={classes.error} />}
          text='Wrong Guess, Try Again!'
          onClick={() => this.dismissToast(100)}
        />
      );
    }

    let warning = isWarning ? (
      <Toast
        type='warning'
        icon={<FaExclamationTriangle className={classes.warning} />}
        text={`Only ${hand.length} Letter(s) Left`}
        onClick={() => this.dismissWarning(100)}
      />
    ) : (
      ''
    );

    return (
      <div className={classes.container}>
        <div className={classes.header}>
          <div className={classes.start}>
            <Button
              text='start'
              onClick={this.handleStartGame}
              icon={<FaPlayCircle className={classes.icon} />}
            />
            <Button
              text='end'
              onClick={this.handleEndGame}
              active={isStart ? false : true}
              icon={<FaStopCircle className={classes.icon} />}
            />
          </div>
          <div className={classes.scores}>
            <Score score={totalScore} text='total score' />
            <Score score={currentScore} text='current score' />
          </div>
          <div className={classes.replay}>
            <Button
              text='replay'
              onClick={this.handleReplayGame}
              icon={<FaHistory className={classes.icon} />}
            />
            <Button
              text='reset'
              onClick={this.handleReset}
              active={isStart ? false : true}
              icon={<FaTrashAlt className={classes.icon} />}
            />
          </div>
        </div>
        <div className={classes.body}>
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
          {notification}
          {warning}
        </div>
      </div>
    );
  }
}

export default App;
