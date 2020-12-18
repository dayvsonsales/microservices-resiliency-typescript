import { Router } from 'express';

import PlaylistsController from '../controllers/PlaylistsController';

const playlistsRouter = Router();
const playlistsController = new PlaylistsController();

playlistsRouter.get('/:city', playlistsController.index);
playlistsRouter.get('/:lat/:long', playlistsController.index);

export default playlistsRouter;
