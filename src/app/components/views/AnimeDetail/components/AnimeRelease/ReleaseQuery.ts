import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import {
  GQLRelease,
} from '@cactus-app/types';

interface Data {
  Release: GQLRelease;
}

interface Variables {
  id: number;
  pageCount?: number;
  currentPage?: number;
}

export default class extends Query<Data, Variables> {
  static defaultProps = {
    query: gql`
      query($id: Int!, $pageCount: Int, $currentPage: Int) {
        Release(id: $id) {
          id
          title
          EpisodeCount
          Episodes(limit: $pageCount, offset: $currentPage) {
            rows {
              id
              thumbnail
              episode_order
              episode_code
            }
            count
          }
        }
      }
  `
  };
}
