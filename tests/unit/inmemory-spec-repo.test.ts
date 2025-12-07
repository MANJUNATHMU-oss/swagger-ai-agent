import InMemorySpecRepository from '../../src/infrastructure/persistence/InMemorySpecRepository';
import { v4 as uuidv4 } from 'uuid';

describe('InMemorySpecRepository', () => {
  let repo: InMemorySpecRepository;

  beforeEach(() => {
    repo = new InMemorySpecRepository();
  });

  test('save and getById', async () => {
    const id = uuidv4();
    const spec = { id, title: 'Test API', servers: [], tags: [], operations: [] } as any;
    const saved = await repo.save(spec);
    expect(saved.id).toBe(id);

    const fetched = await repo.getById(id);
    expect(fetched).not.toBeNull();
    expect(fetched!.title).toBe('Test API');
  });

  test('list and delete', async () => {
    const spec1 = { id: uuidv4(), title: 'A', servers: [], tags: [], operations: [] } as any;
    const spec2 = { id: uuidv4(), title: 'B', servers: [], tags: [], operations: [] } as any;
    await repo.save(spec1);
    await repo.save(spec2);

    const all = await repo.list();
    expect(all.length).toBe(2);

    await repo.delete(spec1.id);
    const after = await repo.list();
    expect(after.length).toBe(1);
  });
});
