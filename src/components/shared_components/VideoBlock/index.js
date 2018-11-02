import React from 'react';

// ({ Episodes }) => (
const VideoBlock = (props) => {
  const { props: { episodes } } = props;

  return (
    <div className="video-block">
      <div className="video-block-title">
        <div className="video-block-title-head">
          <span>{title}</span>
        </div>
        <div className="video-block-title-options">
          <a href="http://www.google.com" className="button">View all</a>
        </div>
      </div>
      <div className="video-block-content">
        <div className="anime-small-thumbnail-list">
          {episodes.map(episode => (
            <div key={episode.id} className="anime-small-thumbnail">
              <div className="cover">
                <img src={episode.thumbnail} alt="thumbnail" className="anime-small-thumbnail" />
                <div className="overlay hover_hidden darken">
                  <svg className="play" viewBox="0 0 24 24">
                    <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                  </svg>
                </div>
              </div>
              <div className="info">
                <div className="title">
                  <div className="title-container">{`${episode.Season.title} (Season ${episode.Season.seasonOrder})`}</div>
                  <div className="detail-container">{`Ep. ${episode.episodeOrder}`}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// <div className="anime-small-thumbnail">
//           <div className="cover">
//             <img src="https://cdn.masterani.me/wallpaper/0/2808dEyIDBR6.jpg" alt="thumbnail" className="anime-small-thumbnail" />
//             <div className="overlay hover_hidden darken">
//               <svg className="play" viewBox="0 0 24 24">
//                 <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
//               </svg>
//             </div>
//           </div>
//           <div className="info">
//             <div className="title">
//               <div className="title-container"> No Game No Life: Zero lorem </div>
//               <div className="detail-container"> Ep. 1 </div>
//             </div>
//           </div>
//         </div>
//         <div className="anime-small-thumbnail">
//           <div className="cover">
//             <img src="https://cdn.masterani.me/wallpaper/0/28193ESeF49G.jpg" alt="thumbnail" className="anime-small-thumbnail" />
//             <div className="overlay hover_hidden darken">
//               <svg className="play" viewBox="0 0 24 24">
//                 <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
//               </svg>
//             </div>
//           </div>
//           <div className="info">
//             <div className="title">
//               <div className="title-container"> Shokugeki no Souma 3rd season </div>
//               <div className="detail-container"> Ep. 12 </div>
//             </div>
//           </div>
//         </div>
//         <div className="anime-small-thumbnail">
//           <div className="cover">
//             <img src="https://cdn.masterani.me/wallpaper/0/28174OVMKYWJ.jpg" alt="thumbnail" className="anime-small-thumbnail" />
//             <div className="overlay hover_hidden darken">
//               <svg className="play" viewBox="0 0 24 24">
//                 <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
//               </svg>
//             </div>
//           </div>
//           <div className="info">
//             <div className="title">
//               <div className="title-container"> Tokyo Ghoul 3rd season </div>
//               <div className="detail-container"> Ep. 11 </div>
//             </div>
//           </div>
//         </div>
//         <div className="anime-small-thumbnail">
//           <div className="cover">
//             <img src="https://cdn.masterani.me/wallpaper/0/2908UZUvpOMN.jpg" alt="thumbnail" className="anime-small-thumbnail" />
//             <div className="overlay hover_hidden darken">
//               <svg className="play" viewBox="0 0 24 24">
//                 <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
//               </svg>
//             </div>
//           </div>
//           <div className="info">
//             <div className="title">
//               <div className="title-container"> Shingeki no Kyojin Season 3 </div>
//               <div className="detail-container"> Ep. 10 </div>
//             </div>
//           </div>
//         </div>

//         <div className="anime-small-thumbnail">
//           <div className="cover">
//             <img src="https://cdn.masterani.me/wallpaper/0/1105x2klHygG.jpg" alt="thumbnail" className="anime-small-thumbnail" />
//             <div className="overlay hover_hidden darken">
//               <svg className="play" viewBox="0 0 24 24">
//                 <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
//               </svg>
//             </div>
//           </div>
//           <div className="info">
//             <div className="title">
//               <div className="title-container"> Fate/stay night 2nd Season </div>
//               <div className="detail-container"> Ep. 13 </div>
//             </div>
//           </div>
//         </div>
//         <div className="anime-small-thumbnail">
//           <div className="cover">
//             <img src="https://cdn.masterani.me/wallpaper/0/282mpLwPxe8.jpg" alt="thumbnail" className="anime-small-thumbnail" />
//             <div className="overlay hover_hidden darken">
//               <svg className="play" viewBox="0 0 24 24">
//                 <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
//               </svg>
//             </div>
//           </div>
//           <div className="info">
//             <div className="title">
//               <div className="title-container"> Black Lagoon: 2nd season </div>
//               <div className="detail-container"> Ep. 10 </div>
//             </div>
//           </div>
//         </div>
//         <div className="anime-small-thumbnail">
//           <div className="cover">
//             <img src="https://cdn.masterani.me/wallpaper/0/2823lknkr4jp.jpg" alt="thumbnail" className="anime-small-thumbnail" />
//             <div className="overlay hover_hidden darken">
//               <svg className="play" viewBox="0 0 24 24">
//                 <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
//               </svg>
//             </div>
//           </div>
//           <div className="info">
//             <div className="title">
//               <div className="title-container"> Wotaku ni Koi wa Muzukashii </div>
//               <div className="detail-container"> Ep. 4 </div>
//             </div>
//           </div>
//         </div>
//         <div className="anime-small-thumbnail">
//           <div className="cover">
//             <img src="https://cdn.masterani.me/wallpaper/0/445H9PlfsZS.jpg" alt="thumbnail" className="anime-small-thumbnail" />
//             <div className="overlay hover_hidden darken">
//               <svg className="play" viewBox="0 0 24 24">
//                 <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
//               </svg>
//             </div>
//           </div>
//           <div className="info">
//             <div className="title">
//               <div className="title-container"> Yahari Ore no Seishun lorem </div>
//               <div className="detail-container"> Ep. 5 </div>
//             </div>
//           </div>
//         </div>


export default VideoBlock;
