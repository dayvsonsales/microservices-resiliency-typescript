import IMusicProvider from '../IMusicProvider';

class FakeMusicProvider implements IMusicProvider {
  async getTrackRecommendation(genre: string): Promise<string> {
    switch (genre) {
      case 'party':
        return "Can't get Over";
      case 'pop':
        return 'Kansas';
      case 'rock':
        return 'Last Kiss';
      case 'classical':
        return '5th Sinfonia Bethoven';
      default:
        return 'Rocket Queen';
    }
  }
}

export default FakeMusicProvider;
