import React from 'react';
import classes from './card.module.scss';

const Card = () => {
  return (
    <div className={classes.wrapper}>
      <div>Time</div>
      <div>Hand</div>
      <div>Score</div>
      <div>Words</div>
    </div>
  );
};

export default Card;
