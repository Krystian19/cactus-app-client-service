import React from 'react';
import {
  Link,
} from 'react-router-dom';

import RandomTextEmoji from '../RandomTextEmoji';
import LazyImage from '../LazyImage';
import Season from '../../@types/Season';
import JSTtoLocalTime from '../../../utils/JSTtoLocalTime';
import YearExtractor from '../../../utils/YearExtractor';

type PropType = {
  seasons: Array<Season>,
}

export default class AnimeThumbnailList extends React.Component<PropType> {
  render() {
    const { seasons } = this.props;
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
            key={Number(season.id)}
            className="anime-thumbnail"
          >
            <Link to={`/anime/detail/${season.id}`}>
              <div className="cover">
                <span className="score">
                  4.5/5
                  <i className="fa fa-star" />
                </span>
                <LazyImage
                  src={`/img_cdn/${season.poster}`}
                  errorSrc="/img/thumbnail_placeholder.png"
                  alt="thumbnail"
                  className="anime-thumbnail fade-in"
                />
                <div className="overlay hover_hidden darken">
                  {/* <svg className="play" viewBox="0 0 24 24">
                    <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                  </svg> */}
                </div>
              </div>
            </Link>
            <div className="info">
              <div className="title">
                {season.title}
              </div>
              <div className="year">
                {`${
                  YearExtractor(
                    JSTtoLocalTime(season.startedAiring)
                  )
                  } - ${
                  season.EpisodeCount
                  } episodes`}
              </div>
            </div>
          </div>
        ))}

      </div>
    );
  }
}
