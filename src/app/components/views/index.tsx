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
import Schedule from './Schedule';
import HottestEpisodes from './HottestEpisodes';
import NewestEpisodes from './NewestEpisodes';
import Categories from './Categories';
import AnimeDetail from './AnimeDetail';
import AnimeVideo from './AnimeVideo';

export default () => (
  <div className="main-container">
    <Sidebar />
    <Switch>
      <Route path="/" exact={true} component={Dashboard} />
      <Route path="/search" exact={true} component={Search} />
      <Route path="/schedule" exact={true} component={Schedule} />
      <Route path="/hottest_episodes" exact={true} component={HottestEpisodes} />
      <Route path="/newest_episodes" exact={true} component={NewestEpisodes} />
      <Route path="/categories" exact={true} component={Categories} />
      <Route path="/anime/detail/:id" exact={true} component={AnimeDetail} />
      <Route path="/anime/video/:id" exact={true} component={AnimeVideo} />
      <Redirect from="/*" to="/" />
    </Switch>
  </div>
);
