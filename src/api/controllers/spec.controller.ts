import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import SpecRepository from '../../domain/repositories/SpecRepository';
import ingestSwagger from '../../application/spec/ingestSwagger.usecase';

/**
 * Thin controller for spec endpoints. Does not implement ingestion logic yet.
 * A repository may be injected to persist the created NormalizedSpec.
 */
export class SpecController {
  constructor(private specRepository?: SpecRepository) {}

  async importSpec(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { source } = req.body || {};
      if (!source || !source.type) {
        res.status(400).json({ error: 'source is required' });
        return;
      }
      if (!this.specRepository) {
        res.status(500).json({ error: 'Spec repository not configured' });
        return;
      }

      const normalized = await ingestSwagger(source, this.specRepository);

      res.status(201).json({ specId: normalized.id, title: normalized.title, version: normalized.version, operationCount: normalized.operations.length });
    } catch (err) {
      next(err);
    }
  }

  async getSpec(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { specId } = req.params;
      if (!specId) {
        res.status(400).json({ error: 'specId is required' });
        return;
      }

      if (!this.specRepository || !this.specRepository.getById) {
        res.status(501).json({ error: 'Spec repository not configured' });
        return;
      }

      const spec = await this.specRepository.getById(specId);
      if (!spec) {
        res.status(404).json({ error: 'spec not found' });
        return;
      }

      res.json({ id: spec.id, title: spec.title, version: spec.version, servers: spec.servers, tags: spec.tags, operationCount: spec.operations.length });
    } catch (err) {
      next(err);
    }
  }

  async listOperations(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { specId } = req.params;
      if (!specId) {
        res.status(400).json({ error: 'specId is required' });
        return;
      }

      if (!this.specRepository) {
        res.status(500).json({ error: 'Spec repository not configured' });
        return;
      }

      // lazy import of usecase to avoid circular references
      const { default: listOperations } = await import('../../application/spec/listOperations.usecase');
      const ops = await listOperations(specId, this.specRepository);
      res.json(ops);
    } catch (err) {
      next(err);
    }
  }
}

export default SpecController;
