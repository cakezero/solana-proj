import type { Request, Response } from 'express';
import Admin from '../models/adminModel';
import UserRef from '../models/userRefModel';
import logger from '../configs/logger';
import bcrypt from 'bcrypt';
import JWT from '../utils/jwt';

const adminRegister = (req: Request, res: Response) => {
  res.render('register')
}

const adminRegisterPost = (req: Request, res: Response) => {
  
}

const adminLogin = (req: Request, res: Response) => {
  res.render('login')
}

const adminLoginPost = async (req: Request, res: Response) => {
  try {
    const { auth, password } = req.body;

    const admin = await Admin.findOne({ $or: [ { email: auth }, { userName: auth } ] });
    if (!admin) return res.status(404).json({ error: 'Invalid credentials or User does not exist!' });

    const checkPassword = await bcrypt.compare(password, admin.password);
    if(!checkPassword) return res.status(400).json({ error: 'Invalid credentials or User does not exist!' });

    const token = JWT.sign({ username: admin.username });
    res.cookie('admin_cookie', token, { httpOnly: true });

    return res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    logger.error(`Error logging in: ${error}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const adminDashboard = async (req: Request, res: Response) => {
  try {
    const referrals = await UserRef.find();
    return res.render('dashboard', { referrals })
  } catch (error) {
    logger.error(`Error rendering dashboard: ${error}`);
    return res.status(500).send('Internal Server Error');
  }
}

const adminLogout = (req: Request, res: Response) => {
  res.cookie('admin_cookie', '', { maxAge: 1 });
  res.redirect('/admin/login');
}

export { adminLogin, adminLogout, adminDashboard, adminRegister, adminLoginPost, adminRegisterPost }