import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { GQLRelease } from '@cactus-app/types';

interface Data {
  Release: GQLRelease;
}

interface Variables { }

export default class extends Query<Data, Variables> {
  static defaultProps = {
    query: gql`
      query($id: Int!) {
        Release(id: $id) {
          id
          release_order
          title
          EpisodeCount
          Descriptions {
            id
            description
            Language {
              id
              name
              iso_code
            }
          }
          started_airing
          stopped_airing
          poster
          background
          Genres {
            id
            title
          }
          ReleaseType {
            id
            title
          }
        }
      }
  `,
  };
}
