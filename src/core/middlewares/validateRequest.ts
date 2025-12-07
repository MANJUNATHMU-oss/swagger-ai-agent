import { Request, Response, NextFunction } from 'express';
import { ValidationError } from '../errors/ValidationError';

type SchemaFn = (body: any) => { valid: boolean; errors?: any };

export const validateRequest = (schema: SchemaFn) => (req: Request, res: Response, next: NextFunction) => {
  const result = schema(req.body);
  if (!result.valid) {
    next(new ValidationError('Invalid request', result.errors));
    return;
  }
  next();
};

export default validateRequest;
