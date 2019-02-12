import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import LoadingSpinner from '../../components/LoadingSpinner';

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
              <h1>This is the Dashboard</h1>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default Dashboard;
