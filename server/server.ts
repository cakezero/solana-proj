import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import { PORT } from './src/utils/env';
import DB from './src/configs/db';
import logger from './src/configs/logger';
import { checkUser } from './src/middlewares/requireAuth';
import api from './src/routes/apiRoutes';
import admin from './src/routes/adminRoutes';

const server = express();

server.use(cors());
server.use(cookieParser());
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use("*", checkUser);

server.use('/api', api);
server.use('/admin', admin);

server.listen(PORT, () => {
  DB();
  logger.info(`Server is running on PORT: ${PORT}`);
})