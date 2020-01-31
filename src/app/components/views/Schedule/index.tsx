import React from 'react';

import ScheduleQuery from './ScheduleQuery';
import ScheduleList from '../../shared/ScheduleList';
import LoadingSpinner from '../../shared/LoadingSpinner';

export default (): JSX.Element => (
  <ScheduleQuery>
    {({ loading, error, data }): JSX.Element => {
      if (loading) {
        return (
          <div className="main-content no-padding">
            <LoadingSpinner />
          </div>
        );
      }

      if (error) return <p>Error :(</p>;

      return (
        <div className="main-content">
          <ScheduleList
            WeekDays={data.AiringReleases}
          />
        </div>
      );
    }}
  </ScheduleQuery>
);
