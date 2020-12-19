import PlaylistRecommendationService from '@modules/playlists/services/PlaylistRecommendationService';
import { Request, Response } from 'express';

import { container } from 'tsyringe';

export default class PlaylistsController {
  async index(request: Request, response: Response): Promise<Response> {
    const { city, lat, long } = request.query;
    console.log(request.query);
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

    const playlistRecommendationService = container.resolve(
      PlaylistRecommendationService,
    );

    if (city) {
      tracks = await playlistRecommendationService.recommendByCity(
        city as string,
      );
    } else {
      tracks = await playlistRecommendationService.recommendByCoordinates(
        Number(lat),
        Number(long),
      );
    }

    return response.json(tracks);
  }
}
