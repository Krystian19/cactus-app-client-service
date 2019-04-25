import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import React from 'react';

import CategoriesBlock from '../../shared/CategoriesBlock';
import LoadingSpinner from '../../shared/LoadingSpinner';
import PaginationBox from '../../shared/PaginationBox';

const GenresEpisodesQuery = gql`
  query($pageCount:Int, $currentPage:Int) {
    Genres(limit:$pageCount, offset: $currentPage) {
      rows {
        id,
        title,
        thumbnail
      },
      count
    },
  }
`;

type StateType = {
  currentPage: Number,
}

// How many records should be shown per page.
const pageCount = 8;

export default class Categories extends React.Component<{}, StateType> {
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
    const { currentPage } = this.state;

    return (
      <Query
        query={GenresEpisodesQuery}
        variables={{
          pageCount: pageCount,
          currentPage: (Number(currentPage) * pageCount),
        }}
      >
        {({ loading, error, data }) => {
          if (loading) {
            return (
              <div className="main-content no-padding">
                <LoadingSpinner />
              </div>
            );
          }

          if (error) return <p>Error :(</p>;

          console.log(data);
          return (
            <div className="main-content no-padding">
              <CategoriesBlock
                title={'Categories'}
                categories={data.Genres.rows}
              />
              {
                data.Genres.rows.length !== 0
                && (
                  <PaginationBox
                    pageCount={pageCount}
                    itemCount={data.Genres.count}
                    currentPage={currentPage}
                    goForwardCB={() => {
                      const lastPage = Math.ceil(
                        data.Genres.count / pageCount,
                      );

                      // If this is the last page, don't go forward
                      if ((Number(currentPage) + 1) === lastPage) return;

                      this.PageForward();
                    }}
                    goBackwardsCB={() => this.PageBackwards()}
                    setCurrentPageCB={this.setCurrentPage}
                  />
                )
              }
            </div>
          );
        }}
      </Query>
    );
  }
}
