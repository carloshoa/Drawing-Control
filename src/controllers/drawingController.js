import { Router } from 'express';

import Drawing from '../models/Drawing.js';
import DrawningRepository from '../repository/drawingRepository.js';
import DrawingService from '../service/drawingService.js';

import Project from '../models/Project.js';
import ProjectService from '../service/projectsService.js';
import ProjectRepository from '../repository/projectsRepository.js';

const projectRepository = new ProjectRepository(Project);
const projectService = new ProjectService(projectRepository);

const drawningRepository = new DrawningRepository(Drawing);
const drawingService = new DrawingService(drawningRepository, projectRepository);

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

router.post('/delete', async (req, res, next) => {
  try {
    const { id } = req.body;

    console.log('esse é o id', req);
    const deletedDrawing = await drawingService.deleteOne(id);

    res.json(deletedDrawing);
  } catch (error) {
    next(error);
  }
});

router.post('/update', async (req, res, next) => {
  try {
    const id = req.body._id;
    const { body } = req;
    console.log('esse é o id', req.body);
    const updatedDrawing = await drawingService.updateOne(id, body);

    res.json(updatedDrawing);
  } catch (error) {
    next(error);
  }
});

export default router;
