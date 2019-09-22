import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { injectIntl, InjectedIntlProps } from 'react-intl';

import LoadingVideoBlock from '../../shared/VideoBlock/components/LoadingVideoBlock';
import VideoBlock from '../../shared/VideoBlock';
import PaginationBox from '../../shared/PaginationBox';

const NewestEpisodesQuery = gql`
  query($pageCount:Int, $currentPage:Int) {
    NewestEpisodes(limit:$pageCount, offset: $currentPage) {
      rows {
        id,
        thumbnail,
        episode_order,
        Release {
          id,
          release_order,
          title,
          background,
          Anime {
            id,
            title
          }
        }
      },
      count
    },
  }
`;


type PropType = InjectedIntlProps & {};

type StateType = {
  currentPage: Number,
};

// How many records should be shown per page.
const pageCount = 8;

class NewestEpisodes extends React.Component<PropType, StateType> {
  constructor(props) {
    super(props);

    this.state = {
      // Pagination state values
      currentPage: 0,
    };
  }

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
      <Query
        query={NewestEpisodesQuery}
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
                    id: "cactus.newest_episodes_section_title",
                    defaultMessage: "Newest episodes"
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
      </Query>
    );
  }
}


export default injectIntl(NewestEpisodes);