import type { Request, Response } from 'express';
import UserRef from '../models/userRefModel';
import logger from '../configs/logger';

const refUser = (req: Request, res: Response) => {
  try {
    const { walletAddress } = req.query;

    const UserReferrals = UserRef.findOne({ walletAddress });
    if (!UserReferrals) res.status(404).json({ message: 'User not found' });

    res.status(200).json({ UserReferrals });
  } catch (error) {
    logger.error(`Error getting user referrals: ${error}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const refUserPost =  async (req: Request, res: Response) => {
  try {
    const { referrer } = req.body
    req.body.refId = newRefId

    if (!referrer) {
      const newUser = new UserRef(req.body)
      newUser.save();
      res.status(201).json({ message: 'User referred successfully' });
    }

    const user = await UserRef.findOne({ refId: referrer });
    user!.referrals += 1;
    user!.save();

    const newUser = new UserRef(req.body);
    newUser.save();
    res.status(201).json({ message: 'User referred successfully', newUser });
  } catch (error) {
    logger.error(`Error saving user referral info: ${error}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export { refUserPost, refUser };