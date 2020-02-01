import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { GQLGenrePaginatedList } from '@cactus-app/types';

interface Data {
  Genres: GQLGenrePaginatedList;
}

interface Variables {
  pageCount: number;
  currentPage: number;
}

export default class extends Query<Data, Variables> {
  static defaultProps = {
    query: gql`
    query($pageCount: Int, $currentPage: Int) {
      Genres(limit: $pageCount, offset: $currentPage) {
        rows {
          id
          title
          thumbnail
        }
        count
      }
    }
  `,
  };
}
