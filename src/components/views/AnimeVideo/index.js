import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import React, { Component } from 'react';
import Sidebar from '../../shared_components/Sidebar';

const AnimeVideoQuery = gql`
  query ($id:Int) {
    getEpisode(id:$id) {
      id,
      thumbnail,
      episodeOrder,
      Season {
        id,
        poster,
        title
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
                      <iframe
                        src="https://streamango.com/embed/brbamcadtlcnmttr"
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        scrolling="no"
                        allowFullScreen="allowfullscreen"
                        title="episode-video"
                      />
                    </div>
                    <div className="anime-watch-episode-description">
                      <div className="left-side">
                        <div className="cover">
                          <img
                            src={`/img_cdn/${getEpisode.Season.poster}`}
                            alt="cover"
                          />
                        </div>
                        <div className="info">
                          <h1>
                            {getEpisode.Season.title}
                          </h1>
                          <h2>
                            Episode
                            {getEpisode.episodeOrder}
                          </h2>
                        </div>
                      </div>
                      <div className="right-side">
                        <div className="controls">
                          <div className="previous-option">
                            <div className="icon">
                              <i className="fas fa-chevron-left" />
                            </div>
                            <div className="text"> Prev </div>
                          </div>
                          <div className="list-option">
                            <div className="icon">
                              <i className="fas fa-list-ul" />
                            </div>
                          </div>
                          <div className="next-option">
                            <div className="text"> Next </div>
                            <div className="icon">
                              <i className="fas fa-chevron-right" />
                            </div>
                          </div>
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
