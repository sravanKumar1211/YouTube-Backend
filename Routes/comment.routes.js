
import { Router } from "express";
import auth from "../middleware/Authentication.js";
import CommentController from "../controllers/comment.controller.js";

const router = Router();

// ADD COMMENT  //
// Protected route → user must be logged in
// Creates a new comment for a specific video
router.post("/comment", auth, CommentController.addComment);

// GET COMMENTS BY VIDEO ID  //
// Public route → fetch all comments for a given video
router.get("/comment/:videoid", CommentController.getCommentByVideoId);

// UPDATE COMMENT  //
// Protected route → only the owner of the comment can edit
router.put("/comment/:commentid", auth, CommentController.updateComment);

//  DELETE COMMENT  //
// Protected route → only the owner of the comment can delete
router.delete("/comment/:commentid", auth, CommentController.deleteComment);

export default router;
