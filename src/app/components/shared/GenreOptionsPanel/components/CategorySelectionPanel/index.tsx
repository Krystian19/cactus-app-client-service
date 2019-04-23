import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import FilterCategoriesChips from '../../../FilterCategoriesChips';
import CategoriesSelectionBlock from './components/CategoriesSelectionBlock';
import PaginationBox from '../../../../shared/PaginationBox';

const GenreSearchQuery = gql`
  query($pageCount:Int, $currentPage:Int, $title:String) {
    getGenres(limit:$pageCount, offset: $currentPage, title: $title) {
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
  categorySelected: Function,
  categoryRemoved: Function,
}

type StateType = {
  currentPage: Number,
  searchFieldText: String,
}

// How many records should be shown per page
const pageCount = 8;

class CategorySelectionPanel extends React.Component<PropType, StateType> {
  constructor(props) {
    super(props);

    this.state = {
      searchFieldText: '',

      // Pagination's current page
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
    const {
      searchFieldText,
      currentPage
    } = this.state;

    const {
      closePanel,
      categorySelected,
      categoryRemoved,
    } = this.props;

    return (
      <div className="genre-options-container">
        <div className="main-content no-margin self-contained-padding no-responsive-left-margin">

          <div className="genre-options-container-controls">
            <div
              className="exit-btn"
              onClick={() => closePanel()}
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
                    categories={data.getGenres.rows}
                    categoryRemoved={category => categoryRemoved(category)}
                    alignedCenter={true}
                    padded={true}
                  />

                  <CategoriesSelectionBlock
                    categories={data.getGenres.rows}
                    categorySelected={category => categorySelected(category)}
                  />

                  {
                    data.getGenres.rows.length !== 0
                    && (
                      <PaginationBox
                        pageCount={pageCount}
                        itemCount={data.getGenres.count}
                        currentPage={currentPage}
                        goForwardCB={() => {
                          const lastPage = Math.ceil(
                            data.getGenres.count / pageCount,
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