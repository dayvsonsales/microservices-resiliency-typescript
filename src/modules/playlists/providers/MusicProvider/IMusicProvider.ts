export default interface IMusicProvider {
  getTrackRecommendation(genre: string): Promise<string>;
}
