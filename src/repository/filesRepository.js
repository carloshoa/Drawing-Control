class filesRepository {
  constructor(model) {
    this.filesModel = model;
  }

  async getFiles(drawingId) {
    const filesDrawing = await this.filesModel.find({ drawing: drawingId });

    return filesDrawing;
  }

  async createFile(drawingId, body) {
    const newFile = await this.filesModel.create({ ...body, drawing: drawingId });

    return newFile;
  }
}

export default filesRepository;
