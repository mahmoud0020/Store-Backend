import express from "express";
import dotenv from "dotenv";
import routes from './routes'
import morgan from 'morgan';
import error from './middleware/handleError';

dotenv.config();
const app = express();

const port = process.env.PORT;
app.use(morgan('common'));
app.use(express.json())
app.use('/api',routes);
app.use(error);
app.listen(port,()=>{
    console.log("server start on port ",port);
})

export default app;