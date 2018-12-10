import { Component } from 'react';

/**
* @author Jan Guzman <janfrancisco19@gmail.com>
* @desc Use this component to render something in the client and not in the server.
*/
export default class ClientRender extends Component {
  state = { isMounted: false };

  componentDidMount() {
    this.setState({ isMounted: true });
  }

  render() {
    const { children } = this.props;
    const { isMounted } = this.state;

    return isMounted ? children : null;
  }
}
