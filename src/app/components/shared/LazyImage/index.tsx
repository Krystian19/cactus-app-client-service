import React from 'react';
import base64Content from '../../../utils/base64Content';

type PropType = {
  src: string;
  errorSrc: string;
  className: string;
  alt: string;
  noLoadingPlaceholder: boolean;
  posterPlaceholder: boolean;
  customLoadingPlaceholderSrc?: string;
};

type StateType = {
  isMounted: boolean;
  isLoaded: boolean;
  loadError: boolean;
};

export default class LazyImage extends React.Component<PropType, StateType> {
  state = {
    isMounted: false,
    isLoaded: false,
    loadError: false,
  };

  public static defaultProps = {
    noLoadingPlaceholder: false,
    posterPlaceholder: false,
  };

  componentDidMount() {
    const { src } = this.props;

    // Set component state to mounted
    this.setState({ isMounted: true });

    // Force browser to load the requested image
    // and call onload event when/if done
    const img = new Image();
    img.onload = this.imageDidLoad;
    img.onerror = this.imageDidHaveLoadError;
    img.src = String(src);
  }

  imageDidLoad = () => {
    this.setState({ isLoaded: true });
  }

  imageDidHaveLoadError = () => {
    this.setState({ loadError: true });
  }

  render() {
    const {
      src,
      errorSrc,
      className,
      alt,
      noLoadingPlaceholder,
      posterPlaceholder,
      customLoadingPlaceholderSrc,
    } = this.props;

    const { isMounted, isLoaded, loadError } = this.state;

    // If image encountered an error during the load process
    // return the designated error image.
    if (loadError) {
      return (
        <img
          src={String(errorSrc)}
          alt={String(alt)}
          className={String(className)}
        />
      );
    }

    if (
      (!isMounted) // If element is not mounted yet
      || (!isLoaded) // Or if image has not loaded yet
    ) {
      // If no spinner animation is desired
      if (noLoadingPlaceholder) return (null);

      // If a custom placeholder source is provided
      if (customLoadingPlaceholderSrc) {
        return (
          <img
            src={String(customLoadingPlaceholderSrc)}
            alt={String(alt)}
            className={String(className)}
          />
        );
      }

      // If a poster placeholder is desired
      if (posterPlaceholder) {
        return (
          <img
            src={base64Content.cactus_poster_placeholder}
            alt={String(alt)}
            className={String(className)}
          />
        );
      }

      // Otherwise return the thumbnail placeholder
      return (
        <img
          src={String(base64Content.cactus_thumbnail_placeholder)}
          alt={String(alt)}
          className={String(className)}
        />
      );
    }

    // Return proper image when is not mounted
    return (
      <img
        src={String(src)}
        alt={String(alt)}
        className={String(className)}
      />
    );
  }
}
