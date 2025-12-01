import Video from "../models/Video.model.js";

const ChannelController = {
       async getChannelVideoByUserId(req,res){
    try{
        let { userId } = req.params;
        const video = await Video.find({ user: userId }).populate('user','channelName profilePic userName createdAt');

        return res.status(200).json({
            success: true,
            video
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "internal server error" });
        }
    }
    }

export default ChannelController;
