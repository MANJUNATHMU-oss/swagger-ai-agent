import InMemoryEnvironmentRepository from '../../src/infrastructure/persistence/InMemoryEnvironmentRepository';
import createEnvironment from '../../src/application/environment/createEnvironment.usecase';

describe('createEnvironment usecase', () => {
  let repo: InMemoryEnvironmentRepository;

  beforeEach(() => {
    repo = new InMemoryEnvironmentRepository();
  });

  test('creates environment with required fields', async () => {
    const input = { name: 'staging', specId: 'spec-001', baseUrl: 'https://staging', variables: { TOKEN: 'x' } };
    const result = await createEnvironment(input, repo);
    expect(result).toHaveProperty('id');
    expect(result.name).toBe('staging');
    expect(result.specId).toBe('spec-001');
  });

  test('throws when missing required fields', async () => {
    await expect(createEnvironment({ name: 'no-spec' } as any, repo)).rejects.toThrow();
  });
});
