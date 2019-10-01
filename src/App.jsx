import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Admin from './pages/admin/Admin';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Logout from './pages/auth/Logout';
import GameHistory from './pages/gamehistory/GameHistory';
import Game from './pages/game/Game';
import PrivateRoute from './routes/PrivateRoute';
import ProtectedRoute from './routes/ProtectedRoute';

const App = () => {
  return (
    <Fragment>
      <Navbar />
      <Switch>
        <Route path='/admin/gamehistory' render={() => <GameHistory />} />
        <Route path='/admin' component={Admin} />
        <ProtectedRoute path='/register' component={Register} />
        <ProtectedRoute path='/login' component={Login} />
        <Route path='/logout' component={Logout} />
        <PrivateRoute path='/gamehistory' component={GameHistory} />
        <Route path='/' component={Game} />
      </Switch>
    </Fragment>
  );
};

export default App;
