import React, { Component } from 'react';
import {
  Link,
} from 'react-router-dom';
import LazyImage from '../../../../shared_components/LazyImage';

export default class AnimeSeason extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    const { season } = this.props;
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
                      {/* <img
                      src={`/img_cdn/${episode.thumbnail}`}
                      alt="thumbnail"
                      className="anime-small-thumbnail"
                    /> */}
                      <LazyImage
                        src={`/img_cdn/${episode.thumbnail}`}
                        errorSrc="/img_cdn/test.jpg"
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
                        {(episode.EpisodeVersions[0]
                          && episode.EpisodeVersions[0].title)
                          && (
                            episode.EpisodeVersions[0].title
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
  }
}
