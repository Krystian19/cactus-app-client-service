import React from 'react';
import moment from 'moment';

import ClientRender from '../ClientRenderer';
import JSTToLocalTime from '../../../utils/JSTtoLocalTime';
import getDayOfTheWeek from '../../../utils/getDayOfTheWeek';

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
  const { props: { WeekDays, history } } = props;
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
                      (Day.order === (getDayOfTheWeek() + 1).toString())

                      // If today is Sunday then monday should be marked as tomorrow
                      || ((getDayOfTheWeek() === '7') && Day.order === '1')) {
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
                        `/anime/video/${Season.LatestEpisode.id}`,
                      )}
                    onKeyPress={
                      () => history.push(
                        `/anime/video/${Season.LatestEpisode.id}`,
                      )}
                    role="menuitem"
                    tabIndex={index}
                  >
                    <div
                      className="content"
                      style={{ backgroundImage: `url(/img_cdn/${Season.poster})` }}
                    >
                      <div className="text">
                        <p>
                          {`Ep ${Season.LatestEpisode.episodeOrder} released`}
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

export default ScheduleList;


// <div className="anime-schedule-list">

//   <div className="anime-schedule-day">
//     <div className="date">
//       <h3 className="day">Today</h3>
//       <span className="split" />
//     </div>
//     <div className="anime-schedule-poster-list">

//       <div className="anime-schedule-poster">
//         <div className="content" style={{ backgroundImage: 'url(https://cdn.masterani.me/poster/1/300490uqcZCe.jpg)' }}>
//           <div className="text">
//             <p>Ep 3 released</p>
//             <h1>
//               <div className="limit">
//                 Tonari no Kyuuketsuki-san
//             </div>
//             </h1>
//           </div>
//           <div className="overlay" />
//         </div>
//       </div>

//       <div className="anime-schedule-poster">
//         <div className="content" style={{ backgroundImage: 'url(https://cdn.masterani.me/poster/1/2933VOQgImfE.jpg)' }}>
//           <div className="text">
//             <p>Ep 12 released</p>
//             <h1>
//               <div className="limit">
//                 Muhyo to Rouji no Mahouritsu Soudan Jimusho
//             </div>
//             </h1>
//           </div>
//           <div className="overlay" />
//         </div>
//       </div>

//       <div className="anime-schedule-poster">
//         <div className="content" style={{ backgroundImage: 'url(https://cdn.masterani.me/poster/1/2993V0c6ppPK.jpg)' }}>
//           <div className="text">
//             <p>Ep 3 released</p>
//             <h1>
//               <div className="limit">
//                 Yagate Kimi ni Naru
//             </div>
//             </h1>
//           </div>
//           <div className="overlay" />
//         </div>
//       </div>

//       <div className="anime-schedule-poster">
//         <div className="content" style={{ backgroundImage: 'url(https://cdn.masterani.me/poster/1/2990JjQKEnd0.jpg)' }}>
//           <div className="text">
//             <p>Ep 3 released</p>
//             <h1>
//               <div className="limit">
//                 Toaru Majutsu no Index III
//             </div>
//             </h1>
//           </div>
//           <div className="overlay" />
//         </div>
//       </div>


//       <div className="anime-schedule-poster">
//         <div className="content" style={{ backgroundImage: 'url(https://cdn.masterani.me/poster/1/3029Ol9WvG5R.jpg)' }}>
//           <div className="text">
//             <p>Ep 3 released</p>
//             <h1>
//               <div className="limit">
//                 Gurazeni: Season 2
//             </div>
//             </h1>
//           </div>
//           <div className="overlay" />
//         </div>
//       </div>

//       <div className="anime-schedule-poster">
//         <div className="content" style={{ backgroundImage: 'url(https://cdn.masterani.me/poster/1/30093EECBwSc.jpg)' }}>
//           <div className="text">
//             <p>Ep 3 released</p>
//             <h1>
//               <div className="limit">
//                 Hinomaruzumou
//             </div>
//             </h1>
//           </div>
//           <div className="overlay" />
//         </div>
//       </div>

//       <div className="anime-schedule-poster">
//         <div className="content" style={{ backgroundImage: 'url(https://cdn.masterani.me/poster/1/3005ggLoWr2l.jpg)' }}>
//           <div className="text">
//             <p>Ep 3 released</p>
//             <h1>
//               <div className="limit">
//                 Uchi no Maid ga Uzasugiru!
//             </div>
//             </h1>
//           </div>
//           <div className="overlay" />
//         </div>
//       </div>

//       <div className="anime-schedule-poster">
//         <div className="content" style={{ backgroundImage: 'url(https://cdn.masterani.me/poster/1/30087nFRangU.jpg)' }}>
//           <div className="text">
//             <p>Ep 3 released</p>
//             <h1>
//               <div className="limit">
//                 Dakaretai Otoko 1-i ni Odosarete Imasu.
//             </div>
//             </h1>
//           </div>
//           <div className="overlay" />
//         </div>
//       </div>

//       <div className="anime-schedule-poster">
//         <div className="content" style={{ backgroundImage: 'url(https://cdn.masterani.me/poster/1/30323vZ6uvdy.jpg)' }}>
//           <div className="text">
//             <p>Ep 3 released</p>
//             <h1>
//               <div className="limit">
//                 JoJo no Kimyou na Bouken: Ougon no Kaze
//             </div>
//             </h1>
//           </div>
//           <div className="overlay" />
//         </div>
//       </div>

//       <div className="anime-schedule-poster">
//         <div className="content" style={{ backgroundImage: 'url(https://cdn.masterani.me/poster/1/2992UNFlgtRb.jpg)' }}>
//           <div className="text">
//             <p>Ep 3 released</p>
//             <h1>
//               <div className="limit">
//                 Irozuku Sekai no Ashita kara
//             </div>
//             </h1>
//           </div>
//           <div className="overlay" />
//         </div>
//       </div>

//       <div className="anime-schedule-poster">
//         <div className="content" style={{ backgroundImage: 'url(https://cdn.masterani.me/poster/1/2994RkKiOls0.jpg)' }}>
//           <div className="text">
//             <p>Ep 3 released</p>
//             <h1>
//               <div className="limit">
//                 Kishuku Gakkou no Juliet
//             </div>
//             </h1>
//           </div>
//           <div className="overlay" />
//         </div>
//       </div>

//       <div className="anime-schedule-poster">
//         <div className="content" style={{ backgroundImage: 'url(https://cdn.masterani.me/poster/1/3013RWanjc3H.jpg)' }}>
//           <div className="text">
//             <p>9:15 PM - EP 3</p>
//             <h1>
//               <div className="limit">
//                 Gakuen Basara
//             </div>
//             </h1>
//           </div>
//           <div className="overlay" />
//         </div>
//       </div>

//     </div >
//   </div >

//   <div className="anime-schedule-day">
//     <div className="date">
//       <h3 className="day">Tomorrow</h3>
//       <span className="split" />
//     </div>
//     <div className="anime-schedule-poster-list">

//       <div className="anime-schedule-poster">
//         <div className="content" style={{ backgroundImage: 'url(https://cdn.masterani.me/poster/1/2848NYBI26Av.jpg)' }}>
//           <div className="text">
//             <p>¯\_(ツ)_/¯ - EP 28</p>
//             <h1>
//               <div className="limit">
//                 Layton Mystery Tanteisha: Katri no Nazotoki File
//             </div>
//             </h1>
//           </div>
//           <div className="overlay" />
//         </div>
//       </div>

//       <div className="anime-schedule-poster">
//         <div className="content" style={{ backgroundImage: 'url(https://cdn.masterani.me/poster/1/2996HysmAHVJ.jpg)' }}>
//           <div className="text">
//             <p>7:25 AM - EP 3</p>
//             <h1>
//               <div className="limit">
//                 Radiant
//             </div>
//             </h1>
//           </div>
//           <div className="overlay" />
//         </div>
//       </div>

//       <div className="anime-schedule-poster">
//         <div className="content" style={{ backgroundImage: 'url(https://cdn.masterani.me/poster/1/6733OFuWuww.jpg)' }}>
//           <div className="text">
//             <p>7:40 AM - EP 918</p>
//             <h1>
//               <div className="limit">
//                 Detective Conan
//             </div>
//             </h1>
//           </div>
//           <div className="overlay" />
//         </div>
//       </div>

//       <div className="anime-schedule-poster">
//         <div className="content" style={{ backgroundImage: 'url(https://cdn.masterani.me/poster/1/29709DPgP8XZ.jpg)' }}>
//           <div className="text">
//             <p>8:55 AM - EP 25</p>
//             <h1>
//               <div className="limit">
//                 Cardfight!! Vanguard (2018)
//             </div>
//             </h1>
//           </div>
//           <div className="overlay" />
//         </div>
//       </div>
//       <div className="anime-schedule-poster">
//         <div className="content" style={{ backgroundImage: 'url(https://cdn.masterani.me/poster/1/2986qycbgTDP.jpg)' }}>
//           <div className="text">
//             <p>12:45 PM - EP 3</p>
//             <h1>
//               <div className="limit">
//                 Sword Art Online: Alicization
//             </div>
//             </h1>
//           </div>
//           <div className="overlay" />
//         </div>
//       </div>

//       <div className="anime-schedule-poster">
//         <div className="content" style={{ backgroundImage: 'url(https://cdn.masterani.me/poster/1/2989pxn2dM8d.jpg)' }}>
//           <div className="text">
//             <p>12:45 PM - EP 3</p>
//             <h1>
//               <div className="limit">
//                 Goblin Slayer
//             </div>
//             </h1>
//           </div>
//           <div className="overlay" />
//         </div>
//       </div>

//       <div className="anime-schedule-poster">
//         <div className="content" style={{ backgroundImage: 'url(https://cdn.masterani.me/poster/1/3030b3eQiz09.jpg)' }}>
//           <div className="text">
//             <p>2:00 PM - EP 3</p>
//             <h1>
//               <div className="limit">
//                 SSSS.Gridman
//             </div>
//             </h1>
//           </div>
//           <div className="overlay" />
//         </div>
//       </div>

//       <div className="anime-schedule-poster">
//         <div className="content" style={{ backgroundImage: 'url(https://cdn.masterani.me/poster/1/3002hgv0JTOX.jpg)' }}>
//           <div className="text">
//             <p>3:55 PM - EP 3</p>
//             <h1>
//               <div className="limit">
//                 Release the Spyce
//             </div>
//             </h1>
//           </div>
//           <div className="overlay" />
//         </div>
//       </div>


//       {/* Start of row *å
// <div className="anime-schedule-poster">
//   <div className="content" style={{ backgroundImage: 'url(https://cdn.masterani.me/poster/1/2987v7gQ3ilV.jpg)' }}>
//     <div className="text">
//       <p>6:45 PM - EP 3</p>
//       <h1>
//         <div className="limit">
//           Fairy Tail: Final Series
//             </div>
//       </h1>
//     </div>
//     <div className="overlay" />
//   </div>
// </div>

//   <div className="anime-schedule-poster">
//     <div className="content" style={{ backgroundImage: 'url(https://cdn.masterani.me/poster/1/2855QfoFKY6C.jpg)' }}>
//       <div className="text">
//         <p>10:30 PM - EP 29</p>
//         <h1>
//           <div className="limit">
//             Gegege no Kitarou (2018)
//             </div>
//         </h1>
//       </div>
//       <div className="overlay" />
//     </div>
//   </div>

//   <div className="anime-schedule-poster">
//     <div className="content" style={{ backgroundImage: 'url(https://cdn.masterani.me/poster/1/646ILh0X4F.jpg)' }}>
//       <div className="text">
//         <p>10:45 PM - EP 858</p>
//         <h1>
//           <div className="limit">
//             One piece
//             </div>
//         </h1>
//       </div>
//       <div className="overlay" />
//     </div>
//   </div>


//     </div >
//   </div >

//   < div className="anime-schedule-day" >
//     <div className="date">
//       <h3 className="day">Sunday</h3>
//       <span className="split" />
//     </div>
//     <div className="anime-schedule-poster-list">

//       <div className="anime-schedule-poster">
//         <div className="content" style={{ backgroundImage: 'url(https://cdn.masterani.me/poster/1/2943cbj5DaEs.jpg)' }}>
//           <div className="text">
//             <p>¯\_(ツ)_/¯ - EP 16</p>
//             <h1>
//               <div className="limit">
//                 Ani ni Tsukeru Kusuri wa Nai! 2
//             </div>
//             </h1>
//           </div>
//           <div className="overlay" />
//         </div>
//       </div>

//       <div className="anime-schedule-poster">
//         <div className="content" style={{ backgroundImage: 'url(https://cdn.masterani.me/poster/1/2965YYcCQOkH.jpg)' }}>
//           <div className="text">
//             <p>¯\_(ツ)_/¯ - EP 18</p>
//             <h1>
//               <div className="limit">
//                 Baki
//             </div>
//             </h1>
//           </div>
//           <div className="overlay" />
//         </div>
//       </div>

//       <div className="anime-schedule-poster">
//         <div className="content" style={{ backgroundImage: 'url(https://cdn.masterani.me/poster/1/2983JxveZIVi.jpg)' }}>
//           <div className="text">
//             <p>8:45 AM - EP 4</p>
//             <h1>
//               <div className="limit">
//                 Akanesasu Shoujo
//             </div>
//             </h1>
//           </div>
//           <div className="overlay" />
//         </div>
//       </div>

//       <div className="anime-schedule-poster">
//         <div className="content" style={{ backgroundImage: 'url(https://cdn.masterani.me/poster/1/29841z1HFZMU.jpg)' }}>
//           <div className="text">
//             <p>11:45 AM - EP 4</p>
//             <h1>
//               <div className="limit">
//                 Tensei shitara Slime Datta Ken
//             </div>
//             </h1>
//           </div>
//           <div className="overlay" />
//         </div>
//       </div>


//       <div className="anime-schedule-poster">
//         <div className="content" style={{ backgroundImage: 'url(https://cdn.masterani.me/poster/1/2998HUF7HR4c.jpg)' }}>
//           <div className="text">
//             <p>12:45 PM - EP 3</p>
//             <h1>
//               <div className="limit">
//                 Golden Kamuy 2nd Season
//             </div>
//             </h1>
//           </div>
//           <div className="overlay" />
//         </div>
//       </div>

//       <div className="anime-schedule-poster">
//         <div className="content" style={{ backgroundImage: 'url(https://cdn.masterani.me/poster/1/3023P0QKNCCg.jpg)' }}>
//           <div className="text">
//             <p>1:05 PM - EP 4</p>
//             <h1>
//               <div className="limit">
//                 Uchuu Senkan Tiramisù II
//             </div>
//             </h1>
//           </div>
//           <div className="overlay" />
//         </div>
//       </div>

//       <div className="anime-schedule-poster">
//         <div className="content" style={{ backgroundImage: 'url(https://cdn.masterani.me/poster/1/2985vEKrcjax.jpg)' }}>
//           <div className="text">
//             <p>1:40 PM - EP 4</p>
//             <h1>
//               <div className="limit">
//                 Souten no Ken: Regenesis 2nd Season
//             </div>
//             </h1>
//           </div>
//           <div className="overlay" />
//         </div>
//       </div>

//       <div className="anime-schedule-poster">
//         <div className="content" style={{ backgroundImage: 'url(https://cdn.masterani.me/poster/1/30274LZZ4HgE.jpg)' }}>
//           <div className="text">
//             <p>3:10 PM - EP 4</p>
//             <h1>
//               <div className="limit">
//                 Ken En Ken: Aoki Kagayaki
//             </div>
//             </h1>
//           </div>
//           <div className="overlay" />
//         </div>
//       </div>

//     </div>
//   </div >

// </div >
