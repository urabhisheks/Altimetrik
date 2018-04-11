import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import Login from './components/Login/LoginPage';
import Signup from './components/Signup/SignupPage';

export default (
  <Route path="/" component = {App}>
    <IndexRoute component={HomePage} />
    <Route path = "login" component={Login} />
    <Route path = "signup" component={Signup} />
  </Route>
);
