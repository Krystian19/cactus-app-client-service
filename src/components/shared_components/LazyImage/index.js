import React, { Component } from 'react';
import LoadingSpinner from '../LoadingSpinner';

export default class LazyImage extends Component {
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
      noLoadingSpinner,
    } = this.props;
    const { isMounted, isLoaded } = this.state;

    // If element is not mounted yet or
    // image has not loaded yet
    if ((!isMounted) || (!isLoaded)) {
      // If no spinner animation is desired
      if (noLoadingSpinner) return (null);

      // Otherwise return the spinner
      return <LoadingSpinner />;
    }

    // TODO: Handle load errors

    // Return proper image when is not mounted
    return (
      <img
        src={src}
        alt={alt}
        className={className}
      />
    );
  }
}
