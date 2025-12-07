export default {
  app: {
    port: process.env.PORT ? Number(process.env.PORT) : 8080
  },
  log: {
    level: 'info'
  }
};
