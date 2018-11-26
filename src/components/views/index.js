import React from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import Dashboard from './Dashboard';
import Search from './Search';
import Schedule from './Schedule';
import AnimeInfo from './AnimeInfo';
import AnimeVideo from './AnimeVideo';
import HottestEpisodes from './HottestEpisodes';

export default () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/schedule" exact component={Schedule} />
    <Route path="/anime" exact component={Search} />
    <Route path="/hottest_episodes" exact component={HottestEpisodes} />
    <Route path="/anime/info/:id" exact component={AnimeInfo} />
    <Route path="/anime/video/:id" exact component={AnimeVideo} />
    <Redirect from="/*" to="/" />
  </Switch>
);
