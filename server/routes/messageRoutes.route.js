import { Router } from "express";
const router = Router();

import * as messageControllers from "../controllers/messages.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

router.route("/:id").get(authMiddleware,messageControllers.getMessage);
router.route("/send/:id").post(authMiddleware,messageControllers.sendMessage);

export default router;
