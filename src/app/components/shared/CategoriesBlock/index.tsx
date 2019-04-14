import React from 'react';
import { RouteComponentProps } from "react-router";
import {
  Link,
  withRouter,
} from 'react-router-dom';

import LazyImage from '../LazyImage';
import PaginationBox from '../../shared/PaginationBox';

import Genre from '../../@types/Genre';

type PropType = RouteComponentProps<{}> & {
  categories: Array<Genre>,
  title: String,
  viewAllLink?: String,
}

type StateType = {
  currentPage: Number,
}

// How many records should be shown per page.
const pageCount = 8;

class CategoriesBlock extends React.Component<PropType, StateType> {
  constructor(props) {
    super(props);

    this.state = {
      // Pagination state values
      currentPage: 0,
    }
  }

  PageForward = () => {
    const { currentPage } = this.state;
    this.setState({ currentPage: (Number(currentPage) + 1) });
  }

  PageBackwards = () => {
    const { currentPage } = this.state;

    // Can't go backwards if page is already 0
    if (currentPage === 0) return;

    this.setState({ currentPage: (Number(currentPage) - 1) });
  }

  setCurrentPage = (page) => {
    // If arg is null then ignore it
    if ((page === null) || (page === undefined)) return;

    this.setState({ currentPage: page });
  }

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
                    errorSrc="/img/category_placeholder.png"
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
