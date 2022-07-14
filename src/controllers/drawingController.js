import { Router } from 'express';
import Drawing from '../models/Drawing.js';

import DrawningRepository from '../repository/drawingRepository.js';
import DrawingService from '../service/drawingService.js';

const drawningRepository = new DrawningRepository(Drawing);
const drawingService = new DrawingService(drawningRepository);

const router = Router();

router.post('/create', async (req, res, next) => {
  try {
    const { body } = req;

    const newDrawing = await drawingService.createDrawing(body);

    res.json(newDrawing);
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const allDrawing = await drawingService.allDrawing();

    res.json(allDrawing);
  } catch (error) {
    next(error);
  }
});

export default router;
