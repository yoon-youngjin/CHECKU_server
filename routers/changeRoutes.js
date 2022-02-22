import { Router } from 'express';
import { changeAllController, changeController, initController } from '../controllers/changeControllers.js';

import { lectureController } from '../controllers/lectureControllers.js';

import { insertController } from '../controllers/InsertControllers.js';

// route만 관리
const router = Router();

router.get('/subjects', changeAllController);

router.post('/changeAll', changeAllController);

router.post('/click', lectureController);

router.post('/change', changeController);

router.post('/init', initController);

router.post('/insertSubject', insertController);

export default router;
