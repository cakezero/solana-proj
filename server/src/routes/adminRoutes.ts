import express from 'express';
import { adminLogin, adminLogout, adminDashboard, adminRegister, adminLoginPost, adminRegisterPost } from '../controllers/admin';
import { requireAuth } from '../middlewares/requireAuth';

const router = express.Router();

router
  .get('/login', adminLogin)
  .post('/login', adminLoginPost)
  .get('/logout', requireAuth, adminLogout)
  .get('/dashboard', requireAuth, adminDashboard)
  .get('/register', adminRegister)
  .post('/register', adminRegisterPost)

export default router;