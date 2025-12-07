import { Router } from 'express';
import createSpecRouter from './spec.routes';
import environmentRouter from './environment.routes';

const router = Router();

router.use('/spec', createSpecRouter());
router.use('/environment', environmentRouter);

export default router;
