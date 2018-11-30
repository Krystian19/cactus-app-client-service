import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import React, { Component } from 'react';
import Sidebar from '../../shared_components/Sidebar';
import HottestVideoBlock from '../../shared_components/HottestVideoBlock';
import LoadingSpinner from '../../shared_components/LoadingSpinner';

const HottestEpisodesQuery = gql`
  query {
    getHottestEpisodes(limit: 30) {
      id,
      thumbnail,
      episodeOrder,
      Season {
        id,
        seasonOrder,
        title,
        background,
        Anime {
          id,
          title
        }
      }
    }
  }
`;

export default class HottestEpisodes extends Component {
  // constructor() {
  //   super()
  // }

  render() {
    const { history } = this.props;
    return (
      <div className="main-container">
        <Sidebar props={{ history }} />

        <Query query={HottestEpisodesQuery}>
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
                <HottestVideoBlock props={{
                  title: '🔥 right now',
                  episodes: data.getHottestEpisodes,
                  history,
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
