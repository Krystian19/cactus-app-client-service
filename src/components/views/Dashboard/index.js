import React, { Component } from 'react';
import Sidebar from '../../shared_components/Sidebar';
import HottestVideoBlock from '../../shared_components/HottestVideoBlock';
import VideoBlock from '../../shared_components/VideoBlock';
import CategoriesBlock from '../../shared_components/CategoriesBlock';

export default class DashboardView extends Component {
  // constructor() {
  //   super()
  // }

  render() {
    const { history } = this.props;
    return (
      <div className="main-container">
        <Sidebar props={{ history }} />
        <div className="main-content no-padding">
          {/* Block start */}
          <HottestVideoBlock />
          {/* Block end */}

          {/* Block start */}
          <VideoBlock />
          {/* Block end */}

          {/* Block start */}
          <CategoriesBlock />
          {/* Block end */}
        </div>
      </div>
    );
  }
}
