import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import React, { Component } from 'react';
import Sidebar from '../../shared_components/Sidebar';
import VideoBlock from '../../shared_components/VideoBlock';
import LoadingSpinner from '../../shared_components/LoadingSpinner';

const NewestEpisodesQuery = gql`
  query {
    getNewestEpisodes(limit: 30) {
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

export default class NewestEpisodes extends Component {
  // constructor() {
  //   super()
  // }

  render() {
    const { history } = this.props;
    return (
      <div className="main-container">
        <Sidebar props={{ history }} />

        <Query query={NewestEpisodesQuery}>
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
                <VideoBlock props={{
                  title: 'New episodes',
                  episodes: data.getNewestEpisodes,
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
