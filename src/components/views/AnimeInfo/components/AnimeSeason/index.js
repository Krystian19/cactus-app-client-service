import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import React, { Component } from 'react';
import {
  Link,
} from 'react-router-dom';
import LazyImage from '../../../../shared_components/LazyImage';
import PaginationBox from '../../../../shared_components/PaginationBox';

const GetSeasonQuery = gql`
  query($id:Int) {
    getSeason(id:$id) {
      id,
      seasonOrder,
      title,
      startedAiring,
      stoppedAiring,
      poster,
      background,
      episodeCount,
      AlternativeTitles {
        id,
        title
      },
      Episodes {
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

export default class AnimeSeason extends Component {
  constructor(props) {
    super(props);
    this.pageCount = 9;
    this.state = {
      episodePage: 0,
    };
  }

  PageForward = () => {
    const { episodePage } = this.state;
    this.setState({ episodePage: (episodePage + 1) });
  }

  PageBackwards = () => {
    const { episodePage } = this.state;

    // Can't go backwards if page is already 0
    if (episodePage === 0) return;

    this.setState({ episodePage: (episodePage - 1) });
  }

  render() {
    const { season } = this.props;
    const { episodePage } = this.state;
    return (
      <Query query={GetSeasonQuery} variables={{ id: Number(season.id) }}>
        {({ loading, error, data }) => {
          // Only show anything when data is available
          if (loading || error || (!data)) return null;

          console.log(data);
          return (
            <div className="anime-season">
              <span className="anime-season-title">
                {`${data.getSeason.title} (Season ${data.getSeason.seasonOrder})`}
              </span>
              <div className="anime-season-videos">
                <div className="anime-small-thumbnail-list">

                  {
                    data.getSeason.Episodes.map(episode => (
                      <div key={episode.id} className="anime-small-thumbnail">
                        <Link to={`/anime/video/${episode.id}`}>
                          <div className="cover">
                            {/* <img
                              src={`/img_cdn/${episode.thumbnail}`}
                              alt="thumbnail"
                              className="anime-small-thumbnail"
                            /> */}
                            <LazyImage
                              src={`/img_cdn/${episode.thumbnail}`}
                              errorSrc="/img_cdn/test.jpg"
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
                  pageCount={this.pageCount}
                  itemCount={data.getSeason.episodeCount}
                  goForwardCB={() => console.log('So ...  you wanna go forward ?')}
                  goBackwardsCB={() => console.log('So ...  you wanna go backwards ?')}
                />
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}
