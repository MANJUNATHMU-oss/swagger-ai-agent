import NormalizedSpec from '../models/NormalizedSpec';

export interface SpecRepository {
  save(spec: NormalizedSpec): Promise<NormalizedSpec>;
  getById(id: string): Promise<NormalizedSpec | null>;
  list(): Promise<NormalizedSpec[]>;
  delete(id: string): Promise<void>;
}

export default SpecRepository;
