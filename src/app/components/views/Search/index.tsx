import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import React from 'react';
import { RouteComponentProps, withRouter } from "react-router";
import queryString from 'qs';
import { injectIntl, InjectedIntlProps } from 'react-intl';

import Genre from '../../@types/Genre';
import AnimeThumbnailList from '../../shared/AnimeThumbnailList';
import LoadingAnimeThumbnailList from '../../shared/LoadingAnimeThumbnailList';
import GenreOptionsPanel from '../../shared/GenreOptionsPanel';
import PaginationBox from '../../shared/PaginationBox';

const SearchViewQuery = gql`
  query($title: String, $pageCount:Int, $currentPage:Int, $genres: [Int!]) {
    Releases(title:$title, Genres: $genres, limit:$pageCount, offset: $currentPage) {
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
};

type PropType =
  RouteComponentProps<{}>
  & InjectedIntlProps & {};

// How many records should be shown per page
const pageCount = 18;

class Search extends React.Component<PropType, StateTypes> {
  private typingTimeout = null;
  private _isMounted = false;

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
    const self = this;

    this.setState({
      selectedCategories: [...selectedCategories, category],
    },
      // Update query url params according to the state
      () => self.mapSearchParamsToUrl(self));
  }

  removedCategory = (category: Genre) => {
    const { selectedCategories } = this.state;
    const self = this;

    // Removes the provided category from the selectedCategories array
    const filteredCategories = selectedCategories
      .filter(cat => cat.id != category.id);

    this.setState({
      selectedCategories: filteredCategories,
    },
      // Update query url params according to the state
      () => self.mapSearchParamsToUrl(self));
  }

  PageForward = () => {
    const { currentPage } = this.state;
    const self = this;

    this.setState({
      currentPage: (Number(currentPage) + 1),
    },
      // Update query url params according to the state
      () => self.mapSearchParamsToUrl(self));
  }

  PageBackwards = () => {
    const { currentPage } = this.state;
    const self = this;

    // Can't go backwards if page is already 0
    if (currentPage === 0) return;

    this.setState({
      currentPage: (Number(currentPage) - 1)
    },
      // Update query url params according to the state
      () => self.mapSearchParamsToUrl(self));
  }

  setCurrentPage = (page) => {
    // If arg is null then ignore it
    if ((page === null) || (page === undefined)) return;

    const self = this;

    this.setState({
      currentPage: page
    },
      // Update query url params according to the state
      () => self.mapSearchParamsToUrl(self));
  }

  setSelectedCategories = (categories) => {
    const self = this;

    this.setState({
      selectedCategories: categories,
    },
      () => {
        // When text fields are available set current page to 0
        self.setCurrentPage(0);

        // Update query url params according to the state
        self.mapSearchParamsToUrl(self);
      });
  }

  mapSearchParamsToUrl = (self) => {
    const {
      searchFieldText,
      selectedCategories,
      currentPage,
    } = self.state;

    const newUrlState = {
      q: searchFieldText.split(' ').filter(tk => tk).join('+') || undefined,
      genre: (selectedCategories.length) ? selectedCategories : undefined,
      page: currentPage,
    };

    const basePathname = window.location.pathname;
    const queryStringState = queryString.stringify(newUrlState);
    const newPathname = `${basePathname}?${queryStringState}`;

    history.pushState(null, '', newPathname);

    // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
    // console.log('This is the new URL state');
    // console.log(newUrlState);
    // console.log(`${basePathname}?${queryStringState}`);
  }

  mapUrlToSearchParams = () => {
    const { location: { search } } = this.props;
    const currentUrlParams = queryString.parse(search.replace('?', ''));

    // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
    // console.log('These are the current URL params ......................');
    // console.log(currentUrlParams);

    // Clears searchFieldText from '+' signs
    const searchFieldText = currentUrlParams.q
      ? currentUrlParams.q.split('+').join(' ')
      : '';

    this.setState({
      searchFieldText,
      currentPage: currentUrlParams.page ? Number(currentUrlParams.page) : 0,
      selectedCategories: currentUrlParams.genre || [],
    });
  }

  onSearchFieldChangeEvent = ({ target: { value } }) => {
    const self = this;

    // Clears the previously set timer.
    clearTimeout(this.typingTimeout);

    // Reset the timer, to make the http call after 400MS
    this.typingTimeout = setTimeout(function updateSearchField() {
      self.setState(
        { searchFieldText: value },
        () => {

          // When text fields are available set current page to 0
          self.setCurrentPage(0);

          // Update query url params according to the state
          self.mapSearchParamsToUrl(self);
        },
      );
    }, 400);
  }

  componentDidMount() {
    // Only map Url to Search params the first time the component has been mounted
    if (!this._isMounted) {
      this.mapUrlToSearchParams();
      this._isMounted = true;
    }
  }

  render() {
    const {
      searchFieldText,
      currentPage,
      selectedCategories,
    } = this.state;

    const { formatMessage } = this.props.intl;

    // Avoid the component rendering before it's mounted
    if (!this._isMounted) {
      return ('');
    }

    return (
      <div className="main-content">
        {/* Start of main content */}

        <div className="big-search-box-container">
          <input
            type="text"
            className="big-search-box-input"
            placeholder={
              formatMessage({
                id: "cactus.search_field_placeholder",
                defaultMessage: "Search ..."
              })
            }
            defaultValue={String(searchFieldText)}
            onChange={this.onSearchFieldChangeEvent}
          />
        </div>

        <GenreOptionsPanel
          selectedCategories={selectedCategories}
          categoryRemoved={(category) => this.removedCategory(category)}
          setSelectedCategories={this.setSelectedCategories}
        />

        <Query
          query={SearchViewQuery}
          variables={{
            title: searchFieldText,
            pageCount: pageCount,
            currentPage: (Number(currentPage) * pageCount),
            genres: selectedCategories.map(cat => Number(cat.id)),
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

            console.log(data);
            return (
              <div className="util-container">
                <AnimeThumbnailList
                  releases={data.Releases.rows}
                />
                {
                  data.Releases.rows.length !== 0
                  && (
                    <PaginationBox
                      pageCount={pageCount}
                      itemCount={data.Releases.count}
                      currentPage={currentPage}
                      goForwardCB={() => {
                        const lastPage = Math.ceil(
                          data.Releases.count / pageCount,
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

export default withRouter(
  injectIntl(
    Search
  )
);
