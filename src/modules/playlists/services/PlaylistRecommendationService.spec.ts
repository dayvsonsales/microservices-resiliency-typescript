import FakeMusicProvider from '../providers/MusicProvider/fakes/FakeMusicProvider';
import FakeWeatherProvider from '../providers/WeatherProvider/fakes/FakeWeatherProvider';
import PlaylistRecommendationService from './PlaylistRecommendationService';

describe('Recommendation of playlists', () => {
  it('should recommend a pop playlist', async () => {
    const fakeMusicProvider = new FakeMusicProvider();
    const fakeWeatherProvider = new FakeWeatherProvider();

    const playlistRecommendationService = new PlaylistRecommendationService(
      fakeMusicProvider,
      fakeWeatherProvider,
    );

    const tracksViaCity = await playlistRecommendationService.recommendByCity(
      'Maceió',
    );
    const tracksViaCoords = await playlistRecommendationService.recommendByCoordinates(
      30,
      40,
    );

    expect(tracksViaCity).toEqual(['Tusa']);
    expect(tracksViaCoords).toEqual(['Tusa']);
  });

  it('should recommend a classical playlist', async () => {
    const fakeMusicProvider = new FakeMusicProvider();
    const fakeWeatherProvider = new FakeWeatherProvider();

    const playlistRecommendationService = new PlaylistRecommendationService(
      fakeMusicProvider,
      fakeWeatherProvider,
    );

    const tracksViaCity = await playlistRecommendationService.recommendByCity(
      'São Paulo',
    );
    const tracksViaCoords = await playlistRecommendationService.recommendByCoordinates(
      40,
      40,
    );

    expect(tracksViaCity).toEqual(['5th Sinfonia Bethoven']);
    expect(tracksViaCoords).toEqual(['5th Sinfonia Bethoven']);
  });

  it('should recommend a rock playlist', async () => {
    const fakeMusicProvider = new FakeMusicProvider();
    const fakeWeatherProvider = new FakeWeatherProvider();

    const playlistRecommendationService = new PlaylistRecommendationService(
      fakeMusicProvider,
      fakeWeatherProvider,
    );

    const tracksViaCity = await playlistRecommendationService.recommendByCity(
      'Porto Alegre',
    );
    const tracksViaCoords = await playlistRecommendationService.recommendByCoordinates(
      29,
      40,
    );

    expect(tracksViaCity).toEqual(['Last Kiss']);
    expect(tracksViaCoords).toEqual(['Last Kiss']);
  });

  it('should recommend a party playlist', async () => {
    const fakeMusicProvider = new FakeMusicProvider();
    const fakeWeatherProvider = new FakeWeatherProvider();

    const playlistRecommendationService = new PlaylistRecommendationService(
      fakeMusicProvider,
      fakeWeatherProvider,
    );

    const tracksViaCity = await playlistRecommendationService.recommendByCity(
      'Manaus',
    );
    const tracksViaCoords = await playlistRecommendationService.recommendByCoordinates(
      31,
      40,
    );

    expect(tracksViaCity).toEqual(["Can't get Over"]);
    expect(tracksViaCoords).toEqual(["Can't get Over"]);
  });
});
