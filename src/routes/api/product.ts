import { Router } from "express";
import product from "../../controller/product";

const routes = Router();

routes.route("/").get(product.index).post(product.create)

routes.route("/:id").get(product.show);

export default routes;