import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import React from 'react';
import VideoBlock from '../../shared/VideoBlock';
import LoadingSpinner from '../../shared/LoadingSpinner';
import PaginationBox from '../../shared/PaginationBox';

const NewestEpisodesQuery = gql`
  query($pageCount:Int, $currentPage:Int) {
    getNewestEpisodes(limit:$pageCount, offset: $currentPage) {
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

type stateType = {
  currentPage: Number,
}

// How many records should be shown per page.
const pageCount = 8;

export default class NewestEpisodes extends React.Component<{}, stateType> {
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
        query={NewestEpisodesQuery}
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
              <VideoBlock
                title={'Newest episodes'}
                episodes={data.getNewestEpisodes.rows}
              />
              {
                data.getNewestEpisodes.rows.length !== 0
                && (
                  <PaginationBox
                    pageCount={pageCount}
                    itemCount={data.getNewestEpisodes.count}
                    currentPage={currentPage}
                    goForwardCB={() => {
                      const lastPage = Math.ceil(
                        data.getNewestEpisodes.count / pageCount,
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
