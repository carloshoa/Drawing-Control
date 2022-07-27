import mongoose from 'mongoose';
import InvalidIdException from '../exceptions/InvalidIdException.js';

class ProjectsRepository {
  constructor(model) {
    this.projectModel = model;
  }

  async getAll(name = '') {
    const projects = await this.projectModel.find({ name: { $regex: new RegExp(name, 'i') } });

    return projects;
  }

  async getOne(id) {
    if (!mongoose.isValidObjectId(id)) {
      throw new InvalidIdException();
    }

    const project = await this.projectModel.findById(id);

    return project;
  }

  async createProject(body) {
    const newProject = await this.projectModel.create(body);

    return newProject;
  }
}

export default ProjectsRepository;
