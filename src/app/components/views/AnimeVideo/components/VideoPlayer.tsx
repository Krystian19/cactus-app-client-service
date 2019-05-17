import React from 'react';
export default class HLSSource extends React.Component<{
  src: string,
  poster?: string,
}> {
  private hls;
  private video: HTMLVideoElement;

  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    // `src` is the property get from this component
    // `video` is the property insert from `Video` component
    // `video` is the html5 video element
    // const { src, video } = this.props;
    const { src } = this.props;
    const Hls = require('hls.js');
    this.hls = new Hls();

    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
    console.log(this.hls);
    console.log(this.video);

    // load hls video source base on hls.js
    if (Hls.isSupported()) {
      this.hls.loadSource(src);
      this.hls.attachMedia(this.video);
      this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
        this.video.play();
      });
    }
  }

  componentWillUnmount() {
    // destroy hls video source
    // if (this.hls) {
    //   this.hls.destroy();
    // }
  }

  render() {
    const { poster } = this.props;
    console.log(poster)
    return (
      <video
        ref={node => this.video = node}
        poster={poster}
        controls={true}
      />
    );
  }
}