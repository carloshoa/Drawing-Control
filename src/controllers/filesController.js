import { Router } from 'express';

import File from '../models/Files.js';
import FilesService from '../service/filesService.js';
import FilesRepository from '../repository/filesRepository.js';

import Drawing from '../models/Drawing.js';
import DrawningRepository from '../repository/drawingRepository.js';
import DrawingService from '../service/drawingService.js';

const filesRepository = new FilesRepository(File);
const filesService = new FilesService(filesRepository);

const drawingRepository = new DrawningRepository(Drawing);
const drawingService = new DrawingService(drawingRepository);

const router = Router();

router.get('/:drawing', async (req, res, next) => {
  try {
    const { drawingId } = req.params;

    const drawingFiles = await filesService.getFiles(drawingId);

    res.json(drawingFiles);
  } catch (error) {
    next(error);
  }
});

router.post('/:drawingId', async (req, res, next) => {
  try {
    const { drawingId } = req.params;
    const { body } = req;

    console.log('idddd', drawingId);

    const newFile = await filesService.createFile(drawingId, body);

    if (newFile) {
      const fileId = newFile.id;
      const updatedDrawing = await drawingService.updateDrawingFile(drawingId, fileId);

      console.log(updatedDrawing);
    }

    res.json(newFile);
  } catch (error) {
    next(error);
  }
});

export default router;
