import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Context } from '../Context';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { state } = useContext(Context);
  const { user } = state;
  return (
    <Route
      {...rest}
      render={props => (!user ? <Redirect to='/' /> : <Component {...props} />)}
    />
  );
};

export default PrivateRoute;
