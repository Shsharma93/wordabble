import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Card from '../../components/GameCard/Card';
import apiUrl from '../../config/config';
import { Context } from '../../Context';
import classes from './gameHistory.module.scss';

const apiEndPoint = apiUrl + '/game';

const GameHistory = () => {
  const [game, setGame] = useState();
  const { state } = useContext(Context);
  const { user } = state;


  useEffect(() => {
    const getGameHistory = async () => {
      try {
        const response = await axios.get(`${apiEndPoint}/?id=${user.id}`);
        setGame(response.data.games);
        console.log(response.data.games);
      } catch (error) {
        console.log(error.message);
      }
    };
    getGameHistory();
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div>Time</div>
        <div>Hand</div>
        <div>Score</div>
        <div>Words</div>
      </div>
      <div className={classes.wrapper}>
        {game
          ? game.map((item, index) => (
              <Card date={item.date} game={item.game} key={index} />
            ))
          : null}
      </div>
    </div>
  );
};

export default GameHistory;
