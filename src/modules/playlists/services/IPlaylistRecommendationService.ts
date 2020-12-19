export default interface IPlaylistRecommendationService {
  recommendByCity(cityName: string): Promise<string[]>;
  recommendByCoordinates(
    latitude: number,
    longitude: number,
  ): Promise<string[]>;
}
