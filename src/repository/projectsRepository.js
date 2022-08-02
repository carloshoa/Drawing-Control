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

    const project = await this.projectModel.findOne({ _id: id }).populate('drawings');
    console.log(project);
    return project;
  }

  async createProject(body) {
    const newProject = await this.projectModel.create(body);

    return newProject;
  }

  async updateProject(id, body) {
    const updatedProject = await this.projectModel
      .findByIdAndUpdate(id, { $push: { drawings: body._id } });

    return updatedProject;
  }
}

export default ProjectsRepository;
