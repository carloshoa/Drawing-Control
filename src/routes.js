import { Router } from 'express';
import jwt from 'jsonwebtoken';

import projectsController from './controllers/projectsController.js';
import drawingController from './controllers/drawingController.js';
import authController from './controllers/authController.js';
import filesController from './controllers/filesController.js';

// eslint-disable-next-line import/no-named-as-default
import NotAuthenticatedException from './exceptions/NotAuthenticatedException.js';

const router = Router();

router.use('/auth', authController);

router.use((req, res, next) => {
  const bearerToken = req.get('Authorization');

  if (!bearerToken) {
    return next(new NotAuthenticatedException());
  }

  const token = bearerToken.slice(7);

  console.log(token);

  try {
    const tokenPayload = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = { id: tokenPayload.id, role: tokenPayload.role };

    return next();
  } catch (error) {
    return next(error);
  }
});

router.use('/projects', projectsController);
router.use('/drawing', drawingController);
router.use('/files', filesController);

export default router;
