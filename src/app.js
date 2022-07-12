import express from 'express';
import dotenv from 'dotenv';

import initDbConnection from './configs/database.js';
import appRoutes from './routes.js';

const app = express();
dotenv.config();

initDbConnection();

app.use(express.json());

app.use('/api', appRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  res.status(error.status || 500).json({ error: error.message });
});

app.listen(process.env.PORT, () => console.log(`App running on PORT ${process.env.PORT}`));
