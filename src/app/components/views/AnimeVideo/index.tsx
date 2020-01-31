import React from 'react';
import ReactPlayer from 'react-player';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  Link,
} from 'react-router-dom';

import AnimeVideoQuery from './AnimeVideoQuery';
import EpisodeSeenMutation from './EpisodeSeenMutation';
import LazyImage from '../../shared/LazyImage';
import LoadingAnimeVideo from './components/LoadingAnimeVideo';
import base64Content from '../../../utils/base64Content';

type PathParamsType = {
  id: string;
};

type PropType = RouteComponentProps<PathParamsType> & {};

type StateType = {
  isMounted: boolean;
};

class AnimeVideo extends React.Component<PropType, StateType> {
  state = { isMounted: false };

  componentDidMount = (): void => {
    this.setState({ isMounted: true });
  }

  render = (): JSX.Element => {
    const { isMounted } = this.state;
    const { match: { params } } = this.props;
    return (
      <AnimeVideoQuery
        variables={{ id: Number(params.id) }}
      >
        {({ loading, error, data }): JSX.Element => {
          if (loading || error) {
            return (
              <LoadingAnimeVideo />
            );
          }

          const { Episode } = data;
          const videoUrl = `/video_cdn/${Episode.episode_code}/index.m3u8`;
          return (
            <div className="main-content no-padding">
              <div className="anime-watch-episode">
                <div className="anime-watch-episode-container">
                  <div className="anime-watch-episode-video">
                    {
                      isMounted && (
                        <EpisodeSeenMutation>
                          {(episodeSeen): JSX.Element => (
                            <ReactPlayer
                              className="react-player"
                              url={
                                /**
                                 * @Note Safari presents a lot of bugs if the mime-type
                                 * of the video source is not of the format 
                                 * "application/vnd.apple.mpegURL", so we check if this
                                 * browser supports it first. (9-10-2019)
                                 */
                                document
                                  .createElement('video')
                                  .canPlayType('application/vnd.apple.mpegURL')
                                  ? [{
                                    src: videoUrl, type: 'application/vnd.apple.mpegurl'
                                  }]
                                  : videoUrl
                              }
                              light={
                                (Episode.thumbnail)
                                  ? `/img_cdn/${Episode.thumbnail}`
                                  : '/img/thumbnail_placeholder.png'
                              }
                              playing={true}
                              controls={true}
                              width="100%"
                              height="100%"
                              onStart={
                                (): void => { episodeSeen({ variables: { id: Episode.id } }) }
                              }
                            />
                          )}
                        </EpisodeSeenMutation>
                      )
                    }
                  </div>
                  <div className="anime-watch-episode-description">
                    <div className="left-side">
                      <div className="cover">
                        <Link to={`/anime/detail/${Episode.Release.id}`}>
                          <LazyImage
                            src={`/img_cdn/${Episode.Release.poster}`}
                            errorSrc={base64Content.cactus_poster_placeholder}
                            alt="cover"
                            className="fade-in"
                            posterPlaceholder={true}
                          />
                        </Link>
                      </div>
                      <div className="info">
                        <h1>
                          <Link to={`/anime/detail/${Episode.Release.id}`}>
                            {Episode.Release.title}
                          </Link>
                        </h1>
                        <h2>
                          {`Episode ${Episode.episode_order}`}
                        </h2>
                      </div>
                    </div>
                    <div className="right-side">
                      <div className="controls">
                        {
                          Episode.EarlierEpisode
                          && (
                            <Link
                              className="previous-option"
                              data-tippy-content="Tooltip C"
                              to={`/anime/video/${Episode.EarlierEpisode.id}`}
                              role="menuitem"
                              tabIndex={-1}
                            >
                              <div className="icon">
                                {/* <i className="fa fa-chevron-left" /> */}
                              </div>
                              <div className="text">Previous</div>
                            </Link>
                          )
                        }
                        <Link
                          className="list-option"
                          to={`/anime/detail/${Episode.Release.id}`}
                          role="menuitem"
                          tabIndex={-2}
                        >
                          <div className="icon">
                            <i className="fa fa-list-ul" />
                          </div>
                        </Link>
                        {
                          Episode.LaterEpisode
                          && (
                            <Link
                              className="next-option"
                              role="menuitem"
                              tabIndex={-3}
                              to={`/anime/video/${Episode.LaterEpisode.id}`}
                            >
                              <div className="text"> Next </div>
                              <div className="icon">
                                {/* <i className="fa fa-chevron-right" /> */}
                              </div>
                            </Link>
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
      </AnimeVideoQuery>
    );
  }
}

export default withRouter(AnimeVideo);
