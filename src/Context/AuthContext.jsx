import React, { useState } from 'react';
import jwtDecode from 'jwt-decode';

export const AuthContext = React.createContext();

export const Provider = props => {
  const [isLogin, setLogin] = useState(false);
  const [user, setUser] = useState(null);

  const checkAuth = () => {
    try {
      const jwt = localStorage.getItem('token');
      const user = jwtDecode(jwt);
      setLogin(true);
      setUser(user);
    } catch (error) {}
  };

  const logout = () => {
    setLogin(false);
    setUser(null);
  };

  checkAuth();

  return (
    <AuthContext.Provider
      value={{ state: { isLogin, user, logout, checkAuth } }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
