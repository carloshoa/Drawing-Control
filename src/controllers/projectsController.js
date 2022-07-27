import { Router } from 'express';

import Project from '../models/Project.js';
import ProjectsRepository from '../repository/projectsRepository.js';
import ProjectsService from '../service/projectsService.js';

const projectsRepository = new ProjectsRepository(Project);
const projectsService = new ProjectsService(projectsRepository);

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const { name } = req.query;

    console.log(req.user);

    const projects = await projectsService.getAllByFilter(name);
    res.json(projects);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const project = await projectsService.getOne(id);

    res.json(project);
  } catch (error) {
    next(error);
  }
});

router.post('/create', async (req, res, next) => {
  try {
    const { body } = req;
    console.log(body);

    const newProject = await projectsService.createProject(body);
    console.log(newProject);

    res.json(newProject);
  } catch (error) {
    next(error);
  }
});
export default router;
