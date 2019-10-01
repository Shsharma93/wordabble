import React from 'react';
import classes from './card.module.scss';

const Card = ({ game, date, username }) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.user}>{!username ? 'Guest User' : username}</div>
      <div className={classes.date}>{date}</div>
      <div className={classes.hand}>{game.hand}</div>
      <div className={classes.score}>{game.score}</div>
      <div className={classes.words}>
        {game.words.map((word, index) => (
          <span key={index}>{word}</span>
        ))}
      </div>
    </div>
  );
};

export default Card;
