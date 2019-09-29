import React from 'react';
import classes from './input.module.scss';

const Input = ({ type, label, onChange, value, name }) => {
  return (
    <input
      className={classes.inputBox}
      type={type}
      placeholder={label}
      onChange={onChange}
      value={value}
      name={name}
    ></input>
  );
};

export default Input;
