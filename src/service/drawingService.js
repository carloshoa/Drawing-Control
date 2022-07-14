import * as yup from 'yup';

import InvalidBodyRequestException from '../exceptions/InvalidBodyRequestException.js';
import DrawingAlreadyInUseException from '../exceptions/DrawingAlreadInUseException.js';

class drawingService {
  constructor(repository) {
    this.drawningRepository = repository;
  }

  async createDrawing(body) {
    // Validar Body
    const schema = yup.object().shape({
      drawingNumber: yup.string().required().min(3).max(150),
      title: yup.string().required().min(3).max(150),
      pages: yup.number().default(1).min(1).max(100),
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

    // checar duplicado

    const hasDrawingNumber = await this.drawningRepository.getAllDrawing(body.name);

    if (hasDrawingNumber) {
      throw new DrawingAlreadyInUseException();
    }
    // Chamar repository

    const newDrawing = await this.drawningRepository.createDrawing(body);
    //

    return newDrawing;
  }

  async allDrawing() {
    const allDrawing = this.drawningRepository.getAllDrawing();

    return allDrawing;
  }
}

export default drawingService;
