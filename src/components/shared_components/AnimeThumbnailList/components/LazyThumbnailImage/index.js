import React, { Component } from 'react';
import LoadingSpinner from '../../../LoadingSpinner';

export default class LazyThumbnailImage extends Component {
  constructor(props) {
    super(props);

    this.state = { isMounted: false };
  }

  componentDidMount() {
    this.setState({ isMounted: true });
  }

  render() {
    const { src, errorSrc } = this.props;
    const { isMounted } = this.state;

    // Element is not mounted yet
    if (!isMounted) {
      return <LoadingSpinner />;
    }

    // Return proper image when is not mounted
    return (
      <img
        src={isMounted ? src : errorSrc}
        alt="thumbnail"
        className="anime-thumbnail"
      />
    );
  }
}
