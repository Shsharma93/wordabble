import React from 'react';
import classes from './NavItem.module.scss';

const NavItem = ({ icon, text, onClick }) => {
  return (
    <div onClick={onClick} className={classes.wrapper}>
      <div className={classes.label}>{text}</div>
      {icon}
    </div>
  );
};

export default NavItem;
