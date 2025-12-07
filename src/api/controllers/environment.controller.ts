import { Request, Response, NextFunction } from 'express';
import EnvironmentRepository from '../../domain/repositories/EnvironmentRepository';
import createEnvironment, { CreateEnvironmentInput } from '../../application/environment/createEnvironment.usecase';
import updateEnvironment from '../../application/environment/updateEnvironment.usecase';
import deleteEnvironment from '../../application/environment/deleteEnvironment.usecase';

export class EnvironmentController {
  constructor(private repository: EnvironmentRepository) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const input: CreateEnvironmentInput = req.body;
      const saved = await createEnvironment(input, this.repository);
      res.status(201).json(saved);
    } catch (err) {
      next(err);
    }
  }

  async listBySpec(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { specId } = req.params;
      if (!specId) return res.status(400).json({ error: 'specId required' });
      const list = await this.repository.listBySpec(specId);
      res.json(list);
    } catch (err) {
      next(err);
    }
  }

  async get(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { envId } = req.params;
      if (!envId) return res.status(400).json({ error: 'envId required' });
      const env = await this.repository.getById(envId);
      if (!env) return res.status(404).json({ error: 'environment not found' });
      res.json(env);
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { envId } = req.params;
      if (!envId) return res.status(400).json({ error: 'envId required' });
      const patch = req.body;
      const updated = await updateEnvironment(envId, patch, this.repository);
      res.json(updated);
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { envId } = req.params;
      if (!envId) return res.status(400).json({ error: 'envId required' });
      await deleteEnvironment(envId, this.repository);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}

export default EnvironmentController;
