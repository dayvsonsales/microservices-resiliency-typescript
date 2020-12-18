import IMusicProvider from '../providers/MusicProvider/IMusicProvider';
import IWeatherProvider from '../providers/WeatherProvider/IWeatherProvider';
import { inject, injectable } from 'tsyringe';

@injectable()
class PlaylistRecommendationService {
  constructor(
    @inject('MusicProvider')
    private musicProvider: IMusicProvider,

    @inject('WeatherProvider')
    private weatherProvider: IWeatherProvider,
  ) {}

  async recommendByCity(cityName: string): Promise<string[]> {
    const temperature = await this.weatherProvider.fetchTemperatureInCelsiusByCityName(
      cityName,
    );

    console.log(temperature);

    const genre = this.getGenre(temperature);

    const tracks = await this.musicProvider.getTracksRecommendation(genre);

    return tracks;
  }

  async recommendByCoordinates(
    latitude: number,
    longitude: number,
  ): Promise<string[]> {
    const temperature = await this.weatherProvider.fetchTemperatureInCelsiusByCoords(
      latitude,
      longitude,
    );

    const genre = this.getGenre(temperature);

    const tracks = await this.musicProvider.getTracksRecommendation(genre);

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
}

export default PlaylistRecommendationService;
