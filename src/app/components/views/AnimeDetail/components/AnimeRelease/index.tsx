import React from 'react';
import { Link } from 'react-router-dom';
import { GQLRelease } from '@cactus-app/types';

import ReleaseQuery from './ReleaseQuery';
import LazyImage from '../../../../shared/LazyImage';
import PaginationBox from '../../../../shared/PaginationBox';
import LoadingAnimeRelease from '../LoadingAnimeRelease';

type PropType = {
  season: GQLRelease,
};

type StateType = {
  currentPage: Number,
};

// How many records should be shown per page.
const pageCount = 9;

export default class AnimeRelease extends React.Component<PropType, StateType> {
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
      <ReleaseQuery
        variables={{
          id: Number(season.id),
          pageCount: pageCount,
          currentPage: (Number(currentPage) * pageCount),
        }}
      >
        {({ loading, error, data }) => {

          // Only show anything when data is available
          if (loading || error || (!data)) {
            return (
              <LoadingAnimeRelease count={pageCount} />
            );
          }

          console.log(data);
          return (
            <div className="anime-season">
              {/* <span className="anime-season-title">
                {`${data.Release.title} (Release ${data.Release.release_order})`}
              </span> */}
              <div className="anime-season-videos">
                <div className="anime-small-thumbnail-list">

                  {
                    data.Release.Episodes.rows.map(episode => (
                      <div
                        key={episode.id}
                        className="anime-small-thumbnail fade-in"
                      >
                        <Link to={`/anime/video/${episode.id}`}>
                          <div className="cover shimmer-load">
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
                              noLoadingPlaceholder={true}
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
                              {`Episode ${episode.episode_order}`}
                            </div>
                            <div className="detail-container" />
                          </div>
                        </div>
                      </div>
                    ))
                  }

                </div>
                <PaginationBox
                  pageCount={pageCount}
                  itemCount={data.Release.Episodes.count}
                  currentPage={currentPage}
                  goForwardCB={() => {
                    const lastPage = Math.ceil(
                      data.Release.Episodes.count / pageCount,
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
      </ReleaseQuery>
    );
  }
}
