import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, withRouter } from 'react-router-dom';
import queryString from 'qs';
import { FormattedMessage } from 'react-intl';
import { GQLGenre } from '@cactus-app/types';

import LazyImage from '../LazyImage';
import base64Content from '../../../utils/base64Content';

type PropType = RouteComponentProps<{}> & {
  categories: Array<GQLGenre>;
  title: string;
  viewAllLink?: string;
};

const CategoriesBlock = (props: PropType): JSX.Element => {
  const {
    categories,
    title,
    viewAllLink,
    history
  } = props;

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

          {categories.map(category => (
            <div
              key={Number(category.id)}
              className="anime-small-thumbnail small category"
              onClick={
                (): void =>
                  history
                    .push(`/search?${queryString.stringify({ genre: [category] })}`)
              }
            >
              <div className="cover">
                <LazyImage
                  src={`/img_cdn/${category.thumbnail}`}
                  errorSrc={base64Content.cactus_category_placeholder}
                  alt="thumbnail"
                  className="anime-small-thumbnail fade-in"
                  customLoadingPlaceholderSrc={
                    base64Content.cactus_category_placeholder
                  }
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
