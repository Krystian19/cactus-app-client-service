import React, { Component } from 'react';

export default class AnimeInfoView extends Component {
  // constructor() {
  //   super()
  // }

  render() {
    // const AnimeId = this.props.match.params.id;
    const { match: { params } } = this.props;
    return (
      <div>
        <h1>
          This is the AnimeInfo view. Id:
          {params.id}
        </h1>
      </div>
    );
  }
}
