import React from 'react';
import {
  Link,
} from 'react-router-dom';

// ({ Categories }) => (
const AnimeThumbnailList = (props) => {
  const { props: { animes } } = props;

  return (
    <div className="anime-thumbnail-list">

      {animes.map(anime => (
        <div
          key={anime.id}
          className="anime-thumbnail"
        >
          <Link to={`/anime/info/${anime.id}`}>
            <div className="cover">
              <span className="score">
                4.5/5
                <i className="fas fa-star" />
              </span>
              <img
                src={`/img_cdn/${anime.poster}`}
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
              {anime.title}
            </div>
            <div className="year">
              2018 -
              {anime.Episodes.length}
              episodes
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