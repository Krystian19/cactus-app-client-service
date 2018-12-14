import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import React, { Component } from 'react';
import Sidebar from '../../shared_components/Sidebar';
import ScheduleList from '../../shared_components/ScheduleList';
import LoadingSpinner from '../../shared_components/LoadingSpinner';

const WeekDayScheduleQuery = gql`
  query {
    getAiringSeasons {
      id,
      seasonOrder,
      title,
      poster,
      startedAiring,
      episodeCount,
      Anime {
        id,
        title,
      },
      LatestEpisode {
        id,
        thumbnail,
        episodeOrder
      }
    }
  }
`;

export default class ScheduleView extends Component {
  // constructor() {
  //   super()
  // }

  render() {
    const { history } = this.props;
    return (
      <div className="main-container">
        <Sidebar props={{ history }} />

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
                    history,
                  }}
                />
              </div>
            );
          }}
        </Query>

      </div>
    );
  }
}
