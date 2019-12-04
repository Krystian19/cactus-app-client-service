import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import {
  GQLRelease,
} from '@cactus-app/types';

interface Data {
  AiringReleases: GQLRelease[];
}

interface Variables { }

export default class extends Query<Data, Variables> {
  static defaultProps = {
    query: gql`
    {
      AiringReleases {
        id
        release_order
        title
        poster
        started_airing
        EpisodeCount
        LatestEpisode {
          id
          thumbnail
          episode_order
        }
      }
    }
  `
  };
}
