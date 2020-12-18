import ICacheProvider from '../ICacheProvider';
import config from '@config/cache';
import asyncRedis from 'async-redis';

import AppError from '@shared/errors/AppError';

class RedisCacheProvider implements ICacheProvider {
  private client: any;

  constructor() {
    this.client = asyncRedis.createClient(config.redis);

    this.client.on('error', (error: any) => {
      throw new AppError(`Redis client error: ${error}`);
    });
  }

  async set(key: string, value: any): Promise<void> {
    await this.client.set(key, value);
  }

  async get(key: string): Promise<string | undefined> {
    const value = await this.client.get(key);

    return value;
  }
}

export default new RedisCacheProvider();
