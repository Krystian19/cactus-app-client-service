import React, { Component } from 'react';

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
            <a href="./search.html">
              <i className="fas fa-search" />
            </a>
          </div>
          <div className="sidebar-option">
            <a href="./anime-schedule.html">
              <i className="fas fa-calendar-alt" />
            </a>
          </div>
          <div className="sidebar-option">
            <i className="fas fa-random" />
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
