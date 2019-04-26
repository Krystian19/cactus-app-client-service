import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Genre from '../../../../@types/Genre';
import FilterCategoriesChips from '../../../FilterCategoriesChips';
import CategoriesSelectionBlock from './components/CategoriesSelectionBlock';
import PaginationBox from '../../../../shared/PaginationBox';

const GenreSearchQuery = gql`
  query($pageCount:Int, $currentPage:Int, $title:String) {
    Genres(limit:$pageCount, offset: $currentPage, title: $title) {
      rows {
        id,
        title,
        thumbnail
      },
      count
    },
  }
`;

type PropType = {
  closePanel: Function,
  // categorySelected: Function,
  // categoryRemoved: Function,

  setSelectedCategories: Function,
  initialSelectedCategories: Array<Genre>,
}

type StateType = {
  currentPage: Number,
  searchFieldText: String,
  selectedCategories: Array<Genre>,
}

// How many records should be shown per page
const pageCount = 8;

class CategorySelectionPanel extends React.Component<PropType, StateType> {
  constructor(props) {
    super(props);

    const { initialSelectedCategories } = this.props;

    this.state = {
      searchFieldText: '',

      // Pagination's current page
      currentPage: 0,

      selectedCategories: initialSelectedCategories,
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

  render() {
    const {
      searchFieldText,
      currentPage,
      selectedCategories,
    } = this.state;

    const {
      closePanel,
      setSelectedCategories
    } = this.props;

    return (
      <div className="genre-options-container">
        <div
          className="
            main-content no-margin self-contained-padding no-responsive-left-margin"
        >

          <div className="genre-options-container-controls">
            <div
              className="exit-btn"
              onClick={() => {
                closePanel()
                setSelectedCategories(selectedCategories)
              }}
            >
              <i className="fa fa-times" />
            </div>
          </div>
          <div className="big-search-box-container">
            <input
              type="text"
              className="big-search-box-input"
              placeholder="Search Categories ..."
              value={String(searchFieldText)}
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
            query={GenreSearchQuery}
            variables={{
              title: searchFieldText,
              pageCount: pageCount,
              currentPage: (Number(currentPage) * pageCount),
            }}
          >
            {({ loading, error, data }) => {
              if (loading) {
                return ('');
              }

              if (error) return <p>Error :(</p>;

              console.log(data);
              return (
                <Fragment>
                  <FilterCategoriesChips
                    categories={selectedCategories}
                    categoryRemoved={
                      (category: Genre) => this.removedCategory(category)
                    }
                    alignedCenter={true}
                    padded={true}
                  />

                  <CategoriesSelectionBlock
                    categories={data.Genres.rows}
                    selectedCategories={selectedCategories}
                    categorySelected={
                      (category: Genre) => this.addedCategory(category)
                    }
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
                </Fragment>
              );
            }}
          </Query>
        </div>
      </div>
    )
  }
}

export default CategorySelectionPanel;