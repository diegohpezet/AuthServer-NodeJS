import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import validateToken from "../middlewares/validateToken";

const router = Router();

router.post('/', AuthController.login);
router.post('/refresh', AuthController.refreshSession);
router.get('/', validateToken, (req, res) => res.send(`Welcome user num. ${req.user ? req.user.id : 'undefined'}`));

export default router;