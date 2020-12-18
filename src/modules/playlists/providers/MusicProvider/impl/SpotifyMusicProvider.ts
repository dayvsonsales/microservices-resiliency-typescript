import IHTTPProvider from '@shared/container/providers/HTTPProvider/IHttpProvider';
import IMusicProvider from '../IMusicProvider';

import musicConfig from '@config/music';
import { inject, injectable } from 'tsyringe';

const TRACK_RECOMMENDATION_ENDPOINT =
  'https://api.spotify.com/v1/recommendations';

@injectable()
class SpotifyMusicProvider implements IMusicProvider {
  constructor(
    @inject('HTTPProvider')
    private api: IHTTPProvider,
  ) {}

  async getTrackRecommendation(genre: string): Promise<string> {
    let trackName = '';

    try {
      const { data } = await this.api.get(
        `${TRACK_RECOMMENDATION_ENDPOINT}?limit=1&seed_genre=${genre}`,
        {
          headers: {
            Authorization: `Bearer ${musicConfig.spotify.apiKey}`,
          },
        },
      );

      if (data && data.tracks.length > 0) {
        trackName = data.tracks[0].name;
      } else {
        throw new Error(
          'Something wrong with data returned from Spotify. Needs to be investigated',
        );
      }
    } catch (e) {
      throw new Error(e.message);
    }

    return trackName;
  }
}

export default SpotifyMusicProvider;
