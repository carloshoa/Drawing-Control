import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import initDbConnection from './configs/database.js';
import appRoutes from './routes.js';

const app = express();
dotenv.config();

initDbConnection();

app.use(express.json());
app.use(cors({
  origin: process.env.FRONT_END_URI,
}));

app.use('/api', appRoutes);

// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  console.log(error);
  res.status(error.status || 500).json({ error: error.message });
});

app.listen(process.env.PORT, () => console.log(`App running on PORT ${process.env.PORT}`));
