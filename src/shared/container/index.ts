import PlaylistRecommendationService from '@modules/playlists/services/PlaylistRecommendationService';
import '@shared/container/providers';
import { container } from 'tsyringe';

container.registerSingleton(
  'PlaylistRecommendationService',
  PlaylistRecommendationService,
);
