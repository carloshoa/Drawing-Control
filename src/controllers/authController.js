import { Router } from 'express';

import User from '../models/User.js';
import AuthService from '../service/authService.js';
import AuthRepository from '../repository/authRepository.js';

const authRepository = new AuthRepository(User);
const authService = new AuthService(authRepository);

const router = Router();

router.post('/register', async (req, res, next) => {
  try {
    const newUSer = await authService.register(req.body);

    res.json(newUSer);
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { body } = req;

    const tokenResponse = await authService.authenticate(body);

    res.json(tokenResponse);
  } catch (error) {
    next(error);
  }
});

export default router;
