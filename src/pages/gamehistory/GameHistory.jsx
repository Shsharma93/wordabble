import React, { Component } from 'react';
// import axios from 'axios';
import Card from '../../components/GameCard/Card';
// import apiUrl from '../../config/config';
import classes from './gameHistory.module.scss';

// const apiEndPoint = apiUrl + '/game';

class Game extends Component {
  state = {
    game: null,
    user: ''
  };
  componentDidMount() {
    this.getGameHistory();
  }

  getGameHistory = async () => {
    // try {
    //   const response = await axios.get(`${apiEndPoint}/?id=${user.id}`);
    //   console.log(response);
    // } catch (error) {
    //   console.log(error.message);
    // }
  };

  render() {
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
  }
}

export default Game;
