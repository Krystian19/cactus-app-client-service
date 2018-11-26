import React, { Component } from 'react';
import Sidebar from '../../shared_components/Sidebar';

export default class HottestEpisodes extends Component {
  // constructor() {
  //   super()
  // }

  render() {
    const { history } = this.props;
    return (
      <div className="main-container">
        <Sidebar props={{ history }} />
        <div className="main-content">
          <h1>These are the hottest episodes</h1>
        </div>
      </div>
    );
  }
}
