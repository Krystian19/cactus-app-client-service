import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import React from 'react';
import { RouteComponentProps } from "react-router";
import {
  Link,
  withRouter,
} from 'react-router-dom';

const RandomAnimeQuery = gql`
 query {
    getRandomSeason {
      id,
      title
    }
  }
`;

// How to deal with the Router
// Type whatever you expect in 'this.props.match.params.*'
// type PathParamsType = {
//   param1: string,
// }
// type PropsType = RouteComponentProps<PathParamsType> & {
//   someString: string,
// }

// Sidebar's properties
type PropsType = RouteComponentProps<{}>;

class Sidebar extends React.Component<PropsType> {
  goToIndex = () => {
    const { history } = this.props;
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
            />
            <embed src="/img/logo.svg" className="logo" />
          </div>
        </div>
        <div className="sidebar-center-options">
          <div className="sidebar-option">
            <Link to="/anime">
              <i className="fas fa-search" />
            </Link>
          </div>
          <div className="sidebar-option">
            <Link to="/schedule">
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
              if (!data.getRandomSeason) return false;

              return (
                <div className="sidebar-option">
                  <Link
                    onClick={() => refetch()}
                    to={`/anime/info/${data.getRandomSeason.id}`}

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
            <div className="flag-icon">
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


export default withRouter(Sidebar);
