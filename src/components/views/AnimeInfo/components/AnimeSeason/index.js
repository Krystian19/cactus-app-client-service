import React from 'react';
import {
  Link,
} from 'react-router-dom';

// ({ season }) => (
const AnimeSeason = (props) => {
  const { props: { season } } = props;

  return (
    <div className="anime-season">
      <span className="anime-season-title">
        {`${season.title} (Season ${season.seasonOrder})`}
      </span>
      <div className="anime-season-videos">
        <div className="anime-small-thumbnail-list">

          {
            season.Episodes.map(episode => (
              <div key={episode.id} className="anime-small-thumbnail">
                <Link to={`/anime/video/${episode.id}`}>
                  <div className="cover">
                    <img
                      src={`/img_cdn/${episode.thumbnail}`}
                      alt="thumbnail"
                      className="anime-small-thumbnail"
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
                    <div className="title-container">
                      {(episode.EpisodeTitles[0] && episode.EpisodeTitles[0].text) && (
                        episode.EpisodeTitles[0].text
                      )}
                    </div>
                    <div className="detail-container">
                      Ep.
                      {episode.episodeOrder}
                    </div>
                  </div>
                </div>
              </div>
            ))
          }

        </div>
      </div>
    </div>

  );
};

export default AnimeSeason;
