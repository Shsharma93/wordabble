import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Card from '../../components/GameCard/Card';
import apiUrl from '../../config/config';
import { AuthContext } from '../../Context/AuthContext';
import classes from './gameHistory.module.scss';

const apiEndPoint = apiUrl + '/game';

const GameHistory = () => {
  const [game, setGame] = useState();
  const { state } = useContext(AuthContext);
  const { user } = state;

  useEffect(() => {
    const getGameHistory = async () => {
      try {
        const response = await axios.get(`${apiEndPoint}/?id=${user.id}`);
        console.log(response);
      } catch (error) {
        console.log(error.message);
      }
    };
    getGameHistory();
  });

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};

export default GameHistory;
