import Anime from './Anime';
import Release from './Release';

export type Episode = {
  id: Number,
  thumbnail?: String,
  episodeOrder?: Number,
  EarlierEpisode?: Episode,
  LaterEpisode?: Episode,
  Release?: Release,
  Anime?: Anime,
};

export default Episode;
