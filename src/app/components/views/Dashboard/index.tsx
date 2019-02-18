import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import LoadingSpinner from '../../shared/LoadingSpinner';
import HottestVideoBlock from '../../shared/HottestVideoBlock';
import VideoBlock from '../../shared/VideoBlock';
import CategoriesBlock from '../../shared/CategoriesBlock';

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

class Dashboard extends React.Component {
  render() {
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
                title="🔥right now"
                episodes={data.getHottestEpisodes.rows}
                viewAllLink="/hottest_episodes"
              />
              <VideoBlock
                title={'Newest episodes'}
                episodes={data.getNewestEpisodes.rows}
                viewAllLink={'/newest_episodes'}
              />
              <CategoriesBlock
                title={'Categories'}
                categories={data.getGenres}
                viewAllLink={'/categories'}
              />
            </div>
          );
        }}
      </Query>
    );
  }
}

export default Dashboard;
