import InMemoryEnvironmentRepository from '../../src/infrastructure/persistence/InMemoryEnvironmentRepository';
import updateEnvironment from '../../src/application/environment/updateEnvironment.usecase';
import deleteEnvironment from '../../src/application/environment/deleteEnvironment.usecase';

describe('update/delete environment usecases', () => {
  let repo: InMemoryEnvironmentRepository;

  beforeEach(() => {
    repo = new InMemoryEnvironmentRepository();
  });

  test('update environment', async () => {
    const env = await repo.save({ name: 'u1', specId: 's1', baseUrl: 'http://x' } as any);
    const updated = await updateEnvironment(env.id, { name: 'u2' }, repo);
    expect(updated.name).toBe('u2');
  });

  test('delete environment', async () => {
    const env = await repo.save({ name: 'd1', specId: 's2', baseUrl: 'http://x' } as any);
    await deleteEnvironment(env.id, repo);
    const fetched = await repo.getById(env.id);
    expect(fetched).toBeNull();
  });
});
