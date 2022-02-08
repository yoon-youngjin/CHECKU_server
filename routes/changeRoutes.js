import { Router } from 'express';
import { changeController, initController } from '../controllers/changeControllers.js';

// route만 관리
const router = Router();

router.post('/change', changeController);

router.post('/init', initController);

export default router;
