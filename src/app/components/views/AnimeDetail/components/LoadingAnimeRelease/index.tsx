import React from 'react';
import range from 'lodash/range';

type PropType = {
  count: number;
};

export default (props: PropType): JSX.Element => {
  const { count } = props;
  return (
    <div className="anime-season">
      <div className="anime-season-videos">
        <div className="anime-small-thumbnail-list">
          {
            range(0, count).map(num => (
              <div
                key={num}
                className="anime-small-thumbnail fade-in"
              >
                <div className="cover shimmer-load" />
                <div className="info shimmer-load" />
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};
