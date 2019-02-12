import React from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

// View components
import Dashboard from './Dashboard';

export default () => (
  <div className="main-container">
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Redirect from="/*" to="/" />
    </Switch>
  </div>
);
