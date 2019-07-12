import { Episode } from './Episode';
import Genre from './Genre';
import Anime from './Anime';

export type Release = {
  id: Number,
  releaseOrder?: Number,
  title?: String,
  // Descriptions: [ReleaseDescription],
  startedAiring?: String,
  stoppedAiring?: String,
  poster?: String,
  background?: String,
  EpisodeCount?: Number,
  LatestEpisode?: Episode,
  Episodes?: Array<Episode>,
  // AlternativeTitles: [ReleaseAlternativeTitle],
  Anime?: Anime,
  Genres?: Genre[],
};

export default Release;