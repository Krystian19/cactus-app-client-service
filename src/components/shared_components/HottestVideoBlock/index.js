import React, { Component } from 'react';
import {
  Link,
} from 'react-router-dom';
import LazyImage from '../LazyImage';

export default class HottestVideoBlock extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    const {
      props: {
        episodes,
        title,
        history,
        viewAllLink,
      },
    } = this.props;

    return (
      <div className="video-block">
        <div className="video-block-title">
          <div className="video-block-title-head">
            <span>{title}</span>
          </div>
          {viewAllLink && (
            // <div className="video-block-title-options">
            //   <a href={viewAllLink} className="button">View all</a>
            // </div>
            <Link to={viewAllLink} className="button" tabIndex="-1">
              View all
            </Link>
          )}
        </div>
        <div className="video-block-content">
          <div className="anime-small-thumbnail-list">
            {episodes.map((episode, index) => (
              <div
                key={episode.id}
                className={`anime-small-thumbnail ${(index === 0) ? 'big' : 'small'}`}
                onClick={() => history.push(`/anime/video/${episode.id}`)}
                onKeyPress={() => history.push(`/anime/video/${episode.id}`)}
                role="menuitem"
                tabIndex={index}
              >
                <div className="cover">
                  <LazyImage
                    src={`/img_cdn/${episode.Season.background}`}
                    errorSrc="/img_cdn/test.jpg"
                    alt="thumbnail"
                    className="anime-small-thumbnail fade-in"
                  />
                  {/* <img
                    src={`/img_cdn/${episode.Season.background}`}
                    alt="thumbnail"
                    className="anime-small-thumbnail"
                  /> */}
                  <div
                    className="overlay hover_hidden darken"
                  >
                    <svg className="play" viewBox="0 0 24 24">
                      <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                    </svg>
                  </div>
                </div>
                <div className="info">
                  <div className="title">
                    <div
                      className="title-container"
                    >
                      {`${episode.Season.title} (Season ${episode.Season.seasonOrder})`}
                    </div>
                    <div className="detail-container">
                      {`Ep. ${episode.episodeOrder}`}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

// ({ Episodes }) => (
// const HottestVideoBlock = (props) => {
//   const {
//     props: {
//       episodes,
//       title,
//       history,
//       viewAllLink,
//     },
//   } = props;

//   return (
//     <div className="video-block">
//       <div className="video-block-title">
//         <div className="video-block-title-head">
//           <span>{title}</span>
//         </div>
//         {viewAllLink && (
//           // <div className="video-block-title-options">
//           //   <a href={viewAllLink} className="button">View all</a>
//           // </div>
//           <Link to={viewAllLink} className="button" tabIndex="-1">
//             View all
//           </Link>
//         )}
//       </div>
//       <div className="video-block-content">
//         <div className="anime-small-thumbnail-list">
//           {episodes.map((episode, index) => (
//             <div
//               key={episode.id}
//               className={`anime-small-thumbnail ${(index === 0) ? 'big' : 'small'}`}
//               onClick={() => history.push(`/anime/video/${episode.id}`)}
//               onKeyPress={() => history.push(`/anime/video/${episode.id}`)}
//               role="menuitem"
//               tabIndex={index}
//             >
//               <div className="cover">
//                 <LazyImage
//                   src={`/img_cdn/${episode.Season.background}`}
//                   errorSrc="/img_cdn/test.jpg"
//                   alt="thumbnail"
//                   className="anime-small-thumbnail fade-in"
//                 />
//                 {/* <img
//                   src={`/img_cdn/${episode.Season.background}`}
//                   alt="thumbnail"
//                   className="anime-small-thumbnail"
//                 /> */}
//                 <div
//                   className="overlay hover_hidden darken"
//                 >
//                   <svg className="play" viewBox="0 0 24 24">
//                     <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
//                   </svg>
//                 </div>
//               </div>
//               <div className="info">
//                 <div className="title">
//                   <div
//                     className="title-container"
//                   >
//                     {`${episode.Season.title} (Season ${episode.Season.seasonOrder})`}
//                   </div>
//                   <div className="detail-container">
//                     {`Ep. ${episode.episodeOrder}`}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HottestVideoBlock;

// 🔥 right now

// <div className="anime-small-thumbnail big">
// <div className="cover">
//   <img src="https://cdn.masterani.me/wallpaper/0/28163fr0Ltd5.jpg" alt="thumbnail" className="anime-small-thumbnail" />
//   <div className="overlay hover_hidden darken">
//     <svg className="play" viewBox="0 0 24 24">
//       <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
//     </svg>
//   </div>
// </div>
// <div className="info">
//   <div className="title">
//     <div className="title-container"> Boku No hero Academia 3rd season </div>
//     <div className="detail-container"> Ep. 16 </div>
//   </div>
// </div>
// </div>
// <div className="anime-small-thumbnail small">
// <div className="cover">
//   <img src="https://cdn.masterani.me/wallpaper/0/64i2RVIJeV.jpg" alt="thumbnail" className="anime-small-thumbnail" />
//   <div className="overlay hover_hidden darken">
//     <svg className="play" viewBox="0 0 24 24">
//       <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
//     </svg>
//   </div>
// </div>
// <div className="info">
//   <div className="title">
//     <div className="title-container"> One Piece </div>
//     <div className="detail-container"> Ep. 266 </div>
//   </div>
// </div>
// </div>
// <div className="anime-small-thumbnail small">
// <div className="cover">
//   <img src="https://cdn.masterani.me/wallpaper/0/2909rbi6tQo0.jpg" alt="thumbnail" className="anime-small-thumbnail" />
//   <div className="overlay hover_hidden darken">
//     <svg className="play" viewBox="0 0 24 24">
//       <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
//     </svg>
//   </div>
// </div>
// <div className="info">
//   <div className="title">
//     <div className="title-container"> Overlord III </div>
//     <div className="detail-container"> Ep. 11 </div>
//   </div>
// </div>
// </div>
// <div className="anime-small-thumbnail small">
// <div className="cover">
//   <img src="https://cdn.masterani.me/wallpaper/0/1176b7Sk5J93.jpg" alt="thumbnail" className="anime-small-thumbnail" />
//   <div className="overlay hover_hidden darken">
//     <svg className="play" viewBox="0 0 24 24">
//       <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
//     </svg>
//   </div>
// </div>
// <div className="info">
//   <div className="title">
//     <div className="title-container"> Haikyuu!! Second Season </div>
//     <div className="detail-container"> Ep. 8 </div>
//   </div>
// </div>
// </div>
// <div className="anime-small-thumbnail small">
// <div className="cover">
//   <img src="https://cdn.masterani.me/wallpaper/0/226eH0orQ53.jpg" alt="thumbnail" className="anime-small-thumbnail" />
//   <div className="overlay hover_hidden darken">
//     <svg className="play" viewBox="0 0 24 24">
//       <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
//     </svg>
//   </div>
// </div>
// <div className="info">
//   <div className="title">
//     <div className="title-container"> Fullmetal Alchemist: Brotherhood </div>
//     <div className="detail-container"> Ep. 32 </div>
//   </div>
// </div>
// </div>
