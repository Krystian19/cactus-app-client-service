import React from 'react';
import { RouteComponentProps } from "react-router";
import {
  Link,
  withRouter,
} from 'react-router-dom';

import LazyImage from '../LazyImage';
import Genre from '../../@types/Genre';

type PropType = RouteComponentProps<{}> & {
  categories: Array<Genre>,
  title: String,
  viewAllLink?: String,
}

class CategoriesBlock extends React.Component<PropType> {
  render() {
    const {
      categories,
      title,
      viewAllLink
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

            {categories.map(category => (
              <div
                key={Number(category.id)}
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
  }
}

export default withRouter(CategoriesBlock);
