import React from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

// View components
import Dashboard from './Dashboard';
import Sidebar from '../components/Sidebar';

export default () => (
  <div className="main-container">
    <Sidebar />
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Redirect from="/*" to="/" />
    </Switch>
  </div>
);
