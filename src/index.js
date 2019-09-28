import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import Admin from './containers/Admin';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

render(
  <Router>
    <Switch>
      <Route path='/admin' component={Admin} />
      <Route path='/' component={App} />
    </Switch>
  </Router>,
  document.getElementById('root')
);
