import { container } from 'tsyringe';
import '@container/providers';

import PlaylistRecommendationService from '@services/impl/PlaylistRecommendationService';

container.registerSingleton(
  'PlaylistRecommendationService',
  PlaylistRecommendationService,
);
