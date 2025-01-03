import { Router } from "express";
const router = Router();

import * as userControllers from "../controllers/users.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

router.route("/signup").post(userControllers.register);
router.route("/login").post(userControllers.login);
router.route("/logout").post(authMiddleware,userControllers.logout);

export default router;
