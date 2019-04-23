import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import FilterCategoriesChips from '../../../FilterCategoriesChips';
import CategoriesSelectionBlock from './components/CategoriesSelectionBlock';

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
}

class CategorySelectionPanel extends React.Component<PropType> {
  render() {
    const {
      closePanel
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
            <input type="text" className="big-search-box-input" placeholder="Search Categories ..." />
          </div>

          <Query
            query={GenreSearchQuery}
          // variables={{}}
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
                    categoryRemoved={(id) => console.log(`Removing category with id: ${id}`)}
                    alignedCenter={true}
                    padded={true}
                  />

                  <CategoriesSelectionBlock
                    categories={data.getGenres.rows}
                  />

                  <div className="pagination-box">
                    <div className="item control">
                      <svg viewBox="0 0 24 24">
                        <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"></path>
                      </svg>
                    </div>
                    <div className="item active">1</div>
                    <div className="item">2</div>
                    <div className="item">3</div>
                    <div className="item mobile-control">
                      1 / 42
                    </div>
                    <div className="item control">
                      <svg viewBox="0 0 24 24">
                        <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path>
                      </svg>
                    </div>
                  </div>
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