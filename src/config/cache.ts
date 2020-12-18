export default {
  redis: {
    host: process.env.REDIS_HOST || 'http://localhost',
    port: Number(process.env.REDIS_PORT) || 6379,
  },
};
