import { Router } from "express";
import VideoController from "../controllers/video.controller.js";
import auth from '../middleware/Authentication.js';

const router = Router();

// UPLOAD VIDEO  //
// Protected route → only logged-in users can upload videos
router.post("/video", auth, VideoController.uploadVideo);

// GET ALL VIDEOS //
// Protected route → requires authentication
// Returns all videos with user/channel details
router.get("/allvideo", auth, VideoController.getAllVideo);

//  GET VIDEO BY ID //
// Public route → fetches a single video using its unique ID
router.get("/getvideobyid/:id", VideoController.getVideoById);

export default router;
