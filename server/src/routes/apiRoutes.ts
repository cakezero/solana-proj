import express from 'express';
import{ refUser, refUserPost } from '../controllers/api';

const router = express.Router();

router
  .get('/ref/user', refUser)
  .post('/ref/user', refUserPost)


export default router;