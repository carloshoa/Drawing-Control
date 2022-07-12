import mongoose from 'mongoose';
import InvalidIdException from '../exceptions/InvalidIdException.js';

class ProjectsRepository {
  constructor(model) {
    this.projectModel = model;
  }

  async getAll(userId, title = '') {
    const projects = await this.projectModel.find({ owner: userId, name: { $regex: new RegExp(title, 'i') } });

    return projects;
  }

  async getOne(id) {
    if (!mongoose.isValidObjectId(id)) {
      throw new InvalidIdException();
    }

    const project = await this.projectModel.findById(id);

    return project;
  }
}

export default ProjectsRepository;
