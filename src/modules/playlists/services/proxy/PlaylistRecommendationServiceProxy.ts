import { inject, injectable, singleton } from 'tsyringe';

import CircuitBreaker from 'opossum';
import IPlaylistRecommendationService from '../IPlaylistRecommendationService';
import ICacheProvider from '@shared/container/providers/CacheProvider/ICacheProvider';
import Cache from '@modules/playlists/models/PlaylistCache';

const circuitBreakerOptions = {
  errorThresholdPercentage: 50,
  timeout: 7000,
  resetTimeout: 5000,
};

@injectable()
@singleton()
class PlaylistRecommendationServiceProxy {
  private circuitRecommendByCity: CircuitBreaker;
  private circuitRecommendByCoords: CircuitBreaker;

  constructor(
    @inject('PlaylistRecommendationService')
    private playlistRecommendationService: IPlaylistRecommendationService,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {
    this.setupCircuits();
  }

  async recommendByCity(cityName: string): Promise<string[]> {
    const tracks = (await this.circuitRecommendByCity.fire(
      cityName,
    )) as string[];

    return tracks;
  }

  async recommendByCoordinates(
    latitude: number,
    longitude: number,
  ): Promise<string[]> {
    const tracks = (await this.circuitRecommendByCoords.fire(
      latitude,
      longitude,
    )) as string[];

    return tracks;
  }

  private setupCircuits(): void {
    this.circuitRecommendByCity = new CircuitBreaker(
      (cityName: string) =>
        this.playlistRecommendationService.recommendByCity(cityName),
      circuitBreakerOptions,
    );

    this.circuitRecommendByCity.on('open', () =>
      console.log('Recommend by City are open now'),
    );
    this.circuitRecommendByCity.fallback(cityName =>
      this.handleFallback(cityName),
    );

    this.circuitRecommendByCoords = new CircuitBreaker(
      (latitude: number, longitude: number) =>
        this.playlistRecommendationService.recommendByCoordinates(
          latitude,
          longitude,
        ),
      circuitBreakerOptions,
    );

    this.circuitRecommendByCoords.on('open', () =>
      console.log('Recommend by Coordinates are open now'),
    );
    this.circuitRecommendByCoords.fallback((latitude, longitude) =>
      this.handleFallback(`${latitude}:${longitude}`),
    );
  }

  private async handleFallback(key: string): Promise<string[]> {
    const cacheData = (await this.cacheProvider.get(key)) as Cache;

    if (cacheData) {
      return cacheData.tracks;
    }

    return [];
  }
}

export default PlaylistRecommendationServiceProxy;
