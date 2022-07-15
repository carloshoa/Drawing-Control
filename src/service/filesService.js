import mongoose from 'mongoose';

import InvalidIdException from '../exceptions/InvalidIdException.js';

class filesService {
  constructor(repository) {
    this.filesRepository = repository;
  }

  async getFiles(drawingId) {
    // validate Id
    const isValidDrawingId = mongoose.isValidObjectId(drawingId);

    if (!isValidDrawingId) {
      throw new InvalidIdException();
    }

    const filesDrawing = await this.filesRepository.getFiles(drawingId);

    return filesDrawing;
  }

  async createFile(drawingId, body) {
    const isValidDrawingId = mongoose.isValidObjectId(drawingId);

    if (!isValidDrawingId) {
      throw new InvalidIdException();
    }

    const newFile = await this.filesRepository.createFile(drawingId, body);

    return newFile;
  }
}

export default filesService;
