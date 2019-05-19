import React from 'react';
import range from 'lodash/range';

type PropType = {
  count: number,
}

export default class LoadingAnimeThumbnailList extends React.Component<PropType> {
  render() {
    const { count } = this.props;

    return (
      <div className="anime-thumbnail-list">
        {range(1, count).map(num => (
          <div
            key={Number(num)}
            className="anime-thumbnail"
          >
            <div className="cover shimmer-load">
              <span className="score">
                &#8203;
              </span>
            </div>
            <div className="info shimmer-load" />
          </div>
        ))}
      </div>
    );
  }
}
