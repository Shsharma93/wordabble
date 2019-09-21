import React from 'react';
import classes from './score.module.scss';

const Score = ({ score, text }) => {
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>{score}</div>
      <p>{text}</p>
    </div>
  );
};

export default Score;
