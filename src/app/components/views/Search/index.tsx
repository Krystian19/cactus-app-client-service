import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import React from 'react';
import Genre from '../../@types/Genre';
import AnimeThumbnailList from '../../shared/AnimeThumbnailList';
import LoadingAnimeThumbnailList from '../../shared/LoadingAnimeThumbnailList';
import GenreOptionsPanel from '../../shared/GenreOptionsPanel';
import PaginationBox from '../../shared/PaginationBox';
import _ from 'lodash';

const SearchViewQuery = gql`
  query($title: String, $pageCount:Int, $currentPage:Int, $genres: [Int!]) {
    Seasons(title:$title, Genres: $genres, limit:$pageCount, offset: $currentPage) {
      rows {
        id,
        title,
        poster,
        EpisodeCount,
        startedAiring
      },
      count
    },
    Genres {
      rows {
        id,
        title,
        thumbnail
      },
      count
    }
  }
`;

type StateTypes = {
  currentPage: Number,
  searchFieldText: String,
  selectedCategories: Array<Genre>,
}

// How many records should be shown per page
const pageCount = 18;

export default class Search extends React.Component<{}, StateTypes> {
  private typingTimeout = null;

  constructor(props) {
    super(props);

    this.state = {
      searchFieldText: '',

      // Pagination's current page
      currentPage: 0,

      // Categories are currently selected to filter with
      selectedCategories: [],
    };
  }

  addedCategory = (category: Genre) => {
    const { selectedCategories } = this.state;
    this.setState({
      selectedCategories: [...selectedCategories, category],
    })
  }

  removedCategory = (category: Genre) => {
    const { selectedCategories } = this.state;

    // Removes the provided category from the selectedCategories array
    const filteredCategories = selectedCategories
      .filter(cat => cat.id != category.id);

    this.setState({
      selectedCategories: filteredCategories,
    })
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

  onSearchFieldChangeEvent = ({ target: { value } }) => {
    const self = this;

    // Clears the previously set timer.
    clearTimeout(this.typingTimeout);

    // Reset the timer, to make the http call after 470MS
    this.typingTimeout = setTimeout(function updateSearchField() {
      self.setState(
        { searchFieldText: value },
        // When text fields are available set current page to 0
        () => self.setCurrentPage(0),
      );
    }, 400);
  }

  render() {
    const {
      searchFieldText,
      currentPage,
      selectedCategories,
    } = this.state;

    return (
      <div className="main-content">
        {/* Start of main content */}

        <div className="big-search-box-container">
          <input
            type="text"
            className="big-search-box-input"
            placeholder="Search by ..."
            // value={String(searchFieldText)}
            onChange={this.onSearchFieldChangeEvent}
          />
        </div>

        <GenreOptionsPanel
          selectedCategories={selectedCategories}
          categoryRemoved={(category) => this.removedCategory(category)}
          setSelectedCategories={
            (categories) => this.setState({ selectedCategories: categories })
          }
        />

        <Query
          query={SearchViewQuery}
          variables={{
            title: searchFieldText,
            pageCount: pageCount,
            currentPage: (Number(currentPage) * pageCount),
            genres: selectedCategories.map(cat => cat.id),
          }}
        >
          {({ loading, error, data }) => {
            if (loading || error) {
              return (
                <div className="util-container">
                  <LoadingAnimeThumbnailList count={pageCount} />
                </div>
              );
            }

            // if (error) return <p>Error :(</p>;

            console.log(data);
            return (
              <div className="util-container">
                <AnimeThumbnailList
                  seasons={data.Seasons.rows}
                />
                {
                  data.Seasons.rows.length !== 0
                  && (
                    <PaginationBox
                      pageCount={pageCount}
                      itemCount={data.Seasons.count}
                      currentPage={currentPage}
                      goForwardCB={() => {
                        const lastPage = Math.ceil(
                          data.Seasons.count / pageCount,
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

        {/* End of main content */}
      </div>
    );
  }
}
