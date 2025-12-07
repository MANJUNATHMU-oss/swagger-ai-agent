import { v4 as uuidv4 } from 'uuid';
import EnvironmentConfig from '../../domain/models/EnvironmentConfig';
import EnvironmentRepository from '../../domain/repositories/EnvironmentRepository';

export class InMemoryEnvironmentRepository implements EnvironmentRepository {
  private store: Map<string, EnvironmentConfig> = new Map();

  async save(env: EnvironmentConfig): Promise<EnvironmentConfig> {
    const id = env.id || uuidv4();
    const copy = { ...env, id };
    this.store.set(id, copy);
    return copy;
  }

  async getById(id: string): Promise<EnvironmentConfig | null> {
    return this.store.get(id) || null;
  }

  async listBySpec(specId: string): Promise<EnvironmentConfig[]> {
    return Array.from(this.store.values()).filter((e) => e.specId === specId && !e.disabled);
  }

  async update(id: string, patch: Partial<EnvironmentConfig>): Promise<EnvironmentConfig> {
    const existing = this.store.get(id);
    if (!existing) throw new Error('Environment not found');
    const updated = { ...existing, ...patch } as EnvironmentConfig;
    this.store.set(id, updated);
    return updated;
  }

  async delete(id: string): Promise<void> {
    this.store.delete(id);
  }
}

export default InMemoryEnvironmentRepository;
