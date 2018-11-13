import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import React, { Component } from 'react';
import Sidebar from '../../shared_components/Sidebar';
import AnimeSeason from './components/AnimeSeason';

const AnimeInfoQuery = gql`
query($id:Int) {
    getAnime(id: $id) {
      id,
      title,
      Descriptions {
        id,
        description,
        Language {
          id,
          name,
          iso_code
        }
      },
      Genres {
        id,
        title
      },
      Seasons {
        id,
        seasonOrder,
        title,
        startedAiring,
        stoppedAiring,
        poster,
        background,
        AlternativeTitles {
          id,
          title
        },
        Episodes {
          id,
          thumbnail,
          episodeOrder,
          EpisodeTitles {
            id,
            text,
            Language {
              id,
              name,
              iso_code,
            }
          },
          EpisodeVersions {
            id,
            episode_url
            Language {
              id,
              name,
              iso_code
            },
          }
        }
      }
      
    }
  }
`;

export default class AnimeInfoView extends Component {
  constructor(props) {
    super(props);

    const { match: { params } } = this.props;
    console.log(`Looking for anime with the id: ${params.id}`);
  }

  render() {
    const { history } = this.props;
    const { match: { params } } = this.props;
    return (
      <div className="main-container">
        <Sidebar props={{ history }} />
        <div className="main-content no-padding">

          <Query query={AnimeInfoQuery} variables={{ id: Number(params.id) }}>
            {({ loading, error, data }) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p>Error :(</p>;

              console.log(data);
              const { getAnime } = data;
              const latestSeason = getAnime.Seasons[getAnime.Seasons.length - 1];
              return (
                <div className="anime-info">
                  <div
                    className="head"
                    style={{
                      backgroundImage:
                        `url(/img_cdn/${latestSeason.background})`,
                    }}
                  >
                    <div className="overlay" />
                    <div className="content">
                      <div className="centered-content">
                        <div className="small-side" />
                        <div className="big-side">
                          <h1 className="anime-title">
                            {getAnime.title}
                          </h1>
                          <div className="genres">
                            {getAnime.Genres.map(genre => (
                              <a key={genre.id} className="genre-tag" href="http://www.google.com">{genre.title}</a>
                            ))
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="main">
                    <div className="content">
                      <div className="small-side">
                        <div className="details">
                          <div className="cover">
                            <img src={`/img_cdn/${latestSeason.poster}`} alt="cover" />
                          </div>
                          <div className="cover-details">

                            <div className="cover-detail-row">
                              <span className="cover-detail-row-title">AVG. SCORE</span>
                              <span className="cover-detail-row-detail">4.64/5</span>
                            </div>

                            <div className="cover-detail-row">
                              <span className="cover-detail-row-title">type</span>
                              <span className="cover-detail-row-detail">tv</span>
                            </div>

                            <div className="cover-detail-row">
                              <span className="cover-detail-row-title">aired</span>
                              <span className="cover-detail-row-detail">
                                APR 2009 - JUL 2010
                              </span>
                            </div>

                            <div className="cover-detail-row">
                              <span className="cover-detail-row-title">status</span>
                              <span className="cover-detail-row-detail">completed</span>
                            </div>

                          </div>
                        </div>
                      </div>
                      <div className="big-side">
                        <div className="sinopsis">
                          <p>
                            {getAnime.Descriptions[0].description}
                          </p>
                        </div>
                        <div className="anime-seasons">
                          {
                            getAnime.Seasons.map(season => (
                              <AnimeSeason key={season.id} props={{ season }} />
                            ))
                          }
                        </div>

                      </div>
                    </div>
                  </div>
                </div>

              );
            }}
          </Query>


        </div>
      </div>
    );
  }
}
