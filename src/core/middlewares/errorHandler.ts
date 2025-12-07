import { Request, Response, NextFunction } from 'express';
import logger from '../../infrastructure/logging/Logger';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error(err && err.message ? err.message : String(err));
  const status = err && err.status ? err.status : 500;
  res.status(status).json({ error: err && err.message ? err.message : 'Internal Server Error' });
};

export default errorHandler;
