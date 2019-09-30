import React, { Fragment, useContext, useState } from 'react';
import axios from 'axios';
import Form from '../../components/Form/Form';
import apiUrl from '../../config/config';
import validateInput from '../../validation/register';
import classes from './auth.module.scss';
import { AuthContext } from '../../Context/AuthContext';

const apiEndPoint = apiUrl + '/login';

const Login = props => {
  const [user, setUser] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);

  const { state } = useContext(AuthContext);
  const { checkAuth } = state;

  const handleInputChange = event => {
    const userInput = { ...user };
    userInput[event.target.name] = event.target.value;
    setUser(userInput);
  };

  const dismissError = async () => {
    await setTimeout(() => {
      setError(null);
    }, 2000);
  };

  const handleOnSubmit = async event => {
    event.preventDefault();
    const { username, password } = user;
    const { error } = validateInput(user);

    if (error) {
      dismissError();
      return setError(error.details[0].message);
    }

    try {
      const result = await axios.post(apiEndPoint, {
        username,
        password
      });
      localStorage.setItem('token', result.headers['x-auth-token']);
      checkAuth();
      props.history.push('/');
    } catch (error) {
      setError(error.response.data.message);
      dismissError();
    }
  };

  return (
    <Fragment>
      <div className={classes.container}>
        <Form
          title='Login'
          btn='Sign In'
          type='login'
          submit={handleOnSubmit}
          onChange={handleInputChange}
          user={user}
          error={error}
        />
      </div>
    </Fragment>
  );
};

export default Login;
