import React, { Component } from 'react';
import Sidebar from '../../shared_components/Sidebar';

export default class AnimeVideoView extends Component {
  constructor(props) {
    super(props);

    const { match: { params } } = this.props;
    console.log(`Looking for an episode with the id: ${params.id}`);
  }

  render() {
    const { history } = this.props;
    return (
      <div className="main-container">
        <Sidebar props={{ history }} />
        <div className="main-content no-padding">
          {/* Start of main content */}

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
                    <img src="https://cdn.masterani.me/poster/1/2988JGETCml5.jpg" alt="cover" />
                  </div>
                  <div className="info">
                    <h1> Banana Fish </h1>
                    <h2> Episode 2 </h2>
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

            {/* End of main content */}
          </div>
        </div>
      </div>
    );
  }
}
