import React, { useContext } from 'react';
import Card from '../../components/GameCard/Card';
import { Context } from '../../Context';
import classes from './gameHistory.module.scss';

const GameHistory = () => {
  const { state } = useContext(Context);
  const { game } = state;

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div>Username</div>
        <div>Time</div>
        <div>Hand</div>
        <div>Score</div>
        <div>Words</div>
      </div>
      <div className={classes.wrapper}>
        {game
          ? game.map((item, index) => (
              <Card
                date={item.date}
                game={item.game}
                key={index}
                username={item.user}
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default GameHistory;
