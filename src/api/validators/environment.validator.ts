import { SchemaFn } from '../../core/middlewares/validateRequest';

export const createEnvironmentSchema: SchemaFn = (body: any) => {
  const errors: Record<string, string> = {};
  if (!body) return { valid: false, errors: { body: 'missing body' } };
  if (!body.name || typeof body.name !== 'string') errors.name = 'name is required and must be a string';
  if (!body.specId || typeof body.specId !== 'string') errors.specId = 'specId is required and must be a string';
  if (body.baseUrl && typeof body.baseUrl !== 'string') errors.baseUrl = 'baseUrl must be a string';
  const valid = Object.keys(errors).length === 0;
  return { valid, errors: valid ? undefined : errors };
};

export default createEnvironmentSchema;

export const updateEnvironmentSchema: SchemaFn = (body: any) => {
  const errors: Record<string, string> = {};
  if (!body) return { valid: true } as any; // allow empty patch
  if (body.name && typeof body.name !== 'string') errors.name = 'name must be a string';
  if (body.specId && typeof body.specId !== 'string') errors.specId = 'specId must be a string';
  if (body.baseUrl && typeof body.baseUrl !== 'string') errors.baseUrl = 'baseUrl must be a string';
  const valid = Object.keys(errors).length === 0;
  return { valid, errors: valid ? undefined : errors };
};
