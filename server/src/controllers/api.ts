import type { Request, Response } from 'express';
import UserRef from '../models/userRefModel';
import logger from '../configs/logger';

const refUser = (req: Request, res: Response) => {
  try {
    const { walletAddress } = req.body;

    const referrals = UserRef.findOne({ walletAddress });
    if (!referrals) res.status(404).json({ error: 'User not found' });

    res.status(200).json({ referrals });
  } catch (error) {
    logger.error(`Error getting user referrals: ${error}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const refUserPost =  async (req: Request, res: Response) => {
  try {
    const { referrer } = req.body

    if (!referrer) {
      const newRefer = new UserRef(req.body)
      newRefer.save();
      res.status(201).json({ message: 'User referred successfully' });
    }

    const user = await UserRef.findOne({ refId: referrer });
    user!.referrals += 1;
    user!.save();

    const newRefer = new UserRef(req.body);
    newRefer.save();
    res.status(201).json({ message: 'User referred successfully' });
  } catch (error) {
    logger.error(`Error saving user referral info: ${error}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export { refUserPost, refUser };