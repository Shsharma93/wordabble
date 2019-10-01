import React, { useState, useContext } from 'react';
import classes from './admin.module.scss';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { Context } from '../../Context';
import GameHistory from '../gamehistory/GameHistory';

const Admin = () => {
  const [searchText, setSearch] = useState('');
  const { state } = useContext(Context);
  const { getUserGame } = state;

  const handleInput = event => {
    setSearch(event.target.value);
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.search}>
        <Input
          type='text'
          label='enter username to see their game history'
          onChange={handleInput}
          value={searchText}
          name='search'
        />
        <Button
          text='search'
          onClick={() => getUserGame(searchText)}
          active={searchText.length > 0 ? false : true}
        />
      </div>
      <GameHistory />
    </div>
  );
};

export default Admin;
