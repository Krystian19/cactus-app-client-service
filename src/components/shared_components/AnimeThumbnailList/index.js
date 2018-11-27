import React from 'react';
import {
  Link,
} from 'react-router-dom';

import RandomTextEmoji from '../RandomTextEmoji';

// ({ Categories }) => (
const AnimeThumbnailList = (props) => {
  const { props: { seasons } } = props;

  console.log(seasons);

  // If no seasons were received
  if (!seasons || seasons.length === 0) {
    return (
      <div className="anime-thumbnail-list no-grid">
        <div className="nothing-found">
          <h1 className="text-emoji">
            {RandomTextEmoji()}
          </h1>
          <h2 className="nothing-found-title">
            Nothing found
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="anime-thumbnail-list">
      {seasons.map(season => (
        <div
          key={season.id}
          className="anime-thumbnail"
        >
          <Link to={`/anime/info/${season.Anime.id}`}>
            <div className="cover">
              <span className="score">
                4.5/5
                <i className="fas fa-star" />
              </span>
              <img
                src={`/img_cdn/${season.poster}`}
                alt="thumbnail"
                className="anime-thumbnail"
              />
              <div className="overlay hover_hidden darken">
                <svg className="play" viewBox="0 0 24 24">
                  <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                </svg>
              </div>
            </div>
          </Link>
          <div className="info">
            <div className="title">
              {season.title}
            </div>
            <div className="year">
              {`2018 - ${season.episodeCount} episodes`}
            </div>
          </div>
        </div>
      ))}

    </div>
  );
};

export default AnimeThumbnailList;


// {/* Start of row */ }
// <div className="anime-thumbnail">
//   <Link to="/anime/info/1">
//     <div className="cover">
//       <span className="score">
//         4.5/5
//       <i className="fas fa-star" />
//       </span>
//       <img src="https://cdn.masterani.me/poster/1/226mhyBWAID.jpg" alt="thumbnail" className="anime-thumbnail" />
//       <div className="overlay hover_hidden darken">
//         <svg className="play" viewBox="0 0 24 24">
//           <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
//         </svg>
//       </div>
//     </div>
//   </Link>
//   <div className="info">
//     <div className="title">
//       Full Metal Cook
//   </div>
//     <div className="year">
//       2018 - 12 episodes
//   </div>
//   </div>
// </div>
//   <div className="anime-thumbnail">
//     <div className="cover">
//       <span className="score">
//         4.5/5
//     <i className="fas fa-star" />
//       </span>
//       <img src="https://cdn.masterani.me/poster/1/2166F0mUh7qP.jpg" alt="thumbnail" className="anime-thumbnail" />
//       <div className="overlay hover_hidden darken">
//         <svg className="play" viewBox="0 0 24 24">
//           <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
//         </svg>
//       </div>
//     </div>
//     <div className="info">
//       <div className="title">
//         Full Metal Cook
//   </div>
//       <div className="year">
//         2018 - 12 episodes
//   </div>
//     </div>
//   </div>
//   <div className="anime-thumbnail">
//     <div className="cover">
//       <span className="score">
//         4.5/5
//     <i className="fas fa-star" />
//       </span>
//       <img src="https://cdn.masterani.me/poster/1/536fXSTSZN.jpg" alt="thumbnail" className="anime-thumbnail" />
//       <div className="overlay hover_hidden darken">
//         <svg className="play" viewBox="0 0 24 24">
//           <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
//         </svg>
//       </div>
//     </div>
//     <div className="info">
//       <div className="title">
//         Full Metal Cook
//   </div>
//       <div className="year">
//         2018 - 12 episodes
//   </div>
//     </div>
//   </div>
//   <div className="anime-thumbnail">
//     <div className="cover">
//       <span className="score">
//         4.5/5
//     <i className="fas fa-star" />
//       </span>
//       <img src="https://cdn.masterani.me/poster/1/1893neuYUyo0.jpg" alt="thumbnail" className="anime-thumbnail" />
//       <div className="overlay hover_hidden darken">
//         <svg className="play" viewBox="0 0 24 24">
//           <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
//         </svg>
//       </div>
//     </div>
//     <div className="info">
//       <div className="title">
//         Full Metal Cook
//   </div>
//       <div className="year">
//         2018 - 12 episodes
//   </div>
//     </div>
//   </div>
//   <div className="anime-thumbnail">
//     <div className="cover">
//       <span className="score">
//         4.5/5
//     <i className="fas fa-star" />
//       </span>
//       <img src="https://cdn.masterani.me/poster/1/231a16Y7xZO.jpg" alt="thumbnail" className="anime-thumbnail" />
//       <div className="overlay hover_hidden darken">
//         <svg className="play" viewBox="0 0 24 24">
//           <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
//         </svg>
//       </div>
//     </div>
//     <div className="info">
//       <div className="title">
//         Full Metal Cook
//   </div>
//       <div className="year">
//         2018 - 12 episodes
//   </div>
//     </div>
//   </div>
//   <div className="anime-thumbnail">
//     <div className="cover">
//       <span className="score">
//         4.5/5
//     <i className="fas fa-star" />
//       </span>
//       <img src="https://cdn.masterani.me/poster/1/1118kLTQZVZ8.jpg" alt="thumbnail" className="anime-thumbnail" />
//       <div className="overlay hover_hidden darken">
//         <svg className="play" viewBox="0 0 24 24">
//           <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
//         </svg>
//       </div>
//     </div>
//     <div className="info">
//       <div className="title">
//         Full Metal Cook
//   </div>
//       <div className="year">
//         2018 - 12 episodes
//   </div>
//     </div>
//   </div>
//   <div className="anime-thumbnail">
//     <div className="cover">
//       <span className="score">
//         4.5/5
//     <i className="fas fa-star" />
//       </span>
//       <img src="https://cdn.masterani.me/poster/1/1970mlVFIm5y.jpg" alt="thumbnail" className="anime-thumbnail" />
//       <div className="overlay hover_hidden darken">
//         <svg className="play" viewBox="0 0 24 24">
//           <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
//         </svg>
//       </div>
//     </div>
//     <div className="info">
//       <div className="title">
//         Full Metal Cook
//   </div>
//       <div className="year">
//         2018 - 12 episodes
//   </div>
//     </div>
//   </div>
// {/* End of row */ }

// {/* Start of row */ }
// <div className="anime-thumbnail">
//   <div className="cover">
//     <span className="score">
//       4.5/5
//     <i className="fas fa-star" />
//     </span>
//     <img src="https://cdn.masterani.me/poster/1/1896LHUJBbu3.jpg" alt="thumbnail" className="anime-thumbnail" />
//     <div className="overlay hover_hidden darken">
//       <svg className="play" viewBox="0 0 24 24">
//         <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
//       </svg>
//     </div>
//   </div>
//   <div className="info">
//     <div className="title">
//       Full Metal Cook
//   </div>
//     <div className="year">
//       2018 - 12 episodes
//   </div>
//   </div>
// </div>
//   <div className="anime-thumbnail">
//     <div className="cover">
//       <span className="score">
//         4.5/5
//     <i className="fas fa-star" />
//       </span>
//       <img src="https://cdn.masterani.me/poster/1/1971coXfbS9V.jpg" alt="thumbnail" className="anime-thumbnail" />
//       <div className="overlay hover_hidden darken">
//         <svg className="play" viewBox="0 0 24 24">
//           <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
//         </svg>
//       </div>
//     </div>
//     <div className="info">
//       <div className="title">
//         Full Metal Cook
//   </div>
//       <div className="year">
//         2018 - 12 episodes
//   </div>
//     </div>
//   </div>
//   <div className="anime-thumbnail">
//     <div className="cover">
//       <span className="score">
//         4.5/5
//     <i className="fas fa-star" />
//       </span>
//       <img src="https://cdn.masterani.me/poster/1/2396mIR2fbzo.jpg" alt="thumbnail" className="anime-thumbnail" />
//       <div className="overlay hover_hidden darken">
//         <svg className="play" viewBox="0 0 24 24">
//           <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
//         </svg>
//       </div>
//     </div>
//     <div className="info">
//       <div className="title">
//         Full Metal Cook
//   </div>
//       <div className="year">
//         2018 - 12 episodes
//   </div>
//     </div>
//   </div>
//   <div className="anime-thumbnail">
//     <div className="cover">
//       <span className="score">
//         4.5/5
//     <i className="fas fa-star" />
//       </span>
//       <img src="https://cdn.masterani.me/poster/1/1176xOD4MBw6.jpg" alt="thumbnail" className="anime-thumbnail" />
//       <div className="overlay hover_hidden darken">
//         <svg className="play" viewBox="0 0 24 24">
//           <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
//         </svg>
//       </div>
//     </div>
//     <div className="info">
//       <div className="title">
//         Full Metal Cook
//   </div>
//       <div className="year">
//         2018 - 12 episodes
//   </div>
//     </div>
//   </div>
//   <div className="anime-thumbnail">
//     <div className="cover">
//       <span className="score">
//         4.5/5
//     <i className="fas fa-star" />
//       </span>
//       <img src="https://cdn.masterani.me/poster/1/2594IALpvH9S.jpg" alt="thumbnail" className="anime-thumbnail" />
//       <div className="overlay hover_hidden darken">
//         <svg className="play" viewBox="0 0 24 24">
//           <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
//         </svg>
//       </div>
//     </div>
//     <div className="info">
//       <div className="title">
//         Full Metal Cook
//   </div>
//       <div className="year">
//         2018 - 12 episodes
//   </div>
//     </div>
//   </div>
//   <div className="anime-thumbnail">
//     <div className="cover">
//       <span className="score">
//         4.5/5
//     <i className="fas fa-star" />
//       </span>
//       <img src="https://cdn.masterani.me/poster/1/1087I6PLcCMq.jpg" alt="thumbnail" className="anime-thumbnail" />
//       <div className="overlay hover_hidden darken">
//         <svg className="play" viewBox="0 0 24 24">
//           <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
//         </svg>
//       </div>
//     </div>
//     <div className="info">
//       <div className="title">
//         Full Metal Cook
//   </div>
//       <div className="year">
//         2018 - 12 episodes
//   </div>
//     </div>
//   </div>
//   <div className="anime-thumbnail">
//     <div className="cover">
//       <span className="score">
//         4.5/5
//     <i className="fas fa-star" />
//       </span>
//       <img src="https://cdn.masterani.me/poster/1/603ankzpVLh.jpg" alt="thumbnail" className="anime-thumbnail" />
//       <div className="overlay hover_hidden darken">
//         <svg className="play" viewBox="0 0 24 24">
//           <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
//         </svg>
//       </div>
//     </div>
//     <div className="info">
//       <div className="title">
//         Full Metal Cook
//   </div>
//       <div className="year">
//         2018 - 12 episodes
//   </div>
//     </div>
//   </div>
// {/* End of row */ }

// {/* Start of row */ }
// <div className="anime-thumbnail">
//   <div className="cover">
//     <span className="score">
//       4.5/5
//     <i className="fas fa-star" />
//     </span>
//     <img src="https://cdn.masterani.me/poster/1/238rTzr4UUq.jpg" alt="thumbnail" className="anime-thumbnail" />
//     <div className="overlay hover_hidden darken">
//       <svg className="play" viewBox="0 0 24 24">
//         <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
//       </svg>
//     </div>
//   </div>
//   <div className="info">
//     <div className="title">
//       Full Metal Cook
//   </div>
//     <div className="year">
//       2018 - 12 episodes
//   </div>
//   </div>
// </div>
//   <div className="anime-thumbnail">
//     <div className="cover">
//       <span className="score">
//         4.5/5
//     <i className="fas fa-star" />
//       </span>
//       <img src="https://cdn.masterani.me/poster/1/2908LRe4ZCEZ.jpg" alt="thumbnail" className="anime-thumbnail" />
//       <div className="overlay hover_hidden darken">
//         <svg className="play" viewBox="0 0 24 24">
//           <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
//         </svg>
//       </div>
//     </div>
//     <div className="info">
//       <div className="title">
//         Full Metal Cook
//   </div>
//       <div className="year">
//         2018 - 12 episodes
//   </div>
//     </div>
//   </div>
//   <div className="anime-thumbnail">
//     <div className="cover">
//       <span className="score">
//         4.5/5
//     <i className="fas fa-star" />
//       </span>
//       <img src="https://cdn.masterani.me/poster/1/2503naKKOd2o.jpg" alt="thumbnail" className="anime-thumbnail" />
//       <div className="overlay hover_hidden darken">
//         <svg className="play" viewBox="0 0 24 24">
//           <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
//         </svg>
//       </div>
//     </div>
//     <div className="info">
//       <div className="title">
//         Full Metal Cook
//   </div>
//       <div className="year">
//         2018 - 12 episodes
//   </div>
//     </div>
//   </div>
//   <div className="anime-thumbnail">
//     <div className="cover">
//       <span className="score">
//         4.5/5
//     <i className="fas fa-star" />
//       </span>
//       <img src="https://cdn.masterani.me/poster/1/646ILh0X4F.jpg" alt="thumbnail" className="anime-thumbnail" />
//       <div className="overlay hover_hidden darken">
//         <svg className="play" viewBox="0 0 24 24">
//           <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
//         </svg>
//       </div>
//     </div>
//     <div className="info">
//       <div className="title">
//         Full Metal Cook
//   </div>
//       <div className="year">
//         2018 - 12 episodes
//   </div>
//     </div>
//   </div>
//   <div className="anime-thumbnail">
//     <div className="cover">
//       <span className="score">
//         4.5/5
//     <i className="fas fa-star" />
//       </span>
//       <img src="https://cdn.masterani.me/poster/1/28190ohUZIyh.jpg" alt="thumbnail" className="anime-thumbnail" />
//       <div className="overlay hover_hidden darken">
//         <svg className="play" viewBox="0 0 24 24">
//           <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
//         </svg>
//       </div>
//     </div>
//     <div className="info">
//       <div className="title">
//         Full Metal Cook
//   </div>
//       <div className="year">
//         2018 - 12 episodes
//   </div>
//     </div>
//   </div>
//   <div className="anime-thumbnail">
//     <div className="cover">
//       <span className="score">
//         4.5/5
//     <i className="fas fa-star" />
//       </span>
//       <img src="https://cdn.masterani.me/poster/1/2521XS4jzejz.jpg" alt="thumbnail" className="anime-thumbnail" />
//       <div className="overlay hover_hidden darken">
//         <svg className="play" viewBox="0 0 24 24">
//           <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
//         </svg>
//       </div>
//     </div>
//     <div className="info">
//       <div className="title">
//         Full Metal Cook
//   </div>
//       <div className="year">
//         2018 - 12 episodes
//   </div>
//     </div>
//   </div>
//   <div className="anime-thumbnail">
//     <div className="cover">
//       <span className="score">
//         4.5/5
//     <i className="fas fa-star" />
//       </span>
//       <img src="https://cdn.masterani.me/poster/1/1268PJ1TcAgk.jpg" alt="thumbnail" className="anime-thumbnail" />
//       <div className="overlay hover_hidden darken">
//         <svg className="play" viewBox="0 0 24 24">
//           <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
//         </svg>
//       </div>
//     </div>
//     <div className="info">
//       <div className="title">
//         Full Metal Cook
//   </div>
//       <div className="year">
//         2018 - 12 episodes
//   </div>
//     </div>
//   </div>
// {/* End of row */ }
