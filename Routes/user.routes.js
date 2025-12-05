import { Router } from "express";
import UserController from "../controllers/user.controller.js";

const router = Router();

//  USER SIGNUP  //
// Registers a new user with username, email, password, etc.
router.post("/signup", UserController.signUp);

//  USER LOGIN  //
// Authenticates user and returns JWT token (cookie + response)
router.post("/login", UserController.signIn);

//  USER LOGOUT  //
// Clears token cookie and logs the user out
router.post("/logout", UserController.logout);

export default router;
