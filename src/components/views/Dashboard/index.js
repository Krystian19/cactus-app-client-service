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
      ...episodeThumbnailFields
    }
    getNewestEpisodes {
      ...episodeThumbnailFields
    }
  }
    
  fragment episodeThumbnailFields on Episode {
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
      background,
      Anime {
        id,
        title
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
        <Query query={DashboardQuery}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;

            console.log(data);
            return (
              <div className="main-content no-padding">
                <HottestVideoBlock props={{ title: '🔥 right now', episodes: data.getHottestEpisodes }} />
                <VideoBlock props={{ title: 'New episodes', episodes: data.getNewestEpisodes }} />
                <CategoriesBlock />
              </div>
            );
          }}
        </Query>

      </div>
    );
  }
}
