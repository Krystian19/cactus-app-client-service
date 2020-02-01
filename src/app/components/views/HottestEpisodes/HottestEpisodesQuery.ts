import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { GQLEpisodePaginatedList } from '@cactus-app/types';

interface Data {
  HottestEpisodes: GQLEpisodePaginatedList;
}

interface Variables {
  pageCount: number;
  currentPage: number;
}

export default class extends Query<Data, Variables> {
  static defaultProps = {
    query: gql`
    query($pageCount: Int, $currentPage: Int) {
      HottestEpisodes(limit: $pageCount, offset: $currentPage) {
        rows {
          id
          thumbnail
          episode_order
          Release {
            id
            release_order
            title
            background
            Anime {
              id
              title
            }
          }
        }
        count
      }
    }

  `,
  };
}
