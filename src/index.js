import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import Admin from './pages/admin/Admin';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Logout from './pages/auth/Logout';
import Game from './pages/game/Game';

render(
  <Router>
    <Switch>
      <Route path='/admin' component={Admin} />
      <Route path='/register' component={Register} />
      <Route path='/login' component={Login} />
      <Route path='/logout' component={Logout} />
      <Route path='/gamehistory' component={Game} />
      <Route path='/' component={App} />
    </Switch>
  </Router>,
  document.getElementById('root')
);
