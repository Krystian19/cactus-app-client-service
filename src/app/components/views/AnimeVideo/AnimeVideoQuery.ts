import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import {
  GQLEpisode,
} from '@cactus-app/types';

interface Data {
  Episode: GQLEpisode;
}

interface Variables { }

export default class extends Query<Data, Variables> {
  static defaultProps = {
    query: gql`
    query($id: Int!) {
      Episode(id: $id) {
        id
        thumbnail
        episode_order
        episode_code
        EarlierEpisode {
          id
          episode_order
        }
        LaterEpisode {
          id
          episode_order
        }
        Release {
          id
          poster
          title
          release_order
        }
        EpisodeSubtitles {
          id
          subtitle_code
          Language {
            id
            name
            iso_code
          }
        }
      }
    }
  `
  };
}
