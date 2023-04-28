import cors from 'cors';
import express from 'express';

import corsConfig from './config/cors';
import { mongo } from './db/mongo';
import authRoutes from './routes/auth';
import { HttpError } from './utils/error';

const app = express();
app.use(express.json());
app.use(cors(corsConfig));

// Routes
app.use('/api/auth', authRoutes);

// 404
app.use((req, res, next) =>
  next(new HttpError('Requested url is not found', 404))
);

// Connect to DB
mongo.connect().then(() => app.listen(process.env.PORT));
