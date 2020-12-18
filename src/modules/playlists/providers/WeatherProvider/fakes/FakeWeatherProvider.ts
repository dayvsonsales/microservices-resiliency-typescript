import IWeatherProvider from '../IWeatherProvider';

class FakeWeatherProvider implements IWeatherProvider {
  async fetchTemperatureInCelsiusByCityName(city: string): Promise<number> {
    switch (city) {
      case 'Maceió':
        return 30;
      case 'Manaus':
        return 32;
      case 'Porto Alegre':
        return 10;
      default:
        return 9;
    }
  }

  async fetchTemperatureInCelsiusByCoords(
    latitude: number,
    longitude: number,
  ): Promise<number> {
    if (latitude == 30 && longitude == 40) {
      return 30;
    }

    if (latitude == 31 && longitude == 40) {
      return 32;
    }

    if (latitude == 29 && longitude == 40) {
      return 10;
    }

    return 9;
  }
}

export default FakeWeatherProvider;
