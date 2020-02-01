import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import {
  GQLEpisodePaginatedList,
  GQLGenrePaginatedList,
} from '@cactus-app/types';

interface Data {
  HottestEpisodes: GQLEpisodePaginatedList;
  NewestEpisodes: GQLEpisodePaginatedList;
  Genres: GQLGenrePaginatedList;
}

interface Variables { }

export default class extends Query<Data, Variables> {
  static defaultProps = {
    query: gql`
    {
      HottestEpisodes {
        ...episodeThumbnailFields
      }
      NewestEpisodes {
        ...episodeThumbnailFields
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
      
    fragment episodeThumbnailFields on EpisodePaginatedList {
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
  `,
  };
}
