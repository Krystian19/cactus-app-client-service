import React, { Component } from 'react';
import {
  Link,
} from 'react-router-dom';

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
            <div className="clickable" onClick={this.goToIndex} onKeyPress={this.goToIndex} role="menuitem" tabIndex="0" />
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
          <div className="sidebar-option">
            <Link to="/anime" tabIndex="-3">
              <i className="fas fa-random" />
            </Link>
          </div>
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
