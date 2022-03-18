import { Router } from "express";
import order from '../../controller/order';

const routus = Router();

routus.route('/').post(order.create)
routus.route("/:id").get(order.current_order);


export default routus;
