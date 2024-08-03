import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import validateToken from "../middlewares/validateToken";

const router = Router();

router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.post('/', UserController.createUser);
router.put('/:id', validateToken, UserController.updateUser);
router.delete('/:id', validateToken, UserController.deleteUser);

export default router;