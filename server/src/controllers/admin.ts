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

const adminRegisterPost = async (req: Request, res: Response) => {
  try {
    const { password, confirmPassword, username, email } = req.body;

    if (password !== confirmPassword) {
      res.status(400).json({ error: "Passwords do not match!" })
      return;
    }

    const emailExists = await Admin.findOne({ email });
    
    if (emailExists) {
      res.status(302).json({ error: "email already exists!" });
      return;
    }

    const usernameExists = await Admin.findOne({ username });

    if (usernameExists) {
      res.status(302).json({ error: "username already exists!" });
      return;
    }
    
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log({ hashedPassword })

    const newAdmin = new Admin({ password: hashedPassword, username, email })
    console.dir({ newAdmin })

    newAdmin.save();
    const token = JWT.sign(username);

    res.cookie('admin_cookie', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    logger.error(`Error registering admin: ${error}`);
    res.status(500).json({ catchError: 'Internal Server Error' });
  }
}

const adminLogin = (req: Request, res: Response) => {
  res.render('login')
}

const adminLoginPost = async (req: Request, res: Response) => {
  try {
    const { auth, password } = req.body;

    const admin = await Admin.findOne({ $or: [ { email: auth }, { username: auth } ] });
    if (!admin) {
      res.status(404).json({ error: 'Invalid credentials or User does not exist!' });
      return;
    }

    const checkPassword = await bcrypt.compare(password, admin!.password);
    if (!checkPassword) {
      res.status(400).json({ error: 'Invalid credentials or User does not exist!' });
      return;
    }

    const token = JWT.sign(admin!.username);
    res.cookie('admin_cookie', token, { httpOnly: true, maxAge: maxAge * 1000 });

   res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    logger.error(`Error logging in: ${error}`);
    res.status(500).json({ catchError: 'Internal Server Error' });
  }
}

const adminDashboard = async (req: Request, res: Response) => {
  try {
    const users = await UserRef.find().sort({ referrals: -1 });
    res.render('dashboard', { users })
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