import React from 'react';
import { RouteComponentProps } from "react-router";
import {
  Link,
  withRouter,
} from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import LazyImage from '../LazyImage';
import Episode from '../../@types/Episode';

type PropType = RouteComponentProps<{}> & {
  episodes: Array<Episode>,
  title: String,
  viewAllLink?: String,
};

class VideoBlock extends React.Component<PropType> {
  render() {
    const {
      episodes,
      title,
      viewAllLink,
      history,
    } = this.props;

    return (
      <div className="video-block">
        <div className="video-block-title">
          <div className="video-block-title-head">
            <span>{title}</span>
          </div>
          {viewAllLink && (
            <Link to={String(viewAllLink)} className="button">
              <FormattedMessage
                id="cactus.view_all"
                defaultMessage={'View all'}
              />
            </Link>
          )}
        </div>
        <div className="video-block-content">
          <div className="anime-small-thumbnail-list">
            {episodes.map((episode, index) => (
              <div
                key={Number(episode.id)}
                className="anime-small-thumbnail"
                onClick={() => history.push(`/anime/video/${episode.id}`)}
                onKeyPress={() => history.push(`/anime/video/${episode.id}`)}
                role="menuitem"
                tabIndex={index}
              >
                <div className="cover shimmer-load">
                  <LazyImage
                    src={`/img_cdn/${episode.Release.background}`}
                    errorSrc="/img/thumbnail_placeholder.png"
                    alt="thumbnail"
                    className="anime-small-thumbnail fade-in"
                    noLoadingPlaceholder={true}
                  />
                  <div className="overlay hover_hidden darken">
                    <svg className="play" viewBox="0 0 24 24">
                      <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                    </svg>
                  </div>
                </div>
                <div className="info">
                  <div className="title">
                    <div className="title-container">
                      {`${
                        episode.Release.title
                        } (Season ${
                        episode.Release.releaseOrder
                        })`}
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
export default withRouter(VideoBlock);