import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { RouteComponentProps, withRouter } from "react-router";
import React from 'react';


import AnimeSeason from './components/AnimeSeason';
import LoadingSpinner from '../../shared/LoadingSpinner';
import LazyImage from '../../shared/LazyImage';
import JSTtoLocalTime from '../../../utils/JSTtoLocalTime';
import MonthYearExtractor from '../../../utils/MonthYearExtractor';

const AnimeInfoQuery = gql`
  query($id:Int) {
    getSeason(id: $id) {
      id,
      seasonOrder,
      title,
      episodeCount
      Descriptions {
        id,
        description,
        Language {
          id,
          name,
          iso_code
        }
      },
      startedAiring,
      stoppedAiring,
      poster,
      background,
      Genres {
        id,
        title
      },
    }
  }
`;

type PathParamsType = {
  id: string,
}

type PropType = RouteComponentProps<PathParamsType> & {};

class AnimeDetail extends React.Component<PropType> {
  constructor(props) {
    super(props);

    const { match: { params } } = this.props;
    console.log(`Looking for anime with the id: ${params.id}`);
  }

  render() {
    const { match: { params } } = this.props;
    return (
      <div className="main-content no-padding">
        <Query query={AnimeInfoQuery} variables={{ id: Number(params.id) }}>
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
            const { getSeason } = data;
            return (
              <div className="anime-info">
                <div
                  className={`head 
                      ${(!getSeason.background) ? 'missing-background' : ''}
                    `}
                  style={{
                    backgroundImage:
                      (getSeason.background)
                        ? `url(/img_cdn/${getSeason.background})`
                        : 'url(/img/default_background.jpg)',
                  }}
                >
                  <div className="overlay" />
                  <div className="content">
                    <div className="centered-content">
                      <div className="small-side" />
                      <div className="big-side">
                        <h1 className="anime-title">
                          {getSeason.title}
                        </h1>
                        <div className="genres">
                          {getSeason.Genres.map(genre => (
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
                          <LazyImage
                            src={`/img_cdn/${getSeason.poster}`}
                            errorSrc="/img/poster_placeholder.jpg"
                            alt="cover"
                            className="fade-in"
                            noLoadingSpinner
                          />
                        </div>
                        <div className="cover-details">

                          <div className="cover-detail-row">
                            <span className="cover-detail-row-title">AVG. SCORE</span>
                            <span className="cover-detail-row-detail">
                              &nbsp;4.64/5 <i className="fa fa-star" />
                            </span>
                          </div>

                          <div className="cover-detail-row">
                            <span className="cover-detail-row-title">EPS</span>
                            <span className="cover-detail-row-detail">
                              {data.getSeason.episodeCount}
                            </span>
                          </div>

                          <div className="cover-detail-row">
                            <span className="cover-detail-row-title">AIRED</span>
                            <span className="cover-detail-row-detail">
                              {/* If it hasn't been aired yet */}
                              {!data.getSeason.startedAiring
                                && 'Not airing yet'
                              }
                              {/* If it started airing */}
                              {data.getSeason.startedAiring
                                && `
                                  ${
                                MonthYearExtractor(
                                  JSTtoLocalTime(data.getSeason.startedAiring),
                                )
                                } 
                                  - 
                                  ${ // If stoppedAiring DateTime String is defined
                                data.getSeason.stoppedAiring
                                  ? MonthYearExtractor(
                                    JSTtoLocalTime(data.getSeason.stoppedAiring),
                                  )
                                  : 'PRESENT'
                                }`
                              }
                              {/* APR 2009 - JUL 2010 */}
                            </span>
                          </div>

                          <div className="cover-detail-row">
                            <span className="cover-detail-row-title">status</span>
                            <span
                              className="cover-detail-row-detail"
                            >
                              {data.getSeason.stoppedAiring ? 'COMPLETED' : 'AIRING'}
                            </span>
                          </div>

                        </div>
                      </div>
                    </div>
                    <div className="big-side">
                      <div className="sinopsis">
                        <p>
                          {getSeason.Descriptions[0].description}
                        </p>
                      </div>
                      <div className="anime-seasons">
                        <AnimeSeason key={getSeason.id} season={getSeason} />
                      </div>

                    </div>
                  </div>
                </div>
              </div>

            );
          }}
        </Query>
      </div>
    );
  }
}

export default withRouter(AnimeDetail);
