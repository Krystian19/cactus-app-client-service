import React from 'react';
import { RouteComponentProps } from "react-router";
import {
  Link,
  withRouter,
} from 'react-router-dom';

import Episode from '../../@types/Episode';
import LazyImage from '../LazyImage';

type PropType = RouteComponentProps<{}> & {
  episodes: Array<Episode>,
  title: String,
  viewAllLink?: String,
}

class HottestVideoBlock extends React.Component<PropType> {
  render() {
    const {
      episodes,
      title,
      history,
      viewAllLink,
    } = this.props;

    return (
      <div className="video-block">
        <div className="video-block-title">
          <div className="video-block-title-head">
            <span>{title}</span>
          </div>
          {viewAllLink && (
            <Link to={String(viewAllLink)} className="button">
              View all
            </Link>
          )}
        </div>
        <div className="video-block-content">
          <div className="anime-small-thumbnail-list">
            {episodes.map((episode, index) => (
              <div
                key={Number(episode.id)}
                className={`anime-small-thumbnail ${(index === 0) ? 'big' : 'small'}`}
                onClick={() => history.push(`/anime/video/${Number(episode.id)}`)}
                onKeyPress={() => history.push(`/anime/video/${Number(episode.id)}`)}
                role="menuitem"
              >
                <div className="cover">
                  <LazyImage
                    src={`/img_cdn/${episode.Season.background}`}
                    errorSrc="/img/thumbnail_placeholder.png"
                    alt="thumbnail"
                    className="anime-small-thumbnail fade-in"
                  />
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

export default withRouter(HottestVideoBlock);
