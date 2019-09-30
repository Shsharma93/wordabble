import React, { Fragment } from 'react';
import Game from './pages/game/Game';
import Navbar from './components/Navbar/Navbar';
import Admin from './pages/admin/Admin';
import { Route, Switch } from 'react-router-dom';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Logout from './pages/auth/Logout';
import GameHistory from './pages/gamehistory/GameHistory';
import { Provider } from './Context';

const App = () => {
  return (
    <Fragment>
      <Provider>
        <Navbar />
        <Switch>
          <Route path='/admin' component={Admin} />
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
          <Route path='/logout' component={Logout} />
          <Route path='/gamehistory' component={GameHistory} />
          <Route path='/' component={Game} />
        </Switch>
      </Provider>
    </Fragment>
  );
};

export default App;
