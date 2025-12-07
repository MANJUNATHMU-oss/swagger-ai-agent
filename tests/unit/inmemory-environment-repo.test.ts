import InMemoryEnvironmentRepository from '../../src/infrastructure/persistence/InMemoryEnvironmentRepository';

describe('InMemoryEnvironmentRepository', () => {
  let repo: InMemoryEnvironmentRepository;

  beforeEach(() => {
    repo = new InMemoryEnvironmentRepository();
  });

  test('creates and retrieves environment by id', async () => {
    const env = await repo.save({ name: 'dev', specId: 'spec-1', baseUrl: 'http://localhost', variables: {} } as any);
    expect(env).toHaveProperty('id');
    const fetched = await repo.getById(env.id);
    expect(fetched).toBeDefined();
    expect(fetched?.name).toBe('dev');
  });

  test('lists environments by specId', async () => {
    await repo.save({ name: 'dev', specId: 'spec-A', baseUrl: 'http://localhost', variables: {} } as any);
    await repo.save({ name: 'qa', specId: 'spec-A', baseUrl: 'http://qa', variables: {} } as any);
    await repo.save({ name: 'other', specId: 'spec-B', baseUrl: 'http://other', variables: {} } as any);
    const list = await repo.listBySpec('spec-A');
    expect(list).toHaveLength(2);
  });

  test('updates and deletes environment', async () => {
    const env = await repo.save({ name: 'temp', specId: 's1', baseUrl: 'http://x', variables: {} } as any);
    const updated = await repo.update(env.id, { name: 'temp2' });
    expect(updated.name).toBe('temp2');
    await repo.delete(env.id);
    const fetched = await repo.getById(env.id);
    expect(fetched).toBeNull();
  });
});
