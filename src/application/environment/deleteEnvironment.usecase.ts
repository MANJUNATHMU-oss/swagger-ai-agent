import EnvironmentRepository from '../../domain/repositories/EnvironmentRepository';

export async function deleteEnvironment(id: string, repository: EnvironmentRepository): Promise<void> {
  if (!id) throw new Error('id is required');
  await repository.delete(id);
}

export default deleteEnvironment;
