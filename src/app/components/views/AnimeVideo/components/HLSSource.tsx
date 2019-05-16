import React, { Component } from 'react';
import window from 'global'

export default class HLSSource extends Component<{
  src: string,
  video?: any,
  isVideoChild: Boolean
}> {
  private hls;

  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    // `src` is the property get from this component
    // `video` is the property insert from `Video` component
    // `video` is the html5 video element
    const { src, video } = this.props;
    const Hls = require('hls.js');
    this.hls = new Hls();

    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
    console.log(this.hls);
    console.log(video);

    // load hls video source base on hls.js
    if (Hls.isSupported()) {
      this.hls.loadSource(src);
      this.hls.attachMedia(video);
      // this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
      //   video.play();
      // });
    }
  }

  componentWillUnmount() {
    // destroy hls video source
    // if (this.hls) {
    //   this.hls.destroy();
    // }
  }

  render() {
    return (
      <source
        src={this.props.src}
        type={'application/vnd.apple.mpegurl'}
      />
    );
  }
}