import { Router } from 'express';
import { lectureController } from '../controllers/lectureControllers.js';

// route만 관리
const router = Router();

router.post('/click', lectureController);

export default router;
