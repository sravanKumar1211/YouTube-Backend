import { Router } from "express";
import auth from "../middleware/Authentication.js";
import CommentController from "../controllers/comment.controller.js";

const router = Router();

router.post("/comment",auth, CommentController.addComment);
router.get("/comment/:videoid",auth, CommentController.getCommentByVideoId);


export default router;
