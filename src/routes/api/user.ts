import { Router } from "express";
import User from "../../controller/user";
import auth from '../../middleware/authenticate_valid';
const routes =Router();

routes.route('/')
.get(auth,User.index)
.post(User.createUser)
.patch(User.update)

routes.route('/:id')
.get(User.show)

.delete(User.delete_user)

routes.route("/auth").post(User.auth_user);
export default routes;