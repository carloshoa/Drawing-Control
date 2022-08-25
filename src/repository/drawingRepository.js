class drawningRepository {
  constructor(model) {
    this.drawingModel = model;
  }

  async createDrawing(body) {
    const newDrawing = await this.drawingModel.create(body);

    return newDrawing;
  }

  async getAllDrawing(number = '') {
    const allDrawing = await this.drawingModel.find({ drawingNumber: { $regex: new RegExp(number, 'i') } });

    return allDrawing;
  }

  async getDrawingByNumber(number = '') {
    const allDrawing = await this.drawingModel.find({ drawingNumber: { $regex: new RegExp(number, 'i') } });

    return allDrawing;
  }

  async getDrawingById(id) {
    const allDrawing = await this.drawingModel.find({ _id: id });

    return allDrawing;
  }

  async updateDrawingFile(drawingId, fileId) {
    const updatedDrawing = await this.drawingModel
      .findByIdAndUpdate(drawingId, { $push: { revision: fileId } });

    return updatedDrawing;
  }

  async deleteOne(id) {
    const deletedDrawing = await this.drawingModel.deleteOne({ _id: id });

    return deletedDrawing;
  }

  async updateOne(id, body) {
    console.log('essse é o id', id);
    console.log('esse é o body', body);
    const updatedDrawing = await this.drawingModel.updateOne({ _id: id }, body);

    return updatedDrawing;
  }
}

export default drawningRepository;
