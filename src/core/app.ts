import express, { Application } from 'express';
import { json } from 'body-parser';
import config from './config';
import requestLogger from './middlewares/requestLogger';
import errorHandler from './middlewares/errorHandler';
import createSpecRouter from '../api/routes/spec.routes';

const createApp = (): Application => {
  const app = express();
  app.use(json({ limit: '1mb' }));

  // request logging
  app.use(requestLogger);

  app.get('/health', (req, res) => {
    res.json({ status: 'ok', env: process.env.NODE_ENV || 'development' });
  });

  // Placeholder for routes
  app.get('/', (req, res) => res.send('Swagger AI Agent'));

  // Spec routes
  app.use('/spec', createSpecRouter());

  // error handler (last)
  app.use(errorHandler);

  return app;
};

export default createApp;
