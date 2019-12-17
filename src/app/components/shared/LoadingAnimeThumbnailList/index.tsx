import React from 'react';
import range from 'lodash/range';

type PropType = {
  count: number,
};

const LoadingAnimeThumbnailList = (props: PropType) => {
  const { count } = props;

  return (
    <div className="anime-thumbnail-list">
      {range(0, count).map(num => (
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
};

export default LoadingAnimeThumbnailList;
