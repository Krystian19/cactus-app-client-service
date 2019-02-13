import { Episode } from './Episode';

export type Season = {
  id: Number,
  seasonOrder: Number,
  title: String,
  // Descriptions: [SeasonDescription],
  startedAiring: String,
  stoppedAiring: String,
  poster: String,
  background: String,
  episodeCount: Number,
  LatestEpisode: Episode,
  Episodes: Array<Episode>,
  // AlternativeTitles: [SeasonAlternativeTitle],
  // Anime: Anime,
  // Genres: Genre,
}

export default Season;