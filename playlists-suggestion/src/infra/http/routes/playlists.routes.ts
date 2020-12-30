import { Router } from 'express';

import PlaylistsController from '../controllers/PlaylistsController';

const playlistsRouter = Router();
const playlistsController = new PlaylistsController();

playlistsRouter.get('/recommendation', playlistsController.index);

export default playlistsRouter;
