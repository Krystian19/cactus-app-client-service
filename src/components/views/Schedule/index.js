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
      return WeekDays[dayOfWeekInt.toString()].push(Season);
    });

    const parsedWeekDays = Object.keys(WeekDays)
      .map((dayOrder) => {
        let dayName = '';

        // Set the name of each day of the week
        switch (dayOrder) {
          case '1': // Monday
            dayName = 'Monday';
            break;
          case '2': // Tuesday
            dayName = 'Tuesday';
            break;
          case '3': // Wednesday
            dayName = 'Wednesday';
            break;
          case '4': // Thursday
            dayName = 'Thursday';
            break;
          case '5': // Friday
            dayName = 'Friday';
            break;
          case '6': // Saturday
            dayName = 'Saturday';
            break;
          case '7': // Sunday
            dayName = 'Sunday';
            break;
          default:
            dayName = '';
        }

        return ({ order: dayOrder, dayName, seasons: WeekDays[dayOrder] });
      });

    return parsedWeekDays;
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
            return (
              <div className="main-content">
                <ScheduleList
                  props={{
                    WeekDays: this.groupSeasonsByWeekDays(data.getAiringSeasons),
                    // WeekDays: [],
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
