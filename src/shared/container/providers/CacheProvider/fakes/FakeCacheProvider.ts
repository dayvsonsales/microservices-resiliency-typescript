import ICacheProvider from '@shared/container/providers/CacheProvider/ICacheProvider';

interface HashTable<T> {
  [key: string]: T;
}

class FakeCacheProvider implements ICacheProvider {
  private hashTable: HashTable<any> = [];

  async set(key: string, value: any): Promise<void> {
    this.hashTable[key] = value;
  }

  async get(key: string): Promise<string | undefined> {
    return JSON.stringify(this.hashTable[key]);
  }
}

export default FakeCacheProvider;
