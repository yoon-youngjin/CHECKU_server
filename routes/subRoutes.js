import { Router } from 'express';
import { subController } from '../controllers/subControllers.js';

// route만 관리
const router = Router();

router.post('/click', subController);

export default router;
