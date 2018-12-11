import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import React, { Component } from 'react';
import moment from 'moment';
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

  groupSeasonsByWeekDays = (Seasons) => {
    const WeekDays = {
      '1': [],
      '2': [],
      '3': [],
      '4': [],
      '5': [],
      '6': [],
      '7': [],
    };

    Seasons.map((Season) => {
      const dayOfWeekInt = moment(Season.startedAiring).isoWeekday();
      WeekDays[dayOfWeekInt.toString()].push(Season);
      return true;
    });

    return WeekDays;
  }

  render() {
    const { history } = this.props;
    return (
      <div className="main-container">
        <Sidebar props={{ history }} />

        <Query query={WeekDayScheduleQuery}>
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
            console.log(this.groupSeasonsByWeekDays(data.getAiringSeasons));
            return (
              <div className="main-content">
                <ScheduleList
                  props={{
                    // WeekDays: data.getWeekDays,
                    WeekDays: [],
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
