import { Router  } from "express";
import product from '../routes/api/product';
import user from '../routes/api/user';
import order from '../routes/api/order';


const routes = Router();
routes.use('/users',user);
routes.use('/product',product);
routes.use('/order',order);
export default routes;

