import PlaylistRecommendationServiceProxy from '@modules/playlists/services/proxy/PlaylistRecommendationServiceProxy';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
export default class PlaylistsController {
  async index(request: Request, response: Response): Promise<Response> {
    const { city, lat, long } = request.query;

    if (!city && !(lat && long)) {
      return response.status(400).send({
        message:
          'Bad request. City or latitude and longitude are required queries',
      });
    }

    if (city && (lat || long)) {
      return response.status(400).send({
        message:
          'Choose between city name or coordinates. Query param cannot contains both',
      });
    }

    let tracks = [];

    const playlistRecommendationServiceProxy = container.resolve(
      PlaylistRecommendationServiceProxy,
    );

    if (city) {
      tracks = await playlistRecommendationServiceProxy.recommendByCity(
        city as string,
      );
    } else {
      tracks = await playlistRecommendationServiceProxy.recommendByCoordinates(
        Number(lat),
        Number(long),
      );
    }

    return response.json(tracks);
  }
}
