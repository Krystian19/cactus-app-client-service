import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import React from 'react';
import CategoriesBlock from '../../shared/CategoriesBlock';
import LoadingSpinner from '../../shared/LoadingSpinner';

const GenresEpisodesQuery = gql`
  query {
    getGenres {
      rows {
        id,
        title,
        thumbnail
      },
      count
    }
  }
`;

export default class Categories extends React.Component {
  render() {
    return (
      <Query query={GenresEpisodesQuery}>
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
              <CategoriesBlock
                title={'Categories'}
                categories={data.getGenres.rows}
              />
            </div>
          );
        }}
      </Query>
    );
  }
}
