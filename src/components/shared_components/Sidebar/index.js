import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import React, { Component } from 'react';
import {
  Link,
} from 'react-router-dom';

const RandomAnimeQuery = gql`
 query {
    getRandomAnime {
      id,
      title
    }
  }
`;

export default class Sidebar extends Component {
  // constructor() {
  //   super()
  // }

  goToIndex = () => {
    const { props: { history } } = this.props;
    history.push('/');
  }

  render() {
    return (
      <div className="sidebar">
        <div className="sidebar-top-options">
          <div className="sidebar-option">
            <div
              className="clickable"
              onClick={this.goToIndex}
              onKeyPress={this.goToIndex}
              role="menuitem"
              tabIndex="0"
            />
            <embed src="/img/logo.svg" className="logo" />
          </div>
        </div>
        <div className="sidebar-center-options">
          <div className="sidebar-option">
            <Link to="/anime" tabIndex="-1">
              <i className="fas fa-search" />
            </Link>
          </div>
          <div className="sidebar-option">
            <Link to="/schedule" tabIndex="-2">
              <i className="fas fa-calendar-alt" />
            </Link>
          </div>

          <Query query={RandomAnimeQuery}>
            {({
              loading, error, data, refetch,
            }) => {
              // While request is loading no option is shown
              if (loading) return false;

              // If there was an error in the request no option is shown
              if (error) return false;

              console.log(data);

              // If no data received
              if (!data.getRandomAnime) return false;

              return (
                <div className="sidebar-option">
                  <Link
                    onClick={() => refetch()}
                    to={`/anime/info/${data.getRandomAnime.id}`}
                    tabIndex="-3"
                  >
                    <i className="fas fa-random" />
                  </Link>
                </div>
              );
            }}
          </Query>
        </div>
        <div className="sidebar-bottom-options">
          <div className="sidebar-option">
            <div className="flag-icon" tabIndex="-4">
              <span role="img" aria-label="flag">
                🇺🇸
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
