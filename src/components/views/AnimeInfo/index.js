import React, { Component } from 'react';
import {
  Link,
} from 'react-router-dom';
import Sidebar from '../../shared_components/Sidebar';

export default class AnimeInfoView extends Component {
  constructor(props) {
    super(props);

    const { match: { params } } = this.props;
    console.log(`Looking for anime with the id: ${params.id}`);
  }

  render() {
    const { history } = this.props;
    return (
      <div className="main-container">
        <Sidebar props={{ history }} />
        <div className="main-content no-padding">
          {/* Start of main content */}

          <div className="anime-info">
            <div className="head" style={{ backgroundImage: 'url(https://cdn.masterani.me/wallpaper/0/2988rKaK503o.jpg)' }}>
              <div className="overlay" />
              <div className="content">
                <div className="centered-content">
                  <div className="small-side" />
                  <div className="big-side">
                    <h1 className="anime-title">
                      Tokyo Ghoul
                    </h1>
                    <div className="genres">
                      <a className="genre-tag" href="http://www.google.com"> Action </a>
                      <a className="genre-tag" href="http://www.google.com"> Horror </a>
                      <a className="genre-tag" href="http://www.google.com"> Magic </a>
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
                      <img src="https://cdn.masterani.me/poster/1/2988JGETCml5.jpg" alt="cover" />
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
                        <span className="cover-detail-row-detail">APR 2009 - JUL 2010</span>
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
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam vel reiciendis
                      commodi. Quo officia quae numquam molestiae quaerat consequatur magni sequi
                      earum repellat doloremque. Qui assumenda libero asperiores quae earum.
                    </p>
                  </div>
                  <div className="anime-seasons">
                    <div className="anime-season">
                      <span className="anime-season-title">Tokyo Ghoul (Season 1)</span>
                      <div className="anime-season-videos">
                        <div className="anime-small-thumbnail-list">

                          {/* Start of row */}
                          <div className="anime-small-thumbnail">
                            <Link to="/anime/video/1">
                              <div className="cover">
                                <img
                                  src="https://cdn.masterani.me/episodes/208Zrv8MtN.jpg"
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
                                <div className="title-container">Tragedy</div>
                                <div className="detail-container">Ep. 1</div>
                              </div>
                            </div>
                          </div>
                          <div className="anime-small-thumbnail">
                            <div className="cover">
                              <img src="https://cdn.masterani.me/episodes/10172gjoO4LIh.jpg" alt="thumbnail" className="anime-small-thumbnail" />
                              <div className="overlay hover_hidden darken">
                                <svg className="play" viewBox="0 0 24 24">
                                  <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                                </svg>
                              </div>
                            </div>
                            <div className="info">
                              <div className="title">
                                <div className="title-container">Incubation</div>
                                <div className="detail-container">Ep. 2</div>
                              </div>
                            </div>
                          </div>
                          <div className="anime-small-thumbnail">
                            <div className="cover">
                              <img src="https://cdn.masterani.me/episodes/105332xA3Z8zw.jpg" alt="thumbnail" className="anime-small-thumbnail" />
                              <div className="overlay hover_hidden darken">
                                <svg className="play" viewBox="0 0 24 24">
                                  <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                                </svg>
                              </div>
                            </div>
                            <div className="info">
                              <div className="title">
                                <div className="title-container">Dove</div>
                                <div className="detail-container">Ep. 3</div>
                              </div>
                            </div>
                          </div>
                          <div className="anime-small-thumbnail">
                            <div className="cover">
                              <img src="https://cdn.masterani.me/episodes/11187pinci8Kv.jpg" alt="thumbnail" className="anime-small-thumbnail" />
                              <div className="overlay hover_hidden darken">
                                <svg className="play" viewBox="0 0 24 24">
                                  <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                                </svg>
                              </div>
                            </div>
                            <div className="info">
                              <div className="title">
                                <div className="title-container">Supper</div>
                                <div className="detail-container">Ep. 4</div>
                              </div>
                            </div>
                          </div>
                          {/* End of row */}

                          {/* Start of row */}
                          <div className="anime-small-thumbnail">
                            <div className="cover">
                              <img src="https://cdn.masterani.me/episodes/11709ncpmCMvi.jpg" alt="thumbnail" className="anime-small-thumbnail" />
                              <div className="overlay hover_hidden darken">
                                <svg className="play" viewBox="0 0 24 24">
                                  <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                                </svg>
                              </div>
                            </div>
                            <div className="info">
                              <div className="title">
                                <div className="title-container">Scars</div>
                                <div className="detail-container">Ep. 5</div>
                              </div>
                            </div>
                          </div>
                          <div className="anime-small-thumbnail">
                            <div className="cover">
                              <img src="https://cdn.masterani.me/episodes/124716LBADU1f.jpg" alt="thumbnail" className="anime-small-thumbnail" />
                              <div className="overlay hover_hidden darken">
                                <svg className="play" viewBox="0 0 24 24">
                                  <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                                </svg>
                              </div>
                            </div>
                            <div className="info">
                              <div className="title">
                                <div className="title-container">Cloudburst</div>
                                <div className="detail-container">Ep. 6</div>
                              </div>
                            </div>
                          </div>
                          <div className="anime-small-thumbnail">
                            <div className="cover">
                              <img src="https://cdn.masterani.me/episodes/12894bFrm6W7n.jpg" alt="thumbnail" className="anime-small-thumbnail" />
                              <div className="overlay hover_hidden darken">
                                <svg className="play" viewBox="0 0 24 24">
                                  <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                                </svg>
                              </div>
                            </div>
                            <div className="info">
                              <div className="title">
                                <div className="title-container">Captivity</div>
                                <div className="detail-container">Ep. 7</div>
                              </div>
                            </div>
                          </div>
                          <div className="anime-small-thumbnail">
                            <div className="cover">
                              <img src="https://cdn.masterani.me/episodes/13042AVF01YdL.jpg" alt="thumbnail" className="anime-small-thumbnail" />
                              <div className="overlay hover_hidden darken">
                                <svg className="play" viewBox="0 0 24 24">
                                  <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                                </svg>
                              </div>
                            </div>
                            <div className="info">
                              <div className="title">
                                <div className="title-container">Circular</div>
                                <div className="detail-container">Ep. 8</div>
                              </div>
                            </div>
                          </div>
                          <div className="anime-small-thumbnail">
                            <div className="cover">
                              <img src="https://cdn.masterani.me/episodes/13345bUMi5atJ.jpg" alt="thumbnail" className="anime-small-thumbnail" />
                              <div className="overlay hover_hidden darken">
                                <svg className="play" viewBox="0 0 24 24">
                                  <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                                </svg>
                              </div>
                            </div>
                            <div className="info">
                              <div className="title">
                                <div className="title-container">Birdcage</div>
                                <div className="detail-container">Ep. 9</div>
                              </div>
                            </div>
                          </div>
                          {/* End of row */}

                        </div>
                      </div>
                    </div>
                    <div className="anime-season">
                      <span className="anime-season-title">Tokyo Ghoul √A ( Season 2 )</span>
                      <div className="anime-season-videos">
                        <div className="anime-small-thumbnail-list">

                          {/* Start of row */}
                          <div className="anime-small-thumbnail">
                            <div className="cover">
                              <img src="https://cdn.masterani.me/episodes/20458UGSqp6CQ.jpg" alt="thumbnail" className="anime-small-thumbnail" />
                              <div className="overlay hover_hidden darken">
                                <svg className="play" viewBox="0 0 24 24">
                                  <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                                </svg>
                              </div>
                            </div>
                            <div className="info">
                              <div className="title">
                                <div className="title-container">New Surge</div>
                                <div className="detail-container">Ep. 1</div>
                              </div>
                            </div>
                          </div>
                          <div className="anime-small-thumbnail">
                            <div className="cover">
                              <img src="https://cdn.masterani.me/episodes/20600jb45SVdb.jpg" alt="thumbnail" className="anime-small-thumbnail" />
                              <div className="overlay hover_hidden darken">
                                <svg className="play" viewBox="0 0 24 24">
                                  <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                                </svg>
                              </div>
                            </div>
                            <div className="info">
                              <div className="title">
                                <div className="title-container">Dancing Flower</div>
                                <div className="detail-container">Ep. 2</div>
                              </div>
                            </div>
                          </div>
                          <div className="anime-small-thumbnail">
                            <div className="cover">
                              <img src="https://cdn.masterani.me/episodes/20709Ja9czawM.jpg" alt="thumbnail" className="anime-small-thumbnail" />
                              <div className="overlay hover_hidden darken">
                                <svg className="play" viewBox="0 0 24 24">
                                  <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                                </svg>
                              </div>
                            </div>
                            <div className="info">
                              <div className="title">
                                <div className="title-container">Hangman</div>
                                <div className="detail-container">Ep. 3</div>
                              </div>
                            </div>
                          </div>
                          <div className="anime-small-thumbnail">
                            <div className="cover">
                              <img src="https://cdn.masterani.me/episodes/20802n0SRkNxv.jpg" alt="thumbnail" className="anime-small-thumbnail" />
                              <div className="overlay hover_hidden darken">
                                <svg className="play" viewBox="0 0 24 24">
                                  <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                                </svg>
                              </div>
                            </div>
                            <div className="info">
                              <div className="title">
                                <div className="title-container">Deeper Layers</div>
                                <div className="detail-container">Ep. 4</div>
                              </div>
                            </div>
                          </div>
                          {/* End of row */}

                          {/* Start of row */}
                          <div className="anime-small-thumbnail">
                            <div className="cover">
                              <img src="https://cdn.masterani.me/episodes/20862mxbwxeiU.jpg" alt="thumbnail" className="anime-small-thumbnail" />
                              <div className="overlay hover_hidden darken">
                                <svg className="play" viewBox="0 0 24 24">
                                  <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                                </svg>
                              </div>
                            </div>
                            <div className="info">
                              <div className="title">
                                <div className="title-container">Rift</div>
                                <div className="detail-container">Ep. 5</div>
                              </div>
                            </div>
                          </div>
                          <div className="anime-small-thumbnail">
                            <div className="cover">
                              <img src="https://cdn.masterani.me/episodes/21071JggQUllx.jpg" alt="thumbnail" className="anime-small-thumbnail" />
                              <div className="overlay hover_hidden darken">
                                <svg className="play" viewBox="0 0 24 24">
                                  <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                                </svg>
                              </div>
                            </div>
                            <div className="info">
                              <div className="title">
                                <div className="title-container">Thousand Paths</div>
                                <div className="detail-container">Ep. 6</div>
                              </div>
                            </div>
                          </div>
                          <div className="anime-small-thumbnail">
                            <div className="cover">
                              <img src="https://cdn.masterani.me/episodes/21207kBFIxaUM.jpg" alt="thumbnail" className="anime-small-thumbnail" />
                              <div className="overlay hover_hidden darken">
                                <svg className="play" viewBox="0 0 24 24">
                                  <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                                </svg>
                              </div>
                            </div>
                            <div className="info">
                              <div className="title">
                                <div className="title-container">Permeation</div>
                                <div className="detail-container">Ep. 7</div>
                              </div>
                            </div>
                          </div>
                          <div className="anime-small-thumbnail">
                            <div className="cover">
                              <img src="https://cdn.masterani.me/episodes/21303gPrXR1wN.jpg" alt="thumbnail" className="anime-small-thumbnail" />
                              <div className="overlay hover_hidden darken">
                                <svg className="play" viewBox="0 0 24 24">
                                  <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                                </svg>
                              </div>
                            </div>
                            <div className="info">
                              <div className="title">
                                <div className="title-container">Old nines</div>
                                <div className="detail-container">Ep. 8</div>
                              </div>
                            </div>
                          </div>
                          <div className="anime-small-thumbnail">
                            <div className="cover">
                              <img src="https://cdn.masterani.me/episodes/21461PLsJ9y6I.jpg" alt="thumbnail" className="anime-small-thumbnail" />
                              <div className="overlay hover_hidden darken">
                                <svg className="play" viewBox="0 0 24 24">
                                  <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                                </svg>
                              </div>
                            </div>
                            <div className="info">
                              <div className="title">
                                <div className="title-container">City in waiting</div>
                                <div className="detail-container">Ep. 9</div>
                              </div>
                            </div>
                          </div>
                          {/* End of row */}

                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* End of main content */}
        </div>
      </div>
    );
  }
}
