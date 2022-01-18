import { Router } from 'express';
import { userSigninController, userSignupController } from '../controllers/userControllers.js';

// route만 관리
const router = Router();

router.post('/signup', userSignupController);

router.post('/login', userSigninController);

export default router;
