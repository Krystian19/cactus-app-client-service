import React, { Component } from 'react';
import LoadingSpinner from '../../../LoadingSpinner';

export default class LazyThumbnailImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMounted: false,
      isLoaded: false,
    };
  }

  componentDidMount() {
    const { src } = this.props;

    // Set component state to mounted
    this.setState({ isMounted: true });

    // Force browser to load the requested image
    // and call onload event when/if done
    const img = new Image();
    img.src = src;
    img.onload = this.imageDidLoad;
  }

  imageDidLoad = () => {
    this.setState({ isLoaded: true });
  }

  render() {
    const {
      src,
      errorSrc,
      className,
      alt,
    } = this.props;
    const { isMounted, isLoaded } = this.state;

    // If element is not mounted yet or
    // image has not loaded yet
    if ((!isMounted) || (!isLoaded)) {
      return <LoadingSpinner />;
    }

    // Return proper image when is not mounted
    return (
      <img
        src={isMounted ? src : errorSrc}
        alt={alt}
        className={className}
      />
    );
  }
}
