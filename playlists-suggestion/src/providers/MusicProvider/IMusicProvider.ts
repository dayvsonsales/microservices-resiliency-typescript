export default interface IMusicProvider {
  getTracksRecommendation(genre: string): Promise<string[]>;
}
