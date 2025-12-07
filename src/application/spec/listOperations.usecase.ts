import SpecRepository from '../../domain/repositories/SpecRepository';

export async function listOperations(specId: string, repository: SpecRepository) {
  const spec = await repository.getById(specId);
  if (!spec) throw new Error('Spec not found');

  return spec.operations.map((op: any) => ({
    operationId: op.operationId,
    method: op.method,
    path: op.path,
    tags: op.tags,
    summary: op.summary
  }));
}

export default listOperations;
