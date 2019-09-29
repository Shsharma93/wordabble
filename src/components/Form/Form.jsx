import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import Input from '../Input/Input';
import classes from './form.module.scss';

const Form = ({ title, btn, type, onChange, user, submit, error, isLoad }) => {
  const { username, password } = user;

  let registeredLabel = (
    <p className={classes.label}>
      Already registered? <Link to='/login'>Log In here</Link>
    </p>
  );

  if (type === 'login') {
    registeredLabel = (
      <p className={classes.label}>
        Not registered yet? <Link to='/register'>Sign Up here</Link>
      </p>
    );
  }

  const warning = error ? (
    <p className={classes.warning}>{error}</p>
  ) : (
    <p className={classes.warning}></p>
  );

  let isDisable = true;
  if (username.length > 2 && password.length > 7) {
    isDisable = false;
  }

  return (
    <form className={classes.form} onSubmit={submit}>
      <h1>{title}</h1>
      {warning}
      <Input
        type='text'
        label='Username (3 - 50 characters long)'
        onChange={onChange}
        value={username}
        name='username'
      />
      <Input
        type='password'
        label='Password (8 - 32 characters long)'
        onChange={onChange}
        value={password}
        name='password'
      />
      <Button text={btn} active={isDisable} />
      {registeredLabel}
    </form>
  );
};

export default Form;
