import { container } from 'tsyringe';
import ICacheProvider from './CacheProvider/ICacheProvider';
import RedisCacheProvider from './CacheProvider/impl/RedisCacheProvider';
import IHTTPProvider from './HTTPProvider/IHTTPProvider';
import AxiosHTTPProvider from './HTTPProvider/impl/AxiosHTTPProvider';

container.registerSingleton<ICacheProvider>(
  'CacheProvider',
  RedisCacheProvider,
);

container.registerSingleton<IHTTPProvider>('HTTPProvider', AxiosHTTPProvider);
