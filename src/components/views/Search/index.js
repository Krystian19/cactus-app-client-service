import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import React, { Component } from 'react';
import Sidebar from '../../shared_components/Sidebar';
import AnimeThumbnailList from '../../shared_components/AnimeThumbnailList';
import LoadingSpinner from '../../shared_components/LoadingSpinner';

const SearchViewQuery = gql`
  query {
    getSeasons {
      id,
      title,
      poster,
      Episodes {
        id
      }
    }
  }
`;

export default class SearchView extends Component {
  // constructor() {
  //   super()
  // }

  render() {
    const { history } = this.props;
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
            />
          </div>

          <Query query={SearchViewQuery}>
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

                <AnimeThumbnailList props={{
                  animes: data.getSeasons,
                }}
                />

              );
            }}
          </Query>

          {/* End of main content */}
        </div>
      </div>
    );
  }
}
