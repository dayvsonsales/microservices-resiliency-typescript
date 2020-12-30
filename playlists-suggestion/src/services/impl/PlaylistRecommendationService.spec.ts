import FakeCacheProvider from '@providers/CacheProvider/fakes/FakeCacheProvider';
import FakeMusicProvider from '@providers/MusicProvider/fakes/FakeMusicProvider';
import FakeWeatherProvider from '@providers/WeatherProvider/fakes/FakeWeatherProvider';
import PlaylistRecommendationService from './PlaylistRecommendationService';

describe('Recommendation of playlists', () => {
  it('should recommend a pop playlist', async () => {
    const fakeMusicProvider = new FakeMusicProvider();
    const fakeWeatherProvider = new FakeWeatherProvider();
    const fakeCacheProvider = new FakeCacheProvider();

    const playlistRecommendationService = new PlaylistRecommendationService(
      fakeMusicProvider,
      fakeWeatherProvider,
      fakeCacheProvider,
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
    const fakeCacheProvider = new FakeCacheProvider();

    const playlistRecommendationService = new PlaylistRecommendationService(
      fakeMusicProvider,
      fakeWeatherProvider,
      fakeCacheProvider,
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
    const fakeCacheProvider = new FakeCacheProvider();

    const playlistRecommendationService = new PlaylistRecommendationService(
      fakeMusicProvider,
      fakeWeatherProvider,
      fakeCacheProvider,
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
    const fakeCacheProvider = new FakeCacheProvider();

    const playlistRecommendationService = new PlaylistRecommendationService(
      fakeMusicProvider,
      fakeWeatherProvider,
      fakeCacheProvider,
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

  it('should get a suggestion when passes a cached city', async () => {
    const fakeMusicProvider = new FakeMusicProvider();
    const fakeWeatherProvider = new FakeWeatherProvider();
    const fakeCacheProvider = new FakeCacheProvider();

    await fakeCacheProvider.set('Maceió', {
      tracks: ['Goldfinger'],
      date: new Date(),
    });

    await fakeCacheProvider.set('30:40', {
      tracks: ['Goldfinger'],
      date: new Date(),
    });

    const playlistRecommendationService = new PlaylistRecommendationService(
      fakeMusicProvider,
      fakeWeatherProvider,
      fakeCacheProvider,
    );

    const tracksViaCity = await playlistRecommendationService.recommendByCity(
      'Maceió',
    );
    const tracksViaCoords = await playlistRecommendationService.recommendByCoordinates(
      30,
      40,
    );

    expect(tracksViaCity).toEqual(['Goldfinger']);
    expect(tracksViaCoords).toEqual(['Goldfinger']);
  });
});
