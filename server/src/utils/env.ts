import * as dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000

const DB_URL = process.env.DB_URL!

const JWT_SECRET = process.env.JWT_SECRET!

const ENVIRONMENT= process.env.ENVIRONMENT || 'development'

export { PORT, DB_URL, JWT_SECRET, ENVIRONMENT }