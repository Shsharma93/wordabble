import React from 'react';
import classes from './button.module.scss';

const Button = ({ text, onClick }) => {
  return (
    <div className={classes.wrapper} onClick={onClick}>
      {text}
    </div>
  );
};

export default Button;
