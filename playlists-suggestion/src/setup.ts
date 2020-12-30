import 'reflect-metadata';

import registerWithEureka from '../eureka-helper';

if (process.env.NODE_ENV !== 'test') {
  registerWithEureka('playlists-suggestion', 3333);
}
