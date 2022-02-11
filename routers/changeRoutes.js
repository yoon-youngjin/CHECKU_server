import { Router } from 'express';
import { changeAllController, changeController, initController } from '../controllers/changeControllers.js';

// route만 관리
const router = Router();

router.post('/changeAll', changeAllController);

router.post('/change', changeController);

router.post('/init', initController);

export default router;
