import PlaylistRecommendationService from '@modules/playlists/services/impl/PlaylistRecommendationService';
import '@shared/container/providers';
import { container } from 'tsyringe';

container.registerSingleton(
  'PlaylistRecommendationService',
  PlaylistRecommendationService,
);
