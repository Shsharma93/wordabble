import { useContext, useEffect } from 'react';
import { AuthContext } from '../../Context/AuthContext';

const Logout = props => {
  const { state } = useContext(AuthContext);
  const { logout } = state;

  useEffect(() => {
    localStorage.removeItem('token');
    props.history.push('/');
    logout();
  });

  return null;
};

export default Logout;
