import React from 'react';
import range from 'lodash/range';

type PropType = {
  count: number
}

class LoadingHottestVideoBlock extends React.Component<PropType> {
  render() {
    const {
      count,
    } = this.props;

    return (
      <div className="video-block">
        <div className="video-block-title">
          <div className="video-block-title-head">
            <span>&#8203;</span>
          </div>
          <a href={'javascript:void(0)'} className="button shimmer-load">
            &#8203;
          </a>
        </div>
        <div className="video-block-content">
          <div className="anime-small-thumbnail-list">
            {range(0, count).map((num, index) => (
              <div
                key={Number(num)}
                className={`anime-small-thumbnail ${(index === 0) ? 'big' : 'small'}`}
                role="menuitem"
              >
                <div className="cover shimmer-load" />
                <div className="info shimmer-load">
                  <div className="title">
                    <div className="title-container" />
                    <div className="detail-container" />
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

export default LoadingHottestVideoBlock;
