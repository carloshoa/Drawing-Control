import { Router } from 'express';

const router = Router();

router.get('/project', (req, res) => {
  try {
    res.json({ message: 'Rota get de Projetos' });
  } catch (error) {
    console.log(error);
  }
});

export default router;
