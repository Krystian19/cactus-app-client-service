import React, { Component } from 'react';
import {
  Link,
} from 'react-router-dom';

export default class Sidebar extends Component {
  // constructor() {
  //   super()
  // }

  render() {
    return (
      <div className="sidebar">
        <div className="sidebar-top-options">
          <div className="sidebar-option">
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
          <div className="sidebar-option">
            <Link to="/anime">
              <i className="fas fa-random" />
            </Link>
          </div>
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
