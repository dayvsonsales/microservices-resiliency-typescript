import { container } from 'tsyringe';

import IWeatherProvider from '@providers/WeatherProvider/IWeatherProvider';
import OpenWeatherProvider from '@infra/providers/WeatherProvider/OpenWeatherProvider';
import IMusicProvider from '@providers/MusicProvider/IMusicProvider';
import SpotifyMusicProvider from '@infra/providers/MusicProvider/SpotifyMusicProvider';
import ICacheProvider from '@providers/CacheProvider/ICacheProvider';
import RedisCacheProvider from '@infra/providers/CacheProvider/RedisCacheProvider';
import IHTTPProvider from '@providers/HTTPProvider/IHTTPProvider';
import AxiosHTTPProvider from '@infra/providers/HTTPProvider/AxiosHTTPProvider';

container.registerSingleton<ICacheProvider>(
  'CacheProvider',
  RedisCacheProvider,
);

container.registerSingleton<IHTTPProvider>('HTTPProvider', AxiosHTTPProvider);

container.registerSingleton<IWeatherProvider>(
  'WeatherProvider',
  OpenWeatherProvider,
);

container.registerSingleton<IMusicProvider>(
  'MusicProvider',
  SpotifyMusicProvider,
);
