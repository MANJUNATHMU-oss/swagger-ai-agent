import { v4 as uuidv4 } from 'uuid';
import NormalizedSpec from '../../domain/models/NormalizedSpec';
import SpecRepository from '../../domain/repositories/SpecRepository';

export class InMemorySpecRepository implements SpecRepository {
  private store: Map<string, NormalizedSpec> = new Map();

  async save(spec: NormalizedSpec): Promise<NormalizedSpec> {
    const id = spec.id || uuidv4();
    const copy = { ...spec, id };
    this.store.set(id, copy);
    return copy;
  }

  async getById(id: string): Promise<NormalizedSpec | null> {
    return this.store.get(id) || null;
  }

  async list(): Promise<NormalizedSpec[]> {
    return Array.from(this.store.values());
  }

  async delete(id: string): Promise<void> {
    this.store.delete(id);
  }
}

export default InMemorySpecRepository;
