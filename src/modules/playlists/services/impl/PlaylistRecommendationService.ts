import IMusicProvider from '@modules/playlists/providers/MusicProvider/IMusicProvider';
import IWeatherProvider from '@modules/playlists/providers/WeatherProvider/IWeatherProvider';
import ICacheProvider from '@shared/container/providers/CacheProvider/ICacheProvider';
import { inject, injectable } from 'tsyringe';

import IPlaylistRecommendationService from '../IPlaylistRecommendationService';

import cacheConfig from '@config/cache';
import Cache from '@modules/playlists/models/PlaylistCache';
@injectable()
class PlaylistRecommendationService implements IPlaylistRecommendationService {
  constructor(
    @inject('MusicProvider')
    private musicProvider: IMusicProvider,

    @inject('WeatherProvider')
    private weatherProvider: IWeatherProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async recommendByCity(cityName: string): Promise<string[]> {
    const cityCache = await this.getTracksInCache(cityName);

    if (cityCache) {
      return cityCache;
    }

    const temperature = await this.weatherProvider.fetchTemperatureInCelsiusByCityName(
      cityName,
    );

    const genre = this.getGenre(temperature);

    const tracks = await this.musicProvider.getTracksRecommendation(genre);

    await this.cacheProvider.set(cityName, { tracks, date: new Date() });
    await this.cacheProvider.set(genre, { tracks, date: new Date() });

    return tracks;
  }

  async recommendByCoordinates(
    latitude: number,
    longitude: number,
  ): Promise<string[]> {
    const cityCache = await this.getTracksInCache(`${latitude}:${longitude}`);

    if (cityCache) {
      return cityCache;
    }

    const temperature = await this.weatherProvider.fetchTemperatureInCelsiusByCoords(
      latitude,
      longitude,
    );

    const genre = this.getGenre(temperature);

    const tracks = await this.musicProvider.getTracksRecommendation(genre);

    await this.cacheProvider.set(`${latitude}:${longitude}`, {
      tracks,
      date: new Date(),
    });
    await this.cacheProvider.set(genre, { tracks, date: new Date() });

    return tracks;
  }

  private getGenre(temperature: number): string {
    let genre = 'classical';

    if (temperature > 30) {
      genre = 'party';
    } else if (temperature >= 15 && temperature <= 30) {
      genre = 'pop';
    } else if (temperature >= 10 && temperature < 15) {
      genre = 'rock';
    }

    return genre;
  }

  private async getTracksInCache(key: string): Promise<string[] | null> {
    const cache = (await this.cacheProvider.get(key)) as Cache;

    if (
      cache &&
      new Date().getTime() - new Date(cache.date).getTime() <
        Number(cacheConfig.resetTime) * 1000
    ) {
      return cache.tracks;
    }

    return null;
  }
}

export default PlaylistRecommendationService;
