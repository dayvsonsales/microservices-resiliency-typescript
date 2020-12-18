import IWeatherProvider from '../IWeatherProvider';

class OpenWeatherProvider implements IWeatherProvider {
  async fetchTemperatureByCityName(city: string): Promise<number> {
    throw new Error('Method not implemented.');
  }

  async fetchTemperatureByCoords(
    latitude: number,
    longitude: number,
  ): Promise<number> {
    throw new Error('Method not implemented.');
  }
}

export default OpenWeatherProvider;
