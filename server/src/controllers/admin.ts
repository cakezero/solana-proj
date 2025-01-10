import type { Request, Response } from 'express';
import Admin from '../models/adminModel';
import UserRef from '../models/userRefModel';
import logger from '../configs/logger';
import bcrypt from 'bcrypt';
import JWT from '../utils/jwt';

const maxAge = 3 * 24 * 60 * 60; // Setting the maximum age of the cookie to 3 days

const adminRegister = (req: Request, res: Response) => {
  res.render('register')
}

const adminRegisterPost = (req: Request, res: Response) => {
  try {
    const { password, username, email } = req.body;
    
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hash(password, salt);

    const newAdmin = new Admin({ password: hashedPassword, username, email })

    newAdmin.save();
    const token = JWT.sign(username, { expiresIn: '7d' });

    res.cookie('admin_cookie', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    logger.error(`Error registering admin: ${error}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const adminLogin = (req: Request, res: Response) => {
  res.render('login')
}

const adminLoginPost = async (req: Request, res: Response) => {
  try {
    const { auth, password } = req.body;

    const admin = await Admin.findOne({ $or: [ { email: auth }, { username: auth } ] });
    if (!admin) res.status(404).json({ error: 'Invalid credentials or User does not exist!' });

    const checkPassword = await bcrypt.compare(password, admin!.password);
    if(!checkPassword) res.status(400).json({ error: 'Invalid credentials or User does not exist!' });

    const token = JWT.sign(admin!.username);
    res.cookie('admin_cookie', token, { httpOnly: true, maxAge: maxAge * 1000 });

   res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    logger.error(`Error logging in: ${error}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const adminDashboard = async (req: Request, res: Response) => {
  try {
    const referrals = await UserRef.find().sort({ referrals: -1 });
    res.render('dashboard', { referrals })
  } catch (error) {
    logger.error(`Error rendering dashboard: ${error}`);
    res.status(500).send('Internal Server Error');
  }
}

const adminLogout = (req: Request, res: Response) => {
  res.cookie('admin_cookie', '', { maxAge: 1 });
  res.redirect('/admin/login');
}

export { adminLogin, adminLogout, adminDashboard, adminRegister, adminLoginPost, adminRegisterPost }