import React, { useContext, useState, Fragment } from 'react';
import axios from 'axios';
import Form from '../../components/Form/Form';
import apiUrl from '../../config/config';
import validateInput from '../../validation/register';
import { Context } from '../../Context';
import classes from './auth.module.scss';

const apiEndPoint = apiUrl + '/register';

const Register = props => {
  const [user, setUser] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);

  const { state } = useContext(Context);
  const { checkAuth } = state;

  const handleInputChange = event => {
    const userInput = { ...user };
    userInput[event.target.name] = event.target.value;
    setUser(userInput);
  };

  const dismissError = () => {
    setTimeout(() => {
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
          title='Register'
          btn='Sign Up'
          type='signup'
          submit={handleOnSubmit}
          onChange={handleInputChange}
          user={user}
          error={error}
        />
      </div>
    </Fragment>
  );
};

export default Register;
