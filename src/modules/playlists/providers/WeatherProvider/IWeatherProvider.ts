export default interface IWeatherProvider {
  fetchTemperatureInCelsiusByCityName(city: string): Promise<number>;
  fetchTemperatureInCelsiusByCoords(
    latitude: number,
    longitude: number,
  ): Promise<number>;
}
