import { Router } from 'express';
import EnvironmentController from '../controllers/environment.controller';
import InMemoryEnvironmentRepository from '../../infrastructure/persistence/InMemoryEnvironmentRepository';
import validateRequest from '../../core/middlewares/validateRequest';
import createEnvironmentSchema, { updateEnvironmentSchema } from '../validators/environment.validator';

const repo = new InMemoryEnvironmentRepository();
const controller = new EnvironmentController(repo);
const router = Router();

router.post('/', validateRequest(createEnvironmentSchema), (req, res, next) => controller.create(req, res, next));
router.get('/spec/:specId', (req, res, next) => controller.listBySpec(req, res, next));
router.get('/:envId', (req, res, next) => controller.get(req, res, next));
router.put('/:envId', validateRequest(updateEnvironmentSchema), (req, res, next) => controller.update(req, res, next));
router.delete('/:envId', (req, res, next) => controller.delete(req, res, next));

export default router;
