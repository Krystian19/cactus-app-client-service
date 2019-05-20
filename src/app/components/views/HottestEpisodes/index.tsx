import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import React from 'react';
import HottestVideoBlock from '../../shared/HottestVideoBlock';
import
LoadingHottestVideoBlock
  from '../../shared/HottestVideoBlock/components/LoadingHottestVideoBlock';
import LoadingSpinner from '../../shared/LoadingSpinner';
import PaginationBox from '../../shared/PaginationBox';

const HottestEpisodesQuery = gql`
  query($pageCount:Int, $currentPage:Int) {
    HottestEpisodes(limit:$pageCount, offset: $currentPage) {
      rows {
        id,
        thumbnail,
        episodeOrder,
        Season {
          id,
          seasonOrder,
          title,
          background,
          Anime {
            id,
            title
          }
        }
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

export default class HottestEpisodes extends React.Component<{}, StateType> {
  constructor(props) {
    super(props);

    this.state = {
      // Pagination state values
      currentPage: 0,
    };
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
        query={HottestEpisodesQuery}
        variables={{
          pageCount: pageCount,
          currentPage: (Number(currentPage) * pageCount),
        }}
      >
        {({ loading, error, data }) => {
          if (loading || error) {
            return (
              <div className="main-content no-padding">
                <LoadingHottestVideoBlock
                  count={pageCount}
                />
              </div>
            );
          }

          console.log(data);
          return (
            <div className="main-content no-padding">
              <HottestVideoBlock
                title="🔥 right now"
                episodes={data.HottestEpisodes.rows}
              />
              {
                data.HottestEpisodes.rows.length !== 0
                && (
                  <PaginationBox
                    pageCount={pageCount}
                    itemCount={data.HottestEpisodes.count}
                    currentPage={currentPage}
                    goForwardCB={() => {
                      const lastPage = Math.ceil(
                        data.HottestEpisodes.count / pageCount,
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
