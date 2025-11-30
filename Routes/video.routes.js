import { Router } from "express";
import VideoController from "../controllers/video.controller.js";
import auth from '../middleware/Authentication.js'

const router = Router();

router.post("/video",auth, VideoController.uploadVideo);
router.get("/allvideo",auth, VideoController.getAllVideo);
router.get("/getvideobyid/:id",auth, VideoController.getVideoById);
router.get("/getvideobyuserid/:userId",auth, VideoController.getVideoByUserId);


export default router;
