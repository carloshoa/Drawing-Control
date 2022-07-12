class ProjectsService {
  constructor(repository) {
    this.projectsRepository = repository;
  }

  async getAllByFilter(title, userId) {
    const pŕojects = await this.projectsRepository.getAll(title, userId);

    return pŕojects;
  }

  async getOne(id) {
    const project = await this.projectsRepository.getOne(id);

    return project;
  }
}

export default ProjectsService;
