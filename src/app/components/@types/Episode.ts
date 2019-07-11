import Anime from './Anime';
import Season from './Season';

export type Episode = {
  id: Number,
  thumbnail?: String,
  episodeOrder?: Number,
  EarlierEpisode?: Episode,
  LaterEpisode?: Episode,
  Season?: Season,
  Anime?: Anime,
};

export default Episode;
