export default {
  app: {
    port: process.env.PORT ? Number(process.env.PORT) : 3000,
    host: process.env.HOST || '0.0.0.0'
  },
  log: {
    level: process.env.LOG_LEVEL || 'info'
  }
};
