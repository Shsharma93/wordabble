import React from 'react';
import classes from './NavItem.module.scss';

const NavItem = ({ icon, text }) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.label}>{text}</div>
      {icon}
    </div>
  );
};

export default NavItem;
