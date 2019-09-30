import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Admin from './pages/admin/Admin';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Logout from './pages/auth/Logout';
import GameHistory from './pages/gamehistory/GameHistory';
import Game from './pages/game/Game';
import { Provider as GameProvider } from './Context/GameContext';
import { Provider as AuthProvider } from './Context/AuthContext';

const App = () => {
  return (
    <Fragment>
      <AuthProvider>
        <GameProvider>
          <Navbar />
          <Switch>
            <Route path='/admin' component={Admin} />
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />
            <Route path='/logout' component={Logout} />
            <Route path='/gamehistory' component={GameHistory} />
            <Route path='/' component={Game} />
          </Switch>
        </GameProvider>
      </AuthProvider>
    </Fragment>
  );
};

export default App;
