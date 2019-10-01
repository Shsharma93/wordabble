import React, { useContext } from 'react';
import {
  FaUserAlt,
  FaSignInAlt,
  FaSignOutAlt,
  FaUserPlus,
  FaGamepad
} from 'react-icons/fa';
import { Link, withRouter } from 'react-router-dom';
import NavItem from './NavItem/NavItem';
import classes from './navbar.module.scss';
import { Context } from '../../Context';

const Navbar = props => {
  const { state } = useContext(Context);
  const { isLogin, user, logout, getMyGame, getAllGame } = state;

  let navList = (
    <div className={classes.navigation}>
      <Link to='/admin'>
        <NavItem text='admin' icon={<FaUserAlt className={classes.icon} />} />
      </Link>

      <Link to='/login'>
        <NavItem
          text='Sign In'
          icon={<FaSignInAlt className={classes.icon} />}
        />
      </Link>
      <Link to='/register'>
        <NavItem
          text='Sign up'
          icon={<FaUserPlus className={classes.icon} />}
        />
      </Link>
    </div>
  );

  if (isLogin) {
    navList = (
      <div className={classes.navigation}>
        <Link to='/'>
          <NavItem
            text={user ? user.username : ''}
            icon={<FaUserAlt className={classes.icon} />}
          />
        </Link>
        <Link to='/gamehistory'>
          <NavItem
            onClick={getMyGame}
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

  const routes = props.location.pathname.split('/');

  if (routes.includes('admin')) {
    if (user) logout();
    navList = (
      <div className={classes.navigation}>
        <Link to='/admin'>
          <NavItem
            text={'admin'}
            icon={<FaUserAlt className={classes.icon} />}
          />
        </Link>
        <Link to='/admin/gamehistory'>
          <NavItem
            onClick={getAllGame}
            text='Game History'
            icon={<FaGamepad className={classes.icon} />}
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

export default withRouter(Navbar);
