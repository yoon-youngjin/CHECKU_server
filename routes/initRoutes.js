import { Router } from 'express';
import { initController } from '../controllers/initControllers.js';

// route만 관리
const router = Router();

router.post('/init', initController);

export default router;
