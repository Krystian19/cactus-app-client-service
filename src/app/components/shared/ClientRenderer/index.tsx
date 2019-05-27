import React from 'react';

/**
* @author Jan Guzman <janfrancisco19@gmail.com>
* @desc Use this component to render something in the client and not in the server.
*/

type StateType = {
  isMounted: Boolean,
};

type PropType = {
  children: React.ReactNode,
};

export default class ClientRender extends React.Component<PropType, StateType> {
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
