import { Router } from 'express';
import SpecController from '../controllers/spec.controller';
import InMemorySpecRepository from '../../infrastructure/persistence/InMemorySpecRepository';

export const createSpecRouter = (repo?: InMemorySpecRepository) => {
  const router = Router();
  const repository = repo || new InMemorySpecRepository();
  const controller = new SpecController(repository as any);

  router.post('/import', (req, res, next) => controller.importSpec(req, res, next));
  router.get('/:specId', (req, res, next) => controller.getSpec(req, res, next));
  router.get('/:specId/operations', (req, res, next) => controller.listOperations(req, res, next));

  return router;
};

export default createSpecRouter;
