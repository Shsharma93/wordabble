import React, { useState } from 'react';
import classes from './admin.module.scss';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

const Admin = () => {
  const [searchText, setSearch] = useState('');

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
        <Button text='search' onClick='sbc' />
      </div>
    </div>
  );
};

export default Admin;
