import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { RouteComponentProps } from "react-router";
import {
  NavLink,
  withRouter,
} from 'react-router-dom';

const RandomAnimeQuery = gql`
 query {
    RandomSeason {
      id,
      title
    }
  }
`;

// Sidebar's Component props
type PropsType = RouteComponentProps<{}> & {};

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
            <NavLink to="/search"
              activeClassName='active'
            >
              <i className="fa fa-search" />
            </NavLink>
          </div>
          <div className="sidebar-option">
            <NavLink to="/schedule"
              activeClassName='active'
            >
              <i className="fa fa-calendar" />
            </NavLink>
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
              if (!data.RandomSeason) return false;

              return (
                <div className="sidebar-option">
                  <NavLink
                    onClick={() => refetch()}
                    to={`/anime/detail/${data.RandomSeason.id}`}
                  >
                    <i className="fa fa-random" />
                  </NavLink>
                </div>
              );
            }}
          </Query>
        </div>
        <div className="sidebar-bottom-options">
          <div className="sidebar-option">
            <div className="flag-icon">
              <span role="img" aria-label="flag">
                <i className="em em-us"/>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default withRouter(Sidebar);
