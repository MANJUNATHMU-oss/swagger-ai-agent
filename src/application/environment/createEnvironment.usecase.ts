import { v4 as uuidv4 } from 'uuid';
import EnvironmentConfig from '../../domain/models/EnvironmentConfig';
import EnvironmentRepository from '../../domain/repositories/EnvironmentRepository';

export interface CreateEnvironmentInput {
  specId: string;
  name: string;
  baseUrl: string;
  defaultHeaders?: Record<string, string>;
  authConfig?: any;
}

export async function createEnvironment(input: CreateEnvironmentInput, repository: EnvironmentRepository): Promise<EnvironmentConfig> {
  if (!input) throw new Error('input is required');
  const { specId, name, baseUrl } = input;
  if (!specId) throw new Error('specId is required');
  if (!name) throw new Error('name is required');
  if (!baseUrl) throw new Error('baseUrl is required');

  const env: EnvironmentConfig = {
    id: uuidv4(),
    specId,
    name,
    baseUrl,
    defaultHeaders: input.defaultHeaders || {},
    authConfig: input.authConfig || undefined,
    disabled: false
  };

  const saved = await repository.save(env);
  return saved;
}

export default createEnvironment;
