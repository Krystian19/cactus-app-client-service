import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { RouteComponentProps, withRouter } from "react-router";
import React from 'react';


import AnimeSeason from './components/AnimeSeason';
import CategoriesChips from '../../shared/CategoriesChips';
import LoadingSpinner from '../../shared/LoadingSpinner';
import LazyImage from '../../shared/LazyImage';
import JSTtoLocalTime from '../../../utils/JSTtoLocalTime';
import MonthYearExtractor from '../../../utils/MonthYearExtractor';
import base64Content from '../../../utils/base64Content';

const AnimeInfoQuery = gql`
  query($id:Int!) {
    Season(id: $id) {
      id,
      seasonOrder,
      title,
      EpisodeCount
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
};

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
          const { Season } = data;
          return (
            <div className="main-content no-padding">
              <div className="anime-info">
                <div
                  className={`head 
                      ${(!Season.background) ? 'missing-background' : ''}
                    `}
                  style={{
                    backgroundImage:
                      (Season.background)
                        ? `url(/img_cdn/${Season.background})`
                        : 'url(/img/default_background.jpg)',
                  }}
                >
                  <div className="overlay" />
                  <div className="content">
                    <div className="centered-content">
                      <div className="small-side" />
                      <div className="big-side">
                        <h1 className="anime-title">
                          {Season.title}
                        </h1>
                        <CategoriesChips categories={Season.Genres} />
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
                            src={`/img_cdn/${Season.poster}`}
                            errorSrc={base64Content.cactus_poster_placeholder}
                            alt="cover"
                            className="fade-in"
                            posterPlaceholder={true}
                          />
                        </div>
                        <div className="cover-details">

                          {/* Uncomment when a scoring mechanism is present */}
                          {/* <div className="cover-detail-row">
                            <span className="cover-detail-row-title">AVG. SCORE</span>
                            <span className="cover-detail-row-detail">
                              &nbsp;4.64/5 <i className="fa fa-star" />
                            </span>
                          </div> */}

                          <div className="cover-detail-row">
                            <span className="cover-detail-row-title">EPS</span>
                            <span className="cover-detail-row-detail">
                              {data.Season.EpisodeCount}
                            </span>
                          </div>

                          <div className="cover-detail-row">
                            <span className="cover-detail-row-title">AIRED</span>
                            <span className="cover-detail-row-detail">
                              {/* If it hasn't been aired yet */}
                              {!data.Season.startedAiring
                                && 'Not airing yet'
                              }
                              {/* If it started airing */}
                              {data.Season.startedAiring
                                && `
                                  ${
                                MonthYearExtractor(
                                  JSTtoLocalTime(data.Season.startedAiring),
                                )
                                } 
                                  - 
                                  ${ // If stoppedAiring DateTime String is defined
                                data.Season.stoppedAiring
                                  ? MonthYearExtractor(
                                    JSTtoLocalTime(data.Season.stoppedAiring),
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
                              {data.Season.stoppedAiring ? 'COMPLETED' : 'AIRING'}
                            </span>
                          </div>

                        </div>
                      </div>
                    </div>
                    <div className="big-side">
                      <div className="sinopsis">
                        <p>
                          {Season.Descriptions[0].description}
                        </p>
                      </div>
                      <div className="anime-seasons">
                        <AnimeSeason key={Season.id} season={Season} />
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

export default withRouter(AnimeDetail);
