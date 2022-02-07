import { Router } from 'express';
import { changeController } from '../controllers/changeControllers.js';

// route만 관리
const router = Router();

router.post('/change', changeController);

export default router;
