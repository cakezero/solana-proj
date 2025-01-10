import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './env';


const JWT = {
  sign: (payload: string) => {
    const token = jwt.sign(payload, JWT_SECRET)
    return token;
  },

  verify: (token: string) => {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    return decodedToken;
  }
}


export default JWT;