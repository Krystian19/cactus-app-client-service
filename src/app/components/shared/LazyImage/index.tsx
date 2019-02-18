import React from 'react';
import LoadingSpinner from '../LoadingSpinner';

type PropType = {
  src: String,
  errorSrc: String,
  className: String,
  alt: String,
  noLoadingSpinner: Boolean,
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
    noLoadingSpinner: false,
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
      noLoadingSpinner,
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
      if (noLoadingSpinner) return (null);

      // Otherwise return the spinner
      return <LoadingSpinner />;
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
