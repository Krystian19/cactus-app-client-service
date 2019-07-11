import { Episode } from './Episode';
import Genre from './Genre';
import Anime from './Anime';

export type Season = {
  id: Number,
  releaseOrder?: Number,
  title?: String,
  // Descriptions: [SeasonDescription],
  startedAiring?: String,
  stoppedAiring?: String,
  poster?: String,
  background?: String,
  EpisodeCount?: Number,
  LatestEpisode?: Episode,
  Episodes?: Array<Episode>,
  // AlternativeTitles: [SeasonAlternativeTitle],
  Anime?: Anime,
  Genres: Genre[],
};

export default Season;