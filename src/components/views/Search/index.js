import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import React, { Component } from 'react';
import Sidebar from '../../shared_components/Sidebar';
import AnimeThumbnailList from '../../shared_components/AnimeThumbnailList';
import LoadingSpinner from '../../shared_components/LoadingSpinner';
import PaginationBox from '../../shared_components/PaginationBox';

const SearchViewQuery = gql`
  query($title: String, $pageCount:Int, $currentPage:Int) {
    findSeasons(title:$title, limit:$pageCount, offset: $currentPage) {
        id,
        title,
        poster,
        episodeCount
    },
    getSeasonCount(title:$title)
  }
`;

export default class SearchView extends Component {
  constructor() {
    super();

    // How many records to are shown per page
    // this.pageCount = 18;
    this.pageCount = 3;

    this.state = {
      searchFieldText: '',

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
    const { searchFieldText, currentPage } = this.state;
    return (
      <div className="main-container">
        <Sidebar props={{ history }} />
        <div className="main-content">
          {/* Start of main content */}

          <div className="big-search-box-container">
            <input
              type="text"
              className="big-search-box-input"
              placeholder="Search by ..."
              value={searchFieldText}
              onChange={
                ({ target: { value } }) => {
                  this.setState(
                    { searchFieldText: value },
                    // When text fields are available set current page to 0
                    () => this.setCurrentPage(0),
                  );
                }
              }
            />
          </div>

          <Query
            query={SearchViewQuery}
            variables={{
              title: searchFieldText,
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
                <div className="util-container">
                  <AnimeThumbnailList
                    seasons={data.findSeasons}
                  />
                  <PaginationBox
                    pageCount={this.pageCount}
                    itemCount={data.getSeasonCount}
                    currentPage={currentPage}
                    goForwardCB={() => {
                      const lastPage = Math.ceil(
                        data.getSeasonCount / this.pageCount,
                      );

                      // If this is the last page, don't go forward
                      if ((currentPage + 1) === lastPage) return;

                      this.PageForward();
                    }}
                    goBackwardsCB={() => this.PageBackwards()}
                    setCurrentPageCB={this.setCurrentPage}
                  />
                </div>

              );
            }}
          </Query>

          {/* End of main content */}
        </div>
      </div>
    );
  }
}
