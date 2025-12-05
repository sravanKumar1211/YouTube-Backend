import { Router } from "express";
import ChannelController from "../controllers/channel.controller.js";
import auth from '../middleware/Authentication.js';

const router = Router();

// GET videos by channel user
router.get("/channelvideos/:userId", ChannelController.getChannelVideoByUserId);

// UPDATE a video by videoId (ONLY OWNER)
router.put("/updatevideo/:videoId", auth, ChannelController.updateVideo);

// DELETE a video by videoId (ONLY OWNER)
router.delete("/deletevideo/:videoId", auth, ChannelController.deleteVideo);

export default router;
