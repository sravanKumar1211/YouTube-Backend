import { Router } from "express";
import UserController from "../controllers/user.controller.js";

const router = Router();

router.post("/signup", UserController.signUp);
router.post("/login", UserController.signIn);
router.post("/logout", UserController.logout);

export default router;
