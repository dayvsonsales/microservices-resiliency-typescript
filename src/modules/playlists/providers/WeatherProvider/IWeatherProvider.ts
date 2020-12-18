export default interface IWeatherProvider {
  fetchTemperatureByCityName(city: string): Promise<number>;
  fetchTemperatureByCoords(
    latitude: number,
    longitude: number,
  ): Promise<number>;
}
