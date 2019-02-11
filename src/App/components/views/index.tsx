import React from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

// View components
import Dashboard from './Dashboard';

export default () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Redirect from="/*" to="/" />
  </Switch>
);
