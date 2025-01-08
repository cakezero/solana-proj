import express from 'express';
import{ refUser, refUserPost } from '../controllers/api';

const router = express.Router();

router
  .get('/ref/check-user', refUser)
  .post('/ref/user', refUserPost)


export default router;