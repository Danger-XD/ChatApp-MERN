import { Router } from "express";
const router = Router();

import * as authUserControllers from "../controllers/authUsers.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

router.route("/signup").post(authUserControllers.register);
router.route("/login").post(authUserControllers.login);
router.route("/logout").post(authMiddleware,authUserControllers.logout);

export default router;
