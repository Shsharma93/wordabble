import React from 'react';
import classes from './toast.module.scss';

const Toast = ({ icon, text, type, onClick }) => {
  let style = classes.container;

  if (type === 'error') style = [classes.container, classes.error].join(' ');

  if (type === 'warning')
    style = [classes.container, classes.alert, classes.warning].join(' ');

  if (type === 'success')
    style = [classes.container, classes.success].join(' ');

  return (
    <div className={style} onClick={onClick}>
      {icon} <p>{text}</p>
    </div>
  );
};

export default Toast;
