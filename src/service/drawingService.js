import * as yup from 'yup';

import InvalidBodyRequestException from '../exceptions/InvalidBodyRequestException.js';
import DrawingAlreadyInUseException from '../exceptions/DrawingAlreadInUseException.js';

class drawingService {
  constructor(drawingRepository, projectRepository) {
    this.drawningRepository = drawingRepository;
    this.projectRepository = projectRepository;
  }

  async createDrawing(body) {
    // Validar Body
    const schema = yup.object().shape({
      drawingNumber: yup.string().required().min(3).max(150),
      title: yup.string().required().min(3).max(150),
      pages: yup.number().default(1).min(1).max(100),
      project: yup.string().required().min(3).max(150),
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

    const hasDrawingNumber = await this.drawningRepository.getAllDrawing(body.drawingNumber);
    if (hasDrawingNumber.length) {
      throw new DrawingAlreadyInUseException();
    }
    // Chamar repository
    const newDrawing = await this.drawningRepository.createDrawing(body);

    // atualizar repository de projects
    console.log(newDrawing.project);

    const findProject = await this.projectRepository.getOne(newDrawing.project);
    // const changedProject = findProject.drawings: [ ...findProject.drawings,  newDrawing._id] };
    // console.log('procurando projeto pelo id', findProject);
    // console.log('um teste de alteração de projeto,  ', changedProject);
    // const bodyToUpdateProject = { drawings: [...findProject.drawings, newDrawing._id] };
    const updateProject = await this.projectRepository
      .updateProject(findProject, newDrawing);

    console.log('projeto alterado..', updateProject);
    // const updatedProject = await this.projectRepository.updatedProject(newDrawing.project, {pro})

    return newDrawing;
  }

  async allDrawing() {
    const allDrawing = await this.drawningRepository.getAllDrawing();

    return allDrawing;
  }

  async updateDrawingFile(drawingId, fileId) {
    const updatedDrawing = await this.drawningRepository.updateDrawingFile(drawingId, fileId);

    return updatedDrawing;
  }

  async deleteOne(id) {
    const deletedDrawing = await this.drawningRepository.deleteOne(id);

    return deletedDrawing;
  }

  async updateOne(id, body) {
    const hasDrawingNumber = await this.drawningRepository.getAllDrawing(body.drawingNumber);

    console.log('retorno da verificação', hasDrawingNumber);
    const checkId = await this.drawningRepository.getDrawingById(id);
    console.log('retorno do body', checkId);
    const verifySameId = checkId._id === hasDrawingNumber[0]._id;
    console.log('é valido', verifySameId);
    if (hasDrawingNumber && !verifySameId) {
      throw new DrawingAlreadyInUseException();
    }

    const updatedDrawing = await this.drawningRepository.updateOne(id, body);

    return updatedDrawing;
  }
}

export default drawingService;
