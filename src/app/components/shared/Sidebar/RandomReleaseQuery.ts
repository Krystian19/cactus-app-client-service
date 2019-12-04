import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import {
  GQLRelease,
} from '@cactus-app/types';

interface Data {
  RandomRelease: GQLRelease;
}

interface Variables { }

export default class extends Query<Data, Variables> {
  static defaultProps = {
    query: gql`
    {
      RandomRelease {
        id
        title
      }
    }
  `
  };
}
