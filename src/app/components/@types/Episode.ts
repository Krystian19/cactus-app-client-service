import Season from './Season';

export type Episode = {
  id: Number,
  thumbnail: String,
  episodeOrder: Number,
  EarlierEpisode: Episode,
  LaterEpisode: Episode,
  // EpisodeVersions: Array<EpisodeVersions>,
  Season: Season,
}

export default Episode;