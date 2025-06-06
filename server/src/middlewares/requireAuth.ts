import JWT from '../utils/jwt';
import type { NextFunction, Request, Response } from 'express';
import logger from '../configs/logger';

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.cookies.admin_cookie;
      if (!token) {
        res.redirect('/admin/login');
        return;
      }

      const auth = JWT.verify(token);
      if (!auth) res.redirect('/admin/login');
      next();
    } catch (error) {
      res.redirect('/admin/login');
      logger.error(`Error auth middleware: ${error}`);
      next();
    }
};

const checkUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.admin_cookie;
    if (!token) {
      res.locals.user = null
      next();
      return;
    }
    
    const decodedToken = JWT.verify(token);
    res.locals.user = decodedToken;
    next();
  } catch (error) {
    logger.error(`Error checking user: ${error}`);
    next();
  }
};

export { 
  requireAuth,
  checkUser
};