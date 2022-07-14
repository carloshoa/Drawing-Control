class drawningRepository {
  constructor(model) {
    this.drawingModel = model;
  }

  async createDrawing(body) {
    const newDrawing = await this.drawingModel.create(body);

    return newDrawing;
  }

  async getAllDrawing(number = '') {
    const allDrawing = await this.drawingModel.find({ name: { $regex: new RegExp(number, 'i') } });

    return allDrawing;
  }
}

export default drawningRepository;
