import React, { useContext } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
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
import Button from '../../components/Button/Button';
import Toast from '../../components/Toast/Toast';
import Score from '../../components/Score/Score';
import LetterBox from '../../components/LetterBox/LetterBox';
import classes from './game.module.scss';
import { Context } from '../../Context';

const Game = () => {
  const { state } = useContext(Context);
  const {
    isMatch,
    isWarning,
    hand,
    isStart,
    word,
    totalScore,
    currentScore,
    handleStartGame,
    handleEndGame,
    handleReplayGame,
    handleReset,
    onDragEnd,
    onSubmit,
    dismissToast,
    dismissWarning
  } = state;

  let notification;

  if (isMatch === true) {
    notification = (
      <Toast
        type='success'
        icon={<FaCheckCircle className={classes.success} />}
        text='Awesome! Correct Guess'
        onClick={() => dismissToast(100)}
      />
    );
  } else if (isMatch === false) {
    notification = (
      <Toast
        type='error'
        icon={<FaTimes className={classes.error} />}
        text='Wrong Guess, Try Again!'
        onClick={() => dismissToast(100)}
      />
    );
  }

  let warning = isWarning ? (
    <Toast
      type='warning'
      icon={<FaExclamationTriangle className={classes.warning} />}
      text={`Only ${hand.length} Letter(s) Left`}
      onClick={() => dismissWarning(100)}
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
            onClick={handleStartGame}
            icon={<FaPlayCircle className={classes.icon} />}
          />
          <Button
            text='end'
            onClick={handleEndGame}
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
            onClick={handleReplayGame}
            icon={<FaHistory className={classes.icon} />}
          />
          <Button
            text='reset'
            onClick={handleReset}
            active={isStart ? false : true}
            icon={<FaTrashAlt className={classes.icon} />}
          />
        </div>
      </div>
      <div className={classes.body}>
        <DragDropContext onDragEnd={onDragEnd}>
          <LetterBox letters={hand} id='hand' label='Letter hands' />
          <LetterBox
            letters={word}
            id='word'
            label='Drag n drop letters in thix box to make words.'
          />
        </DragDropContext>
        <Button
          text='submit'
          onClick={onSubmit}
          active={word.length > 0 ? false : true}
          icon={<FaPaperPlane className={classes.icon} />}
        />
        {notification}
        {warning}
      </div>
    </div>
  );
};

export default Game;
