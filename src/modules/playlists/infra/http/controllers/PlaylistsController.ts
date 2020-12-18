import { Request, Response } from 'express';

import { container } from 'tsyringe';

export default class PlaylistsController {
  async index(_: Request, response: Response): Promise<Response> {
    return response.json({});
  }
}
