import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import React, { Component } from 'react';
import { Player } from 'video-react';
import {
  Link,
} from 'react-router-dom';
import Sidebar from '../../shared_components/Sidebar';

const AnimeVideoQuery = gql`
  query ($id:Int) {
    getEpisode(id:$id) {
      id,
      thumbnail,
      episodeOrder,
      EarlierEpisode {
        id
      },
      LaterEpisode {
        id
      },
      Season {
        id,
        poster,
        title
        Anime {
          id,
          title
        }
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

export default class AnimeVideoView extends Component {
  constructor(props) {
    super(props);

    const { match: { params } } = this.props;
    console.log(`Looking for an episode with the id: ${params.id}`);
  }

  render() {
    const { history } = this.props;
    const { match: { params } } = this.props;
    return (
      <div className="main-container">
        <Sidebar props={{ history }} />
        <div className="main-content no-padding">
          {/* Start of main content */}

          <Query query={AnimeVideoQuery} variables={{ id: Number(params.id) }}>
            {({ loading, error, data }) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p>Error :(</p>;

              console.log(data);
              const { getEpisode } = data;
              return (

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
                        playsInline
                        poster={`/img_cdn/${getEpisode.thumbnail}`}
                        // src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                        src={`/video_cdn/${getEpisode.EpisodeVersions[0].episode_url}`}
                      />
                    </div>
                    <div className="anime-watch-episode-description">
                      <div className="left-side">
                        <div className="cover">
                          <Link to={`/anime/info/${getEpisode.Season.Anime.id}`}>
                            <img
                              src={`/img_cdn/${getEpisode.Season.poster}`}
                              alt="cover"
                            />
                          </Link>
                        </div>
                        <div className="info">
                          <h1>
                            <Link to={`/anime/info/${getEpisode.Season.Anime.id}`}>
                              {getEpisode.Season.title}
                            </Link>
                          </h1>
                          <h2>
                            {`Episode ${getEpisode.episodeOrder}`}
                          </h2>
                        </div>
                      </div>
                      <div className="right-side">
                        <div className="controls">
                          {
                            getEpisode.EarlierEpisode
                            && (
                              <div
                                className="previous-option"
                                onClick={
                                  () => history.push(
                                    `/anime/video/${getEpisode.EarlierEpisode.id}`)}
                                onKeyPress={
                                  () => history.push(
                                    `/anime/video/${getEpisode.EarlierEpisode.id}`)}
                                role="menuitem"
                                tabIndex={-1}
                              >
                                <div className="icon">
                                  <i className="fas fa-chevron-left" />
                                </div>
                                <div className="text"> Prev </div>
                              </div>
                            )
                          }
                          <div
                            className="list-option"
                            onClick={
                              () => history.push(
                                `/anime/info/${getEpisode.Season.Anime.id}`,
                              )}
                            onKeyPress={
                              () => history.push(
                                `/anime/info/${getEpisode.Season.Anime.id}`,
                              )}
                            role="menuitem"
                            tabIndex={-2}
                          >
                            <div className="icon">
                              <i className="fas fa-list-ul" />
                            </div>
                          </div>
                          {
                            getEpisode.LaterEpisode
                            && (
                              <div
                                className="next-option"
                                onClick={
                                  () => history.push(
                                    `/anime/video/${getEpisode.LaterEpisode.id}`)}
                                onKeyPress={
                                  () => history.push(
                                    `/anime/video/${getEpisode.LaterEpisode.id}`)}
                                role="menuitem"
                                tabIndex={-3}
                              >
                                <div className="text"> Next </div>
                                <div className="icon">
                                  <i className="fas fa-chevron-right" />
                                </div>
                              </div>
                            )
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              );
            }}
          </Query>

          {/* End of main content */}
        </div>
      </div>
    );
  }
}
