import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import * as usersController from "../controllers/users.controller.js"
const router = Router();

router.route("/").get(authMiddleware,usersController.getAllUsers)
export default router;
