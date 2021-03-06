import React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';

import HottestVideoBlock from '../../shared/HottestVideoBlock';
import LoadingHottestVideoBlock
  from '../../shared/HottestVideoBlock/components/LoadingHottestVideoBlock';
import VideoBlock from '../../shared/VideoBlock';
import LoadingVideoBlock from '../../shared/VideoBlock/components/LoadingVideoBlock';
import CategoriesBlock from '../../shared/CategoriesBlock';
import DashboardQuery from './DashboardQuery';

type PropType = InjectedIntlProps & {};

const Dashboard = (props: PropType): JSX.Element => {
  const { intl: { formatMessage } } = props;
  return (
    <DashboardQuery>
      {({ loading, error, data }): JSX.Element => {
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

        const { HottestEpisodes, NewestEpisodes, Genres } = data;

        return (
          <div className="main-content no-padding">
            <HottestVideoBlock
              title={
                formatMessage({
                  id: 'cactus.hot_section_title',
                  defaultMessage: '🔥 right now',
                })
              }
              episodes={HottestEpisodes.rows}
              viewAllLink="/hottest_episodes"
            />
            <VideoBlock
              title={
                formatMessage({
                  id: 'cactus.what_is_new',
                  defaultMessage: 'What\'s new ?',
                })
              }
              episodes={NewestEpisodes.rows}
              viewAllLink="/newest_episodes"
            />
            <CategoriesBlock
              title={
                formatMessage({
                  id: 'cactus.categories',
                  defaultMessage: 'Categories',
                })
              }
              categories={Genres.rows}
              viewAllLink="/categories"
            />
          </div>
        );
      }}
    </DashboardQuery>
  );
};

export default injectIntl(Dashboard);
