import { Router } from 'express';

import playlistsRouter from '@modules/playlists/infra/http/routes/playlists.routes';

const routes = Router();

routes.use('/playlists', playlistsRouter);

export default routes;
