import React from 'react';

/**
* @author Jan Guzman <janfrancisco19@gmail.com>
* @desc Use this component to render something in the client and not in the server.
*/

type StateType = {
  isMounted: boolean;
};

type PropType = {
  children: React.ReactNode;
};

export default class ClientRender extends React.Component<PropType, StateType> {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  componentDidMount = (): void => {
    this.setState({ isMounted: true });
  };

  render = (): React.ReactNode | null => {
    const { children } = this.props;
    const { isMounted } = this.state;

    return isMounted ? children : null;
  };
}
