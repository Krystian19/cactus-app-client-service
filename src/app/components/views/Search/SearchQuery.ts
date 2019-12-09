import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import {
  GQLReleasePaginatedList,
} from '@cactus-app/types';

interface Data {
  Releases: GQLReleasePaginatedList;
}

interface Variables {
  title?: string;
  pageCount?: number;
  currentPage?: number;
  genres: number[];
}

export default class extends Query<Data, Variables> {
  static defaultProps = {
    query: gql`
    query($title: String, $pageCount: Int, $currentPage: Int, $genres: [Int!]) {
      Releases(
        filter: {
          title: $title
          Genres: $genres
        }
        limit: $pageCount
        offset: $currentPage
      ) {
        rows {
          id
          title
          poster
          EpisodeCount
          started_airing
          ReleaseType {
            id
            title
          }
        }
        count
      }
      Genres {
        rows {
          id
          title
          thumbnail
        }
        count
      }
    }
  `
  };
}
