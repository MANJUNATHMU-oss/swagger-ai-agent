import EnvironmentConfig from '../../domain/models/EnvironmentConfig';
import EnvironmentRepository from '../../domain/repositories/EnvironmentRepository';

export interface UpdateEnvironmentInput extends Partial<EnvironmentConfig> {}

export async function updateEnvironment(id: string, patch: UpdateEnvironmentInput, repository: EnvironmentRepository): Promise<EnvironmentConfig> {
  if (!id) throw new Error('id is required');
  if (!patch || Object.keys(patch).length === 0) throw new Error('patch is required');
  const updated = await repository.update(id, patch);
  return updated;
}

export default updateEnvironment;
