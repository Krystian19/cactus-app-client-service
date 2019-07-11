import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { injectIntl, InjectedIntlProps } from 'react-intl';

import HottestVideoBlock from '../../shared/HottestVideoBlock';
import LoadingHottestVideoBlock
  from '../../shared/HottestVideoBlock/components/LoadingHottestVideoBlock';
import VideoBlock from '../../shared/VideoBlock';
import LoadingVideoBlock from '../../shared/VideoBlock/components/LoadingVideoBlock';
import CategoriesBlock from '../../shared/CategoriesBlock';

const DashboardQuery = gql`
  query {
    HottestEpisodes {
      ...episodeThumbnailFields
    }
    NewestEpisodes {
      ...episodeThumbnailFields
    }
    Genres {
      rows {
        id,
        title,
        thumbnail
      },
      count
    }
  }
    
  fragment episodeThumbnailFields on EpisodePaginatedList {
    rows {
      id,
      thumbnail,
      episodeOrder,
      Season {
        id,
        releaseOrder,
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

type PropType = InjectedIntlProps & {};

class Dashboard extends React.Component<PropType> {
  render() {
    const { formatMessage } = this.props.intl;

    return (
      <Query query={DashboardQuery}>
        {({ loading, error, data }) => {
          if (loading || error) {
            return (
              <div className="main-content no-padding">
                <LoadingHottestVideoBlock
                  count={5}
                />
                <LoadingVideoBlock
                  count={8}
                />
              </div>
            );
          }

          console.log(data);
          return (
            <div className="main-content no-padding">
              <HottestVideoBlock
                title={
                  formatMessage({
                    id: "cactus.hot_section_title",
                    defaultMessage: "🔥 right now"
                  })
                }
                episodes={data.HottestEpisodes.rows}
                viewAllLink="/hottest_episodes"
              />
              <VideoBlock
                title={
                  formatMessage({
                    id: "cactus.newest_episodes_section_title",
                    defaultMessage: "Newest episodes"
                  })
                }
                episodes={data.NewestEpisodes.rows}
                viewAllLink={'/newest_episodes'}
              />
              <CategoriesBlock
                title={
                  formatMessage({
                    id: "cactus.categories",
                    defaultMessage: "Categories"
                  })
                }
                categories={data.Genres.rows}
                viewAllLink={'/categories'}
              />
            </div>
          );
        }}
      </Query>
    );
  }
}

export default injectIntl(Dashboard);
