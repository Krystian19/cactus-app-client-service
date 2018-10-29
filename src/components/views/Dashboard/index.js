import React, { Component } from 'react';
import Sidebar from '../../shared_components/Sidebar';

export default class DashboardView extends Component {
  // constructor() {
  //   super()
  // }

  render() {
    return (
      <div className="main-container">
        <Sidebar />
        <div className="main-content no-padding no-margin">
          <h1>This is the search view</h1>
        </div>
      </div>
    );
  }
}
