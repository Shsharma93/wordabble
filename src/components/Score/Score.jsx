import React from 'react';
import classes from './score.module.scss';

const Score = ({ score }) => {
  return <div className={classes.wrapper}>{score}</div>;
};

export default Score;
