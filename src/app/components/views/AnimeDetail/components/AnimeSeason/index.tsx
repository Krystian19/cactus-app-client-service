import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import React from 'react';
import {
  Link,
} from 'react-router-dom';
import Season from '../../../../@types/Season';
import LazyImage from '../../../../shared/LazyImage';
import PaginationBox from '../../../../shared/PaginationBox';

const GetSeasonQuery = gql`
  query($id:Int, $pageCount:Int, $currentPage:Int) {
    getSeason(id:$id) {
      id,
      title,
      episodeCount,
      Episodes(limit:$pageCount, offset: $currentPage) {
        id,
        thumbnail,
        episodeOrder,
        EpisodeVersions {
          id,
          episode_url,
          title,
          Language {
            id,
            name,
            iso_code
          },
        }
      }
    }
  }
`;

type PropType = {
  season: Season,
}

type StateType = {
  currentPage: Number,
}

// How many records should be shown per page.
const pageCount = 9;

export default class AnimeSeason extends React.Component<PropType, StateType> {
  constructor(props) {
    super(props);

    this.state = {
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
    const { season } = this.props;
    const { currentPage } = this.state;

    // console.log(`This is the current page ${currentPage}`);

    return (
      <Query
        query={GetSeasonQuery}
        variables={{
          id: Number(season.id),
          pageCount: pageCount,
          currentPage: (Number(currentPage) * pageCount),
        }}
      >
        {({ loading, error, data }) => {
          // Only show anything when data is available
          if (loading || error || (!data)) return null;

          console.log(data);
          return (
            <div className="anime-season">
              {/* <span className="anime-season-title">
                {`${data.getSeason.title} (Season ${data.getSeason.seasonOrder})`}
              </span> */}
              <div className="anime-season-videos">
                <div className="anime-small-thumbnail-list">

                  {
                    data.getSeason.Episodes.map(episode => (
                      <div key={episode.id} className="anime-small-thumbnail fade-in">
                        <Link to={`/anime/video/${episode.id}`}>
                          <div className="cover">
                            {/* <img
                              src={`/img_cdn/${episode.thumbnail}`}
                              alt="thumbnail"
                              className="anime-small-thumbnail"
                            /> */}
                            <LazyImage
                              src={`/img_cdn/${episode.thumbnail}`}
                              errorSrc="/img/thumbnail_placeholder.png"
                              alt="thumbnail"
                              className="anime-small-thumbnail"
                            />
                            <div className="overlay hover_hidden darken">
                              <svg className="play" viewBox="0 0 24 24">
                                <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                              </svg>
                            </div>
                          </div>
                        </Link>
                        <div className="info">
                          <div className="title">
                            <div className="title-container">
                              {(episode.EpisodeVersions[0]
                                && episode.EpisodeVersions[0].title)
                                && (
                                  episode.EpisodeVersions[0].title
                                )}
                            </div>
                            <div className="detail-container">
                              Ep.
                              {episode.episodeOrder}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  }

                </div>
                <PaginationBox
                  pageCount={pageCount}
                  itemCount={data.getSeason.episodeCount}
                  currentPage={currentPage}
                  goForwardCB={() => {
                    const lastPage = Math.ceil(
                      data.getSeason.episodeCount / pageCount,
                    );

                    // If this is the last page, don't go forward
                    if ((Number(currentPage) + 1) === lastPage) return;

                    this.PageForward();
                  }}
                  goBackwardsCB={() => this.PageBackwards()}
                  setCurrentPageCB={this.setCurrentPage}
                />
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}
