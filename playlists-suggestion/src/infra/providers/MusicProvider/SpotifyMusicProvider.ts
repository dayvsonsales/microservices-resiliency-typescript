import IHTTPProvider from '@providers/HTTPProvider/IHTTPProvider';
import IMusicProvider from '../../../providers/MusicProvider/IMusicProvider';

import musicConfig from '@config/music';
import { inject, injectable } from 'tsyringe';

const TRACK_RECOMMENDATION_ENDPOINT =
  'https://api.spotify.com/v1/recommendations';

const REQUEST_TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';

interface ITrack {
  name: string;
}

interface AccessInformation {
  access_token: string;
  token_type: string;
  expires_in: number;
}

@injectable()
class SpotifyMusicProvider implements IMusicProvider {
  constructor(
    @inject('HTTPProvider')
    private api: IHTTPProvider,
  ) {}

  private accessInformation: AccessInformation;

  async getTracksRecommendation(genre: string): Promise<string[]> {
    const token = await this.getSpotifyToken();

    const {
      data: { tracks },
    } = await this.api.get(
      `${TRACK_RECOMMENDATION_ENDPOINT}?seed_genres=${genre}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return tracks.map((track: ITrack) => track.name);
  }

  private async getSpotifyToken(): Promise<string> {
    if (
      this.accessInformation &&
      this.accessInformation.expires_in < new Date().getTime()
    ) {
      return this.accessInformation.access_token;
    }

    const { clientId, clientSecret } = musicConfig.spotify;

    const encodedIdAndSecret = Buffer.from(
      `${clientId}:${clientSecret}`,
    ).toString('base64');

    const {
      data: { access_token, token_type, expires_in },
    } = await this.api.post(
      REQUEST_TOKEN_ENDPOINT,
      `grant_type=client_credentials`,
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${encodedIdAndSecret}`,
        },
      },
    );

    this.accessInformation = {
      access_token,
      token_type,
      expires_in: expires_in + new Date().getTime(),
    } as AccessInformation;

    return this.accessInformation.access_token;
  }
}

export default SpotifyMusicProvider;
