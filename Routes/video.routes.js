import { Router } from "express";
import VideoController from "../controllers/video.controller.js";
import auth from '../middleware/Authentication.js'

const router = Router();

router.post("/video",auth, VideoController.uploadVideo);


export default router;
