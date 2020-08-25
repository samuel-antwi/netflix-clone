import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import LoginHelp from './pages/LoginHelp';
import Register from './pages/Register';
import LandingPage from './pages/LandingPage';
import VerifyEmail from './pages/VerifyEmail';
import ResendEmailLinkSuccess from './pages/ResendEmailLinkSuccess';

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/register' component={Register} />
        <Route path='/movies' component={LandingPage} />
        <Route path='/LoginHelp' component={LoginHelp} />
        <Route path='/login' component={Login} />
        <Route path='/verify-email' component={VerifyEmail} />
        <Route path='/success' component={ResendEmailLinkSuccess} />
      </Switch>
    </div>
  );
};

export default App;
