import React, { Component } from 'react';
import LetterBox from './components/LetterBox/LetterBox';
import Button from './components/Button/Button';
import Score from './components/Score/Score';
import classes from './app.module.scss';
import { DragDropContext } from 'react-beautiful-dnd';
import letterValues from './utils/letter-values.json';
import wordLists from './utils/words.json';

class App extends Component {
  state = {
    hand: [],
    word: [],
    words: [],
    letterValues: letterValues,
    score: 0,
    wordLists: wordLists.words
  };

  handleEndGame = () => {
    this.setState({ hand: [], word: [] });
  };

  handleStartGame = () => {
    const { letterValues } = this.state;
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

    this.setState({ hand });
  };

  onSubmit = () => {
    const { word, wordLists } = this.state;
    const submittedWord = word.map(el => el.letter);
    if (wordLists.includes(submittedWord.join('').toUpperCase())) {
      console.log('ACCEPTED');
      this.setState({ word: [] });
    } else {
      console.log('REJECTED');
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
    const { hand, score, word } = this.state;
    return (
      <div className={classes.app}>
        <div className={classes.container}>
          <Button text='start' onClick={this.handleStartGame} />
          <Score score={score} />
          <Button text='end' onClick={this.handleEndGame} />
        </div>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <LetterBox letters={hand} id='hand' />
          <LetterBox letters={word} id='word' />
        </DragDropContext>
        <Button text='submit' onClick={this.onSubmit} />
      </div>
    );
  }
}

export default App;
