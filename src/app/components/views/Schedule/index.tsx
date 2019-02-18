import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import React from 'react';

import ScheduleList from '../../shared/ScheduleList';
import LoadingSpinner from '../../shared/LoadingSpinner';

const WeekDayScheduleQuery = gql`
  query {
    getAiringSeasons {
      id,
      seasonOrder,
      title,
      poster,
      startedAiring,
      episodeCount,
      LatestEpisode {
        id,
        thumbnail,
        episodeOrder
      }
    }
  }
`;

export default class Schedule extends React.Component {
  render() {
    return (
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
                props={{
                  WeekDays: data.getAiringSeasons,
                }}
              />
            </div>
          );
        }}
      </Query>
    );
  }
}
