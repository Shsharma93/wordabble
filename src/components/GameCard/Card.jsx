import React from 'react';
import classes from './card.module.scss';

const Card = ({ game, date }) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.date}>{date}</div>
      <div className={classes.hand}>{game.hand}</div>
      <div className={classes.score}>{game.score}</div>
      <div className={classes.words}>
        {game.words.map(word => (
          <span>{word}</span>
        ))}
      </div>
    </div>
  );
};

export default Card;
