import {Pool} from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const env =process.env;
const db = new Pool({
    host:env.DB_HOST,
    database:env.NODE_DEV ==='dev' ? env.DB_DEV : env.DB_TEST,
    user:env.DB_USER,
    password:env.DB_PASSWORD,
    port:parseInt(env.DB_PORT as string)
});
export default db;