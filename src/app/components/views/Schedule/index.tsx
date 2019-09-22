import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import React from 'react';

import ScheduleList from '../../shared/ScheduleList';
import LoadingSpinner from '../../shared/LoadingSpinner';

const WeekDayScheduleQuery = gql`
  query {
    AiringReleases {
      id,
      release_order,
      title,
      poster,
      startedAiring,
      EpisodeCount,
      LatestEpisode {
        id,
        thumbnail,
        episode_order
      }
    }
  }
`;

const Schedule = () => (
  <Query query={WeekDayScheduleQuery} fetchPolicy="no-cache">
    {({ loading, error, data }) => {
      if (loading) {
        return (
          <div className="main-content no-padding">
            <LoadingSpinner />
          </div>
        );
      }

      if (error) return <p>Error :(</p>;

      console.log(data);
      return (
        <div className="main-content">
          <ScheduleList
            WeekDays={data.AiringReleases}
          />
        </div>
      );
    }}
  </Query>
);

export default Schedule;