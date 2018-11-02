import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Sidebar from '../../shared_components/Sidebar';
import HottestVideoBlock from '../../shared_components/HottestVideoBlock';
import VideoBlock from '../../shared_components/VideoBlock';
import CategoriesBlock from '../../shared_components/CategoriesBlock';

const DashboardQuery = gql`
  query {
    getHottestEpisodes {
      id,
      thumbnail,
      episodeOrder,
      EpisodeVersions {
        id,
        episode_url,
        Language {
          id,
          name,
          iso_code
        }
      },
      Season {
        id,
        seasonOrder,
        title,
        Anime {
          id,
          title
        }
      }
    }
  }
`;

export default class DashboardView extends Component {
  // constructor() {
  //   super()
  // }

  render() {
    const { history } = this.props;
    return (
      <div className="main-container">
        <Sidebar props={{ history }} />
        <div className="main-content no-padding">

          {/* Block start */}
          <HottestVideoBlock />
          {/* Block end */}

          <Query query={DashboardQuery}>
            {({ loading, error, data }) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p>Error :(</p>;

              console.log(data);
              return <VideoBlock props={{ title: 'New episodes', episodes: data.getHottestEpisodes }} />;
            }}
          </Query>


          {/* Block start */}
          <CategoriesBlock />
          {/* Block end */}
        </div>
      </div>
    );
  }
}
