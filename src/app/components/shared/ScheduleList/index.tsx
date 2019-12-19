import React from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment-timezone';
import { RouteComponentProps } from 'react-router';
import { injectIntl, InjectedIntlProps } from 'react-intl';

import {
  GQLRelease,
} from '@cactus-app/types';
import ClientRender from '../ClientRenderer';
import JSTToLocalTime from '../../../utils/JSTtoLocalTime';
import getDayOfTheWeek from '../../../utils/getDayOfTheWeek';
import DateTimeToTime from '../../../utils/DateTimeToTime';

/**
* @author Jan Guzman <janfrancisco19@gmail.com>
* @desc Reorders an Array of days in ASC order
* depending of the current client's timezone
* @arg WeekDays Array [ { order: String, dayName: String, Release: Array } ]
* @arg today Integer Literal Represent day of the week 1 to 7
* @returns Array of Day Objects organized by their order attribute
*/

const reorderWeekDays = (WeekDays, today = getDayOfTheWeek()) => {
  // Set array WeekDay array as unmutable (avoids global mutability problem)
  const WeekDaysList = WeekDays.map(day => day);

  // Orders WeekDays by ascending order with the 'order' field
  const parsedWeekDays = WeekDaysList.sort((a, b) => (a.order > b.order));

  // Get any days before today
  const aftermathWeekDays = parsedWeekDays.filter(day => day.order < today);

  // Remove those filtered days from the  array in their current order
  parsedWeekDays.splice(0, aftermathWeekDays.length);

  // Append filtered days at the end of the array
  return [...parsedWeekDays, ...aftermathWeekDays];
};

/**
* @author Jan Guzman <janfrancisco19@gmail.com>
* @desc Groups Seaons by their WeekDay 1 through 7
* @arg Release Array of Release Objects
* @returns WeekDays Array [ { order: String, dayName: String, Release: Array } ]
*/
const groupReleasesByWeekDays = (Release) => {
  const WeekDays = {
    '1': [],
    '2': [],
    '3': [],
    '4': [],
    '5': [],
    '6': [],
    '7': [],
  };

  Release.map((Release) => {
    const ParsedRelease = Release;

    // Translate Original airingTime in JST to the local TimeZone
    ParsedRelease.started_airing = JSTToLocalTime(ParsedRelease.started_airing);

    // Get what day of the week this Release started Airing
    const dayOfWeekInt = moment(ParsedRelease.started_airing).isoWeekday();

    // Avoid Release with no episodes
    if (!ParsedRelease.LatestEpisode) return null;

    return WeekDays[dayOfWeekInt.toString()].push(ParsedRelease);
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

      return ({ order: dayOrder, dayName, Release: WeekDays[dayOrder] });
    });

  return parsedWeekDays;
};

type PropType =
  RouteComponentProps<{}>
  & InjectedIntlProps & {
    WeekDays: GQLRelease[],
  };

const ScheduleList = (props: PropType) => {
  const { WeekDays, history, intl: { formatMessage } } = props;
  const parsedWeekDays = groupReleasesByWeekDays(WeekDays);
  return (
    <div className="anime-schedule-list">

      <ClientRender>
        {/* {WeekDays.map((Day) => { */}
        {reorderWeekDays(parsedWeekDays).map((Day) => {
          // If nothing is airing this day, don't show this tab
          if (!Day.Release.length) return null;
          return (
            <div className="anime-schedule-day" key={Day.order}>
              <div className="date">
                <h3 className="day">
                  {(() => {
                    let DayName = '';

                    // If this day corresponds to today's day of the week
                    if (Day.order === getDayOfTheWeek().toString()) {
                      DayName = 'Today';
                    } else if (
                      // If this day corresponds to the day of tomorrow
                      (Day.order === (Number(getDayOfTheWeek()) + 1).toString())

                      // If today is Sunday then monday should be marked as tomorrow
                      || ((String(getDayOfTheWeek()) === '7') && Day.order === '1')) {
                      DayName = 'Tomorrow';
                    } else {
                      // Else, just return today's name
                      DayName = Day.dayName;
                    }

                    return formatMessage({
                      id: `cactus.${DayName}`,
                      defaultMessage: ''
                    });
                  })()}
                </h3>
                <span className="split" />
              </div>
              <div className="anime-schedule-poster-list">

                {Day.Release.map((Release, index) => (
                  <div
                    className="anime-schedule-poster shimmer-load"
                    key={Release.id}
                    onClick={
                      () => history.push(
                        `/anime/detail/${Release.id}`,
                      )}
                    onKeyPress={
                      () => history.push(
                        `/anime/detail/${Release.id}`,
                      )}
                    role="menuitem"
                    tabIndex={index}
                  >
                    <div
                      className="content"
                      style={{
                        backgroundImage:
                          (Release.poster)
                            ? `url(/img_cdn/${Release.poster})`
                            : 'url(/img/thumbnail_placeholder.png)',
                      }}
                    >
                      <div className="text">
                        <p>
                          {`
                          ${DateTimeToTime(Release.started_airing)}
                           - ${
                            formatMessage({
                              id: 'cactus.episode',
                              defaultMessage: 'EPISODE',
                            })
                            } ${Release.EpisodeCount + 1}
                          `}
                          {/* {`${Release.EpisodeCount} episodes released`} */}
                        </p>
                        <h1>
                          <div className="limit">
                            {Release.title}
                          </div>
                        </h1>
                      </div>
                      <div className="overlay" />
                    </div>
                  </div>
                ))}

              </div>
            </div>
          );
        })}
      </ClientRender>
    </div>

  );
};

export default withRouter(
  injectIntl(ScheduleList)
);
