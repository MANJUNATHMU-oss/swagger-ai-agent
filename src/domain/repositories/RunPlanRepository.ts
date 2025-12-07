import RunPlan from '../models/RunPlan';

export interface RunPlanRepository {
  save(plan: RunPlan): Promise<RunPlan>;
  getById(id: string): Promise<RunPlan | null>;
  list(): Promise<RunPlan[]>;
  update(id: string, patch: Partial<RunPlan>): Promise<RunPlan>;
  delete(id: string): Promise<void>;
}

export default RunPlanRepository;
