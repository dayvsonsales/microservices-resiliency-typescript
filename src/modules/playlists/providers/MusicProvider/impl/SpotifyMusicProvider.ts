import IHTTPProvider from '@shared/container/providers/HTTPProvider/IHTTPProvider';
import IMusicProvider from '../IMusicProvider';

import musicConfig from '@config/music';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';

const TRACK_RECOMMENDATION_ENDPOINT =
  'https://api.spotify.com/v1/recommendations';

interface ITrack {
  name: string;
}
@injectable()
class SpotifyMusicProvider implements IMusicProvider {
  constructor(
    @inject('HTTPProvider')
    private api: IHTTPProvider,
  ) {}

  async getTracksRecommendation(genre: string): Promise<string[]> {
    try {
      const {
        data: { tracks },
      } = await this.api.get(
        `${TRACK_RECOMMENDATION_ENDPOINT}?seed_genre=${genre}`,
        {
          headers: {
            Authorization: `Bearer ${musicConfig.spotify.apiKey}`,
          },
        },
      );

      return tracks.map((track: ITrack) => track.name);
    } catch (e) {
      console.log(musicConfig.spotify.apiKey);
      throw new AppError(e.message);
    }
  }
}

export default SpotifyMusicProvider;
