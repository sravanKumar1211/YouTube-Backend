import { Router } from "express";
import auth from "../middleware/Authentication.js";
import CommentController from "../controllers/comment.controller.js";

const router = Router();

router.post("/comment", auth, CommentController.addComment);
router.get("/comment/:videoid", CommentController.getCommentByVideoId);

// ⭐ NEW — Update comment
router.put("/comment/:commentid", auth, CommentController.updateComment);

// ⭐ NEW — Delete comment
router.delete("/comment/:commentid", auth, CommentController.deleteComment);

export default router;
