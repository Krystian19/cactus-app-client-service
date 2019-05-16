import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import React from 'react';
import { Player } from 'video-react';
import { RouteComponentProps, withRouter } from "react-router";
import window from 'global'
import {
  Link,
} from 'react-router-dom';

import LoadingSpinner from '../../shared/LoadingSpinner';
import HLSSource from './components/HLSSource';

const AnimeVideoQuery = gql`
  query ($id:Int!) {
    Episode(id:$id) {
      id,
      thumbnail,
      episodeOrder,
      EarlierEpisode {
        id,
        episodeOrder
      },
      LaterEpisode {
        id,
        episodeOrder
      },
      Season {
        id,
        poster,
        title,
        seasonOrder
      },
      EpisodeVersions {
        id,
        episode_url,
        Language {
          id,
          name,
          iso_code
        },
      }
    }
  }
`;

type PathParamsType = {
  id: string,
}

type PropType = RouteComponentProps<PathParamsType> & {};

class AnimeVideo extends React.Component<PropType> {
  constructor(props) {
    super(props);

    const { match: { params } } = this.props;
    console.log(`Looking for an episode with the id: ${params.id}`);
  }

  // componentDidMount() {
  //   // if (typeof window !== "undefined" && window) {
  //     const Hls = require('hls.js');
  //     const hls = new Hls();
  //     console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
  //     console.log(hls);
  //   // }
  // }

  render() {
    const { history } = this.props;
    const { match: { params } } = this.props;
    return (
      <Query query={AnimeVideoQuery} variables={{ id: Number(params.id) }}>
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
          const { Episode } = data;
          return (
            <div className="main-content no-padding">
              <div className="anime-watch-episode">
                <div className="anime-watch-episode-container">
                  <div className="anime-watch-episode-video">
                    {/* <iframe
                        src="https://streamango.com/embed/brbamcadtlcnmttr"
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        scrolling="no"
                        allowFullScreen="allowfullscreen"
                        title="episode-video"
                      /> */}
                    <Player
                      // playsInline={true}
                      poster={
                        (Episode.thumbnail)
                          ? `/img_cdn/${Episode.thumbnail}`
                          : '/img/thumbnail_placeholder.png'
                      }
                    // src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                    // src={`/video_cdn/${Episode.EpisodeVersions[0].episode_url}`}
                    >
                      <HLSSource
                        isVideoChild={true}
                        src={
                          `/video_cdn/${
                            Episode.EpisodeVersions[0].episode_url
                          }/index.m3u8`}
                      />
                    </Player>
                  </div>
                  <div className="anime-watch-episode-description">
                    <div className="left-side">
                      <div className="cover">
                        <Link to={`/anime/detail/${Episode.Season.id}`}>
                          <img
                            src={
                              (Episode.Season.poster)
                                ? `/img_cdn/${Episode.Season.poster}`
                                : '/img/poster_placeholder.jpg'

                            }
                            alt="cover"
                          />
                        </Link>
                      </div>
                      <div className="info">
                        <h1>
                          <Link to={`/anime/detail/${Episode.Season.id}`}>
                            {Episode.Season.title}
                          </Link>
                        </h1>
                        <h2>
                          {`Episode ${Episode.episodeOrder}`}
                        </h2>
                      </div>
                    </div>
                    <div className="right-side">
                      <div className="controls">
                        {
                          Episode.EarlierEpisode
                          && (
                            <div
                              className="previous-option"
                              data-tippy-content="Tooltip C"
                              onClick={
                                () => history.push(
                                  `/anime/video/${Episode.EarlierEpisode.id}`,
                                )}
                              onKeyPress={
                                () => history.push(
                                  `/anime/video/${Episode.EarlierEpisode.id}`,
                                )}
                              role="menuitem"
                              tabIndex={-1}
                            >
                              <div className="icon">
                                {/* <i className="fa fa-chevron-left" /> */}
                              </div>
                              <div className="text">Previous</div>
                            </div>
                          )
                        }
                        <div
                          className="list-option"
                          onClick={
                            () => history.push(
                              `/anime/detail/${Episode.Season.id}`,
                            )}
                          onKeyPress={
                            () => history.push(
                              `/anime/detail/${Episode.Season.id}`,
                            )}
                          role="menuitem"
                          tabIndex={-2}
                        >
                          <div className="icon">
                            <i className="fa fa-list-ul" />
                          </div>
                        </div>
                        {
                          Episode.LaterEpisode
                          && (
                            <div
                              className="next-option"
                              onClick={
                                () => history.push(
                                  `/anime/video/${Episode.LaterEpisode.id}`,
                                )}
                              onKeyPress={
                                () => history.push(
                                  `/anime/video/${Episode.LaterEpisode.id}`,
                                )}
                              role="menuitem"
                              tabIndex={-3}
                            >
                              <div className="text"> Next </div>
                              <div className="icon">
                                {/* <i className="fa fa-chevron-right" /> */}
                              </div>
                            </div>
                          )
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(AnimeVideo);
