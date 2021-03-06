import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import queryString from 'qs';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { GQLGenre } from '@cactus-app/types';

import SearchQuery from './SearchQuery';
import AnimeThumbnailList from '../../shared/AnimeThumbnailList';
import LoadingAnimeThumbnailList from '../../shared/LoadingAnimeThumbnailList';
import GenreOptionsPanel from '../../shared/GenreOptionsPanel';
import PaginationBox from '../../shared/PaginationBox';

type StateTypes = {
  currentPage: number;
  searchFieldText: string;
  selectedCategories: Array<GQLGenre>;
};

type PropType = {} & RouteComponentProps<{}> & InjectedIntlProps;

// How many records should be shown per page
const pageCount = 18;

class Search extends React.Component<PropType, StateTypes> {
  private typingTimeout = null;
  private _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      searchFieldText: '',
      currentPage: 0,
      selectedCategories: [],
    };
  }

  addedCategory = (category: GQLGenre): void => {
    const { selectedCategories } = this.state;
    const self = this;

    this.setState({
      selectedCategories: [...selectedCategories, category],
    }, () => self.mapSearchParamsToUrl(self));
  };

  removedCategory = (category: GQLGenre): void => {
    const { selectedCategories } = this.state;
    const self = this;

    // Removes the provided category from the selectedCategories array
    const filteredCategories = selectedCategories
      .filter((cat) => cat.id !== category.id);

    this.setState({
      selectedCategories: filteredCategories,
    }, () => self.mapSearchParamsToUrl(self));
  };

  PageForward = (): void => {
    const { currentPage } = this.state;
    const self = this;

    this.setState({
      currentPage: (Number(currentPage) + 1),
    }, () => self.mapSearchParamsToUrl(self));
  };

  PageBackwards = (): void => {
    const { currentPage } = this.state;
    const self = this;

    // Can't go backwards if page is already 0
    if (currentPage === 0) return;

    this.setState({
      currentPage: (Number(currentPage) - 1),
    }, () => self.mapSearchParamsToUrl(self));
  };

  setCurrentPage = (page): void => {
    // If arg is null then ignore it
    if ((page === null) || (page === undefined)) return;

    const self = this;

    this.setState({
      currentPage: page,
    }, () => self.mapSearchParamsToUrl(self));
  };

  setSelectedCategories = (categories): void => {
    const self = this;

    this.setState({
      selectedCategories: categories,
    }, () => {
      // When text fields are available set current page to 0
      self.setCurrentPage(0);

      // Update query url params according to the state
      self.mapSearchParamsToUrl(self);
    });
  };

  mapSearchParamsToUrl = (self): void => {
    const {
      searchFieldText,
      selectedCategories,
      currentPage,
    } = self.state;

    const newUrlState = {
      q: searchFieldText.split(' ').filter((tk) => tk).join('+') || undefined,
      genre: (selectedCategories.length) ? selectedCategories : undefined,
      page: currentPage,
    };

    const basePathname = window.location.pathname;
    const queryStringState = queryString.stringify(newUrlState);
    const newPathname = `${basePathname}?${queryStringState}`;

    window.history.pushState(null, '', newPathname);

    // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
    // console.log('This is the new URL state');
    // console.log(newUrlState);
    // console.log(`${basePathname}?${queryStringState}`);
  };

  mapUrlToSearchParams = (): void => {
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
  };

  onSearchFieldChangeEvent = ({ target: { value } }): void => {
    const self = this;

    // Clears the previously set timer.
    clearTimeout(this.typingTimeout);

    // Reset the timer, to make the http call after 400MS
    this.typingTimeout = setTimeout(() => {
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
  };

  componentDidMount = (): void => {
    // Only map Url to Search params the first time the component has been mounted
    if (!this._isMounted) {
      this.mapUrlToSearchParams();
      this._isMounted = true;
    }
  };

  render = (): JSX.Element => {
    const {
      searchFieldText,
      currentPage,
      selectedCategories,
    } = this.state;

    const { intl: { formatMessage } } = this.props;

    // Avoid the component rendering before it's mounted
    if (!this._isMounted) {
      return <></>;
    }

    return (
      <div className="main-content">
        <div className="big-search-box-container">
          <input
            type="text"
            className="big-search-box-input"
            placeholder={
              formatMessage({
                id: 'cactus.search_field_placeholder',
                defaultMessage: 'Search ...',
              })
            }
            defaultValue={String(searchFieldText)}
            onChange={this.onSearchFieldChangeEvent}
          />
        </div>
        <GenreOptionsPanel
          selectedCategories={selectedCategories}
          categoryRemoved={(category): void => this.removedCategory(category)}
          setSelectedCategories={this.setSelectedCategories}
        />
        <SearchQuery
          variables={{
            title: searchFieldText,
            pageCount,
            currentPage: (Number(currentPage) * pageCount),
            genres: selectedCategories.map((cat) => Number(cat.id)),
          }}
        >
          {({ loading, error, data }): JSX.Element => {
            if (loading || error) {
              return (
                <div className="util-container">
                  <LoadingAnimeThumbnailList count={pageCount} />
                </div>
              );
            }

            const { Releases } = data;

            return (
              <div className="util-container">
                <AnimeThumbnailList
                  releases={Releases.rows}
                />
                {
                  Releases.rows.length !== 0
                  && (
                    <PaginationBox
                      pageCount={pageCount}
                      itemCount={Releases.count}
                      currentPage={currentPage}
                      goForwardCB={(): void => {
                        const lastPage = Math.ceil(
                          Releases.count / pageCount,
                        );

                        // If this is the last page, don't go forward
                        if ((Number(currentPage) + 1) === lastPage) return;

                        this.PageForward();
                      }}
                      goBackwardsCB={(): void => this.PageBackwards()}
                      setCurrentPageCB={this.setCurrentPage}
                    />
                  )
                }
              </div>
            );
          }}
        </SearchQuery>
      </div>
    );
  };
}

export default withRouter(
  injectIntl(
    Search,
  ),
);
