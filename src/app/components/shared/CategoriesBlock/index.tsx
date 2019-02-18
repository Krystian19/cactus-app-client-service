import React from 'react';
import {
  Link,
  withRouter,
} from 'react-router-dom';
import LazyImage from '../LazyImage';

const CategoriesBlock = (props) => {
  const { props: { categories, title, viewAllLink } } = props;

  return (
    <div className="video-block">
      <div className="video-block-title">
        <div className="video-block-title-head">
          <span>{title}</span>
        </div>
        {viewAllLink && (
          <Link to={viewAllLink} className="button">
            View all
          </Link>
        )}
      </div>
      <div className="video-block-content">
        <div className="anime-small-thumbnail-list">

          {categories.map(category => (
            <div
              key={category.id}
              className="anime-small-thumbnail small category"
            >
              <div className="cover">
                <LazyImage
                  src={`/img_cdn/${category.thumbnail}`}
                  errorSrc="/img_cdn/test.jpg"
                  alt="thumbnail"
                  className="anime-small-thumbnail fade-in"
                  noLoadingSpinner
                />
                <div className="overlay">
                  <span className="category_title">{category.title}</span>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default withRouter(CategoriesBlock);
