import React, { Component } from 'react';

export default class AnimeVideoView extends Component {
  // constructor() {
  //   super()
  // }

  render() {
    const { match: { params } } = this.props;
    return (
      <div>
        <h1>
          This is the AnimeVideo view. Id:
          {params.id}
        </h1>
      </div>
    );
  }
}
