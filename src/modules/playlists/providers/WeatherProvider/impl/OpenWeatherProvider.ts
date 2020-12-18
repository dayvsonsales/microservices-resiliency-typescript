import IHTTPProvider from '@shared/container/providers/HTTPProvider/IHttpProvider';
import { inject, injectable } from 'tsyringe';
import IWeatherProvider from '../IWeatherProvider';

import weatherConfig from '@config/weather';
import AppError from '@shared/errors/AppError';

const TEMPERATURE_ENDPOINT = 'https://api.openweathermap.org/data/2.5/weather';

@injectable()
class OpenWeatherProvider implements IWeatherProvider {
  constructor(
    @inject('HTTPProvider')
    private api: IHTTPProvider,
  ) {}

  async fetchTemperatureInCelsiusByCityName(city: string): Promise<number> {
    try {
      const {
        data: {
          main: { temperature },
        },
      } = await this.api.get(
        `${TEMPERATURE_ENDPOINT}?q=${city}&units=metric&appId=${weatherConfig.openWeatherMaps.apiKey}`,
      );

      return temperature;
    } catch (e) {
      throw new AppError(e.message);
    }
  }

  async fetchTemperatureInCelsiusByCoords(
    latitude: number,
    longitude: number,
  ): Promise<number> {
    try {
      const {
        data: {
          main: { temperature },
        },
      } = await this.api.get(
        `${TEMPERATURE_ENDPOINT}?lat=${latitude}&units=metric&lon=${longitude}&appId=${weatherConfig.openWeatherMaps.apiKey}`,
      );

      return temperature;
    } catch (e) {
      throw new AppError(e.message);
    }
  }
}

export default OpenWeatherProvider;
