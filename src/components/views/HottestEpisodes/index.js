import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import React, { Component } from 'react';
import Sidebar from '../../shared_components/Sidebar';
import HottestVideoBlock from '../../shared_components/HottestVideoBlock';
import LoadingSpinner from '../../shared_components/LoadingSpinner';
import PaginationBox from '../../shared_components/PaginationBox';

const HottestEpisodesQuery = gql`
  query($pageCount:Int, $currentPage:Int) {
    getHottestEpisodes(limit:$pageCount, offset: $currentPage) {
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

export default class HottestEpisodes extends Component {
  constructor() {
    super();

    // How many records to are shown per page
    this.pageCount = 8;

    this.state = {
      // Pagination state values
      currentPage: 0,
    };
  }

  PageForward = () => {
    const { currentPage } = this.state;
    this.setState({ currentPage: (currentPage + 1) });
  }

  PageBackwards = () => {
    const { currentPage } = this.state;

    // Can't go backwards if page is already 0
    if (currentPage === 0) return;

    this.setState({ currentPage: (currentPage - 1) });
  }

  setCurrentPage = (page) => {
    // If arg is null then ignore it
    if ((page === null) || (page === undefined)) return;

    this.setState({ currentPage: page });
  }

  render() {
    const { history } = this.props;
    const { currentPage } = this.state;
    return (
      <div className="main-container">
        <Sidebar props={{ history }} />

        <Query
          query={HottestEpisodesQuery}
          variables={{
            pageCount: this.pageCount,
            currentPage: (currentPage * this.pageCount),
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
                <HottestVideoBlock
                  title="🔥 right now"
                  episodes={data.getHottestEpisodes.rows}
                  history={history}
                />
                {
                  data.getHottestEpisodes.rows.length !== 0
                  && (
                    <PaginationBox
                      pageCount={this.pageCount}
                      itemCount={data.getHottestEpisodes.count}
                      currentPage={currentPage}
                      goForwardCB={() => {
                        const lastPage = Math.ceil(
                          data.getHottestEpisodes.count / this.pageCount,
                        );

                        // If this is the last page, don't go forward
                        if ((currentPage + 1) === lastPage) return;

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

      </div>
    );
  }
}
