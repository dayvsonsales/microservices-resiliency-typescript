import { inject, injectable, singleton } from 'tsyringe';

import CircuitBreaker from 'opossum';
import IPlaylistRecommendationService from '../IPlaylistRecommendationService';

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
  ) {
    this.circuitRecommendByCity = new CircuitBreaker(
      (cityName: string) =>
        this.playlistRecommendationService.recommendByCity(cityName),
      circuitBreakerOptions,
    );

    this.circuitRecommendByCoords = new CircuitBreaker(
      (latitude: number, longitude: number) =>
        this.playlistRecommendationService.recommendByCoordinates(
          latitude,
          longitude,
        ),
      circuitBreakerOptions,
    );
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
}

export default PlaylistRecommendationServiceProxy;
