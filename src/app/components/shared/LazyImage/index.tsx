import React from 'react';
import LoadingSpinner from '../LoadingSpinner';
import base64Content from '../../../utils/base64Content';

type PropType = {
  src: String,
  errorSrc: String,
  className: String,
  alt: String,
  noLoadingPlaceholder: Boolean,
  posterPlaceholder: Boolean,
}

type StateType = {
  isMounted: Boolean,
  isLoaded: Boolean,
  loadError: Boolean
}

export default class LazyImage extends React.Component<PropType, StateType> {
  constructor(props) {
    super(props);

    this.state = {
      isMounted: false,
      isLoaded: false,
      loadError: false,
    };
  }

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

      // If a poster placeholder is desired
      if (posterPlaceholder) {
        return (
          <img
            src={base64Content.cactus_poster_placeholder}
            alt={String(alt)}
            className={String(className)}
          />
        )
      }

      // Otherwise return the thumbnail placeholder
      return (
        <img
          src={String(src)}
          alt={String(alt)}
          className={String(className)}
        />
      )
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
