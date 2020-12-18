import IWeatherProvider from '../IWeatherProvider';

class FakeWeatherProvider implements IWeatherProvider {
  async fetchTemperatureByCityName(city: string): Promise<number> {
    return 30;
  }

  async fetchTemperatureByCoords(
    latitude: number,
    longitude: number,
  ): Promise<number> {
    return 40;
  }
}

export default FakeWeatherProvider;
