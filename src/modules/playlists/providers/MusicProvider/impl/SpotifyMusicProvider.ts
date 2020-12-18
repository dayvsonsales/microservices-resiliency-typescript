import IMusicProvider from '../IMusicProvider';

class SpotifyMusicProvider implements IMusicProvider {
  getTrackRecommendation(genre: string): Promise<string> {
    throw new Error('Method not implemented.');
  }
}

export default SpotifyMusicProvider;
