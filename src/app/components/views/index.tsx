import React from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

// View components
import Sidebar from '../components/Sidebar';
import Dashboard from './Dashboard';
import Search from './Search';

export default () => (
  <div className="main-container">
    <Sidebar />
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/search" exact component={Search} />
      <Redirect from="/*" to="/" />
    </Switch>
  </div>
);
