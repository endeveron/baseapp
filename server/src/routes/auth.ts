import { Router } from 'express';
import { body } from 'express-validator';

import { signup, login } from '../controllers/auth';
import { handleHttpError } from '../utils/error';

const router = Router();

const baseCredentials = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6, max: 20 }),
];

router.post('/login', baseCredentials, login);

router.post(
  '/signup',
  [body('name').isLength({ min: 2, max: 20 }), ...baseCredentials],
  signup
);

router.use(handleHttpError);

export default router;
