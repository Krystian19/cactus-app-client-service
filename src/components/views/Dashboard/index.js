import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
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
    
  fragment episodeThumbnailFields on PaginatedEpisodes {
    rows {
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
    },
    count
  }
`;

export default class DashboardView extends Component {
  render() {
    const { history } = this.props;
    return (
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
              <HottestVideoBlock
                title="🔥 right now"
                episodes={data.getHottestEpisodes.rows}
                history={history}
                viewAllLink="/hottest_episodes"
              />
              <VideoBlock props={{
                title: 'Newest episodes',
                episodes: data.getNewestEpisodes.rows,
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
    );
  }
}
