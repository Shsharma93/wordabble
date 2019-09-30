import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Form from '../../components/Form/Form';
import apiUrl from '../../config/config';
import validateInput from '../../validation/register';
import classes from './auth.module.scss';

const apiEndPoint = apiUrl + '/register';

class Register extends Component {
  state = {
    user: {
      username: '',
      password: ''
    },
    error: ''
  };

  handleInputChange = event => {
    const user = { ...this.state.user };
    user[event.target.name] = event.target.value;
    this.setState({ user });
  };

  dismissError = () => {
    setTimeout(() => {
      this.setState({
        error: null
      });
    }, 2000);
  };

  handleOnSubmit = async event => {
    event.preventDefault();

    const {
      user: { username, password }
    } = this.state;

    const { error } = validateInput(this.state.user);

    if (error) {
      this.dismissError();
      return this.setState({ error: error.details[0].message });
    }

    try {
      const result = await axios.post(apiEndPoint, {
        username,
        password
      });
      localStorage.setItem('token', result.headers['x-auth-token']);
      this.props.history.push('/');
    } catch (error) {
      this.setState({ error: error.response.data.message });
    }
  };

  render() {
    const { user, error } = this.state;
    return (
      <Fragment>
        <div className={classes.container}>
          <Form
            title='Register'
            btn='Sign Up'
            type='signup'
            submit={this.handleOnSubmit}
            onChange={this.handleInputChange}
            user={user}
            error={error}
          />
        </div>
      </Fragment>
    );
  }
}

export default Register;
