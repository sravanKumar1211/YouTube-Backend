import { Router } from "express";
import ChannelController from "../controllers/channel.controller.js";
import auth from '../middleware/Authentication.js'

const router = Router();


router.get("/channelvideos/:userId", ChannelController.getChannelVideoByUserId);


export default router;