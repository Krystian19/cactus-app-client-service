import React from 'react';
import ReactPlayer from 'react-player';

import base64Content from '../../../../../utils/base64Content';

export default (): JSX.Element => (
  <div className="main-content no-padding">
    <div className="anime-watch-episode">
      <div className="anime-watch-episode-container">
        <div className="anime-watch-episode-video shimmer-load">
          <div style={{ visibility: 'hidden' }}>
            <ReactPlayer
              src={base64Content.placeholder_video}
              width="100%"
              height="100%"
            />
          </div>
        </div>
        <div className="anime-watch-episode-description">
          <div className="left-side">
            <div className="cover shimmer-load">
              <img
                src={base64Content.cactus_poster_placeholder}
                alt="cover"
                style={{ visibility: 'hidden' }}
              />
            </div>
            <div className="info">
              <h1 className="shimmer-load">
                &#8203;
              </h1>
              <h2 className="shimmer-load">
                &#8203;
              </h2>
            </div>
          </div>
          <div className="right-side">
            <div className="controls" />
          </div>
        </div>
      </div>
    </div>
  </div>
);
