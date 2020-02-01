import React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { GQLGenre } from '@cactus-app/types';

import GenreSearchQuery from './GenreSearchQuery';
import FilterCategoriesChips from '../../../FilterCategoriesChips';
import CategoriesSelectionBlock from './components/CategoriesSelectionBlock';
import PaginationBox from '../../../PaginationBox';

type PropType = InjectedIntlProps & {
  closePanel: () => void;

  setSelectedCategories: (selectedCategories: GQLGenre[]) => void;
  initialSelectedCategories: Array<GQLGenre>;
};

type StateType = {
  currentPage: number;
  searchFieldText: string;
  selectedCategories: Array<GQLGenre>;
};

// How many records should be shown per page
const pageCount = 8;

class CategorySelectionPanel extends React.Component<PropType, StateType> {
  private typingTimeout = null;

  constructor(props) {
    super(props);
    const { initialSelectedCategories } = this.props;

    this.state = {
      searchFieldText: '',
      currentPage: 0,
      selectedCategories: initialSelectedCategories,
    };
  }

  PageForward = (): void => {
    const { currentPage } = this.state;
    this.setState({ currentPage: (Number(currentPage) + 1) });
  };

  PageBackwards = (): void => {
    const { currentPage } = this.state;

    // Can't go backwards if page is already 0
    if (currentPage === 0) return;

    this.setState({ currentPage: (Number(currentPage) - 1) });
  };

  setCurrentPage = (page: number): void => {
    // If arg is null then ignore it
    if ((page === null) || (page === undefined)) return;

    this.setState({ currentPage: page });
  };

  addedCategory = (category: GQLGenre): void => {
    const { selectedCategories } = this.state;
    this.setState({
      selectedCategories: [...selectedCategories, category],
    });
  };

  removedCategory = (category: GQLGenre): void => {
    const { selectedCategories } = this.state;

    // Removes the provided category from the selectedCategories array
    const filteredCategories = selectedCategories
      .filter((cat) => cat.id !== category.id);

    this.setState({
      selectedCategories: filteredCategories,
    });
  };

  onSearchFieldChangedEvent = ({ target: { value } }): void => {
    const self = this;

    // Clears the previously set timer.
    clearTimeout(this.typingTimeout);

    // Reset the timer, to make the http call after 400MS
    this.typingTimeout = setTimeout(() => {
      self.setState(
        { searchFieldText: value },
        // When text fields are available set current page to 0
        () => self.setCurrentPage(0),
      );
    }, 400);
  };

  render = (): JSX.Element => {
    const {
      searchFieldText,
      currentPage,
      selectedCategories,
    } = this.state;

    const {
      closePanel,
      setSelectedCategories,
    } = this.props;

    const { intl: { formatMessage } } = this.props;

    return (
      <div className="genre-options-container">
        <div
          className="
            main-content no-margin self-contained-padding no-responsive-left-margin
          "
        >

          <div className="genre-options-container-controls">
            <div
              className="exit-btn"
              onClick={(): void => {
                closePanel();
                setSelectedCategories(selectedCategories);
              }}
            >
              <i className="fa fa-times" />
            </div>
          </div>
          <div className="big-search-box-container">
            <input
              type="text"
              className="big-search-box-input"
              placeholder={
                formatMessage({
                  id: 'cactus.category_search_field_placeholder',
                  defaultMessage: 'Search categories ...',
                })
              }
              onChange={this.onSearchFieldChangedEvent}
            />
          </div>

          <GenreSearchQuery
            variables={{
              title: searchFieldText,
              pageCount,
              currentPage: (Number(currentPage) * pageCount),
            }}
          >
            {({ loading, error, data }): JSX.Element => {
              if (loading || error) {
                return <></>;
              }

              return (
                <>
                  <FilterCategoriesChips
                    categories={selectedCategories}
                    categoryRemoved={
                      (category: GQLGenre): void => this.removedCategory(category)
                    }
                    alignedCenter
                    padded
                  />

                  <CategoriesSelectionBlock
                    categories={data.Genres.rows}
                    selectedCategories={selectedCategories}
                    categorySelected={
                      (category: GQLGenre): void => this.addedCategory(category)
                    }
                  />

                  {
                    data.Genres.rows.length !== 0
                    && (
                      <PaginationBox
                        pageCount={pageCount}
                        itemCount={data.Genres.count}
                        currentPage={currentPage}
                        goForwardCB={(): void => {
                          const lastPage = Math.ceil(
                            data.Genres.count / pageCount,
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
                </>
              );
            }}
          </GenreSearchQuery>
        </div>
      </div>
    );
  };
}

export default injectIntl(CategorySelectionPanel);
