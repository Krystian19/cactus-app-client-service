import React from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

// View components
import Sidebar from '../shared/Sidebar';
import Dashboard from './Dashboard';
import Search from './Search';
import HottestEpisodes from './HottestEpisodes';
import NewestEpisodes from './NewestEpisodes';
import Categories from './Categories';
import AnimeDetail from './AnimeDetail';
import Schedule from './Schedule';

export default () => (
  <div className="main-container">
    <Sidebar />
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/search" exact component={Search} />
      <Route path="/schedule" exact component={Schedule} />
      <Route path="/hottest_episodes" exact component={HottestEpisodes} />
      <Route path="/newest_episodes" exact component={NewestEpisodes} />
      <Route path="/categories" exact component={Categories} />
      <Route path="/anime/detail/:id" exact component={AnimeDetail} />
      <Redirect from="/*" to="/" />
    </Switch>
  </div>
);
