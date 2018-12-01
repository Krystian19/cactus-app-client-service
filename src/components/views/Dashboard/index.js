import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Sidebar from '../../shared_components/Sidebar';
import HottestVideoBlock from '../../shared_components/HottestVideoBlock';
import VideoBlock from '../../shared_components/VideoBlock';
import CategoriesBlock from '../../shared_components/CategoriesBlock';
import LoadingSpinner from '../../shared_components/LoadingSpinner';

const DashboardQuery = gql`
  query {
    getHottestEpisodes {
      ...episodeThumbnailFields
    }
    getNewestEpisodes {
      ...episodeThumbnailFields
    }
    getGenres {
      id,
      title,
      thumbnail
    }
  }
    
  fragment episodeThumbnailFields on Episode {
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
                  viewAllLink: '/hottest_episodes',
                }}
                />
                <VideoBlock props={{
                  title: 'New episodes',
                  episodes: data.getNewestEpisodes,
                  history,
                  viewAllLink: '/newest_episodes',
                }}
                />
                <CategoriesBlock props={{
                  title: 'Categories',
                  categories: data.getGenres,
                  viewAllLink: '/categories',
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
