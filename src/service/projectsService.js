import * as yup from 'yup';

import InvalidBodyRequestException from '../exceptions/InvalidBodyRequestException.js';
import NameAlreadyInUseException from '../exceptions/NameAlreadyInUseException.js';

class ProjectsService {
  constructor(repository) {
    this.projectsRepository = repository;
  }

  async getAllByFilter(title) {
    const pŕojects = await this.projectsRepository.getAll(title);

    return pŕojects;
  }

  async getOne(id) {
    const project = await this.projectsRepository.getOne(id);

    return project;
  }

  async createProject(body) {
    const schema = yup.object().shape({
      name: yup.string().required().min(3).max(150),
    });
    try {
      await schema.validate(body, { abortEarly: false });
    } catch (error) {
      const errors = error.inner.map((err) => ({
        field: err.path,
        errors: err.errors[0],
      }
      ));
      throw new InvalidBodyRequestException(errors);
    }

    const hasProjectName = await this.projectsRepository.getAll(body.name);

    if (hasProjectName) {
      throw new NameAlreadyInUseException();
    }

    const newProject = await this.projectsRepository.createProject(body);

    return newProject;
  }
}

export default ProjectsService;
