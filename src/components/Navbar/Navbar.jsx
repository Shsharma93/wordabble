import React, { useContext } from 'react';
import {
  FaUserAlt,
  FaSignInAlt,
  FaSignOutAlt,
  FaUserPlus,
  FaGamepad
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import NavItem from './NavItem/NavItem';
import classes from './navbar.module.scss';
import { AuthContext } from '../../Context/AuthContext';

const Navbar = () => {
  const { state } = useContext(AuthContext);
  const { isLogin, user } = state;
  let navList = (
    <div className={classes.navigation}>
      <Link to='/register'>
        <NavItem
          text='Sign up'
          icon={<FaUserPlus className={classes.icon} />}
        />
      </Link>
      <Link to='/login'>
        <NavItem
          text='Sign In'
          icon={<FaSignInAlt className={classes.icon} />}
        />
      </Link>
    </div>
  );

  if (isLogin) {
    navList = (
      <div className={classes.navigation}>
        <NavItem
          text={user ? user.username : ''}
          icon={<FaUserAlt className={classes.icon} />}
        />
        <Link to='/gamehistory'>
          <NavItem
            text='Game History'
            icon={<FaGamepad className={classes.icon} />}
          />
        </Link>
        <Link to='/logout'>
          <NavItem
            text='Sign Out'
            icon={<FaSignOutAlt className={classes.icon} />}
          />
        </Link>
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <div className={classes.logo}>
        <Link to='/'>Wordabble</Link>
      </div>
      {navList}
    </div>
  );
};

export default Navbar;
