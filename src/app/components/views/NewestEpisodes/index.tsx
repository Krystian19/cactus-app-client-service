import React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';

import NewestEpisodesQuery from './NewestEpisodesQuery';
import LoadingVideoBlock from '../../shared/VideoBlock/components/LoadingVideoBlock';
import VideoBlock from '../../shared/VideoBlock';
import PaginationBox from '../../shared/PaginationBox';

type PropType = InjectedIntlProps & {};

type StateType = {
  currentPage: Number,
};

// How many records should be shown per page.
const pageCount = 8;

class NewestEpisodes extends React.Component<PropType, StateType> {
  state = {
    currentPage: 0,
  };

  PageForward = () => {
    const { currentPage } = this.state;
    this.setState({ currentPage: (Number(currentPage) + 1) });
  }

  PageBackwards = () => {
    const { currentPage } = this.state;

    // Can't go backwards if page is already 0
    if (currentPage === 0) return;

    this.setState({ currentPage: (Number(currentPage) - 1) });
  }

  setCurrentPage = (page) => {
    // If arg is null then ignore it
    if ((page === null) || (page === undefined)) return;

    this.setState({ currentPage: page });
  }

  render() {
    const { currentPage } = this.state;
    const { formatMessage } = this.props.intl;

    return (
      <NewestEpisodesQuery
        variables={{
          pageCount: pageCount,
          currentPage: (Number(currentPage) * pageCount),
        }}
      >
        {({ loading, error, data }) => {
          if (loading || error) {
            return (
              <div className="main-content no-padding">
                <LoadingVideoBlock
                  count={pageCount}
                />
              </div>
            );
          }

          console.log(data);
          return (
            <div className="main-content no-padding">
              <VideoBlock
                title={
                  formatMessage({
                    id: "cactus.what_is_new",
                    defaultMessage: "What's new ?"
                  })
                }
                episodes={data.NewestEpisodes.rows}
              />
              {
                data.NewestEpisodes.rows.length !== 0
                && (
                  <PaginationBox
                    pageCount={pageCount}
                    itemCount={data.NewestEpisodes.count}
                    currentPage={currentPage}
                    goForwardCB={() => {
                      const lastPage = Math.ceil(
                        data.NewestEpisodes.count / pageCount,
                      );

                      // If this is the last page, don't go forward
                      if ((Number(currentPage) + 1) === lastPage) return;

                      this.PageForward();
                    }}
                    goBackwardsCB={() => this.PageBackwards()}
                    setCurrentPageCB={this.setCurrentPage}
                  />
                )
              }
            </div>
          );
        }}
      </NewestEpisodesQuery>
    );
  }
}

export default injectIntl(NewestEpisodes);