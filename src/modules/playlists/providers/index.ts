import { container } from 'tsyringe';

import IWeatherProvider from '@modules/playlists/providers/WeatherProvider/IWeatherProvider';
import OpenWeatherProvider from '@modules/playlists/providers/WeatherProvider/impl/OpenWeatherProvider';
import IMusicProvider from '@modules/playlists/providers/MusicProvider/IMusicProvider';
import SpotifyMusicProvider from '@modules/playlists/providers/MusicProvider/impl/SpotifyMusicProvider';

container.registerSingleton<IWeatherProvider>(
  'WeatherProvider',
  OpenWeatherProvider,
);

container.registerSingleton<IMusicProvider>(
  'MusicProvider',
  SpotifyMusicProvider,
);
