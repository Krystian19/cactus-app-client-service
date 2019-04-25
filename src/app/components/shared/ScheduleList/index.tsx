import React from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

import ClientRender from '../ClientRenderer';
import JSTToLocalTime from '../../../utils/JSTtoLocalTime';
import getDayOfTheWeek from '../../../utils/getDayOfTheWeek';
import DateTimeToTime from '../../../utils/DateTimeToTime';

/**
* @author Jan Guzman <janfrancisco19@gmail.com>
* @desc Reorders an Array of days in ASC order
* depending of the current client's timezone
* @arg WeekDays Array [ { order: String, dayName: String, seasons: Array } ]
* @arg today Integer Literal Represent day of the week 1 to 7
* @returns Array of Day Objects organized by their order attribute
*/
const reorderWeekDays = (WeekDays, today = getDayOfTheWeek()) => {
  // Set array WeekDay array as unmutable (avoids global mutability problem)
  const WeekDaysList = WeekDays.map(day => day);
  // Orders WeekDays by ascending order with the 'order' field
  const parsedWeekDays = WeekDaysList.sort((a, b) => (a.order < b.order));

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
* @arg Seasons Array of Season Objects
* @returns WeekDays Array [ { order: String, dayName: String, seasons: Array } ]
*/
const groupSeasonsByWeekDays = (Seasons) => {
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
    const ParsedSeason = Season;

    // Translate Original airingTime in JST to the local TimeZone
    ParsedSeason.startedAiring = JSTToLocalTime(ParsedSeason.startedAiring);

    // Get what day of the week this Season started Airing
    const dayOfWeekInt = moment(ParsedSeason.startedAiring).isoWeekday();

    // Avoid Seasons with no episodes
    if (!ParsedSeason.LatestEpisode) return null;

    return WeekDays[dayOfWeekInt.toString()].push(ParsedSeason);
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
};

const ScheduleList = (props) => {
  const { props: { WeekDays }, history } = props;
  const parsedWeekDays = groupSeasonsByWeekDays(WeekDays);
  return (
    <div className="anime-schedule-list">

      <ClientRender>
        {/* {WeekDays.map((Day) => { */}
        {reorderWeekDays(parsedWeekDays).map((Day) => {
          // If nothing is airing this day, don't show this tab
          if (!Day.seasons.length) return null;
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

                    return DayName;
                  })()}
                </h3>
                <span className="split" />
              </div>
              <div className="anime-schedule-poster-list">

                {Day.seasons.map((Season, index) => (
                  <div
                    className="anime-schedule-poster"
                    key={Season.id}
                    onClick={
                      () => history.push(
                        `/anime/detail/${Season.id}`,
                      )}
                    onKeyPress={
                      () => history.push(
                        `/anime/detail/${Season.id}`,
                      )}
                    role="menuitem"
                    tabIndex={index}
                  >
                    <div
                      className="content"
                      style={{
                        backgroundImage:
                          (Season.poster)
                            ? `url(/img_cdn/${Season.poster})`
                            : 'url(/img/thumbnail_placeholder.png)',
                      }}
                    >
                      <div className="text">
                        <p>
                          {`
                          ${DateTimeToTime(Season.startedAiring)}
                           - EPISODE ${Season.EpisodeCount + 1}
                          `}
                          {/* {`${Season.EpisodeCount} episodes released`} */}
                        </p>
                        <h1>
                          <div className="limit">
                            {Season.title}
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

export default withRouter(ScheduleList);
