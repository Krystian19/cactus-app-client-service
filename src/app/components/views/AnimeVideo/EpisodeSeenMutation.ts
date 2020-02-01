import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

interface Data {
  EpisodeSeen: boolean;
}

interface Variables {
  id: number;
}

export default class extends Mutation<Data, Variables> {
  static defaultProps = {
    mutation: gql`
    mutation($id: Int!) {
      EpisodeSeen(episode_id: $id)
    }
  `,
  };
}
