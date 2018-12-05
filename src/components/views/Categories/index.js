import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import React, { Component } from 'react';
import Sidebar from '../../shared_components/Sidebar';
import CategoriesBlock from '../../shared_components/CategoriesBlock';
import LoadingSpinner from '../../shared_components/LoadingSpinner';

const GenresEpisodesQuery = gql`
  query {
    getGenres {
      id,
      title,
      thumbnail
    }
  }
`;

export default class Categories extends Component {
  // constructor() {
  //   super()
  // }

  render() {
    const { history } = this.props;
    return (
      <div className="main-container">
        <Sidebar props={{ history }} />

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
                <CategoriesBlock props={{
                  title: 'Categories',
                  categories: data.getGenres,
                }}
                />
              </div>
            );
          }}
        </Query>

      </div>
    );
  }
}