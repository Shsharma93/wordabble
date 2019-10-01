import { useContext, useEffect } from 'react';
import { Context } from '../../Context';

const Logout = props => {
  const { state } = useContext(Context);
  const { logout } = state;

  useEffect(() => {
    localStorage.removeItem('token');
    props.history.push('/');
    logout();
  });

  return null;
};

export default Logout;
