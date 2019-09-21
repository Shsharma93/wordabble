import React from 'react';
import classes from './button.module.scss';

const Button = ({ text, onClick, active, icon }) => {
  return (
    <button className={classes.wrapper} onClick={onClick} disabled={active}>
      {text} {icon}
    </button>
  );
};

export default Button;
