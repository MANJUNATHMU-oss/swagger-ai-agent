import SqliteEnvironmentRepository from '../../src/infrastructure/persistence/SqliteEnvironmentRepository';

describe('SqliteEnvironmentRepository', () => {
  let repo: SqliteEnvironmentRepository;

  beforeEach(async () => {
    repo = new SqliteEnvironmentRepository(':memory:');
    await repo.init();
  });

  test('save and getById', async () => {
    const saved = await repo.save({ name: 's1', specId: 'sp1', baseUrl: 'http://x' } as any);
    const fetched = await repo.getById(saved.id);
    expect(fetched).not.toBeNull();
    expect(fetched?.name).toBe('s1');
  });

  test('listBySpec and delete', async () => {
    const a = await repo.save({ name: 'a', specId: 'specA', baseUrl: 'http://1' } as any);
    const b = await repo.save({ name: 'b', specId: 'specA', baseUrl: 'http://2' } as any);
    const list = await repo.listBySpec('specA');
    expect(list.length).toBeGreaterThanOrEqual(2);
    await repo.delete(a.id);
    const after = await repo.listBySpec('specA');
    expect(after.find((x) => x.id === a.id)).toBeUndefined();
  });
});
