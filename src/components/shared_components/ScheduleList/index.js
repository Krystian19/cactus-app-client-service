import React from 'react';
import moment from 'moment';

import ClientRender from '../ClientRenderer';

/**
* @author Jan Guzman <janfrancisco19@gmail.com>
* @desc Returns the current day of the week as an integer
* @returns Integer Day of the week. E.g: 1 for monday, 7 for sunday, etc ...
*/
const getDayOfTheWeek = () => moment().isoWeekday();

const ScheduleList = (props) => {
  const { props: { WeekDays, history } } = props;
  return (
    <div className="anime-schedule-list">

      {WeekDays.map((Day) => {
        // If nothing is airing this day, don't show this tab
        if (!Day.airingSeasons.length) return null;

        return (
          <div className="anime-schedule-day" key={Day.id}>
            <div className="date">
              <h3 className="day">
                <ClientRender>
                  {(() => {
                    let DayName = '';

                    // If this day corresponds to today's day of the week
                    if (Day.id === getDayOfTheWeek()) {
                      DayName = 'Today';
                    } else if (
                      // If this day corresponds to the day of tomorrow
                      (Day.id === (getDayOfTheWeek() + 1))

                      // If today is Sunday then monday should be marked as tomorrow
                      || ((getDayOfTheWeek() === 7) && Day.id === 1)) {
                      DayName = 'Tomorrow';
                    } else {
                      // Else, just return today's name
                      DayName = Day.name;
                    }

                    return DayName;
                  })()}
                </ClientRender>
              </h3>
              <span className="split" />
            </div>
            <div className="anime-schedule-poster-list">

              {Day.airingSeasons.map((Season, index) => (
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
                    className="content fade-in"
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
